export interface IUser {
    _id: string;
    fullName: string;
    email: string;
}

export interface LoginUserParams {
    email: string;
    password: string;
}