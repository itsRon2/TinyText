import Link from 'next/link';
import Image from 'next/image';

export default function SignOutErrorPage() {
    return (
        <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center items-center sm:py-12'>
            <div className='relative py-10 px-6 sm:max-w-lg sm:w-full sm:mx-auto'>
                <div className='absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
                <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
                    <div className='max-w-md mx-auto text-center'>
                        <Image
                            src='/message.svg'
                            alt='logo'
                            width={50}
                            height={25}
                            className='mx-auto'
                        />
                        <h1 className='text-3xl font-semibold text-gray-700 mt-6'>Oops! You are Signed Out</h1>
                        <p className='mt-4 text-gray-600'>
                            It looks like you are not logged in. Please sign in to access the app services.
                        </p>
                        <Link href='/login' className='mt-6 inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-700' >

                                <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4'></path>
                                </svg>
                                Sign In

                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
