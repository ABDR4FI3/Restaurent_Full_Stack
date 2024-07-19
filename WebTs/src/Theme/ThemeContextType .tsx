// src/contexts/theme.tsx

import React, { createContext, useState, ReactNode, useEffect } from "react";

// Define the context type
export interface ThemeContextType {
  themeName: string;
  toggleTheme: () => void;
}

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType>({
  themeName: "light",
  toggleTheme: () => {},
});

// ThemeProvider component to manage the theme state
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<string>("light");

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setThemeName((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Apply the theme to the body class
  useEffect(() => {
    //document.body.className = themeName;
    console.log(themeName);
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
