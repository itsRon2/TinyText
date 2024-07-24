'use client'
import React, { useState} from 'react'
import Image from 'next/image'
import {formatMessageDetails} from '@/config/messagesHandler'


function MessageDetailsCard({message}) {


    const { formattedRecipients, extraRecipients, title, summary } = formatMessageDetails(message);


    return (
        <>
            {/*<div className='w-auto h-auto inline-flex p-2 gap-4 rounded-lg hover:border hover:bg-gray-200 ' key={message.id} >
                <div className='w-2/6 flex-col mx-auto justify-center p-1'>
                    <div className=' w-20 h-20'>
                        <Image
                            src={'/announcement.svg'}
                            alt={'sms'}
                            width={80}
                            height={80}
                        />
                    </div>
                </div>
                <div className='w-3/6 flex-col ml-2 justify-center text-black  p-1'>
                    <div className=" text-xl font-normal "><h1>{message.recep}</h1></div>
                    <div className="text-teal-800 text-base font-normal "><h2>{message.title}</h2></div>
                    <div className=" text-opacity-70 text-base font-normal "><p>{message.summary}</p></div>
                </div>
                <div className='justify-center flex-col w-1/6 ml-2 p-1'>
                    <p>Wed 15:45</p>
                </div>
            </div>*/}
            <div className='w-auto h-auto inline-flex p-2 gap-4 rounded-lg hover:border hover:bg-gray-200'
                 key={message.id}>
                <div className='w-2/6 flex-col mx-auto justify-center p-1'>
                    <div className='w-20 h-20'>
                        <Image
                            src={'/announcement.svg'}
                            alt={'sms'}
                            width={80}
                            height={80}
                        />
                    </div>
                </div>
                <div className='w-3/6 flex-col ml-2 justify-center text-black p-1'>
                    <div className="text-xl font-normal">
                        <h1>{formattedRecipients}{extraRecipients}</h1>
                    </div>
                    <div className="text-teal-800 text-base font-normal">
                        <h2>{title}</h2>
                    </div>
                    <div className="text-opacity-70 text-base font-normal">
                        <p>{summary}</p>
                    </div>
                </div>
                <div className='justify-center flex-col w-1/6 ml-2 p-1'>
                    <p>{new Date(message.timestamp).toLocaleString()}</p>
                </div>
            </div>
        </>
    );
}

export default MessageDetailsCard;