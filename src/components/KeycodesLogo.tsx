import React from "react";

interface KeycodesLogoProps {
  className?: string;
  size?: number | string;
}

/**
 * Keycodes Logo Component
 * 
 * DESIGN NOTES & HOW TO UPLOAD YOUR LOGO:
 * -------------------------------------------------------------
 * Currently, this component programmatically draws the premium 
 * flight chevron wings logo path as a high-performance vector SVG.
 * 
 * If you want to upload and use your own physical logo image file:
 * 1. Upload your logo file (e.g. `logo.svg` or `logo.png`) into the `/public` directory.
 * 2. Replace the `<svg>` block below with an image element:
 *    ```tsx
 *    return (
 *      <img 
 *        src="/logo.svg" 
 *        alt="Keycodes Logo" 
 *        className={className} 
 *        style={{ width: size, height: size }} 
 *      />
 *    );
 *    ```
 */
export default function KeycodesLogo({ className = "text-[#a484ff]", size = 44 }: KeycodesLogoProps) {
  return (
    <img 
      src="/logo.png" 
      alt="Keycodes Logo" 
      className={`${className} object-contain`} 
      style={{ height: size, width: "auto" }} 
    />
  );
}
