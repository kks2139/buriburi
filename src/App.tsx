import "./styles/global.scss";

import { Route, Routes } from "react-router-dom";

import AiCoach from "./components/pages/AiCoach";
import Chat from "./components/pages/Chat";
import Entry from "./components/pages/Entry";
import Product from "./components/pages/Product";
import Result from "./components/pages/Result";
import Test from "./components/pages/Test";

function App() {
  return (
    <Routes>
      <Route index element={<Entry />} />
      <Route path="/ai-coach" element={<AiCoach />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/result" element={<Result />} />
      <Route path="/product" element={<Product />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
