/**
 * Formats message details.
 * @param {Object} message - The message object containing recipients and content.
 * @returns {Object} - Formatted message details.
 */
export function formatMessageDetails(message) {
    // Parse recipients from JSON string
    const recipients = JSON.parse(message.recipients);

    // Format recipients
    const formattedRecipients = recipients.slice(0, 3).join(', ');
    const extraRecipients = recipients.length > 3 ? '...' : '';

    // Extract title and summary
    const title = message.message.split(' ')[0];
    const summary = message.message.split(' ').slice(0, 10).join(' ');

    return {
        formattedRecipients: `${formattedRecipients}${extraRecipients}`,
        title,
        summary
    };
}
