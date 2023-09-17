import React from "react";
import AddURLComponent from "./AddURL/AddURL";
import AddKeywordComponent from "./AddKeyword/AddKeyword";
import { Button } from "react-bootstrap";

function Header({
  showAllKeywordsFunction,
  saveAllFunction,
  editAllFunction,
  isDataAddedFunction,
}) {
  return (
    <div className="d-flex justify-content-between flex-wrap mt-2 m-3">
      <div className="d-flex flex-wrap">
        <AddURLComponent isDataAddedFunction={isDataAddedFunction} />
        <AddKeywordComponent isDataAddedFunction={isDataAddedFunction} />
      </div>
      <div>
        <Button
          variant="outline-info"
          className="m-2"
          onClick={() => showAllKeywordsFunction(true)}
        >
          Show keywords for all url
        </Button>
        <Button
          variant="outline-secondary"
          className=" m-2"
          onClick={() => showAllKeywordsFunction(false)}
        >
          Hide keywords for all url
        </Button>
        <Button
          variant="outline-primary"
          className="m-2"
          onClick={() => editAllFunction()}
        >
          Edit All
        </Button>
        <Button
          variant="outline-success"
          className="m-2"
          onClick={() => saveAllFunction()}
        >
          Save All
        </Button>
      </div>
    </div>
  );
}

export default Header;
