import clsx from 'clsx';
// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types, no-unused-vars
const Button = ({icon, className, label, type, onClick =() => {} }) => {
  return (
  <button
  type={type || "button"}
  className={clsx("bx-3 py-2 outline-none rounded", className)}
  onClick={onClick}
  >
    <span>{label}</span>
    { icon && icon}
  </button>
  )
}

export default Button