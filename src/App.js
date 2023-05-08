import React, { useState } from "react";
import "./styles.css";
import Data from "./Data.js";
import { rotateFun } from "./rotation";

function App() {
  const subjects = ["Maths", "Physics", "Chemistry", "Biology"];
  const [selectedSubject, setSelectedSubject] = useState("");
  const [leftTableData, setLeftTableData] = useState([]);
  const [rightTableData, setRightTableData] = useState([]);
  const [rotationCount, setRotationCount] = useState(0); // Add rotationCount state variable

  const generateQuestionsArray = (subject) => {
    const questions = Array(10)
      .fill("")
      .map(
        (question, index) => `${index + 1}. ${subject} Question ${index + 1}`
      );
    return questions;
  };

  const handleDropdownChange = (event) => {
    const selectedSubject = event.target.value;
    setSelectedSubject(selectedSubject);
    const questions = generateQuestionsArray(selectedSubject);
    const data = new Data(selectedSubject, questions);
    setLeftTableData(data.questions);
  };

  const handleCopyButtonClick = () => {
    setRightTableData([...leftTableData]);
  };
  const handleRandomizeButtonClick = () => {
    const randomizedQuestions = [...leftTableData].sort(
      () => Math.random() - 0.5
    );
    setRightTableData(randomizedQuestions);
  };
  const handleRotateButtonClick = () => {
    if (rightTableData.length === 0) {
      const rotatedQuestions = rotateFun(
        [...leftTableData],
        leftTableData.length
      );
      setRightTableData(rotatedQuestions);
    } else {
      const rotatedQuestions = rotateFun(
        [...rightTableData],
        rightTableData.length
      );
      setRightTableData(rotatedQuestions);
    }
    setRotationCount(rotationCount + 1);
  };

  return (
    <div className="App">
      <div className="dropdown">
        <select value={selectedSubject} onChange={handleDropdownChange}>
          <option value="">Select a subject</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Question Bank</th>
            </tr>
          </thead>
          <tbody>
            {leftTableData.map((question, index) => (
              <tr key={index}>
                <td>{question}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Question</th>
            </tr>
          </thead>
          <tbody>
            {rightTableData.map((question, index) => (
              <tr key={index}>
                <td>{question}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-container">
        <button onClick={handleCopyButtonClick}>Question Sequence </button>
        <button onClick={handleRotateButtonClick}>Rotate</button>
        <button onClick={handleRandomizeButtonClick}>Randomize</button>
      </div>
    </div>
  );
}

export default App;
