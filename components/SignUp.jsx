'use client'
import {useState} from 'react'
import Image from 'next/image'
import {toast} from 'sonner'


const SignUp = () => {
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleSuccess = () =>{
        setUser({ fullName: '',
            email: '',
            password: '',
            confirmPassword: '' });
        toast.success('Registration successful!');
    }

    const handleError = (errorMessage) => {
        setError(errorMessage);
        setUser({ fullName: '',
            email: '',
            password: '',
            confirmPassword: '' });
        toast.error(errorMessage);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.fullName || !user.email || !user.password || !user.confirmPassword ) {
            handleError('All fields are required.');
            return;
        }
        if (user.password !== user.confirmPassword) {
            handleError('Password does not match');
            return
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                const result = await response.json();
                handleSuccess();
                // Reset form or redirect user
            } else {
                const errorData = await response.json();
                if (response.status === 409) {
                    handleError('Email already in use.');
                    setError('Email already in use.');
                } else if (response.status === 400) {
                    handleError('Missing required fields.');
                } else {
                    handleError('An error occurred during registration.');
                }
            }
        } catch (error) {
            console.error('Error during registration:', error);
            handleError('Failed to register. Please try again later.');
        }

    }

    return (
        <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
            <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
                <div className='absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
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
                            <label className='text-2xl font-semibold'>Register a new user on TinyText</label>
                            <div><label className="mt-1">Enter your details below to register. Make sure to enter the
                                correct details!</label></div>
                        </div>
                        <div className="divide-y divide-gray-200">
                        <div className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
                                <div className='relative'>
                                    <input autoComplete='off' id='fullName' name='fullName' type='text' className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600' placeholder='Full Name' value={user.fullName} onChange={e => setUser({ ...user, fullName: e.target.value })} />
                                    <label className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Full Name</label>
                                </div>
                                <div className='relative'>
                                    <input autoComplete='off' id='email' name='email' type='text' className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600' placeholder='Email address' value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                                    <label className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Email Address</label>
                                </div>
                                <div className='relative'>
                                    <input autoComplete='off' id='password' name='password' type='password' className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600' placeholder='Password' value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />
                                    <label className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Password</label>
                                </div>
                                <div className='relative'>
                                    <input autoComplete='off' id='confirmPassword' name='confirmPassword' type='password' className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600' placeholder='Confirm Password' value={user.confirmPassword} onChange={e => setUser({ ...user, confirmPassword: e.target.value })} />
                                    <label className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Confirm Password</label>
                                </div>
                                <div className='relative'>
                                    <button
                                        className='bg-gray-600 rounded-md px-2 py-1 text-white'
                                        onClick={handleSubmit}
                                    >
                                        Register
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SignUp;
