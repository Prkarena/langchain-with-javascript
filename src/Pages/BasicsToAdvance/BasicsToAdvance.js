import React from "react";
import BasicTopics from "./BasicTopics/BasicTopics";
import AdvanceTopics from "./AdvanceTopics/AdvanceTopics";

/**
 * Langchain: Check the code inside js file to learn these topics 
 */
const BasicsToAdvance = () => {
  return (
    <div style={{ padding: "20px" }}>
      Check the code inside js file to learn these topics 
      <BasicTopics />
      <AdvanceTopics />
    </div>
  );
};

export default BasicsToAdvance;
