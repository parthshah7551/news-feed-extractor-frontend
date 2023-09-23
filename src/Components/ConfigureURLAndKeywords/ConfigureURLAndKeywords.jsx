import React, { useState } from "react";
import Header from "./Header/Header";
import AccordionComponent from "./Accordian/Accordian";

const ConfigureURLAndKeywords = () => {
  const [isShowAllKeywords, setIsShow] = useState(0);
  const [isSaveAllToggle, setIsSaveAllToggle] = useState(false);
  const [isEditAllToggle, setIsEditAllToggle] = useState(false);
  const [isDataAdded, setIsDataAdded] = useState(false);
  const isDataAddedFunction = () => {
    setIsDataAdded(!isDataAdded);
  };
  const saveAllFunction = () => {
    setIsSaveAllToggle(!isSaveAllToggle);
  };

  const editAllFunction = () => {
    setIsEditAllToggle(!isEditAllToggle);
  };

  const showAllKeywordsFunction = (isShowAll) => {
    if (isShowAll) {
      setIsShow(isShowAllKeywords > 0 ? isShowAllKeywords + 1 : 1);
    } else {
      setIsShow(isShowAllKeywords === 0 ? isShowAllKeywords - 1 : 0);
    }
  };
  return (
    <>
      <Header
        showAllKeywordsFunction={showAllKeywordsFunction}
        saveAllFunction={saveAllFunction}
        editAllFunction={editAllFunction}
        isDataAddedFunction={isDataAddedFunction}
      />
      <AccordionComponent
        isShowAllKeywords={isShowAllKeywords}
        isSaveAllToggle={isSaveAllToggle}
        isEditAllToggle={isEditAllToggle}
        isDataAdded={isDataAdded}
      />
    </>
  );
};

export default ConfigureURLAndKeywords;
