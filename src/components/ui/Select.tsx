import { forwardRef, SelectHTMLAttributes } from "react";
import { FiChevronDown } from "react-icons/fi";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { children, label, error, leftIcon, className = "", disabled, ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            className={`
              block text-sm font-medium
              ${error ? "text-red-600" : "text-gray-700"}
              ${disabled ? "opacity-50" : ""}
            `}
          >
            {label}
          </label>
        )}
        <div className="relative mt-1">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500" aria-hidden="true">
                {leftIcon}
              </span>
            </div>
          )}
          <select
            ref={ref}
            className={`
              block w-full rounded-md
              ${leftIcon ? "pl-10" : "pl-4"}
              pr-10 py-2 text-sm
              transition-colors duration-200
              ${
                error
                  ? "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 text-gray-900 focus:border-[#00ADB5] focus:ring-[#00ADB5]"
              }
              ${disabled ? "bg-gray-50 cursor-not-allowed" : "bg-white"}
              ${className}
            `}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          >
            {children}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FiChevronDown
              className={`
                h-5 w-5 text-gray-500
                ${disabled ? "opacity-50" : ""}
              `}
              aria-hidden="true"
            />
          </div>
        </div>
        {error && (
          <p
            className="mt-1 text-sm text-red-600"
            id={props.id ? `${props.id}-error` : undefined}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
