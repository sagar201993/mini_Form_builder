import React from "react";

type ButtonTypeProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button: React.FC<ButtonTypeProps> = ({
  type = "button", // default to "button" to prevent accidental submits
  className = "",
  onClick,
  children,
  disabled = false,
}) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
