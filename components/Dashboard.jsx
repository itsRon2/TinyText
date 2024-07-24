'use client'
import React, {useEffect, useState} from 'react'
import MessageDetailsCard from "./MessageDetailsCard";
import MessageDetails from "./MessageDetails";
import SideBar from "./SideBar";

function Dashboard() {

    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null)

    const [loading, setLoading] = useState(true); // New state to handle loading
    const [error, setError] = useState(null); // New state to handle errors

    const [groupedMessages, setGroupedMessages] = useState([]);

    // Fetch messages from the API when the component mounts
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/sms'); // Adjust the path to match your API

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setMessages(data); // Assuming data is an array of messages


            } catch (error) {
                setError(error.message); // Set error message if there is an error
                setLoading(false); // Set loading to false in case of error
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };
        // Using IIFE to handle async function inside useEffect
        (async () => {
            await fetchMessages();
        })();
    }, []);
    console.log('messages: ',messages);

    return (
        <div className='flex mt-6  h-[25rem] gap-10 text-black px-10 '>
            <div className='w-1/6  p-4 '>
                <SideBar/>
            </div>
            <div className='w-2/6 bg-app-primary p-4 rounded-lg overflow-y-auto'>

                {
                    Array.isArray(messages) ? messages.map(
                        (message) => (
                            <div key={message.id} onClick={() => setSelectedMessage(message)}>
                                <MessageDetailsCard message={message} />
                            </div>
                        )
                    ) : <div className='items-center text-center justify-center flex h-auto'>
                        <h1>No messages send!</h1>
                    </div>
                }
            </div>
            <div className='w-3/6 bg-app-primary p-4 rounded-lg'>
                {selectedMessage ? (<MessageDetails message={selectedMessage} />) : (
                    <div className='items-center text-center justify-center flex h-auto'>
                        <h1>No message to preview </h1>

                    </div>
                )}

            </div>
        </div>
    );
}

export default Dashboard;