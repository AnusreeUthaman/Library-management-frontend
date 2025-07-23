import React from "react";

const Button = ({ children, onClick, className, type='button' , variant = "create", 
  size = "md",  }) => {
  const baseClasses = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  const variants = {
    create: "bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-200",
    update: "bg-green-500 hover:bg-green-700 text-white focus:ring-green-200",
    delete: "bg-red-500 hover:bg-red-700 text-white focus:ring-red-200",
    cancel: "bg-gray-300 hover:bg-gray-400 text-gray-800 focus:ring-gray-200",
  };

  const sizes = {
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  const buttonClassName = `${baseClasses} ${variants[variant] || variants.create} ${sizes[size] || size.md} ${className || ''}`;

  return (
    <button className={buttonClassName} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;