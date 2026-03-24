import React from "react";
import { useNavigate } from "react-router-dom";
import botLogo from "../assets/chatbot.png";
 // 👈 Make sure image is here

const ChatbotIcon = () => {
  const navigate = useNavigate();

  const goToChatbot = () => {
    navigate("/chatbot"); // ✅ Redirects to ChatbotUI page
  };

  return (
    <button
      onClick={goToChatbot}
      className="fixed bottom-5 right-10 rounded-full shadow-lg hover:scale-110 transition"
      style={{ zIndex: 9999, border: "none", background: "transparent" }}
    >
      <img
        src={botLogo}
        alt="Chatbot"
        className="chatbot-icon"
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </button>
  );
};

export default ChatbotIcon;
