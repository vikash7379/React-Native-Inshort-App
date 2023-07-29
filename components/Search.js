import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import React from "react";
import { useContext } from "react";
import { NewsContext } from "../Api/context";
import { useState } from "react";
import Entypo from '@expo/vector-icons/Entypo'
import SingleNews from './SingleNews'

const Search = () => {
  const { news,darkTheme } = useContext(NewsContext);

  const [searchResult, setSearchResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNews, setCurrentNews] = useState();

  const handleSearch = (text) => {
    if (!text) {
      setSearchResult([]);
      return;
    }
    setSearchResult(news.filter((query) => query.title.includes(text)));
  };

  const handleModal = (n) => {
    setModalVisible(true);
    setCurrentNews(n);
  };

  console.log("articles", news.length, " and serach result", searchResult);

  return (
    <View style={{ width: "100%", position: "relative", padding: 10 }}>
      <TextInput
        style={{ ...styles.search, backgroundColor: darkTheme ? "white" : 'grey', color: darkTheme ? "#282c35" : 'white' }}
        placeholder="Search for news"
        placeholderTextColor={darkTheme ? "black" : 'white'}
        onChangeText={(text) => handleSearch(text)}
      />

      <View style={styles.searchResult}>
        {searchResult.slice(0, 10).map((n) => (
          <TouchableOpacity
            key={n.title}
            activeOpacity={0.7}
            onPress={() => handleModal(n)}
          >
            <Text
              style={{
                ...styles.singleResult,
                backgroundColor: darkTheme ? 'black'  :"white",
                color: darkTheme ? "white" : 'black',
              }}
            >
              {n.title}
            </Text>
          </TouchableOpacity>
        ))}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
            <TouchableOpacity
                onPress={()=>setModalVisible(!modalVisible)}
                style = {{
                    position : "absolute",
                    zIndex : 1,
                    right : 0,
                    margin : 20,
                }}
            >
                <Entypo name="circle-with-cross" size={30} color={'white'}/>
            </TouchableOpacity>
            <View style={{height: '100%',transform : [{scaleY : -1}] }}>
                <SingleNews item={currentNews}/>
            </View>

        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 15,
  },
  searchResult: {
    position: "absolute",
    zIndex: 1,
    top: 60,
  },
  singleResult: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginLeft: 15,
    margin : 0.5,
    marginTop : 2,
    shadowColor: "black",
    elevation: 5,
  },
});

export default Search;
