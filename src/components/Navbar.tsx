import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="px-6 py-4 flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <p className="transition-all duration-300 flex items-center gap-2 text-zinc-500 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-zinc-400">
            {/* <img className="size-10" src="/favico.png" alt="Logo" /> */}
            <span className="text-3xl sm:text-5xl font-bold font-tournedos">LeGoon Games</span>
          </p>
        </Link>

        {/* Theme Toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
