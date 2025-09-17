import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, TextField, Button } from "@mui/material";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("Tell me more about Crypto!");
  const [loading, setLoading] = useState(false);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const chatEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, user: true }];
      setMessages(newMessages);
      setInput("");

      try {
        setLoading(true);
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: input,
                  },
                ],
              },
            ],
          },
        );
        console.log(response);
        const botResponse = response.data.candidates[0].content.parts[0].text;
        setLoading(false);
        setMessages([...newMessages, { text: botResponse, user: false }]);
      } catch (error) {
        console.error("Error sending message:", error);
        setLoading(false);
        setMessages([
          ...newMessages,
          { text: "Error: Could not get response from AI", user: false },
        ]);
      }
    }
  };

  useEffect(() => {
    if (isChatbotVisible && messages.length === 0) {
      setMessages([
        {
          text: "Hello 👋, Your friendly assistant here! How can I help you?",
          user: false,
        },
      ]);
    }
  }, [isChatbotVisible]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="fixed top-3/4 mt-28 md:mt-20 right-12 flex flex-col items-end h-screen z-50 pointer-events-none">
      <Fab
        color="primary"
        aria-label={isChatbotVisible ? "close" : "open"}
        onClick={() => setIsChatbotVisible(!isChatbotVisible)}
        className="pointer-events-auto"
        sx={{
          background: "linear-gradient(45deg, #374151 30%, #4B5563 90%)",
          boxShadow: "0 3px 5px 2px rgba(75, 85, 99, .3)",
          "&:hover": {
            background: "linear-gradient(45deg, #4B5563 30%, #6B7280 90%)",
          },
        }}
      >
        {isChatbotVisible ? <CloseIcon /> : <ChatIcon />}
      </Fab>
      {isChatbotVisible && (
        <Box
          sx={{
            backgroundColor: "#1F2937",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "30%" },
            height: "70vh",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border: "2px solid white",
            borderRadius: 2,
            overflow: "hidden",
            position: "fixed",
            zIndex: 50,
            bottom: 96,
            right: { xs: 0, sm: 20, md: 40, lg: 60 },
            margin: 2,
            pointerEvents: "auto",
          }}
        >
          <Box
            sx={{
              background: "rgba(31, 41, 55, 0.8)",
              backdropFilter: "blur(4px)",
              padding: 2,
              borderBottom: "1px solid white",
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Welcome to BitTracker
            </Typography>
          </Box>
          <Box
            sx={{
              padding: 2,
              height: "calc(100% - 156px)",
              overflowY: "auto",
              backgroundColor: "#1F2937",
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: msg.user ? "flex-end" : "flex-start",
                  marginBottom: 1,
                }}
              >
                <Box
                  sx={{
                    borderRadius: 2,
                    padding: 1.5,
                    backgroundColor: msg.user ? "#374151" : "#4B5563",
                    color: "white",
                    maxWidth: "85%",
                    border: "1px solid #6B7280",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </Box>
              </Box>
            ))}
            {loading && (
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: "#6B7280",
                      borderRadius: "50%",
                      animation: "bounce 1.5s infinite",
                    }}
                  ></Box>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: "#6B7280",
                      borderRadius: "50%",
                      animation: "bounce 1.5s infinite 0.2s",
                      marginLeft: 1,
                    }}
                  ></Box>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: "#6B7280",
                      borderRadius: "50%",
                      animation: "bounce 1.5s infinite 0.4s",
                      marginLeft: 1,
                    }}
                  ></Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#9CA3AF", marginLeft: 1 }}
                >
                  Loading
                </Typography>
              </Box>
            )}
            <div ref={chatEndRef} />
          </Box>
          <Box
            sx={{
              padding: 2,
              borderTop: "1px solid white",
              backgroundColor: "#1F2937",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              sx={{
                marginRight: 1,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#374151",
                  color: "white",
                  "& fieldset": {
                    borderColor: "#6B7280",
                    borderRadius: "8px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#9CA3AF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "white",
                  "&::placeholder": {
                    color: "#9CA3AF",
                    opacity: 1,
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              sx={{
                padding: "10px",
                minWidth: "50px",
                minHeight: "50px",
                borderRadius: "50%",
                backgroundColor: "#4B5563",
                "&:hover": {
                  backgroundColor: "#374151",
                },
                border: "1px solid #6B7280",
              }}
            >
              <FaPaperPlane />
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Chatbot;
