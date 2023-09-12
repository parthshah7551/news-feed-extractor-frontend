import React from "react";

function AddURL() {
  return (
    <form className="form-inline d-flex align-items-center flex-wrap m-2">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="addURLtext"
          placeholder="Enter the URL"
        />
      </div>
      <button type="submit" className="ms-2 btn btn-primary">
        Add URL
      </button>
    </form>
  );
}

export default AddURL;
