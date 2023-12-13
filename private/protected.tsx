import Spinner from "@/components/spinner";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface IProtected {
    children: React.ReactNode;
}
const Protected = ({ children }: IProtected) => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login')
        }
    });
    if (status === "loading") {
        return (
            <div className='w-screen h-screen flex items-center justify-center bg-dark_green-900'>
                <Spinner className='w-10 h-10' />
            </div>
        )
    }
    return children;
}

export default Protected
