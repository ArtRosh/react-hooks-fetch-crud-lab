import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";


function App() {
  const [page, setPage] = useState("List");

  // state for data with subsequent extraction with fetch
  const [questions, setQuestions] = useState([]);


  // handling adding new questions
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  // useEffect with fetch
  useEffect(() => {
    async function fetchData() {
      try{
        const res = await fetch("http://localhost:4000/questions");
        const data = await res.json();
        setQuestions(data); // set state here
      } catch(err){
        console.error("GET error", err);
      }
    }
    fetchData();
  }, []);


  async function onDeleteQuestion(id) {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      setQuestions(question => question.filter(question => question.id !== id))
    } catch (err) {
      console.error("DELETE error:", err)
    }
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm handleAddQuestion={handleAddQuestion}/>
      ) : (
      <QuestionList 
        questions={questions}
        onDeleteQuestion={onDeleteQuestion}
        />
      )}
    </main>
  );
}

export default App;
