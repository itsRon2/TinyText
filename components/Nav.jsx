'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

import {SignOutButton} from '@/components/index'


function Nav({session}) {
    const [isClick, setisClick] = useState(false)
    const [isProfilePanelVisible, setProfilePanelVisible] = useState(false);
    let user
    session ? user = session.user.fullName : user = 'none'


    const toggleProfilePanel = () => {
        setProfilePanelVisible(!isProfilePanelVisible);
        console.log(session)
    };

    const toggleNav = () => {
        setisClick(!isClick)
    }



    return (
        <>
            <nav className="bg-app-primary text-black lg:h-36 w-full flex-row">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-10">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 mr-4">
                                <Link href="/">
                                    <h1 className="text-2xl font-semibold">Tiny Text</h1>
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center space-x-4">
                                <Link href="/dashboard"
                                      className="hover:bg-gray-200 hover:text-black rounded-lg p-2 flex items-center">
                                    <FontAwesomeIcon icon={faHome} className="mr-2"/>
                                    Home
                                </Link>
                            </div>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button
                                className="inline-flex items-center justify-center p-2 rounded-md hover:text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={toggleNav}
                            >
                                {isClick ? (
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M4 6h16M4 12h16m-7 6h7"/>
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div className="relative flex-shrink-0 w-20 h-20 ml-auto">
                            <Image
                                src={'/profile.svg'}
                                alt={'profile'}
                                width={80}
                                height={80}
                                onClick={toggleProfilePanel}
                                className="cursor-pointer"
                            />
                            {isProfilePanelVisible && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                    <div className="px-4 py-2">
                                            <span className=" text-sm font-medium text-gray-900 flex items-center">
                                                <FontAwesomeIcon icon={faUser} className="mr-2 p-1"/>
                                                {user}
                                            </span>
                                        <SignOutButton/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {isClick && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link href="/" className="hover:bg-gray-200 hover:text-black rounded-lg p-2 block">
                                Home
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}

export default Nav