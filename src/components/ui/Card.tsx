import { forwardRef, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "outlined" | "filled";
  className?: string;
}

const variants = {
  elevated: "bg-white shadow-lg",
  outlined: "bg-white border border-gray-200",
  filled: "bg-gray-50",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "elevated", className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-lg p-6
          transition-all duration-200
          ${variants[variant]}
          ${className}
        `}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = "" }, ref) => {
    return (
      <div ref={ref} className={`space-y-1.5 ${className}`}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className = "" }, ref) => {
    return (
      <h3
        ref={ref}
        className={`
          text-lg font-semibold leading-none tracking-tight
          ${className}
        `}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = "CardTitle";

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ children, className = "" }, ref) => {
  return (
    <p
      ref={ref}
      className={`
          text-sm text-gray-500
          ${className}
        `}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = "" }, ref) => {
    return (
      <div ref={ref} className={`pt-6 ${className}`}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          flex items-center pt-6
          ${className}
        `}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";
