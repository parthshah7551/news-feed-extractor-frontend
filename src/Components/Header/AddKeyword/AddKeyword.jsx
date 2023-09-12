import React, { useState } from "react";
import { BASEURL } from "../../../Constants/constant";
import axios from "axios";

function AddKeywordComponent() {
  const [keywordText, setURLText] = useState("");

  const addKeywordFunction = async () => {
    console.log("keywordText: ", keywordText);
    const newKeyWordsData = {
      [keywordText]: true,
    };
    await axios.post(`${BASEURL}/addKeyword`, newKeyWordsData);
    setURLText("");
  };
  return (
    <form className="form-inline d-flex align-items-center flex-wrap  m-2">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="addKeywordtext"
          placeholder="Enter the Keyword"
          onChange={(e) => setURLText(e.target.value.trim())}
        />
      </div>
      <button
        type="submit"
        className="ms-2 btn btn-primary"
        disabled={!keywordText}
        onClick={async (e) => {
          e.preventDefault();
          await addKeywordFunction();
        }}
      >
        Add Keyword
      </button>
    </form>
  );
}

export default AddKeywordComponent;
