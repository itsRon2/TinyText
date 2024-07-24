'use client'
import React, {useState} from 'react'

import {CustomButton, SignOutButton} from '@/components/index'


function Header(props) {

    return (
        <>
            <nav className="bg-app-primary text-white lg:h-36 w-full flex-row  ">
                <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 p-10 ">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center ">
                            <div className="flex-shrink-0 mr-4">
                                <label className="text-2xl font-semibold text-black">Tiny TExt</label>
                            </div>
                            <div className="flex items-center rounded-lg p-2 ">
                                <SignOutButton/>
                            </div>
                        </div>

                    </div>
                </div>

            </nav>
        </>
    )
}

export default Header