import { Column, Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { TicketColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { ICloudFile } from "../interfaces/ICloudFile";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";


@Entity({ name: Tables.TICKETS })
export class Ticket extends DefualtEntity {
  @Column({ name: TicketColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: TicketColumns.NAME, nullable: true })
  name: string;

  @Column({ name: TicketColumns.DESCRIPTION, nullable: true})
  description: string;

  @Column({ name: TicketColumns.ASSIGN_TO, nullable: false})
  assign_to: string;

  @Column({ type:"jsonb", name: TicketColumns.PHOTO, nullable: true})
  photo: ICloudFile

  

  initialize(name: string, description: string, assign_to: string){
    const now = utcNow();
    this.uuid = uuidv4();
    this.name = name;
    this.description = description;
    this.assign_to = assign_to;
    this.createdAt = now;
    return this
  }
}