import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div style={{ backgroundImage: "url('/public/email.png')", opacity: 0.5 }}>
      <Navbar />
      <div className="mt-0">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
