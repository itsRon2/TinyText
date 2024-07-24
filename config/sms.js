import axios from 'axios';

// Placeholder function for sending SMS
export default async function sendSms(recipient, message) {
    try {
        // Replace with your SMS API provider's code
        const response = await axios.post('/api/sms', {
            recipient,
            message,
        });

        if (response.status === 200) {
            return 'sent';
        } else {
            throw new Error('Failed to send SMS');
        }
    } catch (error) {
        console.error(error);
        return 'failed';
    }
}
