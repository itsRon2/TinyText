import {pool} from '@/config/db'
import {NextResponse} from 'next/server'

export async function GET(request, { params }) {
    try {
        const result = await pool.query("SELECT * FROM users WHERE id = ?", [
            params.id,
        ]);
        return NextResponse.json(result[0]);
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}