import * as _ from "underscore";
import bcrypt from "bcrypt";
import { User } from "../entity/User"
import { getFreshConnection } from "../db"
import { IServerResponse } from "../interfaces/IServerResponse";
import { Put, Request, Route, Security, Body, Post, Tags } from "tsoa";
import * as Utils from "../utils/core"
import * as TokenService from "../services/tokenService";
import { IAgentSignupDto } from "../dto/IAgentSignupDto";
import { IAccessTokenData } from "../interfaces/IAccessTokenData";
import { BadRequestError } from "../utils/error-response-types";


@Route("/api/auth")
@Tags("Auth Service")
export class AuthController {

@Post("/agent/singup")
public async agentSignup(@Body() reqBody: IAgentSignupDto) : Promise<IServerResponse<IAccessTokenData>>{
    const connection = await getFreshConnection()
    const userRepo = connection.getRepository(User)
    const exitingUser = await userRepo.findOne({ emailAddress: reqBody.emailAddress, phoneNumber: reqBody.phoneNumber })

    if(exitingUser){
    throw new BadRequestError("The Email Address and Phone Number has been used")
    }
    const passwordHash = await Utils.generatePasswordHash(reqBody.passwod)
    const newUser = new User().initialize(
        reqBody.firstName, reqBody.lastName, reqBody.emailAddress, reqBody.phoneNumber, passwordHash
    )
    const saveUser = await userRepo.save(newUser)

    const signUpToken = await TokenService.getAccessToken(saveUser)
    const resData : IServerResponse<IAccessTokenData> = {
        status: true,
        data: signUpToken,
        message: "Agent Account Created Successfully"
    }
    return resData

}
    
}