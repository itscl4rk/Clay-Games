import { Link } from 'react-router-dom';

const GameCard = () => {
    // Array of card data
  const cards = [
    { name: "Progress", image: "/banners/progress-banner.png", link: "/progress/" },
    { name: "Stimulation Clicker", image: "/banners/stimulation-clicker-banner.png", link: "/stimulation-clicker/" },
    { name: "Word Tuah", image: "/banners/wordtuah-banner.png", link: "/wordtuah/" },
  ];
  return (
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
  )
}

export default GameCard