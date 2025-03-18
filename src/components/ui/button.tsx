import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  let variantClass = "";
  if (variant === "primary") {
    variantClass = "bg-blue-500 text-white hover:bg-blue-600";
  } else if (variant === "outline") {
    variantClass = "border border-blue-500 text-blue-500 hover:bg-blue-50";
  }

  return (
    <button
      {...props}
      className={`px-4 py-2 rounded ${variantClass} ${className || ""}`}
    >
      {children}
    </button>
  );
};
