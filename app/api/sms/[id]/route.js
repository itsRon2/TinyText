import {pool} from '@/config/db'
import {NextResponse} from 'next/server'


export async function GET(request, { params }) {
    try {
        const result = await pool.query("SELECT * FROM message WHERE id = ?", [
            params.id,
        ]);
        return NextResponse.json(result[0]);
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}

export async function DELETE (request, {params}){
    try{
        await pool.query('DELETE FROM message WHERE id = ?',[params.id])
        return NextResponse.json({}, {status: 204})
    } catch (error) {
        return NextResponse.json({message: error.message})
    }

}

export async function PUT(request, { params }) {
    const data = await request.json();

    try {
        if (!params || !params.id) {
            return NextResponse.json({ message: 'Invalid request. Missing ID.' });
        }
        await pool.query("UPDATE message SET ? WHERE id = ?", [data, params.id]);
        return NextResponse.json({
            ...data,
            id: params.id,
            message: `Message with id ${params.id} updated successfully`,
        });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}