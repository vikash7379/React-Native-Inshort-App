import { View, StyleSheet, StatusBar } from "react-native";
import InshortTabs from "./components/InshortTabs";
import Context, { NewsContext } from "./Api/context";
import { useContext } from "react";

function App() {


  const {darkTheme} = useContext(NewsContext)

  return (
    <View style={{ ...styles.container, backgroundColor: darkTheme ? "#282c35" : "white"}}>
      <InshortTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default () => {
  return (
    <Context>
      <App />
    </Context>
  );
};
