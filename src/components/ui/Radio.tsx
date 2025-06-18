import { forwardRef, InputHTMLAttributes } from "react";

interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  className?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ children, label, error, className = "", disabled, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <div className="relative">
            <input
              ref={ref}
              type="radio"
              className={`
                peer sr-only
                ${className}
              `}
              disabled={disabled}
              {...props}
            />
            <div
              className={`
                h-5 w-5 rounded-full border
                flex items-center justify-center
                transition-colors duration-200
                peer-focus:ring-2 peer-focus:ring-[#00ADB5] peer-focus:ring-offset-2
                peer-disabled:cursor-not-allowed
                ${
                  disabled
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-300 bg-white"
                }
                ${props.checked ? "border-[#00ADB5]" : "hover:border-[#00ADB5]"}
              `}
            >
              {props.checked && (
                <div
                  className={`
                    h-2.5 w-2.5 rounded-full bg-[#00ADB5]
                    transition-transform duration-200
                  `}
                />
              )}
            </div>
          </div>
        </div>
        {(label || children) && (
          <div className="ml-3">
            {label && (
              <label
                className={`
                  text-sm font-medium
                  ${disabled ? "text-gray-400" : "text-gray-700"}
                `}
              >
                {label}
              </label>
            )}
            {children}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  className?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ children, label, error, className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`space-y-2 ${className}`}
      role="radiogroup"
      aria-labelledby={label ? `${props.id}-label` : undefined}
      aria-invalid={error ? "true" : "false"}
      aria-describedby={error ? `${props.id}-error` : undefined}
      {...props}
    >
      {label && (
        <label
          id={`${props.id}-label`}
          className={`
            block text-sm font-medium
            ${error ? "text-red-500" : "text-gray-700"}
          `}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <p
          id={`${props.id}-error`}
          className="mt-1 text-sm text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
);

RadioGroup.displayName = "RadioGroup";
