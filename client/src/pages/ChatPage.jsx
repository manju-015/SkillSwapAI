import { useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import api from "../api/api";

import io from "socket.io-client";

import { Send, User } from "lucide-react";

import { motion } from "framer-motion";

const socket = io("http://localhost:5000");

function ChatPage() {
  const { userId } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [text, setText] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("joinRoom", userInfo._id);

    fetchMessages();

    fetchSelectedUser();

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const fetchMessages = async () => {
    try {
      const { data } = await api.get(`/chat/${userId}`);

      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSelectedUser = async () => {
    try {
      const { data } = await api.get(`/users/${userId}`);

      console.log(data);

      setSelectedUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      const { data } = await api.post("/chat/send", {
        receiver: userId,
        message: text,
      });

      socket.emit("sendMessage", data);

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col bg-slate-900 border border-slate-800 rounded-[30px] overflow-hidden shadow-2xl">
      {/* HEADER */}
      <div className="bg-slate-950 border-b border-slate-800 px-8 py-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
          <span className="text-2xl font-bold">
            {selectedUser?.name?.charAt(0)}
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold">{selectedUser?.name}</h2>

          <p className="text-slate-400">{selectedUser?.email}</p>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-950">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-lg">
            No messages yet
          </div>
        ) : (
          messages.map((message, index) => {
            const isOwn =
              message.sender === userInfo._id ||
              message.sender?._id === userInfo._id;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-6 py-4 rounded-3xl shadow-lg ${
                    isOwn
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-slate-800 text-slate-100 rounded-bl-md"
                  }`}
                >
                  <p className="text-lg leading-relaxed">{message.message}</p>

                  <p className="text-xs opacity-70 mt-2">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="bg-slate-950 border-t border-slate-800 p-6">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type your message..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 text-lg"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 transition p-5 rounded-2xl shadow-lg"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
