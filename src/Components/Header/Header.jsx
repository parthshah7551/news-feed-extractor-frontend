import React from "react";
import AddURLComponent from "./AddURL/AddURL";
import AddKeywordComponent from "./AddKeyword/AddKeyword";
import { Button } from "react-bootstrap";

function Header() {
  return (
    <div className="d-flex justify-content-between flex-wrap mt-2 m-3">
      <div className="d-flex flex-wrap">
        <AddURLComponent />
        <AddKeywordComponent />
      </div>
      <div>
        <Button variant="outline-info" className="m-2">
          Show keywords for all url
        </Button>
        <Button variant="outline-secondary" className=" m-2">
          Hide keywords for all url
        </Button>
        <Button variant="outline-success" className=" m-2">
          Save Edits
        </Button>
      </div>
    </div>
  );
}

export default Header;
