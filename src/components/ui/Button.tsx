import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { type LucideIcon } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-brand-500 to-accent-500 text-white hover:from-brand-400 hover:to-accent-400 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40',
  secondary: 'glass text-white hover:bg-white/10',
  ghost: 'text-gray-300 hover:text-white hover:bg-white/5',
  outline: 'border border-white/15 text-white hover:bg-white/5 hover:border-white/25',
  danger: 'bg-error-500/20 text-error-400 hover:bg-error-500/30 border border-error-500/30',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', icon: Icon, iconRight: IconRight, loading, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          Icon && <Icon className="w-4 h-4" />
        )}
        {children}
        {IconRight && !loading && <IconRight className="w-4 h-4" />}
      </button>
    );
  }
);

Button.displayName = 'Button';
