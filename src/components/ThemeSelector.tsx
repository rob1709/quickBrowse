import { useState } from "react";

export function ThemeSelector() {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      document.documentElement.setAttribute('colour-theme', newTheme);
    };
    return (
      <></>
    );
}