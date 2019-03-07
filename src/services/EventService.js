import axios from "axios";

const api = axios.create({
  baseURL: "https://randomuser.me/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default async () => {
  return api.get("/?seed=foobar&&nat=ca&&results=20");
};
