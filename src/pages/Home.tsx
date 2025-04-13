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
  
  // Array of card data
  const cards = [
    { name: "Progress", image: "/progress-banner.png", link: "/progress/" },
    { name: "Stimulation Clicker", image: "/stimulation-clicker-banner.png", link: "/stimulation-clicker/" },
    { name: "Word Tuah", image: "/wordtuah-banner.png", link: "/wordtuah/" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
      <ThemeToggle />
      </div>
      <h1 className="text-7xl font-bold pt-12 font-tournedos">Clay Games</h1>
      <p className="text-xl font-light text-zinc-600 dark:text-zinc-400 font-mono mb-10">
        Games and other stuff
      </p>
      {/* Cards Section */}
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(22rem,_1fr))] gap-6 py-3 w-full max-w-screen-xl">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="cursor-pointer rounded-3xl border-2 border-zinc-900 dark:border-zinc-200 shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={card.image}
              alt={`${card.name} Icon`}
              className="w-full h-auto object-contain"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
