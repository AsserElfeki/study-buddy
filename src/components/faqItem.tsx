"use client";

import React, { useState } from "react";

function FaqItem() {
  const faqItems = [
    {
      question: "What is services does your website offer?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A, odit deserunt, ex ad, nemo saepe suscipit voluptates fugiat non minus minima libero eius sit tempora ducimus quia quisquam odio dignissimos.",
    },
    {
      question: "What are the requirements for applying?",
      answer:
        "The requirements for applying to universities in Poland can vary depending on the specific program and university you are interested in. However, in general, you will typically need to have completed a high school education or equivalent, and have a good command of the language of instruction (usually Polish or English). Additionally, some programs may require you to take entrance exams or submit additional documents, such as a portfolio or recommendation letters. You can find more information about the specific requirements for each program on our website, or by contacting the university directly.",
    },
    {
      question: "How do I sign up on your website?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A, odit deserunt, ex ad, nemo saepe suscipit voluptates fugiat non minus minima libero eius sit tempora ducimus quia quisquam odio dignissimos.",
    },
    {
      question: "How to Apply to Universities?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A, odit deserunt, ex ad, nemo saepe suscipit voluptates fugiat non minus minima libero eius sit tempora ducimus quia quisquam odio dignissimos.",
    },
  ];

  const [selectedQuestion, setSelectedQuestion] = useState<string>("");

  return (
    <div className="w-4/5 md:w-3/5 mx-auto">
      {faqItems.map((item) => (
        <div key={item.question} className="bg-white mb-2 p-3 rounded-xl">
          <button
            className="flex w-full justify-between items-center"
            onClick={() =>
              setSelectedQuestion(
                item.question === selectedQuestion ? "" : item.question
              )
            }
          >
            <h1 className="font-bold">
              <span className="mr-1">Q:</span>
              {item.question}
            </h1>
            {item.question === selectedQuestion ? (
              <div className="text-lg bg-gray-200 w-7 h-7 rounded-full font-bold ">
                &#11167;
              </div>
            ) : (
              <div className=" text-lg bg-gray-200 w-7 h-7 rounded-full font-bold">
                &#11166;
              </div>
            )}
          </button>
          {item.question === selectedQuestion && (
            <p className="mt-2">
              <span className="mr-2">A:</span>
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default FaqItem;
