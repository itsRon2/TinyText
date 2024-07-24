'use client'
import React, {useRef, useState} from 'react'
import Image from 'next/image'
import {CustomButton} from '@/components/index'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'

function Login() {
    const [user, setUser] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const router = useRouter()
    const emailInputRef = useRef(null);
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleError = (errorMessage) => {
        setError(errorMessage);
        setUser({ email: '', password: '' });
        if (emailInputRef.current) {
            emailInputRef.current.focus();
        }
        if (errorMessage === 'Error on database access') {
            toast.error('Error on database access');
        }
    };

    const handleClick = async () => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: user.email,
                password: user.password
            });

            if (result.ok) {
                toast.success('Welcome! Successfully logged in.');
                user.email === ADMIN_EMAIL ? router.push('/signup'): router.push('/dashboard');
            } else {
                handleError(result.error || 'Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
            handleError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
            <div className='relative py-3 sm:max-w-xl sm:mx-auto'>

                <div
                    className='absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'>
                </div>
                <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
                    <div className='max-w-md mx-auto'>
                        <div className='items-center justify-center pb-2'>
                            <Image
                                src={'/message.svg'}
                                alt={'logo'}
                                width={50}
                                height={25}
                                className='mx-auto'
                            />
                        </div>
                        <div className='w-full'>
                            <label className='text-2xl font-semibold'>Login to TinyTExt</label>
                            <div>
                                <label className="mt-1">Enter your details below to login. Make sure to enter the correct
                                    details!</label>
                            </div>

                        </div>
                        <div className="divide-y divide-gray-200">
                        <div className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
                                <div className='relative'>
                                    <input autoComplete='off' id='email' name='email' type='text' className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600' placeholder='Email address' value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                                    <label className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Email Address</label>
                                </div>
                                <div className='relative'>
                                    <input autoComplete='off' id='password' name='password' type='password' className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600' placeholder='Password' value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />
                                    <label  className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Password</label>
                                </div>
                                <div className='relative'>
                                    <CustomButton
                                        title={'Login'}
                                        containerStyles={'bg-gray-600 rounded-md px-2 py-1'}
                                        textStyles={' text-white '}
                                        handleClick={() => handleClick()}
                                    />
                                </div>
                                {error && error !== 'Error on database access' && (<label style={{ color: 'red' }}>{error}</label>)}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login