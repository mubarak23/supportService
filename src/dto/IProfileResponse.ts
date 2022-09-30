import { ICloudFile } from "../interfaces/ICloudFile";

interface IProfile {
  userUuid: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  emailAddress: string,
  photoUrl: ICloudFile,
}

export default IProfile