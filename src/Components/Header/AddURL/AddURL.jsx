import React from "react";

function AddURL() {
  return (
    <form class="form-inline d-flex align-items-center flex-wrap m-2">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
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
