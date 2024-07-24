import {pool} from '@/config/db'
import {NextResponse} from 'next/server'

export async function GET(){
    try {
        const results = await pool.query('SELECT * from sms_messages' )
        return NextResponse.json(results)

    } catch (error) {
        return NextResponse.json(
            {message: error.message},

        )
    }
}



