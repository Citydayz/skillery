import { forwardRef, HTMLAttributes } from "react";
import { FiChevronRight } from "react-icons/fi";

interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: {
    label: string;
    href?: string;
  }[];
  separator?: React.ReactNode;
  className?: string;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      children,
      items,
      separator = <FiChevronRight className="h-4 w-4 text-gray-400" />,
      className = "",
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        className={`
          flex items-center space-x-2
          ${className}
        `}
        aria-label="Fil d'Ariane"
      >
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2" aria-hidden="true">
                  {separator}
                </span>
              )}
              {item.href ? (
                <a
                  href={item.href}
                  className={`
                    text-sm font-medium
                    ${
                      index === items.length - 1
                        ? "text-gray-500"
                        : "text-gray-700 hover:text-gray-900"
                    }
                  `}
                  aria-current={index === items.length - 1 ? "page" : undefined}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={`
                    text-sm font-medium
                    ${
                      index === items.length - 1
                        ? "text-gray-500"
                        : "text-gray-700"
                    }
                  `}
                  aria-current={index === items.length - 1 ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";
