import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedbackBase,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import img from "../assets/images/moviePoster1.png";
import { useNavigation } from "@react-navigation/native";

var { width, height } = Dimensions.get("window");

const MovieCard = ({ item, handleClick }: any) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={img}
        // source={{uri: image500(item.poster_path)}}
        style={{
          width: width * 0.6,
          height: height * 0.4,
          borderRadius: 15,
        }}
        // className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default function TrendingMovies({ data }: any): JSX.Element {
  const navigation: any = useNavigation();

  const handleClick = () => {
    navigation.navigate("Movie", item);
  };
  return (
    <View style={{ marginBottom: 2 }}>
      <Text
        // className="text-white text-xl mx-4 mb-5"
        style={{
          color: "white",
          fontSize: 20.25,
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        Trending
      </Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
