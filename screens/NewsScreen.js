import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { NewsContext } from '../Api/context'
import SingleNews from '../components/SingleNews';
import Carousel from 'react-native-snap-carousel';

const NewsScreen = () => {

  const {news} = useContext(NewsContext);
  const windowHeight = Dimensions.get('window').height;
  const [activeIndex,setAcitveIndex] = useState();

  return (
    <View style={styles.carousel}>
      {
        news && (
          <Carousel
            layout='stack'
            data = {news}
            sliderHeight={300}
            itemHeight={windowHeight}
            vertical = {true}
            renderItem={({item,index})=>(
              <SingleNews item={item} index={index}/>
            )}
            onSnapToItem={index => setAcitveIndex(index)}
          />
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  carousel : {
    flex : 1,
    backgroundColor : "black",
    transform : [{scaleY : -1}]

  }
})

export default NewsScreen;