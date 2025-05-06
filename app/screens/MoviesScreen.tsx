import CardItem from "@/components/CardItem";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Footer from "../Footer";

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const itemWidth = screenWidth / numColumns - 20; // Adjust for spacing
const MoviesScreen = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stylesConfig, setStylesConfig] = useState<any>({}); // State to hold styles configuration
  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://tbn-dsp-curation-api-prod.tbncloud.com/web/virtual_feed?page_limit=100&page_offset=1&virtualfeed=false&playlistid=oyL7iSRi&network=TBN&app_name=TBN"
      );
      const data = await response.json();
      if (Array.isArray(data.entry)) {
        setData(data.entry);
      } else {
        console.warn("Unexpected data format", data);
        setData([]);
      }
    } catch (error) {
      console.error("Failed to fetch Movies:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchstyles = async () => {
    try {
      const response = await fetch(
        "https://jsonblob.com/api/jsonBlob/1367876030097973248"
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
    fetchMovies();
  }, []);

  //   console.log("stylesConfig: ", stylesConfig.imagekey);
  const renderItem = ({ item }: { item: any }) => (
    <View
      style={[
        stylesConfig.card,
        { width: stylesConfig.moviesScreenCssProps.width }, // 👈 constrain card too
      ]}
    >
      <CardItem
        item={item}
        aspectRatio={stylesConfig.aspectRatio}
        cardWidth={stylesConfig.moviesScreenCssProps.width}
        cardHeight={
          stylesConfig.moviesScreenCssProps.width * stylesConfig.aspectRatio
        }
        imageKey={stylesConfig.imagekey}
        cssProps={stylesConfig.moviesScreenCssProps}
        highlightActive={false}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[
          stylesConfig.title,
          { width: stylesConfig.moviesScreenCssProps.width },
        ]}
      >
        {item.title}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={stylesConfig.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        contentContainerStyle={stylesConfig.list}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default MoviesScreen;
