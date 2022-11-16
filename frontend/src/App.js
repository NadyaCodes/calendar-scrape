import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [soulpepper, setSoulpepper] = useState();
  const [tarragon, setTarragon] = useState();

  const findData = (string, index, symbol) => {
    while (string[index] !== symbol) {
      index++;
    }
    return index;
  };

  useEffect(() => {
    fetch("http://localhost:5002/soulpepper")
      .then((response) => response.json())
      .then((data) => {
        const todayIndex = data.indexOf("day-block  today");
        const todayString = data.substr(todayIndex, 2000);
        const aHRefIndex = todayString.indexOf("a href");
        let startIndex = aHRefIndex;

        let showStartIndex = findData(todayString, startIndex, ">") + 1;

        let showEndIndex = findData(todayString, showStartIndex, "<");

        const showString = todayString.substring(showStartIndex, showEndIndex);

        // console.log(todayString);
        let startTimeIndex = todayString.indexOf("time");
        startTimeIndex = findData(todayString, startTimeIndex, ">") + 1;
        // console.log(todayString[startTimeIndex]);

        const endTimeIndex = findData(todayString, startTimeIndex, "<");

        const showTime = todayString.substring(startTimeIndex, endTimeIndex);

        setSoulpepper(`Soulpepper Theatre: ${showString}: ${showTime}`);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5002/tarragon")
      .then((response) => response.text())
      .then((data) => {
        setTarragon(data);
        // const todayIndex = data.indexOf("day-block  today");
        // const todayString = data.substr(todayIndex, 2000);
        // const aHRefIndex = todayString.indexOf("a href");
        // let startIndex = aHRefIndex;
        // let showStartIndex = findData(todayString, startIndex, ">") + 1;
        // let showEndIndex = findData(todayString, showStartIndex, "<");
        // const showString = todayString.substring(showStartIndex, showEndIndex);
        // // console.log(todayString);
        // let startTimeIndex = todayString.indexOf("time");
        // startTimeIndex = findData(todayString, startTimeIndex, ">") + 1;
        // // console.log(todayString[startTimeIndex]);
        // const endTimeIndex = findData(todayString, startTimeIndex, "<");
        // const showTime = todayString.substring(startTimeIndex, endTimeIndex);
        // setSoulpepper(`Soulpepper Theatre: ${showString}: ${showTime}`);
      });
  }, []);

  return (
    <div className="App">
      {soulpepper && <section>{soulpepper}</section>}
      {tarragon && <section>{tarragon}</section>}
    </div>
  );
}

export default App;
