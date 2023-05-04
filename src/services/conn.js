import axios from "axios";
const api = axios.get(
  "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=boolean"
);

export default api;
