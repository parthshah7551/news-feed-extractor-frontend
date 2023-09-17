import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { accordianData } from "../../Constants/accordianData";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BASEURL } from "../../Constants/constant";

function AccordionComponent({
  isShowAllKeywords,
  isSaveAllToggle,
  isEditAllToggle,
  isDataAdded,
}) {
  const [activeKey, setActiveKey] = useState([]);
  const [editArray, setEditArray] = useState([]);
  const [urlKeywordsData, setUrlKeywordsData] = useState({});
  const [isDataChange, setIsDataChange] = useState(false);

  const urlKeywordsDataFunction = async () => {
    const urlKeywordsDetails = await axios.get(`${BASEURL}/urlKeywordsDetails`);
    if (urlKeywordsDetails.status === 200 && urlKeywordsDetails?.data) {
      setUrlKeywordsData(urlKeywordsDetails.data);
    } else {
      setUrlKeywordsData({});
    }
  };

  const getMasterKeywordsDataFunction = async () => {
    const urlKeywordsDetails = await axios.get(
      `${BASEURL}/masterKeywordsDetails`
    );
    if (urlKeywordsDetails.status === 200) {
      setUrlKeywordsData(urlKeywordsDetails.data);
    } else {
      setUrlKeywordsData([]);
    }
  };

  const onDeleteButtonFunction = async (url) => {
    await axios.delete(`${BASEURL}/removeURL/?url=${url}`);
    setIsDataChange(!isDataChange);
  };

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

  useEffect(() => {
    urlKeywordsDataFunction();
  }, [isDataAdded, isDataChange]);

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
      {Object.keys(urlKeywordsData).map((urlItem, index) => {
        return (
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header onClick={() => openAccordionFunction(index)}>
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex align-items-center">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`inlineCheckbox1${index}`}
                      value={index}
                      defaultChecked={urlKeywordsData[urlItem]?.isChecked}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </div>
                  <div className="mt-1">{urlItem}</div>
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
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (window.confirm("Are you sure?")) {
                          await onDeleteButtonFunction(urlItem);
                        }
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
              {Object.keys(urlKeywordsData[urlItem]?.keywords).map(
                (keywordItem, keyWordIndex) => {
                  return (
                    <div
                      className="form-check form-check-inline"
                      key={keyWordIndex}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`inlineCheckbox1${keyWordIndex}`}
                        value={keyWordIndex}
                        disabled={!editArray.includes(index)}
                        defaultChecked={
                          urlKeywordsData[urlItem]?.keywords[keywordItem]
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox1"
                      >
                        {keywordItem}
                      </label>
                    </div>
                  );
                }
              )}
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

export default AccordionComponent;
