'use client'

import React from 'react';
import { useRouter } from 'next/navigation'

function QuickAccess() {
    const router = useRouter()

    return (
        <div className='mt-10 p-4 bg-app-primary rounded-lg text-black px-10 flex-auto justify-center mx-10 '>
            <div className='flex-auto justify-start items-start space-x-2'>
                <button className='p-2 hover:bg-gray-200 hover:text-black rounded' onClick={() => router.push('/send-sms')}>New</button>
                <button className='p-2 hover:bg-gray-200 hover:text-black rounded'>Failed</button>
                <button className='p-2 hover:bg-gray-200 hover:text-black rounded'>Archive</button>
            </div>
        </div>
    );
}

export default QuickAccess;