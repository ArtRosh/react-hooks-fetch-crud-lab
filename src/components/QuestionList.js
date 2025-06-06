import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, onDeleteQuestion}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(item => (
        <QuestionItem 
          key={item} 
          question={item}
          onDeleteQuestion={onDeleteQuestion}
          /> 
      ))}</ul>
    </section>
  );
}

export default QuestionList;
