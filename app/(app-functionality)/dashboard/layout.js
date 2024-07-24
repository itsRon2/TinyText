import {QuickAccess} from '@/components'
import {redirect} from 'next/navigation'
import {checkSession} from '@/config/checkSession'

export default async function DashboardLayout({children}) {

    return (
        await checkSession() ?
        <section>
            <QuickAccess/>
            {children}
        </section> : redirect('signout_error')
    )
}