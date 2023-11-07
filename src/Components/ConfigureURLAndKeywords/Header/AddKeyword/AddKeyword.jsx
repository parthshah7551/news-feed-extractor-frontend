import React, { useState } from "react";
import { BASEURL } from "../../../../Constants/constant";
import axios from "axios";
import { useAppContext } from "../../../../AppContext";
import { toast } from "react-toastify";

function AddKeywordComponent() {
  const { isDataChanged, setIsDataChanged } = useAppContext();
  const [keywordText, setKeywordText] = useState("");
  const [deleteKeywordText, setDeleteKeywordText] = useState("");

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
  const removeKeywordFunction = async () => {
    try {
      const response = await axios.delete(
        `${BASEURL}/removeKeyword?deleteKeyword=${deleteKeywordText}`
      );
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setDeleteKeywordText("");
      setIsDataChanged(!isDataChanged);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <form className="form-inline d-flex m-1">
      <div className="d-flex flex-wrap">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="addKeywordtext"
            placeholder="Enter the Keyword"
            value={keywordText}
            style={{ width: "12rem" }}
            onChange={(e) => setKeywordText(e.target.value.toLowerCase())}
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
      </div>
      <div className="d-flex flex-wrap mx-2">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="deleteKeywordtext"
            placeholder="Enter the Keyword"
            value={deleteKeywordText}
            style={{ width: "12rem" }}
            onChange={(e) => setDeleteKeywordText(e.target.value.toLowerCase())}
          />
        </div>
        <button
          type="submit"
          className="ms-2 btn btn-danger"
          disabled={!deleteKeywordText}
          onClick={async (e) => {
            e.preventDefault();
            await removeKeywordFunction();
          }}
        >
          Delete Keyword
        </button>
      </div>
    </form>
  );
}

export default AddKeywordComponent;
