"use client"
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import Typography from "@/components/ui/typography";
import { useState } from "react";

export default function Page(){
    const [name, setName] = useState('');
    const [rawPas, setRawPas] = useState('');

    return <div className="bg-gray-900 h-screen">
        <Navbar></Navbar>

        <span className="p-10"><Typography variant="h1" isCentered isBold>Register</Typography></span>

        <div className="flex justify-center">
            <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log(name, rawPas)
                }}>
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
                            setRawPas(e.target.value);
                        }}></Input>
                    </Field>

                    <Button className="bg-gray-200 text-black w-[5rem] hover:bg-gray-500" type="submit" >Submit</Button>
                </FieldGroup>
            </form>
        </div>
    </div>
}