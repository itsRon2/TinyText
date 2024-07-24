import React from 'react';
import Image from 'next/image'
import {formatMessageDetails} from '@/config/messagesHandler'

function MessageDetails({message}) {
    const { formattedRecipients, extraRecipients, summary } = formatMessageDetails(message);

    return (
        <div className=' mx-auto p-1 flex-auto'>
            <div className='w-auto h-auto inline-flex p-2 gap-4 '>
                <div className='w-2/6 flex-col mx-auto justify-center p-1'>
                    <div className='items-center  w-20 h-20'>
                        <Image
                            className='mx-auto my-auto'
                            src={'/ico.svg'}
                            alt={'icon'}
                            width={65}
                            height={65}
                        />
                    </div>
                </div>
                <div className='w-3/6 flex-col ml-2 justify-center text-white  p-1'>
                    <div className="text-black text-xl font-normal "><h1>{summary}</h1></div>
                    <div className="text-teal-800 text-base font-normal "><h2>To: {formattedRecipients}{extraRecipients}</h2></div>
                </div>
                <div className='justify-center flex-col w-1/6 ml-2 p-1'>
                    <p>{new Date(message.timestamp).toLocaleString()}</p>
                </div>
            </div>
            <div className='text-black bg-white w-full h-auto rounded-lg mx-auto mt-4 p-5 justify-center flex'>
                <p>{message.message}</p>
            </div>
        </div>
    );
}

export default MessageDetails;