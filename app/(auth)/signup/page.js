import React from 'react'
import {SignUp} from '@/components'
import {checkSession} from '@/config/checkSession'
import {redirect} from 'next/navigation'

async function Page(props) {
    return (
        await checkSession() ?
            <><SignUp/></> : redirect('/signout_error')
    )
}

export default Page