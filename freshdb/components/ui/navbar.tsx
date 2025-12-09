import Link from "next/link";

export default function Navbar(){
    return <nav className="flex place-content-between p-5 bg-slate-800 text-white">
        <h1 className="text-2xl font-bold">Fern was here</h1>

        <div className="flex items-center gap-10">
            <Link href={"/"}>Main</Link>
            <Link href={"/"}>Register</Link>
            <Link href={"/"}>Log in</Link>
        </div>
    </nav>
}