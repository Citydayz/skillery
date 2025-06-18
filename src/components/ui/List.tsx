import { forwardRef, HTMLAttributes } from "react";

interface ListProps extends HTMLAttributes<HTMLElement> {
  ordered?: boolean;
  className?: string;
}

export const List = forwardRef<HTMLElement, ListProps>(
  ({ children, ordered = false, className = "" }, ref) => {
    const Component = ordered ? "ol" : "ul";

    return (
      <Component
        ref={ref}
        className={`
          space-y-2
          ${ordered ? "list-decimal" : "list-disc"}
          ${className}
        `}
      >
        {children}
      </Component>
    );
  }
);

List.displayName = "List";

interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  className?: string;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, className = "" }, ref) => {
    return (
      <li
        ref={ref}
        className={`
          text-gray-700
          ${className}
        `}
      >
        {children}
      </li>
    );
  }
);

ListItem.displayName = "ListItem";
