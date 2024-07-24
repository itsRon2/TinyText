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

        // Placeholder for actual SMS sending function
        // const smsStatus = await sendSms(recipient, message);
        const smsStatus = 'pending';

        // Save the message with all recipients as a JSON string
        const result = await pool.query(
            'INSERT INTO sms_messages (recipients, message, status) VALUES (?, ?, ?)',
            [JSON.stringify(recipients), message, smsStatus]
        );

        await pool.end(); // Close the database connection

        console.log('Message saved with recipients');
        return NextResponse.json({ message: 'SMS message processed', id: result.insertId });
    } catch (error) {
        console.error('Error processing SMS message:', error);
        return NextResponse.json({ error: 'Failed to process SMS message' }, { status: 500 });
    }
}


/*dotenv.config();

// Configure AWS SDK
const sns = new AWS.SNS({
    apiVersion: '2010-03-31' // Replace with your desired region
});

export async function POST(request) {
    try {
        const { phoneNumbers, message } = await request.json(); // Await the JSON parsing
        if (!phoneNumbers || !Array.isArray(phoneNumbers) || phoneNumbers.length === 0 || !message) {
            return NextResponse.json({ message: 'phoneNumbers (as an array) and message are required.' });
        }
        const paramsArray = phoneNumbers.map(phoneNumber => ({
            PhoneNumber: phoneNumber,
            Message: message,
            MessageAttributes: {
                'AWS.SNS.SMS.SenderID': {
                    'DataType': 'String',
                    'StringValue': 'App'
                }
            }
        }));
        const results = await Promise.all(paramsArray.map(params => sns.publish(params).promise()));
        const messageIds = results.map(result => result.MessageId);
        return NextResponse.json({ messageIds });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to send SMS', details: error.message });
    }
}*/