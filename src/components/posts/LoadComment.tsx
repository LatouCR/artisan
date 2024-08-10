import React from 'react'

const LoadComment = () => {
    return (
        <div className="px-4 pb-2 flex justify-between text-black/40 hover:text-action/20">
            <div className="flex gap-4 hover:cursor-pointer">
                <p className="font-medium text-sm">view replies</p>
            </div>
        </div>
    )
}

export default LoadComment