import Navbar from "@/components/ui/navbar";
import { cookies } from "next/headers"
import jwt from "jsonwebtoken";
import Typography from "@/components/ui/typography";

export default async function Exclusive(){
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    let username = null;

    if(token){
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        username = decoded.username;
    }
     return (<div className="bg-gray-900 h-screen">
        <Navbar></Navbar>

        <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
            <Typography variant="h1">Welcome, {username}</Typography>
            <Typography variant="h2">You have now unlocked the secrets of the universe.</Typography>
        </div>
    </div>)
}