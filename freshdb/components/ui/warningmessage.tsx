interface setProps{
    successState:boolean
    isVisible:boolean
    warning: string
}   

export default function WarningMessage({successState, isVisible, warning}:setProps){
    return (
        isVisible === true && <div className={`border p-5 ${successState === false && "border-red-600 bg-red-200"} ${successState === true && "border-green-600 bg-green-200"}`}>
            <p className={`text-lg p-5 ${successState === false && "text-red-600"} ${successState === true && "text-green-600"}`}>{warning}</p>    
        </div>
    )
}