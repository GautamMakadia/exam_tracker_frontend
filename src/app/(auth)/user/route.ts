import { deleteCookie, hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {

    if (hasCookie('user',{cookies})) {
        deleteCookie('user', {cookies})
        return NextResponse.json({ args: "logout successful" }, {status: 200})
    }

    return NextResponse.json({ args: "already logged" }, {status: 410})
}