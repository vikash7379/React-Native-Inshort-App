import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import { NewsContext } from "../Api/context";
import { categories, sources } from "../Api/api";
import Carousel from "react-native-snap-carousel";
import Search from "../components/Search";

const windowWidth = Dimensions.get("window").width;
const SLIDE_WIDTH = Math.round(windowWidth / 3.5);

const DiscoverScreen = () => {
  const { setCategory, setSource,darkTheme } = useContext(NewsContext);

  return (
    <View style={StyleSheet.discovery}>
      {/* {serach} */}

      <View>
        <Search/>
      </View>


      {/* {category} */}
      <Text style={{ ...styles.subtitle, color: darkTheme ? "white" : 'black' }}>Category</Text>

      <Carousel
        layout={"default"}
        data={categories}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={styles.category}
            onPress={() => setCategory(item.name)}
          >
            <Image source={{ uri: item.pic }} style={styles.categoryImg} />
            <Text style={{ ...styles.name, color:  darkTheme ? "white" : 'black' }}>{item.name}</Text>
          </TouchableOpacity>
        )}
        sliderWidth={windowWidth}
        itemWidth={SLIDE_WIDTH}
        activeSlideAlignment={"start"}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />

      {/* {sources} */}

      <Text style={{ ...styles.subtitle, color : darkTheme ? "white" : 'black'}}>Sources</Text>
      <View style={styles.sources}>
        {sources.map((s) => (
          <TouchableOpacity
            onPress={() => setSource(s.id)}
            key={s.id}
            style={styles.sourceContainer}
          >
            <Image source={{ uri: s.pic }} style={styles.sourceImage} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  discovery: {
    padding: 10,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 8,
    marginHorizontal: 5,
    borderBottomColor: "#007fff",
    borderBottomWidth: 5,
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  categoryImg: {
    height: "60%",
    width: "100%",
    resizeMode: "contain",
  },
  name: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  category: {
    height: 130,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  sources : {
    flexDirection : "row",
    flexWrap : "wrap",
    justifyContent : 'space-around',
    paddingVertical : 15,
  },
  sourceContainer: {
    height : 150,
    width: '40%',
    borderRadius : 10,
    margin : 15,
    backgroundColor : '#313d'
  },
  sourceImage: {
    height: "100%",
    borderRadius: 10,
    resizeMode: "contain",
  },
});

export default DiscoverScreen;
