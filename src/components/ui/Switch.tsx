import { forwardRef, InputHTMLAttributes } from "react";

interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  className?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ children, label, error, className = "", disabled, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-6">
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              className={`
                peer sr-only
                ${className}
              `}
              disabled={disabled}
              {...props}
            />
            <div
              className={`
                h-6 w-11 rounded-full
                transition-colors duration-200
                peer-focus:ring-2 peer-focus:ring-[#00ADB5] peer-focus:ring-offset-2
                peer-disabled:cursor-not-allowed
                ${
                  disabled
                    ? "bg-gray-200"
                    : props.checked
                    ? "bg-[#00ADB5]"
                    : "bg-gray-200"
                }
              `}
            >
              <div
                className={`
                  h-5 w-5 rounded-full bg-white shadow-sm
                  transform transition-transform duration-200
                  ${props.checked ? "translate-x-5" : "translate-x-0.5"}
                  ${disabled ? "opacity-50" : ""}
                `}
              />
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

Switch.displayName = "Switch";
