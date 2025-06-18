import { forwardRef, HTMLAttributes } from "react";

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      children,
      label,
      error,
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      className = "",
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            className={`
              block text-sm font-medium
              ${error ? "text-red-600" : "text-gray-700"}
              ${isDisabled ? "opacity-50" : ""}
              mb-1
            `}
          >
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
            className={`
              w-full rounded-md
              px-4 py-2
              text-gray-900
              placeholder-gray-400
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
              read-only:bg-gray-50 read-only:cursor-default
              ${error ? "border-red-300" : "hover:border-gray-400"}
              ${className}
            `}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${label}-error` : undefined}
          />
        </div>
        {error && (
          <p
            id={`${label}-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
