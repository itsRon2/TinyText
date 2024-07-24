import React from 'react'
import {Nav} from '@/components'
import {Toaster} from 'sonner'
import {getServerSession} from 'next-auth'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'


async function Layout({children}) {
    const session = await getServerSession(authOptions);
    return (
        <section>
            <Toaster position='top-center' richColors/>
            <Nav session={session}/>
            {children}
        </section>
    )
}

export default Layout