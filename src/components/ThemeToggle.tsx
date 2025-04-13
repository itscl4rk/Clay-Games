import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="hover:scale-120 flex items-center gap-2 cursor-pointer px-2 py-2 text-zinc-900 dark:text-zinc-100 rounded-full transition-all"
    >
      {darkMode ? <Sun className="size-6" /> : <Moon className="size-6" />}
    </button>
  );
};

export default ThemeToggle;
