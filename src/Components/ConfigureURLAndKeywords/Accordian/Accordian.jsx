import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { accordianData } from "../../../Constants/accordianData";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BASEURL } from "../../../Constants/constant";
import moment from "moment";
import { useAppContext } from "../../../AppContext";
import { toast } from "react-toastify";

function AccordionComponent({ isShowAllKeywords, isEditAllToggle }) {
  const [activeKey, setActiveKey] = useState([]);
  const [editArray, setEditArray] = useState([]);
  const [urlKeywordsData, setUrlKeywordsData] = useState({});
  const [isDataChange, setIsDataChange] = useState(false);
  const [editedData, setEditedData] = useState({});
  const { isDataChanged, isSaveAllBtn, isSelectAllBtn } = useAppContext();
  const [checkedURL, setCheckedURL] = useState([]);

  const urlKeywordsDataFunction = async () => {
    try {
      const urlKeywordsDetails = await axios.get(
        `${BASEURL}/urlKeywordsDetails`
      );
      if (urlKeywordsDetails.status === 200 && urlKeywordsDetails?.data) {
        setUrlKeywordsData(urlKeywordsDetails?.data);
        let tempArray = [];
        Object.keys(urlKeywordsDetails?.data)?.forEach((item) => {
          if (urlKeywordsDetails?.data[item]?.isChecked) {
            tempArray = [...tempArray, item];
          }
        });
        setCheckedURL(tempArray);
      } else {
        setUrlKeywordsData({});
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("Something went wrong!");
    }
  };

  const onDeleteButtonFunction = async (url) => {
    try {
      await axios.delete(`${BASEURL}/removeURL/?url=${url}`);
      setIsDataChange(!isDataChange);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("error: ", error);
    }
  };

  const saveAllDataFunction = async () => {
    try {
      await axios.put(`${BASEURL}/editURL`, editedData);
      toast.success("Settings updated successfully!");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Something went wrong!");
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
    if (isSelectAllBtn > 0) {
      setCheckedURL(Object.keys(urlKeywordsData));
      Object.keys(urlKeywordsData).forEach((item) => {
        urlKeywordsData[item].isChecked = true;
      });
      console.log("urlKeywordsData: ", urlKeywordsData);
      setEditedData(urlKeywordsData);
    }
  }, [isSelectAllBtn]);

  useEffect(() => {
    setActiveKey([]);
    setEditArray([]);
    if (isSaveAllBtn > 0) {
      saveAllDataFunction();
    }
  }, [isSaveAllBtn]);

  useEffect(() => {
    urlKeywordsDataFunction();
  }, [isDataChange, isDataChanged]);

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
      toast.error("Something went wrong!");
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
      toast.error("Something went wrong!");
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
      toast.error("Something went wrong!");
    }
  };

  const handleClick = (urlItem) => {
    try {
      if (!checkedURL.includes(urlItem)) {
        setCheckedURL([...checkedURL, urlItem]);
      } else {
        const elemIndex = checkedURL.indexOf(urlItem);
        if (elemIndex > -1) {
          checkedURL.splice(elemIndex, 1);
          setCheckedURL([...checkedURL]);
        }
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Accordion className="m-3" activeKey={activeKey} alwaysOpen>
      {Object.keys(urlKeywordsData).map((urlItem, index) => {
        console.log("checkedURL: ", checkedURL);
        return (
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header onClick={() => openAccordionFunction(index)}>
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex align-items-center">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`${index}`}
                      checked={checkedURL.includes(urlItem)}
                      onClick={async (e) => {
                        e.stopPropagation();
                        editURLFunction(
                          urlItem,
                          urlKeywordsData,
                          e.target.checked
                        );
                        handleClick(urlItem);
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
                        onClick={async (e) => {
                          e.stopPropagation();
                          await onSaveButtonFunction(index, urlItem);
                          toast.success("Checklist Saved successfully!");
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
                            toast.success("URL Deleted successfully!");
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
