import { useNavigate } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi2';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-zinc-100 dark:bg-zinc-900">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-10">
          <h1 className="font-bold text-8xl font-tournedos dark:text-zinc-100">
            🐔 Boom! Are you lost? 🙄
          </h1>
          <button onClick={() => navigate('/')} className="transition-all duration-300 cursor-pointer flex items-center gap-2 bg-zinc-500 hover:bg-zinc-600 text-zinc-100 px-4 py-3 rounded-md">
            <HiOutlineHome className="xl:text-2xl" />
            <span>Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;