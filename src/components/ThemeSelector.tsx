import { useState } from "react";

export function ThemeSelector() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      document.documentElement.setAttribute('colour-theme', newTheme);
    };
    return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
    );
}