export interface UserModel {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    rowLoadedDateTime: string,
    rowUpdatedDateTime: string,
    rowDeletedDateTime: string,
    phoneNumber?: string,
    userTypeId: string,
    lastLoginDateTime?: string,
}