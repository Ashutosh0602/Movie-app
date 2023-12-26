/// <reference types="nativewind/types" />
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { StatusBar } from "expo-status-bar";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/MovieDB";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { styles } from "../theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const ios = Platform.OS === "ios";

export default function HomeScreen(): JSX.Element {
  const [trending, setTrending] = useState([1, 2, 3, 4]);
  const [upcoming, setUpcoming] = useState([1, 2, 3, 4]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    console.log("got trending", data.results.length);
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    console.log("got upcoming", data.results.length);
    if (data && data.results) setUpcoming(data.results);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    console.log("got top rated", data.results.length);
    if (data && data.results) setTopRated(data.results);
  };

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>Flick</Text>
            Hub
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming} />
          )}

          {topRated.length > 0 && (
            <MovieList title="Top Rated" data={topRated} />
          )}
        </ScrollView>
      )}
    </View>
  );
}

const style: any = StyleSheet.create({
  linearGradient: {
    height: 250,
    width: 200,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});
