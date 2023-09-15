import React, { useState } from "react";
import { BASEURL } from "../../../Constants/constant";
import axios from "axios";

function AddURL() {
  const [inputURLText, setInputURLText] = useState("");
  const addURLFunction = async () => {
    console.log("inputURLText: ", inputURLText);
    await axios.post(`${BASEURL}/addURL`, { url: inputURLText });
    setInputURLText("");
  };
  return (
    <form className="form-inline d-flex align-items-center flex-wrap m-2">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="addURLtext"
          placeholder="Enter the URL"
          value={inputURLText}
          onChange={(e) => setInputURLText(e.target.value.trim())}
        />
      </div>
      <button
        type="submit"
        className="ms-2 btn btn-primary"
        onClick={async (e) => {
          e.preventDefault();
          await addURLFunction();
        }}
        disabled={!inputURLText}
      >
        Add URL
      </button>
    </form>
  );
}

export default AddURL;
