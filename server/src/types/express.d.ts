import { Request, Response } from "express"

export interface AppRequest extends Request {
    data?: string
}

export interface AppResponse extends Response {
    json: (obj: {
        status: number
        error?: any
        message: string
        data?: any
    }) => any
}