import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateAddTodo() {
    const location = useLocation();
    const navigate = useNavigate();
    
    
    const searchParams = new URLSearchParams(location.search);
    const isEditing = location.pathname === "/updatetodo";

    // Function to format date & time
    const formatDateTime = (date) => {
        return date.toISOString().replace("T", " ").substring(0, 16); // "YYYY-MM-DD HH:MM"
    };

    // Initialize state
    const [todo, setTodo] = useState({
        id: Date.now(),
        title: "",
        description: "",
        completed: false,
        dueDate: "",
        createdAt: formatDateTime(new Date()), // Set creation time
    });

    const title = searchParams.get("title") || "";
    const description = searchParams.get("description") || "";
    const completed = searchParams.get("completed") === "true";
    const dueDate = searchParams.get("dueDate") || "";
    const createdAt = searchParams.get("createdAt") || formatDateTime(new Date());
    // Load existing todo data if editing
    useEffect(() => {
        if (isEditing) {

            setTodo({ title, description, completed, dueDate, createdAt });
        } else {
            // Set a due date 2 days from today
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 2);
            const formattedDate = futureDate.toISOString().split("T")[0];

            setTodo((prev) => ({ ...prev, dueDate: formattedDate }));
        }
    }, [location.search]);

    // Get todos from localStorage
    const getTodos = () => {
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    };

    // Handle form submission (Add or Update)
    const submitHandle = (e) => {
        e.preventDefault();

        if (!todo.title.trim() || !todo.description.trim()) {
            alert("Title and Description are required!");
            return;
        }

        let updatedTodos = getTodos();

        if (isEditing) {
            // Update existing todo
            updatedTodos = updatedTodos.map((t) =>
                t.title === title ? todo : t
            );
            localStorage.setItem("todos", JSON.stringify(updatedTodos));

            // Navigate back to home after updating
            navigate("/");
        } else {
            // Add new todo with creation time
            updatedTodos.push({ ...todo, id: Date.now(), createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));

            // Reset form fields after creating a new todo
            setTodo({
                id: Date.now(),
                title: "",
                description: "",
                completed: false,
                dueDate: "",
                createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            });
        }
    };


    return (
        <div className="p-20 flex flex-col gap-4">
            <form onSubmit={submitHandle} className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Todo Title</label>
                    <input
                        type="text"
                        value={todo.title}
                        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                    />
                </div>

                <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={todo.description}
                        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                    />
                </div>

                {isEditing && (
                    <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">Completed</label>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
                            className="mt-1"
                        />
                    </div>
                )}

                {/* Show Created At (Read-only) */}
                {isEditing && (
                    <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">Created At</label>
                        <input
                            type="text"
                            value={todo.createdAt}
                            readOnly
                            className="mt-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-xs cursor-not-allowed"
                        />
                    </div>
                )}

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                        type="submit"
                        className="inline-block shrink-0 rounded-md border bg-red-300 px-12 py-3 text-sm font-medium text-black transition hover:bg-transparent hover:text-blue-600"
                    >
                        {isEditing ? "Update Todo" : "Create Todo"}
                    </button>
                </div>
            </form>

            <button
                onClick={() => navigate('/')}
                className="inline-block shrink-0 rounded-md border bg-slate-300 px-12 py-3 text-sm font-medium text-black transition hover:bg-transparent hover:text-blue-600"
            >
                Back
            </button>
        </div>
    );
}
