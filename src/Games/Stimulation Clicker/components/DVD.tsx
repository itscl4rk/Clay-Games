import { useEffect, useState } from "react";

interface DVDProps {
  count: number;
  onHitEdge: () => void;
  changeColorOnBounce: boolean;
}

// Define possible colors and use them as image suffixes
const colors = ["red", "yellow", "orange", "green", "blue", "purple"];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const DVD = ({ count, onHitEdge, changeColorOnBounce }: DVDProps) => {
  const dvdSize = 150;

  const [dvds, setDvds] = useState<
    { x: number; y: number; dx: number; dy: number; color: string }[]
  >([]);

  useEffect(() => {
    if (dvds.length === 0 || dvds.length < count) {
      const newDvds: { x: number; y: number; dx: number; dy: number; color: string; }[] = [];
      for (let i = dvds.length; i < count; i++) {
        newDvds.push({
          x: Math.random() * (window.innerWidth),
          y: Math.random() * (window.innerHeight),
          dx: Math.random() < 0.5 ? 1 : -1,
          dy: Math.random() < 0.5 ? 1 : -1,
          color: getRandomColor(),
        });
      }
      setDvds((prev) => [...prev, ...newDvds]);
    }
  }, [count, dvds.length]);

  useEffect(() => {
    const moveDvds = () => {
      setDvds((prevDvds) =>
        prevDvds.map((dvd) => {
          let { x, y, dx, dy, color } = dvd;
          let hitEdge = false;
    
          const nextX = x + dx * 0.75;
          const nextY = y + dy * 0.75;
    
          if (nextX <= 0 || nextX + dvdSize >= window.innerWidth) {
            dx *= -1;
            hitEdge = true;
          }
    
          if (nextY <= 0 || nextY + dvdSize >= window.innerHeight) {
            dy *= -1;
            hitEdge = true;
          }
    
          // Now apply the updated (possibly flipped) direction
          x += dx * 0.75;
          y += dy * 0.75;
    
          // Clamp to stay within bounds
          x = Math.max(0, Math.min(x, window.innerWidth - dvdSize));
          y = Math.max(0, Math.min(y, window.innerHeight - dvdSize));
    
          if (hitEdge) {
            onHitEdge();
            if (changeColorOnBounce) {
              color = getRandomColor();
            }
          }
    
          return { x, y, dx, dy, color };
        })
      );
    };
    

    const interval = setInterval(moveDvds, 1000 / 60);
    return () => clearInterval(interval);
  }, [onHitEdge, changeColorOnBounce]);

  return (
    <>
      {dvds.map((dvd, index) => (
        <img
          key={index}
          src={`${changeColorOnBounce ? `/upgrades/dvd-${dvd.color}.png` : `/upgrades/dvd.png`}`}
          alt="DVD"
          style={{
            position: "absolute",
            top: `${dvd.y}px`,
            left: `${dvd.x}px`,
            width: `${dvdSize}px`,
            height: `${dvdSize}px`,
            zIndex: 10,
          }}
        />
      ))}
    </>
  );
};

export default DVD;
