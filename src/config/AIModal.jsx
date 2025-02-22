import { GoogleGenerativeAI } from "@google/generative-ai";

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  // console.log(apiKey);
  // console.log(import.meta.env.VITE_GEMINI_API_KEY);
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",//text/plain
  };
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "give me a json response \n      title: \"\",\n      description: \"\",\n      completed: false,\n      dueDate: \"\"\n\ni want a json object of a todo.\ncreate a todo for doing homework with description of dbms assignment and coa assignment and i have to complete this of before 15-02-2025 "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"title\": \"Do Homework\",\n  \"description\": \"Complete DBMS assignment and COA assignment.\",\n  \"completed\": false,\n  \"dueDate\": \"2025-02-15\"\n}\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());