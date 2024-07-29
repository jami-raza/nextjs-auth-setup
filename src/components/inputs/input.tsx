import React, { InputHTMLAttributes, forwardRef } from 'react'

interface InputType extends React.ComponentPropsWithoutRef<"input"> {
  label: string
  type: string
  required: boolean
  name: string
  id: string
  disabled?: boolean
}
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
}


const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { name, error, label, required, className,onChange, ...rest },
  ref
) {
  return (
    <fieldset className={`flex flex-col ${className ? className : ''}`}>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          ref={ref}
          {...rest}
          id={name}
          name={name}
          autoComplete="email"
          required={required}
          onChange={onChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

        />
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
    </fieldset>
  )
})

export default Input