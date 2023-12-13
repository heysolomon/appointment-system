'use client'

import { NsukLogo } from "@/public/assets/icons/icons"
import { AuthImage } from "@/public/assets/images/images"
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"

const SignUp = () => {
    type BuiltInProviderType = 'google' | 'facebook' | 'twitter';

    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)

    useEffect(() => {
        (async () => {
            const res = await getProviders()

            setProviders(res)
        })();
    }, [])
    return (
        <div className='bg-dark_green-900'>
            <div className='max-w-[1378px] mx-auto h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-dark_green-900 px-5 md:px-0'>
                <div className='hidden md:flex items-center justify-center h-full'>
                    <AuthImage className='w-full' />
                </div>
                <div className='w-full h-full flex items-center justify-center md:pr-5'>
                    <form action="" className='w-full bg-white shadow-md rounded-xl p-5'>
                        {/* title */}
                        <div className='flex items-center gap-5'>
                            <NsukLogo />
                            <div>
                                <h1 className="text-dark_green-500 font-semibold text-md md:text-lg">Welcome to the VC appointment scheduling system</h1>
                                <p className='text-xs text-dark_green-600'>Please provide your details to sign up</p>
                            </div>
                        </div>

                        <div className='px-3'>
                            {/* google login */}
                            <div className='w-full mt-10'>
                                {providers && Object.values(providers).map(provider => (
                                    <button
                                        type="button"
                                        key={provider.id}
                                        onClick={() => {
                                            signIn(provider.id, { callbackUrl: "http://localhost:3000/dashboard" });
                                        }}
                                        className='flex items-center justify-center h-[35px]  border border-dark_green-900 text-xs rounded-md w-full'>
                                        <FcGoogle size={20} className="mr-2" />
                                        <p>Sign up with Google</p>
                                    </button>
                                ))}
                            </div>

                            {/* or divition */}
                            <div className='w-full flex items-center mt-5 mb-10'>
                                <div className='h-[1px] w-full bg-dark_green-900' />
                                <p className='mx-3 text-xs text-dark_green-300'>OR</p>
                                <div className='h-[1px] w-full bg-dark_green-900' />
                            </div>
                            <div className='grid grid-cols-2 gap-x-3 mb-3'>
                                <div className="">
                                    <label htmlFor="email" className="text-sm font-semibold">Email address</label>
                                    <input type="email" id='email' name="email" className="w-full h-[35px] border border-dark_green-900 focus:ring-1 focus:ring-dark_green-700 focus:outline-none pl-1 text-sm rounded-md" />
                                </div>
                                <div className="">
                                    <label htmlFor="name" className="text-sm font-semibold">Fullname</label>
                                    <input type="text" id='name' name="name" className="w-full h-[35px] border border-dark_green-900 focus:ring-1 focus:ring-dark_green-700 focus:outline-none pl-1 text-sm rounded-md" />
                                </div>
                            </div>
                            {/* <div className="mb-3">
          <label htmlFor="user" className="text-sm font-semibold">Select user</label>
          <Select>
            <SelectTrigger className="w-full ring-dark_green-700" id='user'>
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value="staff" className='hover:bg-dark_green-900 hover:cursor-pointer'>Staff</SelectItem>
              <SelectItem value="student" className='hover:bg-dark_green-900 hover:cursor-pointer'>Student</SelectItem>
              <SelectItem value="visitor" className='hover:bg-dark_green-900 hover:cursor-pointer'>Visitor</SelectItem>
            </SelectContent>
          </Select>
        </div> */}

                            <div className="mb-3">
                                <label htmlFor="password" className="text-sm font-semibold">Password</label>
                                <input type="password" id='password' name="password" className="w-full h-[35px] border border-dark_green-900 focus:ring-1 focus:ring-dark_green-700 focus:outline-none pl-1 text-sm rounded-md" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password</label>
                                <input type="password" id='confirmPassword' name="confirmPassword" className="w-full h-[35px] border border-dark_green-900 focus:ring-1 focus:ring-dark_green-700 focus:outline-none pl-1 text-sm rounded-md" />
                            </div>

                            <button type='submit' className='w-full py-2 text-sm bg-tea_green-100 text-white rounded-md mt-5'>Sign Up</button>

                            <div className='w-full flex justify-center text-sm text-dark_green-300 my-3'>
                                <p>Already have an account? <Link href='/login' className='underline font-semibold'>Sign in</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
