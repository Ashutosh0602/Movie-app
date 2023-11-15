/// <reference types="nativewind/types" />
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

import { styles } from "../theme";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";

const os = Platform.OS;
console.log(os);

export default function HomeScreen(): JSX.Element {
  const [trending, setTrending] = useState([1, 2, 3, 4]);
  const [upcoming, setUpcoming] = useState([1, 2, 3, 4]);
  const [topRated, setTopRated] = useState([]);

  return (
    <View style={{ flex: 1, backgroundColor: "rgb(38 ,38, 38)" }}>
      <SafeAreaView style={{ marginBottom: 3 }}>
        <StatusBar style="auto" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 4,
          }}
        >
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <TrendingMovies data={trending} />
        <MovieList title="Upcoming" data={upcoming} />
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({});
