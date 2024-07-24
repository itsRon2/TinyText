import React from 'react'
import {Header} from '@/components'
import {Toaster} from 'sonner'


function LoginLayout({children}) {
    return (
        <section>
            {/*<Header/>*/}
            <Toaster position='top-center' richColors/>
            {children}
        </section>
    )
}

export default LoginLayout