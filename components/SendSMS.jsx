'use client'

import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import {useSmsContext} from '@/components/SmsContext'
import {toast} from 'sonner'
import { Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Papa from 'papaparse';



function SendSMS({contacts}) {
    const router = useRouter()
    const {selectedContactsSms, updateSelectedContactsSms} = useSmsContext()
    const [messageContent, setMessageContent] = useState('')
    const [isSending, setIsSending] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);


    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');


    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                complete: (results) => {
                    const numbers = results.data.map(row => row[0].trim()); // Assuming numbers are in the first column
                    updateSelectedContactsSms(numbers);
                },
                header: false,
            });
        }
    };

    const handleSubmit = async () => {
        setStatus('Sending...');

        try {
            const response = await fetch('/api/send-sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipients: selectedContactsSms, message }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Messages send successfully')
                setStatus('Messages send successfully');
            } else {
                setStatus(`Failed to send messages: ${result.error}`);
            }
        } catch (error) {
            setStatus(`Failed to send messages: ${error.message}`);
        }
    };







    // Function that handles sending the SMS
    async function send1() {
        try {
            const phoneNumbers = ["+263713320027"]; // Example phone numbers
            const message = messageContent; // Example message
            const response = await fetch('api/send-sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phoneNumbers, message })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('data: ',data);
            } else {
                const errorData = await response.json();
                console.error('Failed to send SMS:', errorData.message);
            }
        } catch (error) {
            console.error('Failed to send SMS:', error);
        }
    }
    const handleClick = async (phoneNumbers) => {
        setIsSending(true);
        setError(null);
        const data = []

        setMessageContent('')
        updateSelectedContactsSms(data)

        try {
            const res = await fetch('/api/send-sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contacts, messageContent }),
            });
            /*if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }*/

            const data = await res.json();
            setResponse(data);
            phoneNumbers.map(
                (phoneNumber) => console.log(`phone num: ${phoneNumber} message: ${messageContent} `)
            )
            toast.success('Message sent successfully!')
        } catch (err) {
            console.error('Failed to send SMS:', err);
            setError(err.message);
        } finally {
            setIsSending(false);
        }
    };


    const sendSms = function(phoneNumbers) {
        const data = []
        phoneNumbers.map(
            (phoneNumber) => console.log(`phone num: ${phoneNumber} message: ${messageContent} `)
        )
        setMessageContent('')
        updateSelectedContactsSms(data)
        toast.success('Message sent successfully!')
    }



    return (
        <div>
            <div
                className='flex flex-col mt-20 p-10  text-black mb-8 border rounded-lg h-[25rem] w-1/2 justify-start items-center mx-auto max-w-7xl flex-grow'>

                <div className="sm:flex flex-col sm:flex-row sm:w-full h-auto py-5 border-b px-1 sm:px-1 ">
                    <span className="flex items-center px-2">To: </span>

                    {selectedContactsSms.length > 3 ?
                        <p className="flex items-center px-2 font-bold">
                            {selectedContactsSms.slice(0, 3).map((contacts, index) => {
                                return `${contacts}${index < 2 ? ', ' : ''}`
                            })}...
                        </p> :
                        <p className="flex items-center px-2 font-bold">
                            {selectedContactsSms.map((contacts, index) => {
                                return ` ${contacts}${index < 2 ? ', ' : ''}`
                            })}
                        </p>
                    }
                    {/*<p className='flex items-center px-2 font-bold'>{selectedContactsSms.length > 3 ?
                    selectedContactsSms.map((contacts)=>{return `${contacts}  `}) : selectedContactsSms.map((contacts)=>{return `${contacts}  `})} </p>*/}

                    {/*<input type='button' value='Select'
                           className='flex items-center py-1 px-4 bg-app-primary text-black rounded ml-2 sm:ml-auto  hover:bg-gray-200 '
                           onClick={() => router.push('/send-sms/select-donors')}/>*/}
                    <input
                        type="button"
                        value="Select"
                        className="flex items-center py-1 px-4 bg-app-primary text-black rounded ml-2 sm:ml-auto hover:bg-gray-200 "
                        onClick={() => document.getElementById('fileInput').click()}
                    />
                    <input
                        type="file"
                        id="fileInput"
                        style={{display: 'none'}}
                        accept=".csv"
                        onChange={handleFileSelect}
                    />
                </div>
                <div className="flex w-full mx-auto my-auto mt-5 relative mb-auto h-full">
                    <textarea
                        rows={5}
                        className="w-full p-4 border rounded focus:outline-none items-start whitespace-normal border-none resize-none flex-grow overflow-y-auto"
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Fab
                        color="primary"
                        aria-label="send"
                        style={{
                            position: 'absolute',
                            bottom: '0px',
                            right: '10px',
                        }}
                        onClick={() => handleSubmit()}
                    >
                        <SendIcon/>
                    </Fab>
                </div>
                {status && <p>{status}</p>}
            </div>
        </div>

    );
}

export default SendSMS;