import React, { useState } from "react";
import Header from "./Header/Header";
import AccordionComponent from "./Accordian/Accordian";

const ConfigureURLAndKeywords = () => {
  const [isShowAllKeywords, setIsShow] = useState(0);
  const [isEditAllToggle, setIsEditAllToggle] = useState(false);

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
        editAllFunction={editAllFunction}
      />
      <AccordionComponent
        isShowAllKeywords={isShowAllKeywords}
        isEditAllToggle={isEditAllToggle}
      />
    </>
  );
};

export default ConfigureURLAndKeywords;
