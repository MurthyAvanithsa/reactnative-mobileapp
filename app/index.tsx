import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ShowsScreen from "./screens/ShowsScreen";
import LiveScreen from "./screens/LiveScreen";
import TeachersScreen from "./screens/TeachersScreen";
import SearchScreen from "./screens/SearchScreen";
import Header from "./Header";
import Footer from "./Footer";
import { SafeAreaView } from "react-native";
import MoviesScreen from "./screens/MoviesScreen";
import AllTeachers from "./screens/AllTeachers";
import DetailScreen from "./screens/DetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <Header />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Shows" component={ShowsScreen} />
        <Stack.Screen name="Movies" component={MoviesScreen} />
        <Stack.Screen name="Live" component={LiveScreen} />
        <Stack.Screen name="Teachers" component={TeachersScreen} />
        <Stack.Screen name="AllTeachers" component={AllTeachers} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
      {/* <Footer /> */}
    </SafeAreaView>
  );
}
