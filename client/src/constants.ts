console.log("process.env", process.env);
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export const USER_ID = 1;

// export const DEFAULT_LOCATION = {
//   id: 9999999,
//   city: "Kyiv",
//   country: "Ukraine",
// };
