import React, { useEffect } from "react";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

/**
 * BasicTopics: chains and prompt template
 * I follow official doc to learn these concepts
 * https://js.langchain.com/docs/get_started/quickstart
 * Langchain: allow us to integrate AI with our App easily. it is bridge between our app and LLM.
 *  => Application / data source ============= Lang chain =============== LLM
 * Topics:
 * 1. Simple LLM Chain which will take one prompt as input and return response coming from LLM
 * 2. Retrival Chain which will fetch data from separate DB and pass that as input in prompt template which will be passed to LLM
 * 3. Chat history to build conversational retieaval chain which will allow us to interact with LLM in chat manner
 * 4. Build Agent - which utilizes an LLM to determine whether or not it needs to fetch data to answer questions.
 *
 *  Open AI or Local Open Source LLM (this topics will be same for both kind of LLMs)
 *  We are using Open AI LLM.
 *
 *  Prerequisits:-
 *   npm install @langchain/openai
 *   Add REACT_APP_OPEN_AI_API_KEY="..." in .env file
 */

const BasicTopics = () => {
  const examples = {
    invokeModel: "Invoke the model",
    createPromptTemplateAndPassToModel:
      "Create Prompt template and pass that to our model",
    outputParser: "Output parser to parse response",
  };
  const chatWithLLM = async (example) => {
    /**
     * Topic 1: Simple LLM Chain: which will connect our app to LLM using langchain.
     *
     * const chain = promptTemplate.pipe(chatModel);
     *
     * before we understand Simple LLM Chain we will need to understand what is Model and what is Prompt Template
     *
     * so lets understand Model first
     */

    /**
     * Model:
     * Open AI LLM is traind on diffrent models so we can provide which model we are going to use by creating instance from ChatOpenAI.
     * means we are creating new instance by providing modelName and some configuration options so that we can use that OpenAI's model
     */

    // Example 1: Create and invoke the model

    const chatModel = new ChatOpenAI({
      openAIApiKey: process.env.REACT_APP_OPEN_AI_API_KEY, // replace with your API key
      modelName: "gpt-3.5-turbo", // Open AI LLM is traind on diffrent models so we can provide which model we are going to use
      temperature: 0,
      maxTokens: 150,
    });

    if (example === examples.invokeModel) {
      const res1 = await chatModel.invoke(
        "What would be a good company name a company that makes colorful socks?"
      );
      console.log(console.log("response 1 is ", res1));
    }

    /**
     * Now let's understand Prompt Template.
     * based on it's name you might already get idea that prompt is nothing but
     * input we will provide to model so that will perform action and return response.
     *
     * We will use Prompt Template to provide input into our created model.
     * Prompt Templates: which is used to convert raw user input to a better input for the LLM.
     *
     * So, now lets provide prompt to our model
     *
     * first import
     * import { ChatPromptTemplate } from "@langchain/core/prompts";
     *
     */

    // Example 2: Create Prompt template and pass that to our model

    /**
     * promptTemplate: we need to pass two messages one is
     * system: which indicate system message based on that our model will behave like that particular assistant
     * in below example it will behave like a technical documentation writer.
     *
     * user: in which we will pass user's input dynamically so that will be {input} replaced by prompt template and we don't need to worry about that
     */

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", "You are a world class technical documentation writer."],
      ["user", "Question is {input}"],
    ]);

    if (example === examples.createPromptTemplateAndPassToModel) {
      /**
       * Here you can see we used promptTemplate.pipe(chatModel) to pass our prompt to chat model
       * and what we get by initialise it called as Chain. so here we created one simple chain using
       * uses prompt template and model and we can invoke that chain instead of invoking model.
       *
       * So, now let's invoke chain to get result based on user's input
       */
      const chain = promptTemplate.pipe(chatModel);
      const res2 = await chain.invoke({
        input: "what is LangSmith in 50 characters?",
      });
      console.log("response 2 is", res2);
    }

    /**
     * In above example you will see that response is not coming as string but we want that as string.
     * So now topic "Output Parser" will come into the picture using which we can parse input and get the result in
     * proper format. in out case it will be string so now
     *
     * Let's add a simple output parser to convert the chat message to a string.
     *  import { StringOutputParser } from "@langchain/core/output_parsers";
     *
     */

    // Example 3: output parser to parse response and return string
    if (example === examples.outputParser) {
      const outputParser = new StringOutputParser();
      const llmChain = promptTemplate.pipe(chatModel).pipe(outputParser);
      const res3 = await llmChain.invoke({
        input: "what is LangSmith?",
      });
      console.log("response 3 is", res3);
    }

    // Simple LLM Chain end

    // Diving deeper
    // https://js.langchain.com/docs/modules/model_io
  };

  // uncomment to see response of particular examples one by one
  useEffect(() => {
    // Example 1: Create and invoke the model
    // chatWithLLM(examples.invokeModel);
    // Example 2: Create Prompt template and pass that to our model
    // chatWithLLM(examples.createPromptTemplateAndPassToModel);
    // Example 3: output parser to parse response and return string
    // chatWithLLM(examples.outputParser);
  }, []);
  return (
    <div>
      <h4>BasicTopics</h4>
      <ul>
        <li>Simple LLM Chain</li>
        <li>Model</li>
        <li>Prompt template</li>
        <li>Output parser</li>
      </ul>
    </div>
  );
};

export default BasicTopics;
