import React, { useState } from 'react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password'; // For password toggle
  isLoading?: boolean; // Better name than just 'loading'
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  isLoading = false,
}) => {
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // 1. Base CSS Classes
  const baseClasses = "w-full transition-all duration-200 outline-none focus:ring-2";

  // 2. Variant Styles
  const variantClasses = {
    filled: "bg-gray-100 border-0 focus:bg-white focus:ring-blue-500 focus:border-blue-500",
    outlined: "bg-transparent border focus:ring-blue-500 focus:border-blue-500",
    ghost: "bg-transparent border-0 border-b focus:ring-0 focus:border-blue-500",
  };

  // 3. Size Styles
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  // 4. State Styles (Error, Disabled)
  const stateClasses = `
    ${invalid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  // Combine all classes
  const inputClassName = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${stateClasses}
    ${variant !== 'ghost' && 'rounded-md'} // Ghost doesn't have rounded corners
  `;

  return (
    <div className="flex flex-col space-y-1 w-64"> {/* Container div */}
      {/* Label */}
      {label && (
        <label className={`text-sm font-medium ${invalid ? 'text-red-500' : 'text-gray-700'}`}>
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || isLoading} // Disable if loading
          type={type === 'password' && showPassword ? 'text' : type} // Toggle password type
          className={inputClassName}
          aria-invalid={invalid}
          aria-describedby={helperText || errorMessage ? `helper-${label}` : undefined}
        />

        {/* Loading Spinner (Optional) */}
        {isLoading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Password Toggle (Optional) */}
        {type === 'password' && !isLoading && (
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>

      {/* Helper/Error Text */}
      {(helperText || errorMessage) && (
        <p
          id={`helper-${label}`}
          className={`text-xs ${invalid ? 'text-red-500' : 'text-gray-500'}`}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;