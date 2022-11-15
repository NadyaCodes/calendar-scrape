import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [info, setInfo] = useState();
  // fetch("https://tickets.mirvish.com/events/")
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));
  // fetch("http://localhost:5002/getData").then((data) => console.log(data.body));

  fetch("http://localhost:5002/getData")
    .then((response) => response.json())
    .then((data) => {
      const todayIndex = data.indexOf("day-block  today");
      const todayString = data.substr(todayIndex, 2000);
      const aHRefIndex = todayString.indexOf("a href");
      let showStartIndex = aHRefIndex;
      while (todayString[showStartIndex] !== ">") {
        showStartIndex++;
      }
      showStartIndex++;

      let showEndIndex = showStartIndex;

      while (todayString[showEndIndex] !== "<") {
        showEndIndex++;
      }

      const showString = todayString.substring(showStartIndex, showEndIndex);

      console.log(todayString);
      let startTimeIndex = todayString.indexOf("time");
      startTimeIndex += 6;
      console.log(todayString[startTimeIndex]);

      let endTimeIndex = startTimeIndex;

      while (todayString[endTimeIndex] !== "<") {
        endTimeIndex++;
      }

      const showTime = todayString.substring(startTimeIndex, endTimeIndex);

      setInfo(`Soulpepper Theatre: ${showString}: ${showTime}`);
      // let
      // console.log(data);
    });
  // console.log(data);
  // setInfo(data));

  return <div className="App">{info && <section>{info}</section>}</div>;
}

export default App;
