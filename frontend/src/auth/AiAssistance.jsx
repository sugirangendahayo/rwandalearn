/* eslint-disable react/no-unknown-property */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import ai_robot from "../assets/images/airobot.png";
import user from "../assets/images/user.png";

const AiAssistance = () => {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const chatContainerRef = useRef(null); // Ref for auto-scrolling

  // Check for SpeechRecognition support on mount
  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      setIsSpeechSupported(false);
      setError("Speech recognition is not supported in this browser.");
    }
  }, []);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  // Handle text prompt submission
  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await callGeminiAPI(
        `
        You are a Kinyarwanda language assistant. Respond only to questions related to Kinyarwanda language, culture, or usage. If the question is unrelated, say "I can only assist with Kinyarwanda-related queries."
        - If the input is in English, respond primarily in Kinyarwanda followed by an English translation in parentheses (e.g., "Mwaramutse (Hello)").
        - If the input appears to be in Kinyarwanda (e.g., contains words like "mwaramutse", "murakoze"), respond primarily in English followed by a Kinyarwanda translation in parentheses (e.g., "Hello (Mwaramutse)").
        Previous conversation: ${JSON.stringify(conversation)}
        Current question: "${prompt}"
        Provide the answer in plain text, no Markdown.
        `
      );
      setConversation((prev) => [
        ...prev,
        { user: prompt, ai: response.trim() },
      ]);
      setPrompt("");
    } catch (err) {
      setError(`Failed to get response: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (!isSpeechSupported) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    if (!navigator.onLine) {
      setError(
        "No internet connection. Voice recognition requires an active network."
      );
      return;
    }

    setIsListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      const spokenText = event.results[0][0].transcript;
      setConversation((prev) => [...prev, { user: spokenText, ai: "" }]);

      setLoading(true);
      setError(null);
      try {
        const response = await callGeminiAPI(
          `
          You are a Kinyarwanda language assistant. The user spoke: "${spokenText}". 
          - If the input is in English, respond primarily in Kinyarwanda followed by an English translation in parentheses (e.g., "Mwaramutse (Hello)").
          - If the input appears to be in Kinyarwanda (e.g., contains words like "mwaramutse", "murakoze"), respond primarily in English followed by a Kinyarwanda translation in parentheses (e.g., "Hello (Mwaramutse)").
          - If unrelated to Kinyarwanda, say "I can only assist with Kinyarwanda-related queries."
          Previous conversation: ${JSON.stringify(conversation)}
          Return the response as plain text, no Markdown.
          `
        );
        console.log("Raw API response:", response);

        setConversation((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].ai = response.trim();
          return updated;
        });

        const englishMatch = response.match(/\((.*?)\)/);
        const textToSpeak = englishMatch
          ? englishMatch[1]
          : response.includes("I can only assist")
          ? response
          : "";
        if (textToSpeak) {
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.lang = "en-US";
          window.speechSynthesis.speak(utterance);
        }
      } catch (err) {
        setError(`Failed to process voice input: ${err.message}`);
      } finally {
        setLoading(false);
        setIsListening(false);
      }
    };

    recognition.onerror = (event) => {
      setError(`Voice recognition error: ${event.error}`);
      if (event.error === "network") {
        setError(
          "Network error: Please check your internet connection and try again."
        );
      }
      setIsListening(false);
      setLoading(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // Clear conversation
  const handleEndConversation = () => {
    setConversation([]);
    setPrompt("");
    setIsListening(false);
    window.speechSynthesis.cancel();
    setError(null);
  };

  const callGeminiAPI = async (prompt) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please wait and try again.");
        }
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Kinya<span className="text-success">Learn</span> AI Assistant
      </h1>

      {/* Conversation History */}
      <div ref={chatContainerRef} className="flex-1 chat  overflow-y-auto">
        {conversation.map((entry, index) => (
          <div key={index} className="mb-2">
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-success">
                <div className="flex gap-2">
                  <span>
                    <img src={user} alt="" className="w-5" />
                  </span>
                  <span>{entry.user}</span>
                </div>
              </div>
            </div>
            {entry.ai && (
                <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-info">
                <div className="flex gap-2">
                  <span>
                    <img src={ai_robot} alt="" className="w-5" />
                  </span>
                  <span>{entry.ai}</span>
                </div>
              </div>
            </div>
            )}
          </div>
        ))}
      </div>

      {/* Fixed Bottom Input Area */}
      <div className="fixed bottom-0 left-12 right-0 w-[80%] mx-auto p-4 bg-base-100 z-[50]">
        {/* Text Input */}
        <form onSubmit={handleTextSubmit} className="form-control mb-4  ">
          <div className="input-group relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask about Kinyarwanda..."
              className="w-full py-3 outline-none border-[1px] border-gray-300 px-3 "
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-black absolute right-[7%] top-[12%] text-white p-2 rounded-full cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <span>
                  <span className="loading loading-ring loading-lg"></span>
                </span>
              ) : (
                <span>
                  <svg
                    data-slot="icon"
                    fill="none"
                    className="w-5"
                    stroke-width="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                    ></path>
                  </svg>
                </span>
              )}
            </button>

            {/* Voice and End Buttons */}

            <button
              type="submit"
              className="bg-black absolute right-[2%] top-[12%] text-white p-2 rounded-full cursor-pointer "
              onClick={handleVoiceInput}
              disabled={loading || isListening || !isSpeechSupported}
            >
              {/* {isListening ? "Listening..." : "Speak to AI"} */}
              {isListening ? (
                <span>
                  <span className="loading loading-ring loading-lg transition-all duration-300"></span>
                </span>
              ) : (
                <span>
                  <svg
                    data-slot="icon"
                    fill="none"
                    className="w-5"
                    stroke-width="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                    ></path>
                  </svg>
                </span>
              )}
            </button>
          </div>
        </form>
        {/* <button
            className="btn btn-warning flex-1"
            onClick={handleEndConversation}
            disabled={loading}
          >
            End Conversation
   

        {/* Error Display */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {!isSpeechSupported && (
          <p className="text-yellow-500 mt-2">
            Voice feature unavailable. Use text input instead.
          </p>
        )}
      </div>
    </div>
  );
};

export default AiAssistance;
