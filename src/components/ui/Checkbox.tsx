import { forwardRef, HTMLAttributes } from "react";
import { FiCheck } from "react-icons/fi";

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      children,
      label,
      isChecked = false,
      isDisabled = false,
      isIndeterminate = false,
      className = "",
    },
    ref
  ) => {
    return (
      <label
        className={`
          inline-flex items-center
          ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
          ${className}
        `}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={isChecked}
          disabled={isDisabled}
          className="sr-only"
          aria-checked={isIndeterminate ? "mixed" : isChecked}
        />
        <div
          className={`
            relative flex h-5 w-5 items-center justify-center
            rounded border border-gray-300
            ${
              isChecked || isIndeterminate
                ? "bg-blue-600 border-blue-600"
                : "bg-white"
            }
            ${!isDisabled && "hover:border-blue-600"}
            transition-colors duration-200
          `}
        >
          {(isChecked || isIndeterminate) && (
            <FiCheck
              className={`
                h-4 w-4 text-white
                ${isIndeterminate ? "opacity-50" : "opacity-100"}
              `}
              aria-hidden="true"
            />
          )}
        </div>
        {label && (
          <span
            className={`
              ml-2 text-sm
              ${isDisabled ? "text-gray-400" : "text-gray-700"}
            `}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
