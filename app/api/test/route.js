/*
import { NextResponse } from 'next/server';
import {pool} from '@/config/db'

export async function POST(request) {
    try {
        const { recipients, message } = await request.json();

        if (!recipients || !message) {
            return NextResponse.json({ error: 'Recipients and message are required' }, { status: 400 });
        }

        if (!Array.isArray(recipients) || recipients.length === 0) {
            return NextResponse.json({ error: 'Recipients must be a non-empty array' }, { status: 400 });
        }

        console.log('Request data:', { recipients, message });

        const results = await Promise.all(recipients.map(async (recipient) => {
            try {
                console.log('Processing recipient:', recipient);

                // Placeholder for actual SMS sending function
                // const smsStatus = await sendSms(recipient, message);
                const smsStatus = 'pending';

                const result = await pool.query(
                    'INSERT INTO sms_messages (recipient, message, status) VALUES (?, ?, ?)',
                    [recipient, message, smsStatus]
                );

                console.log(`SMS saved for ${recipient}`);
                return { recipient, status: smsStatus  };
            } catch (err) {
                console.error(`Error saving SMS for ${recipient}:`, err);
                return { recipient, status: 'failed', error: err.message };
            }
        }));

        await pool.end(); // Close the database connection

        console.log('All messages processed');
        return NextResponse.json({ message: 'SMS messages processed', results });
    } catch (error) {
        console.error('Error processing SMS messages:', error);
        return NextResponse.json({ error: 'Failed to process SMS messages' }, { status: 500 });
    }
}
*/
