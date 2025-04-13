/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import NewsMarquee from "./components/NewsMarquee";
import DVD from "./components/DVD";
import SubwaySurfers from "./components/SubwaySurfers";
import mouseClick from "./sounds/mouse-click.mp3";
import bubbleSound from "./sounds/dvd-bounce-sound.mp3";
import favicon from "/clicker-icon.png";
import LofiBeats from "./components/LofiBeats";
import RainEffect from "./components/RainEffect";

const ClickerPage = () => {
  const [clicks, setClicks] = useState(0);
  const [titleUnlocked, setTitleUnlocked] = useState(false);
  const [betterButtonUnlocked, setBetterButtonUnlocked] = useState(false);
  const [newsUnlocked, setNewsUnlocked] = useState(false);
  const [dvdCount, setDVDCount] = useState(0);
  const [revealedUpgrades, setRevealedUpgrades] = useState<string[]>([]);
  const [showSps, setShowSps] = useState(false);
  const [amountAnimationUnlocked, setAmountAnimationUnlocked] = useState(false);
  const [dvdSoundUnlocked, setDvdSoundUnlocked] = useState(false);
  const [lofiBeatsUnlocked, setLofiBeatsUnlocked] = useState(false);
  const [subwaySurfersUnlocked, setSubwaySurfersUnlocked] = useState(false);
  const [dvdColorChangeUnlocked, setDvdColorChangeUnlocked] = useState(false);
  const [rainUnlocked, setRainUnlocked] = useState(false);
  const [showMobileUpgrades, setShowMobileUpgrades] = useState(false);
  const [clickGainAnimations, setClickGainAnimations] = useState<
    { id: number; value: number; x: number; y: number }[]
  >([]);
  const animationIdRef = useRef(0);
  const [sps, setSps] = useState(0);
  const clickTimestamps = useRef<number[]>([]);

  const playClickSound = () => new Audio(mouseClick).play();
  const playBubbleSound = () => new Audio(bubbleSound).play();
  
  useEffect(() => {
    if (titleUnlocked) {
      document.title = "Stimulation Clicker";
      let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.type = "image/png";
      link.href = `${favicon}?v=${new Date().getTime()}`;
    }
  }, [titleUnlocked]);

  useEffect(() => {
    if (!newsUnlocked) return;
    const interval = setInterval(() => setClicks((prev) => prev + 10), 1000);
    return () => clearInterval(interval);
  }, [newsUnlocked]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      clickTimestamps.current = clickTimestamps.current.filter(
        (t) => now - t <= 1000
      );
      const cps =
        clickTimestamps.current.length *
        ((betterButtonUnlocked ? 2 : 1) + (amountAnimationUnlocked ? 1 : 0));

      const passive =
        (newsUnlocked ? 4 : 0) +
        (subwaySurfersUnlocked ? 3 : 0) +
        (lofiBeatsUnlocked ? 10 : 0) +
        (rainUnlocked ? 15 : 0);

      setSps(cps + passive);
      setClicks((prev) => prev + passive);
    }, 1000);
    return () => clearInterval(interval);
  }, [
    newsUnlocked,
    subwaySurfersUnlocked,
    lofiBeatsUnlocked,
    rainUnlocked,
    betterButtonUnlocked,
    amountAnimationUnlocked,
  ]);

  const handleClick = () => {
    const gain =
      (betterButtonUnlocked ? 2 : 1) + (amountAnimationUnlocked ? 1 : 0);
    if (betterButtonUnlocked) playClickSound();
    const id = animationIdRef.current++;
    clickTimestamps.current.push(Date.now());
    setClicks((prev) => prev + gain);

    const randomX = (Math.random() - 0.5) * 80;
    const randomY = -40 - Math.random() * 40;

    setClickGainAnimations((prev) => [
      ...prev,
      { id, value: gain, x: randomX, y: randomY },
    ]);
    setTimeout(() => {
      setClickGainAnimations((prev) => prev.filter((anim) => anim.id !== id));
    }, 1000);
  };

  const unlockUpgrade = useCallback(
    (cost: number, setUnlock: () => void, name: string) => {
      if (clicks < cost) return;
      toast.success(`Successfully bought ${name}!`, {
        duration: 600,
      });
      playClickSound();
      setClicks((prev) => prev - cost);
      setUnlock();
    },
    [clicks]
  );

  const getDVDUpgradeCost = (count: number) =>
    Math.ceil((3 * Math.pow(1.8, count)) / 3) * 3;

  const dvdUpgrade = () => {
    const cost = getDVDUpgradeCost(dvdCount);
    if (clicks < cost) return;
    toast.success("Successfully bought DVD!", {
      duration: 600,
    });
    playClickSound();
    setClicks((prev) => prev - cost);
    setDVDCount((prev) => prev + 1);
  };

  const dvdBounceClicks = () => {
    setClicks((prev) => prev + (dvdSoundUnlocked ? 6 : 1));
    if (dvdSoundUnlocked) playBubbleSound();
  };

  const upgrades = useMemo(
    () => [
      {
        name: "DVD",
        image: "/dvd.png",
        description: "+1 stimulation per bounce",
        unlocked: false,
        function: dvdUpgrade, 
        price: getDVDUpgradeCost(dvdCount),
      },
      {
        name: "Add Tab Title",
        image: "/tab-upgrade.png",
        description: "It's good for SEO",
        unlocked: titleUnlocked,
        function: () => unlockUpgrade(5, () => setTitleUnlocked(true), "Title"),
        price: 5,
      },
      {
        name: "Amount Animation",
        image: "/amount-animation-upgrade.png",
        description: "+1 stimulation per click",
        unlocked: amountAnimationUnlocked,
        function: () =>
          unlockUpgrade(10, () => setAmountAnimationUnlocked(true), "Amount Animation"),
        price: 10,
      },
      {
        name: "SPS Counter",
        image: "/cps-upgrade.png",
        description: "See your stimulation per second",
        unlocked: showSps,
        function: () => unlockUpgrade(20, () => setShowSps(true), "SPS Counter"),
        price: 20,
      },
      {
        name: "Better Button",
        image: "/better-button.png",
        description: "+1 stimulation per click",
        unlocked: betterButtonUnlocked,
        function: () => unlockUpgrade(40, () => setBetterButtonUnlocked(true), "Better Button"),
        price: 40,
      },
      {
        name: "DVD Bounce Sound",
        image: "/dvd-volume-upgrade.png",
        description: "+5 stimulation per bounce",
        price: 75,
        unlocked: dvdSoundUnlocked,
        function: () => unlockUpgrade(75, () => setDvdSoundUnlocked(true), "DVD Bounce Sound"),
      },
      {
        name: "Lofi Beats",
        image: "/lofibeats.png",
        description: "+10 stimulation per second",
        unlocked: lofiBeatsUnlocked,
        function: () => unlockUpgrade(250, () => setLofiBeatsUnlocked(true), "Lofi Beats"),
        price: 250,
      },
      {
        name: "News",
        image: "/news-upgrade.png",
        description: "+4 stimulation per second",
        unlocked: newsUnlocked,
        function: () => unlockUpgrade(100, () => setNewsUnlocked(true), "News"),
        price: 100,
      },
      {
        name: "Subway Surfers",
        image: "/subway-surfers.png",
        description: "+3 stimulation per second",
        unlocked: subwaySurfersUnlocked,
        function: () =>
          unlockUpgrade(100, () => setSubwaySurfersUnlocked(true), "Subway Surfers"),
        price: 100,
      },
      {
        name: "DVD Color Change",
        image: "/dvd-rainbow.png",
        description:
          "DVD color changes on every bounce. +2 stimulation per bounce",
        unlocked: dvdColorChangeUnlocked,
        function: () =>
          unlockUpgrade(150, () => setDvdColorChangeUnlocked(true), "DVD Color Change"),
        price: 150,
      },
      {
        name: "Rain Sounds",
        image: "/rain.png",
        description: "Soothing rain sounds. +15 stimulation per second",
        unlocked: rainUnlocked,
        function: () => unlockUpgrade(300, () => setRainUnlocked(true), "Rain Sounds"),
        price: 300,
      },
    ],
    [
      dvdCount,
      lofiBeatsUnlocked,
      titleUnlocked,
      amountAnimationUnlocked,
      showSps,
      betterButtonUnlocked,
      dvdSoundUnlocked,
      newsUnlocked,
      subwaySurfersUnlocked,
      dvdColorChangeUnlocked,
      rainUnlocked,
      unlockUpgrade,
      dvdUpgrade
    ]
  );

  useEffect(() => {
    upgrades.forEach((upgrade) => {
      if (clicks >= upgrade.price && !revealedUpgrades.includes(upgrade.name)) {
        setRevealedUpgrades((prev) => [...prev, upgrade.name]);
      }
    });
  }, [clicks, upgrades, revealedUpgrades]);

  const visibleUpgrades = upgrades
    .filter((u) => revealedUpgrades.includes(u.name) && !u.unlocked)
    .slice(0, 5);

  const startLofiBeats = (playFunction: () => void) => {
    playFunction();
  };
  const affordableUpgradeCount = useMemo(() => {
    return visibleUpgrades.filter((u) => clicks >= u.price).length;
  }, [visibleUpgrades, clicks]);

  return (
    <div className="min-h-screen w-full bg-zinc-100 flex flex-col relative">
      <Toaster />
      <div className="absolute inset-0 z-10">
        <DVD
          count={dvdCount}
          onHitEdge={dvdBounceClicks}
          changeColorOnBounce={dvdColorChangeUnlocked}
        />
      </div>
      <RainEffect isUnlocked={rainUnlocked} />
      <SubwaySurfers isUnlocked={subwaySurfersUnlocked} />
      <NewsMarquee isUnlocked={newsUnlocked} />
      <LofiBeats isUnlocked={lofiBeatsUnlocked} startLofi={startLofiBeats} />

      <div className="flex flex-col items-center mt-50 flex-grow z-20">
        <div
          className={`${
            amountAnimationUnlocked ? "" : "opacity-0"
          } relative h-10 w-full flex justify-center items-center -mb-2 pointer-events-none`}
        >
          <AnimatePresence>
            {clickGainAnimations.map((anim) => (
              <motion.span
                key={anim.id}
                initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x: anim.x, y: anim.y }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="absolute text-lg z-0 font-bold text-zinc-500 pointer-events-none select-none"
              >
                +{anim.value}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        <button
          onClick={handleClick}
          className={`hover:scale-105 cursor-pointer px-6 py-2 font-semibold transition-all duration-200 border ${
            betterButtonUnlocked
              ? "rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-600 shadow-lg"
              : "bg-zinc-300 text-black border-zinc-900 hover:bg-zinc-400"
          }`}
        >
          Click Me
        </button>

        <p
          className={`transition-all duration-600 mt-4 text-md font-mono ${
            clicks > 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          {clicks} stimulation
        </p>
        {showSps && (
          <p className="text-xs font-mono text-zinc-500 mt-1">
            {sps.toFixed(1)} stimulation/sec
          </p>
        )}
      </div>
      <div className="fixed bottom-4 right-4 z-30 md:hidden">
        <button
          onClick={() => setShowMobileUpgrades(true)}
          className={`transition-all duration-300 ${
            affordableUpgradeCount > 0 && !showMobileUpgrades ? "opacity-100" : "opacity-0"
          } relative flex items-center justify-center bg-zinc-900 text-white p-4 rounded-full shadow-lg`}
        >
          <span className="text-sm font-bold">Upgrades</span>
          {affordableUpgradeCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {affordableUpgradeCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col items-center mb-70 z-20">
        <div className="items-center gap-4 mt-4 flex-wrap justify-center hidden md:flex">
          {visibleUpgrades.map((upgrade) => (
            <motion.div
              key={upgrade.name}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative group"
            >
              <button
                onClick={upgrade.function}
                className={`rounded-2xl border bg-white transition-all duration-300 ${
                  clicks >= upgrade.price
                    ? "cursor-pointer border-zinc-900"
                    : "border-gray-300"
                }`}
              >
                <img
                  className="size-18 rounded-2xl"
                  src={upgrade.image}
                  alt={upgrade.name}
                />
              </button>

              {upgrade.name === "DVD" && dvdCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-md">
                  {dvdCount}
                </div>
              )}

              <div className="font-mono absolute top-20 left-1/2 shadow-xl transform -translate-x-1/2 bg-white text-zinc-900 font-bold rounded-md py-1 w-60 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:scale-105">
                <div className="text-lg text-center">{upgrade.name}</div>
                <div className="text-zinc-500 text-xs text-center">
                  {upgrade.description}
                </div>
                <div
                  className={`mt-1 text-sm text-center ${
                    clicks >= upgrade.price ? "text-zinc-900" : "text-red-500"
                  }`}
                >
                  Cost: {upgrade.price} stimulation
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {showMobileUpgrades && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 z-40 shadow-2xl md:hidden"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-lg">Upgrades</span>
                <button
                  onClick={() => setShowMobileUpgrades(false)}
                  className="text-zinc-500 hover:text-zinc-700"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-[60vh]">
                {visibleUpgrades.map((upgrade) => (
                  <button
                    key={upgrade.name}
                    onClick={() => {
                      upgrade.function();
                      setShowMobileUpgrades(false); // close on purchase
                    }}
                    className={`relative flex flex-col items-center rounded-xl border p-2 transition-all duration-300 ${
                      clicks >= upgrade.price
                        ? "cursor-pointer border-zinc-900"
                        : "border-gray-300 opacity-50"
                    }`}
                  >
                    <img
                      src={upgrade.image}
                      alt={upgrade.name}
                      className="w-12 h-12 rounded-lg"
                    />
                    <span className="text-xs font-mono mt-1 text-center">
                      {upgrade.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ClickerPage;
