"use client"

export const api = (path: string):string => {
    return `${process.env.NEXT_PUBLIC_HTTP_PROTO}://${process.env.NEXT_PUBLIC_HTTP_API_HOST}${path}`
}