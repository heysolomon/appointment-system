import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface IProtected {
    children: React.ReactNode;
}
const Protected = ({ children }: IProtected) => {
    const { data: session } = useSession();
    if (session?.user) {
        return children
    } else {
        redirect('/login')
    }
}

export default Protected
