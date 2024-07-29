import React from 'react'

interface IPrimaryButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    type: 'reset' | 'button' | 'submit',
    label: string
}

const SecondaryButton = ({ label, type, ...props }: IPrimaryButtonProps) => {
    return (
        <div>
            <button
                {...props}
                type={type}
                className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-primary shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:text-grey-600 border-2 border-primary"
            >
                {label}
            </button>
        </div>
    )
}

export default SecondaryButton