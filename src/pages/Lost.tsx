import { useNavigate } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi2';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-zinc-100 dark:bg-zinc-900 px-4">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-8 max-w-3xl text-center">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-tournedos dark:text-zinc-100">
            🐔 Boom! Are you lost? 🙄
          </h1>
          <button
            onClick={() => navigate('/')}
            className="transition-all duration-300 cursor-pointer flex items-center gap-2 bg-zinc-500 hover:bg-zinc-600 text-zinc-100 px-4 py-2 rounded-md text-sm sm:text-base"
          >
            <HiOutlineHome className="text-lg sm:text-xl" />
            <span>Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
