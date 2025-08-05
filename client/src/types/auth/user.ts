import { Role } from "./role"


export interface User {
    email: string,
}

export interface ObjUser extends User {
    id: string
    role: Role
    password: string
    created_at: string
    updated_at: string
}