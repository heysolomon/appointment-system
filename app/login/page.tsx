import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { AiOutlineLogin } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { BackgroundImage } from '@/assets/images'
import Link from 'next/link'
export default function Login() {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center bg-tea_green-700 fixed'>
      <form action="" className='w-[35%] bg-white shadow-md rounded-xl p-5 absolute z-50'>
        {/* title */}
        <div>
          <AiOutlineLogin size={25} className="mb-1" />
          <h1 className="text-dark_green-500 font-semibold text-xl">Sign In</h1>
          <p className='text-xs text-dark_green-600'>Please enter your details</p>
        </div>

        <div className="mb-3 mt-5">
            <label htmlFor="email" className="text-sm font-semibold">Email address</label>
            <input type="email" id='email' name="email" className="w-full h-[35px] border border-dark_green-900 focus:ring-1 focus:ring-dark_green-700 focus:outline-none pl-1 text-sm rounded-md" />
          </div>

        <div className="">
          <label htmlFor="password" className="text-sm font-semibold">Password</label>
          <input type="password" id='password' name="password" className="w-full h-[35px] border border-dark_green-900 focus:ring-1 focus:ring-dark_green-700 focus:outline-none pl-1 text-sm rounded-md" />
        </div>

        <div className='flex justify-end mt-3 mb-5'>
            <Link href='/forgot%20password' className='underline text-sm'>Forgot Password?</Link>
        </div>

        <button type='submit' className='w-full py-2 text-sm bg-tea_green-100 text-white rounded-md'>Sign In</button>

        {/* google login */}
        <div className='w-full mt-3'>
          <button type="button" className='flex items-center justify-center h-[35px]  border border-dark_green-900 text-xs rounded-md w-full'>
            <FcGoogle size={20} className="mr-2" />
            <p>Sign in with Google</p>
          </button>
        </div>

        <div className='w-full flex justify-center text-sm text-dark_green-300 my-3'>
          <p>Dont have an account? <Link href='/' className='underline font-semibold'>Sign Up</Link></p>
        </div>
      </form>
    </div>
  )
}