import { forwardRef, HTMLAttributes } from "react";

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  className?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className = "" }, ref) => {
    return (
      <div className="w-full overflow-auto">
        <table
          ref={ref}
          className={`
            w-full border-collapse
            ${className}
          `}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";

interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ children, className = "" }, ref) => {
  return (
    <thead
      ref={ref}
      className={`
          bg-gray-50
          ${className}
        `}
    >
      {children}
    </thead>
  );
});

TableHeader.displayName = "TableHeader";

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className = "" }, ref) => {
    return (
      <tbody
        ref={ref}
        className={`
          divide-y divide-gray-200 bg-white
          ${className}
        `}
      >
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = "TableBody";

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  className?: string;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className = "" }, ref) => {
    return (
      <tr
        ref={ref}
        className={`
          hover:bg-gray-50
          ${className}
        `}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = "TableRow";

interface TableHeadProps extends HTMLAttributes<HTMLTableCellElement> {
  className?: string;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ children, className = "" }, ref) => {
    return (
      <th
        ref={ref}
        className={`
          px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
          ${className}
        `}
      >
        {children}
      </th>
    );
  }
);

TableHead.displayName = "TableHead";

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  className?: string;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className = "" }, ref) => {
    return (
      <td
        ref={ref}
        className={`
          px-6 py-4 whitespace-nowrap text-sm text-gray-900
          ${className}
        `}
      >
        {children}
      </td>
    );
  }
);

TableCell.displayName = "TableCell";
