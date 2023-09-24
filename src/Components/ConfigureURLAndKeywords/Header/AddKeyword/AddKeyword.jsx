import React, { useState } from "react";
import { BASEURL } from "../../../../Constants/constant";
import axios from "axios";
import { useAppContext } from "../../../../AppContext";
import { toast } from "react-toastify";

function AddKeywordComponent() {
  const { isDataChanged, setIsDataChanged } = useAppContext();
  const [keywordText, setKeywordText] = useState("");

  const addKeywordFunction = async () => {
    try {
      const newKeyWordsData = {
        [keywordText]: true,
      };
      await axios.post(`${BASEURL}/addKeyword`, newKeyWordsData);
      setKeywordText("");
      setIsDataChanged(!isDataChanged);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <form className="form-inline d-flex align-items-center flex-wrap  m-2">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="addKeywordtext"
          placeholder="Enter the Keyword"
          value={keywordText}
          onChange={(e) => setKeywordText(e.target.value.trim())}
        />
      </div>
      <button
        type="submit"
        className="ms-2 btn btn-primary"
        disabled={!keywordText}
        onClick={async (e) => {
          e.preventDefault();
          await addKeywordFunction();
          toast.success("Keyword Added successfully!");
        }}
      >
        Add Keyword
      </button>
    </form>
  );
}

export default AddKeywordComponent;
