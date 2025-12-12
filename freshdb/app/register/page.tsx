"use client"
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import { Spinner } from "@/components/ui/spinner";
import Typography from "@/components/ui/typography";
import WarningMessage from "@/components/ui/warningmessage";
import { useState } from "react";

export default function Page(){
    const [name, setName] = useState('');
    const [rawPas, setRawPas] = useState('');
    const [isloading, setIsLoading] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState('')
    const [wasSuccessful, setSuccessful] = useState(false);

    async function handleSubmit(){
        if(name.trim().length > 0 && rawPas.trim().length > 0){

            try{
            setIsLoading(true);
                const res = await fetch('api/register', {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify({
                        username: name,
                        password: rawPas,
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

    return <div className="bg-gray-900 h-screen">
        <Navbar></Navbar>

        <span className="p-10"><Typography variant="h1" isCentered isBold>Register</Typography></span>

        <div className="flex justify-center">
            <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                    setShowWarning(false);
                }}>

                <WarningMessage warning={warningMessage} successState={wasSuccessful} isVisible={showWarning}></WarningMessage>
                <FieldGroup className="w-[20rem] sm:w-[40rem] mt-10">
                    <Field>
                        <FieldLabel htmlFor="name" className="text-white">Name</FieldLabel>
                        <Input id="name" autoComplete="off" placeholder="Set Username" className="bg-white" onChange={(e) => {
                            setName(e.target.value)
                            setShowWarning(false);
                        }}></Input>
                    </Field>
                    
                    <Field>
                        <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
                        <Input id="password" type="password" autoComplete="off" placeholder="Set a secure password!" className="bg-white" onChange={(e)=> {
                            setRawPas(e.target.value);
                            setShowWarning(false);
                        }}></Input>
                    </Field>

                    <Button disabled={isloading} className="bg-gray-200 text-black w-[10rem] hover:bg-gray-500" type="submit" >{isloading && <Spinner></Spinner>} {isloading ? "Loading.." : "Submit"}</Button>
                </FieldGroup>
            </form>
        </div>
    </div>
}