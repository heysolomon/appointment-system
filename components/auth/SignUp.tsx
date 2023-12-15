'use client'

import { Schema, z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { NsukLogo } from "@/public/assets/icons/icons"
import { AuthImage } from "@/public/assets/images/images"
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Spinner from "../spinner";


const SignUp = () => {
    const registerSchema: Schema = z.object({
        email: z.string().email('email is invalid'),
        name: z.string().min(3, 'must contain 3 or more characters'),
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
        confirmPassword: z
            .string()
            .refine((data) => data === form.getValues().password, {
                message: 'Passwords must match',
            })
    }).required();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
        },
    })

    type BuiltInProviderType = 'google' | 'facebook' | 'twitter';

    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)

    const { toast } = useToast()

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const registerStart = () => {
        setError(false);
        setSuccess(false);
        setLoading(true);
    };

    const registerSuccess = (msg: string) => {
        setSuccess(true);
        setLoading(false);
        setMessage(msg);
    };

    const registerFailed = (msg: string) => {
        setLoading(false);
        setError(true);
        setMessage(msg);
    };


    const registerUser = async (values: z.infer<typeof registerSchema>) => {
        registerStart()
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(values)
            })
            registerSuccess("User registered successfully")
            if (res.ok) {
                
                toast({
                    variant: "success",
                    title: "Successfull",
                    description: "User registered successfully",
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "error",
                    description: "User already exists",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }
        } catch (err) {
            console.log(err)
            registerFailed("Failed to register user")
            toast({
                variant: "destructive",
                title: "error",
                description: "Failed to register user",
            })
        }
    }

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        registerUser(values);
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

                    <div className="w-full bg-white shadow-md rounded-xl p-5">
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
                                            signIn(provider.id, { callbackUrl: process.env.NODE_ENV === "production" ? "https://appointment-system-ten.vercel.app/dashboard" : "http://localhost:3000/dashboard" });
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
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-3'>
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem className="mt-3">
                                                <Label htmlFor="email" className="text-sm font-semibold">Email address</Label>
                                                <FormControl>
                                                    <Input type="email" id='email' className="w-full h-[35px] pl-1 text-sm rounded-md" {...field} />
                                                </FormControl>
                                                <FormMessage className="text-red-500 text-xs" />
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="name" render={({ field }) => (
                                            <FormItem className="mt-3">
                                                <Label htmlFor="name" className="text-sm font-semibold">Fullname</Label>
                                                <FormControl>
                                                    <Input type="text" id='name' className="w-full h-[35px] pl-1 text-sm rounded-md" {...field} />
                                                </FormControl>
                                                <FormMessage className="text-red-500 text-xs" />
                                            </FormItem>
                                        )} />

                                    </div>

                                    <FormField control={form.control} name="password" render={({ field }) => (
                                        <FormItem className="mb-3">
                                            <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                                            <FormControl>
                                                <Input type="password" id='password' className="w-full h-[35px] pl-1 text-sm rounded-md" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-xs" />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                                        <FormItem className="mb-3">
                                            <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password</Label>
                                            <FormControl>
                                                <Input type="password" id='confirmPassword' className="w-full h-[35px] pl-1 text-sm rounded-md" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-xs" />
                                        </FormItem>
                                    )} />
                                    <button type='submit' className='w-full py-2 text-sm bg-tea_green-100 text-white rounded-md mt-5 flex items-center justify-center'>
                                        {loading ? <Spinner className="w-5 h-5" /> : "Sign Up"}
                                    </button>
                                </form>
                            </Form>
                            <div className='w-full flex justify-center text-sm text-dark_green-300 my-3'>
                                <p>Already have an account? <Link href='/login' className='underline font-semibold'>Sign in</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
