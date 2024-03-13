
import { getCookie, getCookies, hasCookie } from "cookies-next"
import { NextRequest, NextResponse } from "next/server"

export const config = {
    matcher: ['/((?!api|_next|static|public|favicon.ico).*)']
}

export default async function middelware (req: NextRequest, res: NextResponse) {
    const isAuth = hasCookie('user', {req, res})
    const req_path = req.nextUrl.pathname
    
    console.log({"middelware ": {
        path: req_path,
        session: isAuth,
        session_ID: getCookie('user', {req, res})
    }})

    if (req_path == '/login') {
        return loginMiddelware(req, res)
    } else if (req_path == '/'){
         return homeMiddelware(req, res)
    } else if (!isAuth) {
        req.nextUrl.pathname = '/login'
        return NextResponse.redirect(req.nextUrl)
    }


    return NextResponse.next()
}

const homeMiddelware = (req: NextRequest, res: NextResponse) => {
    const isAuth = hasCookie('user', {req,res})

    if (!isAuth) {
        req.nextUrl.pathname = '/login'
        return NextResponse.redirect(req.nextUrl)
    }

    return NextResponse.next()
}

const loginMiddelware = (
    req: NextRequest, 
    res: NextResponse
) => {
    
    const isAuth = hasCookie('user', {req,res})

    if (isAuth) {
        req.nextUrl.pathname = '/'
        return NextResponse.redirect(req.nextUrl)
    }

    return NextResponse.next()

}
    