import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Footer from "../Footer";
import DetailCard from "@/components/DetailCard";

const DetailScreen = () => {
  const route = useRoute();
  const { item, imageUri, source } = route.params as any;
  const seriesId = item.extensions?.seriesId;
  console.log("DetailScreen imageUri: ", source);
  const [data, setData] = React.useState<any>([]);

  //   console.log("DetailScreen item: ", item.extensions.seriesId);
  const fetchSeriesDetails = async (seriesId: string) => {
    try {
      const response = await fetch(
        `https://tbn-dsp-curation-api-prod.tbncloud.com/web/virtual_feed?page_limit=100&page_offset=1&virtualfeed=false&playlistid=${seriesId}&network=TBN&app_name=TBN`
      );
      const data = await response.json();

      if (Array.isArray(data.entry)) {
        // console.log("Fetched series details:", data.entry[0]);
        setData(data.entry); // Assuming the first entry is the series details
      } else {
        console.warn("Unexpected data format", data);
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch series details:", error);
      return null;
    }
  };
  React.useEffect(() => {
    if (seriesId) {
      fetchSeriesDetails(seriesId);
    }
  }, [seriesId]);
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    }
  };

  //   console.log("DetailScreen data: ", formatDuration(2217)); // Example usage of formatDuration
  return (
    <SafeAreaView style={styles.container}>
      {/* Episodes */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListHeaderComponent={
          <>
            {/* Banner */}
            <Image
              source={{
                uri: imageUri,
              }}
              style={styles.bannerImage}
            />
          </>
        }
        renderItem={({ item }) => (
          <DetailCard
            item={item}
            aspectRatio={0.8}
            imageKey={"imgFeaturedWebBanner16x9"}
          />
        )}
      />
      <Footer activeTab={source} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  bannerImage: {
    width: "100%",
    height: 240,
    marginTop: 30,
    // resizeMode: "cover",
  },
  episodeRow: {
    flexDirection: "row",
    margin: 15,
    alignItems: "center",
  },
  episodeImage: {
    aspectRatio: 16 / 9,
    width: "100%",
    height: 100,
    borderRadius: 5,
  },
  episodeTitle: {
    color: "#fff",
    alignContent: "flex-start",
    fontWeight: "600",
  },
  episodeSubtitle: {
    color: "#aaa",
  },
  episodeDuration: {
    color: "#ccc",
    fontSize: 12,
  },
  thumbnailWrapper: {
    position: "relative",
  },

  durationOverlay: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  durationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default DetailScreen;
