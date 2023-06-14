export enum UserRole {
    MASTER="MASTER", USER="USER", ADMIN="ADMIN"
}
export type UserModel = {
    userId: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    role: UserRole
}