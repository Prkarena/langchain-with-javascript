import React, { useState } from "react";
import { ChatOpenAI } from "@langchain/openai";
import {
  SystemMessagePromptTemplate,
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";

const postTypes = [
  {
    label: "LinkedIn",
    value: "linkedin",
  },
  {
    label: "Facebook",
    value: "facebook",
  },
  {
    label: "Instagram",
    value: "instagram",
  },
  {
    label: "Twitter",
    value: "twitter",
  },
];

/**
 *
 *  npx create-react-app langchain-with-javascript
 *  npm i -S langchain
 *  npm install @langchain/openai
 *  check generatePost function which will take user input and return answer from LLM
 *
 */
function PostGenerator() {
  const [selectedPostType, setSelectedPostType] = useState(postTypes[0].value);
  const [postBrief, setPostBrief] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");

  const generatePost = async (type, postBrief) => {
    const chat = new ChatOpenAI({
      openAIApiKey: process.env.REACT_APP_OPEN_AI_API_KEY, // replace with your API key
      modelName: "gpt-3.5-turbo",
      maxTokens: 150,
    });
  
    // system message: message how system will provide response when user asked something
    const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
      `You are Post generator AI assistant. provide 200 characters post based on user's input for particular social media`
    );
  
    // user message: user will provide type and brief details so will pass that as human message
    const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(
      "post type is {type} and details {postBrief}"
    );
  
    // chat prompt will take system message and human message
    const chatPrompt = ChatPromptTemplate.fromMessages([
      systemMessagePrompt,
      humanMessagePrompt,
    ]);
  
    // format chat prompt with user actual input details
    const formattedChatPrompt = await chatPrompt.formatMessages({
      type,
      postBrief,
    });
  
    // use open ai chat to invoke formatted chat message
    const response = await chat.invoke(formattedChatPrompt);
    return response?.content;
  };

  const handleGeneratePost = async () => {
    try {
      const generatedPost = await generatePost(selectedPostType, postBrief);
      setGeneratedPost(generatedPost);
    } catch (error) {
      console.error("Error:", error);
      setGeneratedPost("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Post Generator</h2>
      <div>
        <select
          value={selectedPostType}
          onChange={(e) => setSelectedPostType(e.target.value)}
        >
          <option value="">Select Platform</option>
          {postTypes.map((postType) => (
            <option key={postType.value} value={postType.value}>
              {postType.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          value={postBrief}
          onChange={(e) => setPostBrief(e.target.value)}
          placeholder="Write a brief description (100 characters max)"
          maxLength={100}
          style={{
            height: "100px",
            width: "400px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
      </div>
      <div>
        <button onClick={handleGeneratePost}>Generate Post</button>
      </div>
      <div>{generatedPost && <p>Generated Post: {generatedPost}</p>}</div>
    </div>
  );
}

export default PostGenerator;
