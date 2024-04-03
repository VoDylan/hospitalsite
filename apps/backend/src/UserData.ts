import ServiceRequest from "./ServiceRequest";
/**
 * Custom type to define the data elements that should appear in a ServiceRequest
 */
type UserFields = {
  userID: number;
  userName: string;
  emailAddress: string;
  password: string;
  admin: boolean;
  patient: boolean;
  medicalWorker: boolean;
  ServiceRequest: ServiceRequest[];
};

class User {
  private _userID: number;
  private _userName: string;
  private _emailAddress: string;
  private _password: string;
  private _admin: boolean;
  private _patient: boolean;
  private _medicalWorker: boolean;
  private _serviceRequest: ServiceRequest[];

  public constructor(UserInfo: UserFields) {
    this._userID = UserInfo.userID;
    this._userName = UserInfo.userName;
    this._emailAddress = UserInfo.emailAddress;
    this._password = UserInfo.password;
    this._admin = UserInfo.admin;
    this._patient = UserInfo.patient;
    this._medicalWorker = UserInfo.medicalWorker;
    this._serviceRequest = UserInfo.ServiceRequest;
  }

  //Getters
  public get userID(): number {
    return this._userID;
  }

  public get userName(): string {
    return this._userName;
  }

  public get emailAddress(): string {
    return this._emailAddress;
  }

  public get password(): string {
    return this._password;
  }

  public get admin(): boolean {
    return this._admin;
  }

  public get patient(): boolean {
    return this._patient;
  }

  public get medicalWorker(): boolean {
    return this._medicalWorker;
  }

  public get serviceRequest(): ServiceRequest[] {
    return this._serviceRequest;
  }
  //Setters
  public set userID(newUserID: number) {
    this._userID = newUserID;
  }

  public set userName(newUserName: string) {
    this._userName = newUserName;
  }

  public set emailAddress(newEmailAddress: string) {
    this._emailAddress = newEmailAddress;
  }

  public set password(newPassword: string) {
    this._password = newPassword;
  }

  public set admin(newAdmin: boolean) {
    this._admin = newAdmin;
  }

  public set patient(newPatient: boolean) {
    this._patient = newPatient;
  }

  public set medicalWorker(newMedicalWorker: boolean) {
    this._medicalWorker = newMedicalWorker;
  }

  public set serviceRequest(newServiceRequest: ServiceRequest[]) {
    this._serviceRequest = newServiceRequest;
  }
}
//Export the User class and UserFields type to allow for its use across the program
export default User;
export type { UserFields };
