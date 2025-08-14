import React from 'react';

export type ButtonVariant = 
  | 'primary'      // Main CTA buttons (Contact Me, Visit Website)
  | 'secondary'    // Secondary actions (Close, Cancel)
  | 'ghost'        // Minimal buttons (navigation controls)
  | 'danger'       // Destructive actions
  | 'success'      // Positive actions
  | 'outline'      // Outlined buttons
  | 'icon'         // Icon-only buttons
  | 'toggle';      // Toggle buttons (reverse sort, theme)

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  theme?: 'light' | 'dark';
  isActive?: boolean;  // For toggle buttons
  fullWidth?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  theme = 'light',
  isActive = false,
  fullWidth = false,
  children,
  leftIcon,
  rightIcon,
  className = '',
  disabled = false,
  ...props
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded transition-all duration-200 focus:outline-none focus-visible:ring-4 disabled:opacity-50 disabled:cursor-not-allowed';

  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-1 text-sm gap-1',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2',
    xl: 'px-8 py-4 text-xl gap-3'
  };

  // Variant styles for light and dark themes
  const variantStyles = {
    primary: {
      light: 'bg-sky-500 hover:bg-sky-600 text-white border border-sky-500 hover:border-sky-600 focus-visible:ring-sky-300',
      dark: 'bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 hover:border-sky-700 focus-visible:ring-sky-400'
    },
    secondary: {
      light: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-200 hover:border-gray-300 focus-visible:ring-gray-300',
      dark: 'bg-gray-700 hover:bg-gray-600 text-gray-100 border border-gray-700 hover:border-gray-600 focus-visible:ring-gray-500'
    },
    ghost: {
      light: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent hover:border-gray-200 focus-visible:ring-gray-300',
      dark: 'bg-transparent hover:bg-gray-800 text-gray-300 border border-transparent hover:border-gray-700 focus-visible:ring-gray-500'
    },
    danger: {
      light: 'bg-red-500 hover:bg-red-600 text-white border border-red-500 hover:border-red-600 focus-visible:ring-red-300',
      dark: 'bg-red-600 hover:bg-red-700 text-white border border-red-600 hover:border-red-700 focus-visible:ring-red-400'
    },
    success: {
      light: 'bg-green-500 hover:bg-green-600 text-white border border-green-500 hover:border-green-600 focus-visible:ring-green-300',
      dark: 'bg-green-600 hover:bg-green-700 text-white border border-green-600 hover:border-green-700 focus-visible:ring-green-400'
    },
    outline: {
      light: 'bg-transparent hover:bg-sky-50 text-sky-600 border border-sky-200 hover:border-sky-300 focus-visible:ring-sky-300',
      dark: 'bg-transparent hover:bg-sky-900/20 text-sky-400 border border-sky-700 hover:border-sky-600 focus-visible:ring-sky-500'
    },
    icon: {
      light: 'bg-transparent hover:bg-gray-100 text-gray-600 border border-transparent hover:border-gray-200 focus-visible:ring-gray-300 p-2',
      dark: 'bg-transparent hover:bg-gray-800 text-gray-400 border border-transparent hover:border-gray-700 focus-visible:ring-gray-500 p-2'
    },
    toggle: {
      light: isActive 
        ? 'bg-sky-400 text-white border border-sky-400 focus-visible:ring-sky-300'
        : 'bg-gray-200 text-gray-700 border border-gray-200 hover:bg-gray-300 hover:border-gray-300 focus-visible:ring-gray-300',
      dark: isActive
        ? 'bg-sky-700 text-white border border-sky-700 focus-visible:ring-sky-400'
        : 'bg-gray-700 text-gray-200 border border-gray-700 hover:bg-gray-600 hover:border-gray-600 focus-visible:ring-gray-500'
    }
  };

  // Special handling for icon buttons
  const iconButtonOverrides = variant === 'icon' ? 'p-2 min-w-0' : '';
  
  // Full width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  // Combine all styles
  const combinedStyles = [
    baseStyles,
    variant !== 'icon' ? sizeStyles[size] : '',
    iconButtonOverrides,
    variantStyles[variant][theme],
    widthStyles,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={combinedStyles}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;
