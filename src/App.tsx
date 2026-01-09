import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FindMovie from "./pages/FindMovie";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/find-movie" element={<FindMovie />} />
      {/* Support root level aliases if needed for SEO */}
      <Route path="/what-movie-is-this" element={<FindMovie />} />
      <Route path="/identify" element={<FindMovie />} />
    </Routes>
  );
}
