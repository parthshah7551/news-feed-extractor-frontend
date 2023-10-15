const NODE_PORT = process.env.REACT_APP_NEWS_EXTRACTOR_NODE_PORT || "5000";
const FLASK_PORT = process.env.REACT_APP_NEWS_EXTRACTOR_FLASK_PORT || "6789";

export const BASEURL = `http://localhost:${NODE_PORT}`.trim();
export const URLDATABASEURL = `http://localhost:${FLASK_PORT}`.trim();
console.log(process.env.REACT_APP_NEWS_EXTRACTOR_NODE_PORT);
console.log(process.env.REACT_APP_NEWS_EXTRACTOR_FLASK_PORT);
console.log(BASEURL);
console.log(URLDATABASEURL);
