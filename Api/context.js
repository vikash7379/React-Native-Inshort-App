import React, { createContext, useEffect, useState, useMemo } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNewAPI, getSourceAPI } from "./api";

export const NewsContext = createContext();

const Context = ({ children }) => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [index, setIndex] = useState(1);
  const [source, setSource] = useState();
  const [darkTheme, setDarkTheme] = useState(true);

  const fetchNews = async (reset = category) => {
    try {
      const response = await fetch(getNewAPI(reset));
      const { articles } = await response.json();
      setNews(articles);
      setIndex(1);
      return articles;
    } catch (error) {
      console.log("fetch news error", error);
      return [];
    }
  };

  const fetchFromSource = async () => {
    try {
      const response = await fetch(getSourceAPI(source));
      const { articles } = await response.json();
      setNews(articles);
      setIndex(1);
      return articles;
    } catch (error) {
      console.log("fetch source error", error);
      return [];
    }
  };

  console.log('news',news)

  // Memoize the fetchNews and fetchFromSource functions to avoid redundant API calls
  const memoizedFetchNews = useMemo(() => fetchNews, []);
  const memoizedFetchFromSource = useMemo(() => fetchFromSource, []);

  // Store fetched data locally using AsyncStorage
  const storeDataLocally = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log("Error storing data locally:", error);
    }
  };

  // Retrieve data from local storage
  const getLocalData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log("Error getting local data:", error);
      return null;
    }
  };

  useEffect(() => {
    // Check if news data is available locally and use it to set the initial state
    getLocalData(category).then((cachedNews) => {
      if (cachedNews) {
        setNews(cachedNews);
      } else {
        fetchNews(); // Call the function directly, no need for memoizedFetchNews
      }
    });
  }, [category]);

  useEffect(() => {
    // Check if source data is available locally and use it to set the initial state
    if (source) {
      getLocalData(source).then((cachedNews) => {
        if (cachedNews) {
          setNews(cachedNews);
        } else {
          fetchFromSource(); // Call the function directly, no need for memoizedFetchFromSource
        }
      });
    }
  }, [source]);

  // Store fetched data locally whenever the news state changes
  useEffect(() => {
    storeDataLocally(category, news);
  }, [category, news]);

  useEffect(() => {
    if (source) {
      storeDataLocally(source, news);
    }
  }, [source, news]);

  return (
    <NewsContext.Provider
      value={{
        news,
        darkTheme,
        setDarkTheme,
        index,
        setIndex,
        setCategory,
        category,
        setSource,
        fetchNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default Context;
