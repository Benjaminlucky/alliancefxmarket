import React from "react";
import "./WhatsAppChat.css"; // Import the CSS file for styling

const WhatsAppChat = () => {
  const phoneNumber = "+13477547910"; // Replace with your WhatsApp number
  const message = "Hello! I need assistance."; // Predefined message

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-chat-button"
      title="Chat with us on WhatsApp"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" // Use a public WhatsApp icon or your own
        alt="WhatsApp"
        className="whatsapp-icon"
      />
    </a>
  );
};

export default WhatsAppChat;
