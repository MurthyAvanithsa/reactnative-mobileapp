import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Footer from "../Footer";
import { LinearGradient } from "expo-linear-gradient";
import CardItem from "@/components/CardItem";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/types";
import { resolveImageSrc } from "@/utils/imageResolver";

const ShowsScreen = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stylesConfig, setStylesConfig] = useState<any>({}); // State to hold styles configuration
  const [title, setTitle] = useState();
  const categories = [
    { label: "All Shows" },
    { label: "Movies", screen: "MoviesScreen" },
    {
      label: "Documentary",
      // screen: "PlaylistScreen",
      params: { name: "documentary" },
    },
    {
      label: "Educational",
      // screen: "PlaylistScreen",
      params: { name: "educational" },
    },
    { label: "History", params: { name: "history" } },
    { label: "Music", params: { name: "music" } },
    { label: "News", params: { name: "news" } },
    { label: "Reality", params: { name: "reality" } },
    { label: "Series", params: { name: "series" } },
    {
      label: "Talk Shows",
      // screen: "PlaylistScreen",
      params: { name: "talkshows" },
    },
    {
      label: "Teaching",
      // screen: "PlaylistScreen",
      params: { name: "teaching" },
    },
    { label: "Travel", params: { name: "travel" } },
  ];
  // Category for the screen, can be used for filtering or display
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleCategoryPress = (category: any) => {
    navigation.navigate(category.label);
  };

  const numColumns = 2; // Number of columns for grid layout
  const fetchShows = async () => {
    try {
      const response = await fetch(
        "https://tbn-dsp-curation-api-prod.tbncloud.com/web/virtual_feed?page_limit=100&page_offset=1&virtualfeed=true&playlistid=b2c2050e&network=TBN&app_name=TBN"
      );
      const data = await response.json();
      if (Array.isArray(data.entry)) {
        setEntries(data.entry);
        setTitle(data.title);
      } else {
        console.warn("Unexpected data format", data);
        setEntries([]);
      }
    } catch (error) {
      console.error("Failed to fetch shows:", error);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchstyles = async () => {
    try {
      const response = await fetch(
        "https://jsonblob.com/api/jsonBlob/1367228912903577600"
      );
      const result = await response.json();
      // console.log("Fetched data:", result);
      setStylesConfig(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchstyles();
    fetchShows();
  }, []);
  return (
    <SafeAreaView style={stylesConfig.container}>
      <View style={stylesConfig.content}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={stylesConfig.loadingStyle}
          />
        ) : (
          <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            columnWrapperStyle={{
              justifyContent: "space-between",
              paddingHorizontal: 15,
            }}
            contentContainerStyle={{ paddingBottom: 80 }}
            renderItem={({ item }) => {
              const imageUri = resolveImageSrc(
                item,
                stylesConfig.imageKey,
                stylesConfig.aspectRatio
              );
              return (
                <CardItem
                  item={item}
                  aspectRatio={stylesConfig.aspectRatio} // Adjust aspect ratio as needed
                  cardWidth={stylesConfig.showsScreenCssProps.width}
                  cardHeight={
                    stylesConfig.showsScreenCssProps.width *
                    stylesConfig.aspectRatio
                  } // Adjust height based on aspect ratio
                  imageKey={stylesConfig.imageKey}
                  cssProps={stylesConfig.showsScreenCssProps}
                  onPress={
                    () =>
                      navigation.navigate("DetailScreen", {
                        item,
                        imageUri: imageUri,
                        source: "Shows",
                      }) // Navigate to ShowDetailsScreen with item data
                  }
                />
              );
            }}
            ListHeaderComponent={
              <>
                {/* Poster Section */}
                <View style={stylesConfig.posterContainer}>
                  <Image
                    source={{
                      uri: "https://assets.mediabackstage.com/tbn/thumbnails/klove_mobile_headerimage-1745530819714.jpg",
                    }}
                    style={stylesConfig.posterImage}
                  />
                  <LinearGradient
                    colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.9)"]}
                    style={stylesConfig.gradientOverlay}
                  >
                    <Text style={stylesConfig.posterTitle}>SHOWS</Text>
                  </LinearGradient>
                </View>

                {/* Horizontal Chips */}
                <View style={stylesConfig.categoryWrapper}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={stylesConfig.categoryContainer}
                  >
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category.label}
                        onPress={() => handleCategoryPress(category)}
                        style={stylesConfig.chip}
                      >
                        <Text style={stylesConfig.chipText}>
                          {category.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      fontWeight: "bold",
                      marginLeft: 20,
                      marginTop: 20,
                      marginBottom: 0,
                    }}
                  >
                    {title}
                  </Text>
                </View>
              </>
            }
          />
        )}
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default ShowsScreen;
