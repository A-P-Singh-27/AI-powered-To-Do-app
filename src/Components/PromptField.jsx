import React, { useState } from "react";
import { chatSession } from "../config/AIModal";
import { AI_Prompt } from "../assets/Prompt";
import { IoMicCircle } from "react-icons/io5";
import { IoClose } from "react-icons/io5"; // Import close icon
import { useNavigate } from "react-router-dom";
import { IoMicOffCircle } from "react-icons/io5";

export default function PromptField({ onClose }) {
    const [mic, setMic] = useState(false);
    const navigate = useNavigate();
    const [Prompt, setPrompt] = useState(""); // Store textarea value

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Set language
    recognition.continuous = true; // Stop after one sentence
    recognition.interimResults = true; // Get final results only

    recognition.onresult = (event) => {
        let text = "";
        for (let i = 0; i < event?.results?.length; i++) {
            text += event.results[i][0].transcript;
        }
        setPrompt(text);
    };

    recognition.onend = () => {
        setMic(false);
    };

    const startListening = () => {
        setMic(true);
        recognition.start();
    };

    const stopListening = () => {
        recognition.onresult = null; // Remove the event listener
        recognition.stop();
        setMic(false);
    };

    const getTodos = () => {
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    };
    const toggleListening = () => {
        if (mic) {
            recognition.stop();
            setMic(false);
        } else {
            setMic(true);
            recognition.start();
        }
    };


    const sendToAi = async (Promptbyuser) => {
        const finalPrompt = AI_Prompt.replace("{prompt}", Promptbyuser);
        console.log(finalPrompt);

        const result = await chatSession.sendMessage(finalPrompt);
        const parsedResult = JSON.parse(result?.response?.text());

        let updatedTodos = getTodos();

        if (Array.isArray(parsedResult)) {
            parsedResult.forEach((todo,index) => {
                todo.id = Date.now()+index;
                // if (!todo.createdAt) {
                    todo.createdAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
                // }
                updatedTodos.push(todo);
            });
        } else if (typeof parsedResult === 'object' && parsedResult !== null) {
            parsedResult.id = Date.now();
            parsedResult.createdAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            updatedTodos.push(parsedResult);
        }

        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        setPrompt("");
        stopListening();
        alert("Todo Creation Successfull")
        navigate('/');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* Close Button */}
            <button className="absolute top-2 right-2 text-gray-600 hover:text-black" onClick={onClose}>
                <IoClose className="text-2xl" />
            </button>

            <textarea
                value={Prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="border p-2 w-full h-40"
                required
                placeholder="Speak or type your prompt..."
            />
            <div className="flex gap-4 justify-center mt-4">
                <button
                    className="border px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => sendToAi(Prompt)}
                >
                    Send
                </button>
                <button
                    className={`border ${mic ? "text-red-500" : "text-red-300"} rounded-full`}
                    onClick={toggleListening}
                >
                    {
                        !mic ?
                            <IoMicCircle className="text-5xl" />
                            :
                            <IoMicOffCircle className="text-5xl" />
                    }
                </button>
            </div>
        </div>
    );
}
