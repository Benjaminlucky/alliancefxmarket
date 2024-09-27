// src/components/CustomUIComponents.jsx

import React from "react";

export const Button = ({ children, ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${props.className}`}
  >
    {children}
  </button>
);

export const Popover = ({ children, ...props }) => (
  <div {...props} className={`relative ${props.className}`}>
    {children}
  </div>
);

export const PopoverTrigger = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

export const PopoverContent = ({ children, ...props }) => (
  <div
    {...props}
    className={`absolute z-10 bg-white border rounded shadow-lg ${props.className}`}
  >
    {children}
  </div>
);

export const Command = ({ children, ...props }) => (
  <div {...props} className={`${props.className}`}>
    {children}
  </div>
);

export const CommandInput = ({ ...props }) => (
  <input
    {...props}
    className={`w-full p-2 border rounded ${props.className}`}
  />
);

export const CommandEmpty = ({ children, ...props }) => (
  <div {...props} className={`p-2 text-gray-500 ${props.className}`}>
    {children}
  </div>
);

export const CommandGroup = ({ children, ...props }) => (
  <div {...props} className={`${props.className}`}>
    {children}
  </div>
);

export const CommandItem = ({ children, ...props }) => (
  <div
    {...props}
    className={`p-2 hover:bg-gray-100 cursor-pointer ${props.className}`}
  >
    {children}
  </div>
);
