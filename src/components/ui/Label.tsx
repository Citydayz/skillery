import { forwardRef, LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  className?: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, required = false, className = "" }, ref) => {
    return (
      <label
        ref={ref}
        className={`
          block text-sm font-medium text-gray-700
          ${className}
        `}
      >
        {children}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";
