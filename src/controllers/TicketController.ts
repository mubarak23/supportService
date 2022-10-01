import { User } from "@sentry/node";
import { Get, Route, Tags, Request, Query, Security } from "tsoa";
import { getFreshConnection } from "../db";
import { TicketResponseDto } from "../dto/TicketResponseDto";
import * as paginationService from "../services/paginationService";
import * as profileService from "../services/profileService";
import * as _ from 'underscore';
import { Ticket } from "../entity/Ticket";
import { SortOrder } from "../enums/SortOrder";
import TicketStatuses from "../enums/Statuses";
import { IPaginatedList } from "../dto/IPaginatedList";
import { IServerResponse } from "../interfaces/IServerResponse";


@Route("/api/ticket")
@Tags("Ticket Service")

export class TicketController {
    @Security("jwt")
    @Get('/all')
    public async tickets(@Request() req: any,   
    @Query("pageNumber") pageNumber: any,
    @Query("sortOrder") sortOrder: SortOrder,
    @Query("status") ticketStatus: TicketStatuses): Promise<IServerResponse<IPaginatedList<TicketResponseDto>>>{
        const currentUser : User = req.user
        const connection = await getFreshConnection();
        const ticketRepo = connection.getRepository(Ticket);
        
        let query: any = {}
        query = { 
        status:ticketStatus,
        userId: currentUser.id,

        }
        const join = {
            alias: "ticket",
            leftJoinAndSelect: {
              user: "ticket.user",
            },
          }
        const pageSize = 10
        const totalCount = await ticketRepo.count(query)
        const ticketListsPages = await paginationService.paginate(Ticket, query, pageNumber, 
            pageSize, sortOrder, undefined, join ) as IPaginatedList<Ticket>

    

        const ticketLists: Ticket[] = ticketListsPages.dataset;

        const agentUserIds: number[] = ticketLists.map(user => user.id)
        const agentsPublicProfiles = await profileService.getPublicProfileFromUserIds(agentUserIds)

        const transformedTicketsDataset: TicketResponseDto[] = ticketLists.map(ticket => {
            const agentPublicProfile = agentsPublicProfiles.find(publicProfile =>
                publicProfile.userUuid === ticket.user.uuid)
             const ticketResponseImages: {url: string, mimetype: string}[] = 
             ticket.images.map(pImage => _.omit(pImage, 'keyFromCloudProvider', 'fileCloudProvider'))
            return {
                uuid: ticket.uuid,
                name: ticket.name,
                description: ticket.description,
                agentProfile: agentPublicProfile,
                customerEmail: ticket.customerEmail,
                images: ticketResponseImages,
                status: ticket.status
            }
        })
        const resData = {
            status: true,
            data: { pageNumber, pageSize, dataset: transformedTicketsDataset, total: totalCount }
          };
        return resData  
    }

}