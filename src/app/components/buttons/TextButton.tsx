import React from 'react'

interface ITextButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    type: 'reset' | 'button' | 'submit',
    label: string
}

const TextButton = ({ label, type, ...props }: ITextButtonProps) => {
    return (
        <div>
            <button
                {...props}
                type={type}
                className="bg-transparent px-3 py-1.5 text-sm font-semibold leading-6 text-primary disabled:text-gray-500"
            >
                {label}
            </button>
        </div>
    )
}

export default TextButton