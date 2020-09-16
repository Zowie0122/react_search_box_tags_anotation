import React from "react";
import "./App.scss";

function TagsInput({
  tags,
  addTags,
  removeTags,
  hintsDropDown,
  getHintTags,
  selectTags,
}) {
  return (
    <div>
      <div className="tags-input">
        {tags.length !== 0 && (
          <ul id="tags">
            {tags.map((tag, index) => (
              <li key={index} className="tag">
                <span className="tag-title">{tag}</span>
                <span
                  className="tag-close-icon"
                  onClick={() => removeTags(index)}
                >
                  x
                </span>
              </li>
            ))}
          </ul>
        )}

        <input
          type="text"
          onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
          onChange={(e) => getHintTags(e)}
          placeholder="Search"
        />
      </div>
      <div className="hintDropDown">
        {hintsDropDown.length !== 0 && (
          <ul>
            {hintsDropDown.map((tag, index) => (
              <li key={index}>
                <span
                  onClick={() => {
                    selectTags(tag);
                  }}
                >
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TagsInput;
