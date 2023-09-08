import React from "react";

function AddKeywordComponent() {
  return (
    <form class="form-inline d-flex align-items-center flex-wrap  m-2">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
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
