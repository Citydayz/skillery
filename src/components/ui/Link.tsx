import { forwardRef, HTMLAttributes } from "react";

interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  className?: string;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, href, external = false, className = "" }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`
          inline-flex items-center
          text-blue-600 hover:text-blue-800
          underline-offset-4 hover:underline
          transition-colors duration-200
          ${className}
        `}
      >
        {children}
        {external && (
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </a>
    );
  }
);

Link.displayName = "Link";
