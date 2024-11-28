interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm ${className}`} 
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }: CardProps) {
  return (
    <div 
      className={`p-6 ${className}`} 
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ children, className, ...props }: CardProps) {
  return (
    <div 
      className={`p-6 pt-0 ${className}`} 
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({ children, className, ...props }: CardProps) {
  return (
    <h3 
      className={`text-lg font-semibold text-gray-900 ${className}`} 
      {...props}
    >
      {children}
    </h3>
  )
}

