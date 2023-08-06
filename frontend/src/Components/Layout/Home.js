import React from "react";
import "../CSSFolder/Home.css";
import MyChat from "../MiniComponents/MyChatProfile/MyChat";
import ChatBox from "../MiniComponents/ChattingPannel/ChatBox";
import NavBar from "../MiniComponents/SideDrawer/NavBar";

const Home = () => {
  return (
    <div className="HomePage">
      <nav>
        <NavBar />
      </nav>

      <section>
        <MyChat />

        <ChatBox />
      </section>
    </div>
  );
};

export default Home;
