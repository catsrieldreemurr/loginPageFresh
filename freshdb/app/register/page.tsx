import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import Typography from "@/components/ui/typography";

export default function Page(){
    return <div className="bg-gray-900 h-screen">
        <Navbar></Navbar>

        <span className="p-10"><Typography variant="h1" isCentered isBold>Register</Typography></span>

        <div className="flex justify-center">
            <FieldGroup className="w-[20rem] sm:w-[40rem] mt-10">
                <Field>
                    <FieldLabel htmlFor="name" className="text-white">Name</FieldLabel>
                    <Input id="name" autoComplete="off" placeholder="Set Username" className="bg-white"></Input>
                </Field>
                
                <Field>
                    <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
                    <Input id="password" type="password" autoComplete="off" placeholder="Set a secure password!" className="bg-white"></Input>
                </Field>

                <Button className="bg-gray-200 text-black w-[5rem]">Submit</Button>
            </FieldGroup>
        </div>
    </div>
}