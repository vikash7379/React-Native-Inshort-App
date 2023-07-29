import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getNewAPI, getSourceAPI } from "./api";

export const NewsContext = createContext();

const Context = ({ children }) => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [index, setIndex] = useState(1);
  const [source, setSource] = useState();
  const [darkTheme, setDarkTheme] = useState(true)

  const fetchNews = async (reset = category) => {
    const { data } = await axios(getNewAPI(reset));
    setNews(data.articles);
    setIndex(1);
  };


  const fetchFromSource = async () => {
    try {
      const { data } = await axios.get(getSourceAPI(source));
      setNews(data.articles);
      setIndex(1);
    } catch (error) {
      console.log("fetch sourcer error", error);
    }
  };



  useEffect(() => {
    fetchNews();
  }, [category]);

  useEffect(() => {
    fetchFromSource();
  }, [source]);

  return (
    <NewsContext.Provider
      value={{ news,darkTheme,setDarkTheme, index, setIndex, fetchNews, setCategory, category,setSource }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default Context;
