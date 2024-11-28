import React from "react";

// Interface pour la table complète
interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

// Interface pour les sections comme <thead>, <tbody>, etc.
interface TableSectionProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

// Interface pour les rangées
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

// Interface pour les cellules
interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export function Table({ children, className, ...props }: TableProps) {
  return (
    <div className="w-full overflow-auto">
      <table
        className={`w-full border-collapse ${className || ""}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className, ...props }: TableSectionProps) {
  return (
    <thead
      className={`bg-gray-50 ${className || ""}`}
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableBody({ children, className, ...props }: TableSectionProps) {
  return (
    <tbody
      className={`divide-y divide-gray-200 ${className || ""}`}
      {...props}
    >
      {children}
    </tbody>
  );
}

export function TableRow({ children, className, ...props }: TableRowProps) {
  return (
    <tr
      className={`hover:bg-gray-50 ${className || ""}`}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableCell({ children, className, ...props }: TableCellProps) {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${className || ""}`}
      {...props}
    >
      {children}
    </td>
  );
}

export function TableHead({ children, className, ...props }: TableCellProps) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className || ""}`}
      {...props}
    >
      {children}
    </th>
  );
}
