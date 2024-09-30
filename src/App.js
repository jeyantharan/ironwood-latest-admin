import "./App.css";
import Admin from "./page/admin";
import Panel from "./page/panel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import View from "./page/view";
import Update from "./page/update";
import UpdateEle from "./page/updateEle";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/view" element={<View />} />
        <Route path="/element" element={<UpdateEle />} />
        <Route path="/update/:_id" element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;
