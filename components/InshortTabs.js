import { useWindowDimensions } from "react-native";
import { useContext, useState } from "react";
import { SceneMap, TabView } from "react-native-tab-view";
import NewsScreen from "../screens/NewsScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import TopNavigation from "./TopNavigation";
import { NewsContext } from "../Api/context";
import React from "react";

const InshortTabs = () => {

  const layout = useWindowDimensions();

  const {index, setIndex} = useContext(NewsContext)

  const [routes] = useState([
    { key: "first", title: "Discover" },
    { key: "second", title: "news" },
  ]);

  const renderScene = SceneMap({
    first: DiscoverScreen,
    second: NewsScreen,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      initialLayout={{ width: layout.width }}
      renderTabBar={() => <TopNavigation index={index} setIndex={setIndex} />}
    />
  );
};

export default InshortTabs;
