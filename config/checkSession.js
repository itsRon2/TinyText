import {getServerSession} from 'next-auth'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'


const session = await getServerSession(authOptions);
export  const checkSession = async () => {
  return !!session
}