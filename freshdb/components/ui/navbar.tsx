import Link from "next/link";

interface setProps{
    token?: string
}

export default function Navbar({token}:setProps){
    return <nav className="flex place-content-between p-5 bg-slate-800 text-white">
        <h1 className="text-2xl font-bold">Fern was here</h1>

        <div className="flex items-center gap-10">
            <Link href={"/"}>Main</Link>
            {!token && <Link href={"/register"}>Register</Link>}
            {!token && <Link href={"/login"}>Log in</Link>}
            {token && <Link href={"/exclusive"}>Exclusive</Link>}
        </div>
    </nav>
}