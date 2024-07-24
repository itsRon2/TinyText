import {pool} from '@/config/db'
import {NextResponse} from 'next/server'

export async function GET (){
    try{
        const results = await pool.query('SELECT * FROM users')
        return NextResponse.json(results)
    } catch (error) {
        return NextResponse.json({message: error.message})

    }
}

export async function POST (request){
    try{
        const {username, password_hash, full_name} = await request.json()
        const result = await pool.query('INSERT INTO users SET ?', {username, password_hash, full_name})
        return NextResponse.json({username, password_hash, full_name, id: result.insertId	})
    } catch (error) {
        return NextResponse.json({message: error.message},{status: 500})

    }
}