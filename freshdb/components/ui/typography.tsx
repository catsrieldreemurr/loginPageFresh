import { ReactNode } from "react";

interface SetProps{
    children?: ReactNode
    variant?: string
    isBold?: boolean
    isCentered?: boolean
}

export default function Typography({children, variant, isBold, isCentered}:SetProps){
    if(variant == "h1"){
        return <h1 className={`text-white text-2xl sm:text-4xl ${isBold && "font-bold"} ${isCentered && "text-center"} `}>{children}</h1>
    }
    else if(variant == "h2"){
        return <h2 className={`text-white text-2xl sm:text-xl ${isBold && "font-bold"} ${isCentered && "text-center"} `}>{children}</h2>
    }
}