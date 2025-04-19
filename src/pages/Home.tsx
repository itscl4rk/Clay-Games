import { useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  useEffect(() => {
    // Set document title
    document.title = "Clay Games";

    // Set favicon
    const favicon = document.getElementById("favicon") as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = "/favico.png";
    } else {
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = "/favico.png";
      link.id = "favicon";
      document.head.appendChild(link);
    }
  }, []);

  const cards = [
    { name: "Progress", image: "/banners/progress-banner.png", link: "/progress/" },
    { name: "Stimulation Clicker", image: "/banners/stimulation-clicker-banner.png", link: "/stimulation-clicker/" },
    { name: "Word Tuah", image: "/banners/wordtuah-banner.png", link: "/wordtuah/" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 px-4">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold pt-16 font-tournedos text-center">
        Clay Games
      </h1>
      <p className="text-base sm:text-lg md:text-xl font-light text-zinc-600 dark:text-zinc-400 font-mono mb-10 text-center">
        Games and other stuff
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-3 w-full max-w-screen-xl">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="cursor-pointer rounded-3xl border-2 border-zinc-900 dark:border-zinc-200 shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={card.image}
              alt={`${card.name} Icon`}
              className="w-full h-full object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
