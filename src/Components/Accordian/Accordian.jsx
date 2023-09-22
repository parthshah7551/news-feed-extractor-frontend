import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { accordianData } from "../../Constants/accordianData";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BASEURL } from "../../Constants/constant";
import moment from "moment";

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
  const [editedData, setEditedData] = useState({});

  const urlKeywordsDataFunction = async () => {
    const urlKeywordsDetails = await axios.get(`${BASEURL}/urlKeywordsDetails`);
    if (urlKeywordsDetails.status === 200 && urlKeywordsDetails?.data) {
      setUrlKeywordsData(urlKeywordsDetails.data);
    } else {
      setUrlKeywordsData({});
    }
  };

  const onDeleteButtonFunction = async (url) => {
    await axios.delete(`${BASEURL}/removeURL/?url=${url}`);
    setIsDataChange(!isDataChange);
  };

  const saveAllDataFunction = async () => {
    try {
      await axios.put(`${BASEURL}/editURL`, editedData);
    } catch (error) {
      console.log("error: ", error);
    }
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
    saveAllDataFunction();
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
  const onSaveButtonFunction = async (index, urlItem) => {
    try {
      await axios.put(`${BASEURL}/editURL`, {
        [urlItem]: editedData[urlItem],
      });
      const elemIndex = editArray.indexOf(index);
      if (elemIndex > -1) editArray.splice(elemIndex, 1);
      setEditArray([...editArray]);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const editURLFunction = (urlName, keywordsData, isChecked) => {
    try {
      setEditedData({
        ...editedData,
        [urlName]: {
          isChecked,
          keywords: editedData[urlName]
            ? editedData[urlName].keywords
            : keywordsData[urlName].keywords,
        },
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const editKeywordsFunction = (
    urlName,
    keywordsData,
    keywordName,
    isChecked
  ) => {
    try {
      const updatedKeywords = editedData[urlName]
        ? { ...editedData[urlName].keywords, [keywordName]: isChecked }
        : { ...keywordsData[urlName].keywords, [keywordName]: isChecked };
      setEditedData({
        ...editedData,
        [urlName]: {
          isChecked: editedData[urlName]
            ? editedData[urlName].isChecked
            : keywordsData[urlName].isChecked,
          keywords: updatedKeywords,
        },
      });
    } catch (error) {
      console.log("error: ", error);
    }
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
                      onClick={async (e) => {
                        e.stopPropagation();
                        await editURLFunction(
                          urlItem,
                          urlKeywordsData,
                          e.target.checked
                        );
                      }}
                    />
                  </div>
                  <div>{urlItem}</div>
                </div>
                <div className="d-flex">
                  <div className="d-flex justify-content-between align-items-center me-4">
                    <div className="ms-4">
                      <input
                        type="date"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        defaultValue={moment().format("YYYY-MM-DD")}
                        max={moment().format("YYYY-MM-DD")}
                        onChange={(e) => {
                          console.log(e.target.value);
                        }}
                      />
                    </div>
                    <span className="mx-3">To</span>
                    <div>
                      <input
                        type="date"
                        defaultValue={moment().format("YYYY-MM-DD")}
                        max={moment().format("YYYY-MM-DD")}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onChange={(e) => {
                          console.log(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  {editArray.includes(index) ? (
                    <div>
                      <Button
                        variant="outline-success"
                        className="ms-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSaveButtonFunction(index, urlItem);
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
                        onClick={async (e) => {
                          e.stopPropagation();
                          await editKeywordsFunction(
                            urlItem,
                            urlKeywordsData,
                            keywordItem,
                            e.target.checked
                          );
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
