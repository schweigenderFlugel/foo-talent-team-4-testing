import fetcher from "@/utils/fetcher"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const token = req.cookies.get('access_token')?.value

    if (!token) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    try {
        const user = await fetcher({
            url: `${process.env.SERVER_URL}/users/me`,
            headers: { "Authorization": "Bearer " + token }
        })
        return NextResponse.json(user)
    } catch (err) {
        return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }
}
