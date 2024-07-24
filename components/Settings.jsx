import React from 'react';

function Settings(props) {
    return (
        <div className='flex-col  items-start justify-start mt-10 border rounded p-5 w-3/4 mx-auto h-[30rem]'>
            <div className='flex flex-col items-start justify-start p-10 border mx-auto my-auto w-full h-auto bg-app-primary'>
                <div className='flex gap-2 mx-auto'>
                    <div className='inline-flex gap-1 items-center p-2'>
                        <input type='radio'/>
                        <p>All donors</p>
                    </div>
                    <div className='inline-flex gap-1 items-center p-2'>
                        <input type='radio'/>
                        <p>Today donors</p>
                    </div>
                    <div className='inline-flex gap-1 items-center p-2'>
                        <input type='radio'/>
                        <p>Yesterday donors</p>
                    </div>

                </div>
                <div className='flex mx-auto p-2'>
                    <h1>Donation dates</h1>
                </div>
                <div className='inline-flex sm:flex-col sm:mx-auto'>
                    <div className='flex-col px-5 items-center sm:flex-row sm:space-x-[12rem] sm:px-0'>
                        <label className='flex sm:inline-flex'>From</label>
                        <label className='flex sm:inline-flex'>To</label>
                    </div>
                    <div className='flex-col space-y-1 items-center sm:space-x-[2rem]'>
                        <input type='date' name='from' className='border rounded ' placeholder='from...'/>
                        <input type='date' name='to' className='border rounded ' placeholder='to...'/>
                    </div>
                </div>

            </div>

            <div className='mx-auto flex p-10'>
                <input type='button' name='Apply changes' value='Apply changes' className='bg-app-primary border rounded p-2 ml-auto hover:bg-gray-200'/>
            </div>

        </div>
    );
}

export default Settings;