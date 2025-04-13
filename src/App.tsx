import { Routes, Route } from "react-router-dom";
import Lost from "./pages/Lost";
import MainLayout from "./layout/MainLayout";
import ProgressPage from "./Games/Progress/ProgressPage";
import ClickerPage from "./Games/Stimulation Clicker/StimulationClickerPage";
import Home from "./pages/Home";
const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}></Route>
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/stimulation-clicker" element={<ClickerPage />} />
      {/* <Route path="/wordtuah" element={<WordlePage />} /> */}
      <Route path="*" element={<Lost />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
