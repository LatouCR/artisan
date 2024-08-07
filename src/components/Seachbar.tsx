"use client"
import { Search } from "lucide-react"


const Seachbar = () => {
    return (
        <div className="relative h-10 ml-4"> {/* Placeholder */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
        </div>
    )
}

export default Seachbar