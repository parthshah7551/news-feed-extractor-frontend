import React, { useEffect, useState } from "react";
import AddURLComponent from "./AddURL/AddURL";
import AddKeywordComponent from "./AddKeyword/AddKeyword";
import { Button } from "react-bootstrap";
import { useAppContext } from "../../../AppContext";
import axios from "axios";
import { URLDATABASEURL } from "../../../Constants/constant";
// const FileDownload = require('js-file-download');



function zipArrays(arr0,arr1, arr2, arr3) {
  // console.log(arr0)
  // console.log(arr1)
  // console.log(arr2)
  // console.log(arr3)
  const zipped = [];
  const minLength = Math.min(arr0.length,arr1.length, arr2.length, arr3.length);

  for (let i = 0; i < minLength; i++) {
    if (arr0[i].checked){
      zipped.push([arr1[i].textContent, arr2[i].value, arr3[i].value]);
    }
  }

  return zipped;
}

const extractNews = async () => {
  const ischecked = document.querySelectorAll('.site-url-checkbox'); 
  const site_url = document.querySelectorAll('.site-url');
  const from_date = document.querySelectorAll('.from-date');
  const to_date = document.querySelectorAll('.to-date');
  const data = {
    site_data: zipArrays(ischecked,site_url,from_date,to_date),
  };
  await axios.post(
    `${URLDATABASEURL}/extract-news`,
    data,{
      headers: {
        'Content-Type': 'application/json',
      },}
  );
}

function Header({ showAllKeywordsFunction, editAllFunction }) {
  const {
    isSaveAllBtn,
    setIsSaveAllBtn,
    isSelectAllBtn,
    setIsSelectAllBtn,
    setIsFromBtn,
  } = useAppContext();
  const [isLatestFileDownloaded, setIsLatestFileDownloaded] = useState(false);

  const getFileFunction = async () => {
    const getFilePathResponse = await axios.get(
      `${URLDATABASEURL}/get-file-path`
    );
    if (
      getFilePathResponse &&
      getFilePathResponse.status === 200 &&
      getFilePathResponse.data
    ) {
      // const _ = await axios.get();
      // const _ = await axios.head(`${URLDATABASEURL}/get-file`)
      // console.log(_)
      axios({
        url: `${URLDATABASEURL}/get-file`,
        method: 'GET',
        responseType: 'blob', // Important
      }).then((response) => {
        const contentDisposition = response.headers['content-disposition'];
        // console.log(response.headers)
      
        if (contentDisposition) {
          const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
          const filename = (matches != null && matches[1] ? matches[1] : 'file.bin').replace(/['"]/g, '');
      
          // Create a temporary link to trigger the download
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
      
          // Clean up
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        } else {
          console.error('The response does not indicate a file to download.');
        }
      });
      // console.log(_)
      setIsLatestFileDownloaded(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLatestFileDownloaded) {
        getFileFunction();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isLatestFileDownloaded]);
  return (
    <div className="d-flex justify-content-between flex-wrap mt-2 m-3">
      <div className="d-flex flex-wrap">
        {/* <AddURLComponent /> */}
        <AddKeywordComponent />
      </div>
      <div>
        <Button
          variant="outline-success"
          className="m-2"
          onClick={async () => {
            setIsSaveAllBtn(isSaveAllBtn + 1);
            setIsFromBtn("start");
            setIsLatestFileDownloaded(true);
            extractNews();
          }}
          style={{ width: "5.5rem" }}
        >
          Start
        </Button>
        <Button
          variant="outline-success"
          className="m-2"
          onClick={() => {
            getFileFunction();
          }}
        >
          Download
        </Button>
        <Button
          variant="outline-info"
          className="m-2"
          onClick={() => showAllKeywordsFunction(true)}
        >
          Show all keywords
        </Button>
        <Button
          variant="outline-secondary"
          className=" m-2"
          onClick={() => showAllKeywordsFunction(false)}
        >
          Hide all keywords
        </Button>
        <Button
          variant="outline-primary"
          className="m-2"
          onClick={() => setIsSelectAllBtn(isSelectAllBtn + 1)}
        >
          Select All
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
          onClick={() => {
            setIsSaveAllBtn(isSaveAllBtn + 1);
            setIsFromBtn("saveAll");
          }}
        >
          Save All
        </Button>
      </div>
    </div>
  );
}

export default Header;
