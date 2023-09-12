import React from "react";

function AddKeywordComponent() {
  return (
    <form className="form-inline d-flex align-items-center flex-wrap  m-2">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="addKeywordtext"
          placeholder="Enter the Keyword"
        />
      </div>
      <button type="submit" className="ms-2 btn btn-primary">
        Add Keyword
      </button>
    </form>
  );
}

export default AddKeywordComponent;
