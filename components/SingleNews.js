import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { useContext } from "react";
import { NewsContext } from "../Api/context";

const windoWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SingleNews = ({ item, index }) => {

  const {darkTheme} = useContext(NewsContext)

  return (
    <View
      key={index}
      style={{
        height: windowHeight,
        width: windoWidth,
        transform: [{ scaleY: -1 }],
      }}
    >
      <Image
        source={{ uri: item.urlToImage }}
        style={{ height: "45%", resizeMode: "cover", width: "windoWidth" }}
      />
      <View style={{ ...styles.desc, backgroundColor: darkTheme ? "#282c35" : 'white' }}>
        <Text style={{ ...styles.title, color: darkTheme ?   '#cdcdcd' : "black"}}>{item.title}</Text>
        <Text style={{ ...styles.content, color :  darkTheme ?   '#C0C0C0' : "black"}}>
          {item.description}
        </Text>
        <Text style={{ color: darkTheme ?   'white' : "black", marginTop : 10 }}>
          Short By <Text> </Text>
          <Text style={{marginLeft : 10}}>{item.author ?? "Abp News"}</Text>
        </Text>
        <ImageBackground
          style={styles.footer}
          blurRadius={30}
          source={{ uri: item.urlToImage }}
        >
          <TouchableOpacity
            onPress={()=>Linking.openURL(item.url)}
          >
            <Text style={{ fontSize: 14, color: "white" }}>
              '{item?.content?.slice(0, 30)}...'
            </Text>
            <Text style={{ fontSize: 12, color: "white" }}>
              Tap to know more
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  content: {
    fontSize: 16,
  },
  footer: {
    height: 80,
    width: windoWidth,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#d7be69",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  desc : {
    padding : 15,
    flex : 1,
  }
});

export default SingleNews;
