'use client'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {toast} from 'sonner'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import React from 'react'


const SignOutButton = ({btnStyles}) => {
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false });  // Prevent default redirect
            await router.push('/');  // Redirect to the homepage or login page after sign-out
            toast.success('Successfully signed out!')

        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <button
            onClick={handleSignOut}
            className= {`mt-2 w-full text-left text-sm font-medium hover:text-red-800 flex items-center`}
        >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 p-1"/>
            Log Out
        </button>
    );
};

export default SignOutButton;
