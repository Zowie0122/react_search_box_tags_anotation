import React, { useState, useEffect } from "react";
import TagsInput from "./TagsInput";
import "./App.scss";

function App() {
  const [tags, setTags] = useState([]);
  const [commonSearches, setCommonSearches] = useState([]);
  const [hintsDropDown, setHintDropDown] = useState([]);

  const getHintTags = (e) => {
    if (e.target.value !== "") {
      const matchedTags = Object.keys(commonSearches).filter((ele) => {
        return ele.match(e.target.value);
      });
      setHintDropDown(matchedTags);
    } else {
      setHintDropDown([]);
    }
  };

  useEffect(() => {
    setCommonSearches(JSON.parse(localStorage.getItem("commonSearches")));
  }, []);

  useEffect(() => {
    const latestTag = tags[tags.length - 1];
    setCommonSearches(delete commonSearches["undefined"]);
    if (commonSearches[latestTag] === undefined) {
      setCommonSearches({ ...commonSearches, [latestTag]: 1 });
      localStorage.setItem("common_searches", JSON.stringify(commonSearches));
    } else {
      setCommonSearches({
        ...commonSearches,
        [latestTag]: (commonSearches[latestTag] += 1),
      });
      localStorage.setItem("common_searches", JSON.stringify(commonSearches));
    }
  }, [tags]);

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      setHintDropDown([]);
      event.target.value = "";
    }
  };

  const selectTags = (value) => {
    console.log(value);
    setTags([...tags, value]);
    setHintDropDown([]);
    document.getElementsByTagName("input")[0].value = "";
  };

  return (
    <div className="App">
      <TagsInput
        tags={tags}
        addTags={addTags}
        removeTags={removeTags}
        hintsDropDown={hintsDropDown}
        getHintTags={getHintTags}
        selectTags={selectTags}
      />
    </div>
  );
}

export default App;
