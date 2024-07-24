import React from 'react'
import {SendSMS} from '@/components'
import {checkSession} from '@/config/checkSession'
import {redirect} from 'next/navigation'


async function Page(props) {
    return (
        await checkSession() ?
            <><SendSMS/></> : redirect('/signout_error')
    )
}

export default Page