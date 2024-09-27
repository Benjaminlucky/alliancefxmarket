// src/lib/utils.js or src/utils/utils.js

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
