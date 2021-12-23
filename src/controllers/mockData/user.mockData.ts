import { UserModel } from "../../models/user.model";

export const mockUsers: UserModel[] = [
    {
        "userId": 1,
        "firstName": "Superadmin",
        "lastName": "User",
        "email": "superadmin@carvana.com",
        "password": "$2a$10$yn1JNK61riU28gjbfAwfSeETeQaazJ3WXF99dNLdK4xzbnJchagQ.",
        "rowLoadedDateTime": "2019-07-30T18:59:43.783Z",
        "rowUpdatedDateTime": "2021-12-17T15:34:20.912Z",
        "rowDeletedDateTime": "2021-12-17T15:34:20.912Z",
        "phoneNumber": "9122377794",
        "userTypeId": "1",
        "lastLoginDateTime": "2021-12-17T15:34:20.911Z"
    },
    {
        "userId": 2,
        "firstName": "Dealer",
        "lastName": "Admin",
        "email": "dealer@carvana.com",
        "password": "$2a$10$8tcs14IKaOyNN4StMyvdf.yJ.9uiS5kLPRtnZBk2CT8u6eZSsz7NK",
        "rowLoadedDateTime": "2019-07-30T19:15:05.311Z",
        "rowUpdatedDateTime": "2021-12-21T18:49:15.281Z",
        "rowDeletedDateTime": "2021-12-21T18:49:15.281Z",
        "phoneNumber": "6784811582",
        "userTypeId": "3",
        "lastLoginDateTime": "2021-12-21T18:49:15.280Z"
    }
];

export const mockUser: UserModel = {
    "userId": 1,
    "firstName": "Superadmin",
    "lastName": "User",
    "email": "superadmin@carvana.com",
    "password": "$2a$10$yn1JNK61riU28gjbfAwfSeETeQaazJ3WXF99dNLdK4xzbnJchagQ.",
    "rowLoadedDateTime": "2019-07-30T18:59:43.783Z",
    "rowUpdatedDateTime": "2021-12-17T15:34:20.912Z",
    "rowDeletedDateTime": "2021-12-17T15:34:20.912Z",
    "phoneNumber": "9122377794",
    "userTypeId": "1",
    "lastLoginDateTime": "2021-12-17T15:34:20.911Z"
};