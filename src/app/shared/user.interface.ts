

export interface User {
    uid: string;
    name: string;
    email: string;
    photo: string;
    emailVerified: boolean;
    password: string;
}

export interface Admin {
    uid: string;
    email: string;
    //photo: string;
    displayName: string;
    emailVerified: boolean;
    //password: string;
}