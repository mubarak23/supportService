import IProfile from "../dto/IProfileResponse";
import { User } from "../entity/User";


export const agentPublicProfile = async (currentUser: User): Promise<IProfile> => {
    const resProfile: IProfile =  {
        userUuid: currentUser.uuid,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phoneNumber: currentUser.phoneNumber,
        emailAddress: currentUser.emailAddress,
        photoUrl: currentUser.photo
    }
    return resProfile
}