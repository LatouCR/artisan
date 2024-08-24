import { Ellipsis } from "lucide-react"



const MoreActions = () => {
    return (
        <div className="flex items-center justify-center text-neutral-300 hover:text-action cursor-pointer">
            <Ellipsis size={16} />
        </div>
    )
}

export default MoreActions