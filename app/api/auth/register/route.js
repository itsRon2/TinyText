import { NextResponse } from 'next/server';
import util from 'util';
import {pool} from '@/config/db'
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const query = util.promisify(pool.query).bind(pool);


/*export const POST = async (req) => {
    const user = await req.json();
    try {
        const results = await query(`INSERT INTO users (id, fullName, email, password) VALUES (UUID(), '${user.fullName}', '${user.email}', '${user.password}')`)
        if (results) return new NextResponse(user);
    } catch (error) {
        console.log(error)
        return new NextResponse(error);
    }
}*/


export const POST = async (req) => {
    const user = await req.json();
    const { fullName, email, password } = user;

    if (!fullName || !email || !password) {
        return new NextResponse('Missing required fields', { status: 400 });
    }

    try {
        // Check if the email already exists
        const existingUsers = await query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return new NextResponse('Email already in use', { status: 409 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const results = await query('INSERT INTO users (id, fullName, email, password) VALUES (?, ?, ?, ?)', [uuidv4(), fullName, email, hashedPassword]);

        if (results) {
            return new NextResponse(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return new NextResponse('An error occurred during registration', { status: 500 });
    }
}


