import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import HowitWorks from "./components/HowitWorks";
import Model from "./components/Model";
import Navbar from "./components/Navbar";
import "./index.css";

import * as Sentry from "@sentry/react";

const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowitWorks />
      <Footer />
    </main>
  );
};

export default Sentry.withProfiler(App);
