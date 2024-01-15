'use client'

import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { NsukLogo } from '@/public/assets/icons/icons'
import { AuthImage } from '@/public/assets/images/images'
import { ClientSafeProvider, LiteralUnion, getProviders, signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Schema, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/spinner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastAction } from '@/components/ui/toast'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { useDispatch, useSelector } from 'react-redux'
import { ReduxState } from '@/lib/redux'
import { loginFailure, loginStart, loginSuccess } from '@/lib/redux/features/admin/adminSlice'

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { toast } = useToast()

  type BuiltInProviderType = 'google' | "facebook" | "twitter";

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
  const { loginLoading } = useSelector((state: ReduxState) => state.admin);


  const loginSchema: Schema = z.object({
    email: z.string().email('email is invalid'),
    password: z
      .string({
        required_error: 'password is required',
      })
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        `Must Contain One Uppercase, One Lowercase,
            One Number and one special case Character`
      )
      .min(8, 'password must be at least 8 characters long'),
  }).required();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const loginAdmin = async (values: z.infer<typeof loginSchema>) => {
    dispatch(loginStart())
    try {
      const res = await fetch("/api/admin/auth", {
        method: 'POST',
        body: JSON.stringify(values)
      });

      const data = await res.json();

      console.log(data);
      
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "error",
          description: data.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })

        dispatch(loginFailure(data.message))
      }

      if (res.ok) {
        toast({
          variant: "success",
          title: "Login success",
          description: data.message,
        })

        dispatch(loginSuccess(data.user))

        router.push('/admin/dashboard')
      }

    } catch (err) {
      dispatch(loginFailure(""))
      console.error(err);
      toast({
        variant: "destructive",
        title: "error",
        description: "error during sign-in",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  };


  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    loginAdmin(values);
  }

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
          <div className='w-full bg-white shadow-md rounded-xl p-5'>
            {/* title */}
            <div className='flex items-center gap-5'>
              <NsukLogo />
              <div>
                <h1 className="text-dark_green-500 font-semibold text-lg">Welcome Back!</h1>
                <p className='text-xs text-dark_green-600'>Please provide your details to login</p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='px-3'>

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem className="mb-3 mt-5">
                    <Label htmlFor="email" className="text-sm font-semibold">Email address</Label>
                    <FormControl>
                      <Input type="email" id='email' className="w-full h-[35px] pl-1 text-sm rounded-md" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )} />


                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem className="">
                    <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                    <FormControl>
                      <Input type="password" id='password' className="w-full h-[35px] pl-1 text-sm rounded-md" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )} />

                <div className='flex justify-end mt-3 mb-5'>
                  <Link href='/forgot%20password' className='underline text-sm'>Forgot Password?</Link>
                </div>

                <button type='submit' className='w-full py-2 text-sm bg-tea_green-100 text-white rounded-md mt-5 flex items-center justify-center'>
                  {loginLoading ? <Spinner className="w-5 h-5" /> : "Sign In"}
                </button>

                {/* google login */}
                <div className='w-full mt-3'>
                  {providers && Object.values(providers).map(provider =>
                    provider.id === 'google' ? <button
                      type="button"
                      key={provider.id}
                      onClick={() => {
                        signIn(provider.id, { callbackUrl: "http://localhost:3000/admin/dashboard" });
                      }}
                      className='flex items-center justify-center h-[35px]  border border-dark_green-900 text-xs rounded-md w-full'>
                      <FcGoogle size={20} className="mr-2" />
                      <p>Sign in with Google</p>
                    </button> : null
                  )}
                </div>

                <div className='w-full flex justify-center text-sm text-dark_green-300 my-3'>
                  <p>Dont have an account? <Link href='/admin/auth' className='underline font-semibold'>Sign Up</Link></p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default LoginPage
