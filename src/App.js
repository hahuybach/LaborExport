import { Routes, Route, Link } from "react-router-dom";
import Navbar from "components/layout/Navbar";
import HomePage from "views/Home";
import NewsPage from "views/News";
import ContactPage from "views/Contact";
import WorkerPage from "views/Worker/Worker";
import AddWorkerPage from "views/Worker/AddWorker";
import "App.css";
import { Router } from "react-router";

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <Navbar />
      </div>
      <div className="app-container mx-5">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/worker" element={<WorkerPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/worker/add" element={<AddWorkerPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
