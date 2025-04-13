import { useEffect, useState } from "react";
import ThemeToggle from "../../components/ThemeToggle";
import favicon from "/hourglass.png";
import { Link } from "react-router-dom";

const ProgressPage = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [remainingMinutesForHour, setRemainingMinutesForHour] = useState(0);
  const [remainingHoursToday, setRemainingHoursToday] = useState(0);
  const [remainingDaysInMonth, setRemainingDaysInMonth] = useState(0);
  const [remainingDaysInYear, setRemainingDaysInYear] = useState(0);

  const [daysInMonth, setDaysInMonth] = useState(30);
  const [daysInYear, setDaysInYear] = useState(365);

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();

      // ⏱ Next Minute
      const secondsUntilNextMinute = 59 - now.getSeconds();
      setRemainingSeconds(secondsUntilNextMinute);

      // ⏳ Next Hour
      const minutesUntilNextHour = 59 - now.getMinutes();
      const secondsUntilNextHour = 60 - now.getSeconds();
      const roundedMinutesForHour =
        secondsUntilNextHour > 0
          ? minutesUntilNextHour + 1
          : minutesUntilNextHour;
      setRemainingMinutesForHour(roundedMinutesForHour);

      // 🌙 Next Day
      const hoursLeftToday = 23 - now.getHours();
      const minutesLeftInHour = 59 - now.getMinutes();
      const roundUpHours = minutesLeftInHour > 0 ? 1 : 0;
      setRemainingHoursToday(hoursLeftToday + roundUpHours);

      // 📅 Next Month
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth(); // 0-indexed
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const remainingDaysMonth = lastDayOfMonth - now.getDate();
      setRemainingDaysInMonth(remainingDaysMonth);
      setDaysInMonth(lastDayOfMonth);

      // 📆 Next Year
      const startOfNextYear = new Date(currentYear + 1, 0, 1);
      const startOfYear = new Date(currentYear, 0, 1);
      const totalDaysThisYear = Math.ceil(
        (startOfNextYear.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
      );
      const remainingDaysYear = Math.ceil(
        (startOfNextYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      setRemainingDaysInYear(remainingDaysYear);
      setDaysInYear(totalDaysThisYear);
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = "Progress";
  
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
  
    // 👇 Add a timestamp to force reload
    link.type = "image/png";
    link.href = `${favicon}?v=${new Date().getTime()}`;
  }, []);
  

  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
      <nav className="absolute top-0 left-0 w-full z-50 shadow-md">
        <div className="px-6 py-4 flex items-center justify-between w-full bg-white dark:bg-zinc-900">
          <Link to="/" className="flex items-center">
            <p className="transition-all duration-300 flex items-center gap-2 text-zinc-900 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-zinc-400">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold font-tournedos tracking-wide">
                Clay Games
              </span>
            </p>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <div className="container flex flex-col min-h-screen mt-25 items-center">
        <div className="w-[80%] text-center bg-zinc-100 dark:bg-zinc-900 text-3xl font-bold px-4 py-8 mb-2">
          Progress
        </div>

        <div className="w-[80%] bg-zinc-100 dark:bg-zinc-900 mb-6">
          {/* Next Minute */}
          <ProgressBlock
            label="🕐 Next minute"
            value={`${remainingSeconds} seconds left`}
            progress={(60 - remainingSeconds) / 60}
          />

          {/* Next Hour */}
          <ProgressBlock
            label="🕐 Next hour"
            value={`${remainingMinutesForHour} minutes left`}
            progress={(60 - remainingMinutesForHour) / 60}
          />

          {/* Next Day */}
          <ProgressBlock
            label="🌙 Next day"
            value={`${remainingHoursToday} hours left`}
            progress={(24 - remainingHoursToday) / 24}
          />

          {/* Next Month */}
          <ProgressBlock
            label="📅 Next month"
            value={`${remainingDaysInMonth} days left`}
            progress={(daysInMonth - remainingDaysInMonth) / daysInMonth}
          />

          {/* Next Year */}
          <ProgressBlock
            label="🎉 Next year"
            value={`${remainingDaysInYear} days left`}
            progress={(daysInYear - remainingDaysInYear) / daysInYear}
          />
        </div>
      </div>
    </div>
  );
};

const ProgressBlock = ({
  label,
  value,
  progress,
}: {
  label: string;
  value: string;
  progress: number;
}) => (
  <div className="w-full flex flex-col items-center">
    <div className="w-full flex justify-between items-center px-4 py-6">
      <p className="text-3xl font-bold">{label}</p>
      <span className="text-lg font-bold">{value}</span>
    </div>
    <div className="w-[97%] h-10 bg-zinc-300 dark:bg-zinc-700 rounded-md mb-3 overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all duration-1000"
        style={{ width: `${progress * 100}%` }}
      ></div>
    </div>
  </div>
);

export default ProgressPage;
