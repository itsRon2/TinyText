'use client'
import React, {useState} from 'react'
import {people} from '@/constants';
import {useSmsContext} from '@/components/SmsContext'
import {useRouter} from 'next/navigation'

function SelectDonors() {

    const [selectedContacts, setSelectedContacts] = useState([])
    const router = useRouter()


    const handleCheckboxChange = (phoneNumber) => {
        // Check if the contact is already selected
        if (selectedContacts.includes(phoneNumber)) {
            // If it is selected, remove it from the array
            setSelectedContacts(selectedContacts.filter((id) => id !== phoneNumber))
        } else {
            // If it is not selected, add it to the array
            setSelectedContacts([...selectedContacts, phoneNumber])
        }
    }



    const {selectedContactsSms, updateSelectedContactsSms} = useSmsContext()

    const handleClickSelect = (data) => {
        updateSelectedContactsSms(data)
        router.push('/send-sms')
        console.log(selectedContactsSms)

    }


    return (
        <>

            <div className='h-[35rem] flex flex-col'>
                <div className="flex flex-col items-center justify-center mt-10 mx-auto w-1/4">
                    <div className="flex space-x-4 w-auto">
                        <button className="hover:text-gray-500 text-black ">Select All</button>
                        <label className='text-black px-10 font-bold'>Contacts</label>
                        <button className="hover:text-gray-500 text-black ">Cancel</button>
                    </div>
                    <div className="mt-4  flex relative w-full">
                        <input
                            className="w-full flex p-2 border border-gray-300  focus:outline-none focus:ring focus:border-black rounded-lg "
                            type="text"
                            placeholder="Search..."
                        />
                    </div>
                </div>
                <div className='mt-10 mx-auto my-auto border border-gray-400 rounded-lg  items-start justify-center w-1/2 h-3/3 flex flex-grow overflow-y-auto'>
                    <div className='my-auto mx-auto p-2'>
                        <div className='flex items-center py-5 '>
                            <div className='flex flex-col overflow-y-auto '>
                                {people && people.map((person)=>(
                                    <div key={person.id} className='inline-flex items-center '>
                                        <div className=' p-4 accent-app-primary'>
                                            <input className='flex h-[1.0em] w-[1.0em]'
                                                   type='checkbox'
                                                   id={person.id}
                                                   value={person.phoneNumber}
                                                   checked={selectedContacts.includes(person.phoneNumber)}
                                                   onChange={() => handleCheckboxChange(person.phoneNumber)}
                                            />
                                        </div>
                                        <div className='flex p-4 space-x-10 mx-auto justify-start w-full'>
                                            <label className='px-5 w-1/2 ml-auto'>{person.name}</label>
                                            <label className='px-5 ml-auto w-1/2'>{person.phoneNumber}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center mx-auto mt-auto py-4 '>
                    <button className='bg-app-primary px-10 py-2 rounded-lg flex hover:bg-gray-200 hover:px-12 ' onClick={()=>{handleClickSelect(selectedContacts)}}>Select</button>
                </div>
                <div className='ml-auto px-10 mb-auto'>
                    <label className='font-bold'>{selectedContacts.length} <span>donor(s) selected</span></label>
                </div>
            </div>
        </>

    );
}

export default SelectDonors;