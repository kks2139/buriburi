import "./global.scss";

import { Route, Routes } from "react-router-dom";

import Test from "./components/pages/Test";

function App() {
  return (
    <Routes>
      {/* <Route index element={<Main />} /> */}
      <Route index element={<Test />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
