import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { accordianData } from "../../Constants/accordianData";
import { Button } from "react-bootstrap";
import { keywordData } from "../../Constants/keywordData";

function AccordionComponent({
  isShowAllKeywords,
  isSaveAllToggle,
  isEditAllToggle,
}) {
  const [activeKey, setActiveKey] = useState([]);
  const [editArray, setEditArray] = useState([]);

  useEffect(() => {
    setActiveKey(
      isShowAllKeywords > 0 ? accordianData.map((_, index) => index) : []
    );
  }, [isShowAllKeywords]);

  useEffect(() => {
    setActiveKey(accordianData.map((_, index) => index));
    setEditArray(accordianData.map((_, index) => index));
  }, [isEditAllToggle]);

  useEffect(() => {
    setActiveKey([]);
    setEditArray([]);
  }, [isSaveAllToggle]);

  const openAccordionFunction = (index) => {
    const elemIndex = activeKey.indexOf(index);
    if (elemIndex > -1) {
      activeKey.splice(elemIndex, 1);
      setActiveKey([...activeKey]);
    } else {
      setActiveKey([...activeKey, index]);
    }
  };
  const editButtonFunction = (index) => {
    setEditArray([...editArray, index]);
  };
  const onSaveButtonFunction = (index) => {
    const elemIndex = editArray.indexOf(index);
    if (elemIndex > -1) editArray.splice(elemIndex, 1);
    setEditArray([...editArray]);
  };

  return (
    <Accordion className="m-3" activeKey={activeKey} alwaysOpen>
      {accordianData.map((item, index) => {
        return (
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header onClick={() => openAccordionFunction(index)}>
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex align-items-center">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id={`inlineCheckbox1${index}`}
                      value={index}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </div>
                  <div className="mt-1">{item.title}</div>
                </div>
                {editArray.includes(index) ? (
                  <div>
                    <Button
                      variant="outline-success"
                      className="ms-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSaveButtonFunction(index);
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="ms-2 me-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSaveButtonFunction(index);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline-primary"
                    className="ms-2 me-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      editButtonFunction(index);
                    }}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {keywordData.map((keywordItem, keyWordIndex) => {
                console.log("keywordItem: ", keywordItem);
                return (
                  <div class="form-check form-check-inline" key={keyWordIndex}>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id={`inlineCheckbox1${keyWordIndex}`}
                      value={keyWordIndex}
                      disabled={!editArray.includes(index)}
                      defaultChecked={keywordItem.isChecked}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                    <label class="form-check-label" for="inlineCheckbox1">
                      {keywordItem.keyword}
                    </label>
                  </div>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

export default AccordionComponent;
