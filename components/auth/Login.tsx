'use client'

import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { NsukLogo } from '@/public/assets/icons/icons'
import { AuthImage } from '@/public/assets/images/images'

const LoginPage = () => {
  return (
    <div className='bg-dark_green-900'>
      <div className='w-screen max-w-[1378px] mx-auto h-screen grid grid-cols-2 bg-dark_green-900'>
        <div className='flex items-center justify-center h-full'>
          <AuthImage />
        </div>
        <div className='w-full h-full flex items-center justify-center pr-5'>
          <form action="" className='w-full bg-white shadow-md rounded-xl p-5'>
            {/* title */}
            <div className='flex items-center gap-5'>
              <NsukLogo />
              <div>
                <h1 className="text-dark_green-500 font-semibold text-lg">Welcome Back!</h1>
                <p className='text-xs text-dark_green-600'>Please provide your details to login</p>
              </div>
            </div>

            <div className='px-3'>
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
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
