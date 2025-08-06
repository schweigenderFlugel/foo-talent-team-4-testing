import { NextResponse } from "next/server"

export async function GET() {
    const response = NextResponse.json({ success: true })
    response.cookies.set('access_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0, // Borrar cookie
    })
    return response
}
