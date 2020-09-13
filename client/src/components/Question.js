import React from "react";

//it's job is to maintain state and display each question in turn,
//allow smooth navigation between each with nice styling

//each part of the Form will have a FormPage, which will have a Question, Option(s), Response
//components that render
//GRID your formpage for sure, for pixel perfection
const Question = (props) => {
  const { question } = props;
  return (
    <div className="question-container">
      <div id="question" className="">
        {question}
      </div>
    </div>
  );
};

export default Question;
