import { type HTMLAttributes, type ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, hover = false, glow = false, className = '', ...props }: CardProps) {
  return (
    <div
      className={`glass rounded-2xl ${hover ? 'glow-border-hover cursor-pointer' : ''} ${glow ? 'glow-border' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
