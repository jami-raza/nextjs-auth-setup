import React from 'react'

interface ISeparatorProps {
    children: React.ReactElement
}

const Separator = ({children}:ISeparatorProps) => {
    return (

        <div className="flex items-center mt-5 gap-2">
            <hr className="flex-grow border-1" />
            {children}
            <hr className="flex-grow" />
        </div>
    )
}

export default Separator