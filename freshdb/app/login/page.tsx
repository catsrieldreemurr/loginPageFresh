"use client"
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import { Spinner } from "@/components/ui/spinner";
import Typography from "@/components/ui/typography";
import { use, useState } from "react";

export default function Page(){
    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");

    const [name, setName] = useState('');
    const [rawPassword, setRawPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [wasSuccessful, setSuccessful] = useState(false);

    async function HandleSubmit(){
        if(name.trim().length > 0 && rawPassword.trim().length > 0){

            try{
            setIsLoading(true);
                const res = await fetch('api/login', {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify({
                        username: name,
                        password: rawPassword,
                    })
                })
                const data = await res.json();
                
                if(!res.ok){
                    setWarningMessage(data.message)
                    setShowWarning(true);
                    setSuccessful(false)
                }
                else{
                    setSuccessful(data.success);
                    setShowWarning(true);
                    setWarningMessage(data.message);
                }

            } catch(err){
                console.error(err);
            }
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-gray-900 h-screen">
            <Navbar></Navbar>
            <span className="p-10"><Typography variant="h1" isCentered isBold>Log In</Typography></span>
            <div className="flex flex-col items-center">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    HandleSubmit()
                }}>

                {showWarning && <div className={`border p-5 ${wasSuccessful === false && "border-red-600 bg-red-200"} ${wasSuccessful === true && "border-green-600 bg-green-200"}`}>
                    <p className={`text-lg p-5 ${wasSuccessful === false && "text-red-600"} ${wasSuccessful === false && "text-red-600"}`} >{warningMessage}</p>    
                </div>}
                <FieldGroup className="w-[20rem] sm:w-[40rem] mt-10">
                    <Field>
                        <FieldLabel htmlFor="name" className="text-white">Name</FieldLabel>
                        <Input id="name" autoComplete="off" placeholder="Set Username" className="bg-white" onChange={(e) => {
                            setName(e.target.value)
                        }}></Input>
                    </Field>
                    
                    <Field>
                        <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
                        <Input id="password" type="password" autoComplete="off" placeholder="Set a secure password!" className="bg-white" onChange={(e)=> {
                            setRawPassword(e.target.value);
                        }}></Input>
                    </Field>

                    <Button disabled={isLoading} className="bg-gray-200 text-black w-[10rem] hover:bg-gray-500" type="submit" >{isLoading && <Spinner></Spinner>} {isLoading ? "Loading.." : "Submit"}</Button>
                </FieldGroup>
            </form>
            </div>
            
        </div>
    )
}