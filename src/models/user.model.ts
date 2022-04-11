export interface UserModel {
    userId: number,
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string,
    rowLoadedDateTime: string,
    rowUpdatedDateTime: string,
    rowDeletedDateTime?: string,
    phoneNumber?: string,
    userTypeId: string,
    lastLoginDateTime?: string,
    deviceToken?: string,
}