import MarqueeItem from "./MarqueeItem";
import newsData from "../data/news.json";

const NewsMarquee = ({isUnlocked}: {isUnlocked: boolean}) => {
  const headlines = newsData.headlines;
  return (
    <div className={`w-full bg-zinc-100 ${isUnlocked ? "" : "opacity-0"}`}>
      {/* Breaking News */}
      <div className="relative w-full flex">
        {/* Breaking Label */}
        <div className="bg-red-500 absolute text-lg font-bold text-zinc-100 z-10">
          <span>BREAKING:</span>
        </div>
        {/* News Marquee */}
        <MarqueeItem texts={headlines} from="0%" to="-100%" />
      </div>
    </div>
  );
};

export default NewsMarquee;
