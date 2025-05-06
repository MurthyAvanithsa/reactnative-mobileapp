import { getImageKeyByAspectRatio } from "@/utils/imageConfig";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface DetailCardProps {
  item: any;
  aspectRatio?: number;
  imageKey?: string; // now optional
}

const formatDuration = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return hrs > 0
    ? `${hrs}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`
    : `${mins}:${secs.toString().padStart(2, "0")}`;
};

const resolveImageSrc = (
  item: any,
  primaryKey: string,
  aspectRatio: number
): string | undefined => {
  // 1. Try primary key from DetailScreen
  const extImg = item.extensions?.[primaryKey];
  if (extImg) return extImg;

  const mediaItems =
    item.media_group?.find((group: any) => group.type === "image")
      ?.media_item || [];

  const extMatch = mediaItems.find((img: any) => img.key === primaryKey);
  if (extMatch?.src) return extMatch.src;

  // 2. Fallback: get key by aspect ratio
  const fallbackKey =
    getImageKeyByAspectRatio(aspectRatio) || "imgFeaturedWebBanner16x9";
  const extImgFallback = item.extensions?.[fallbackKey];
  if (extImgFallback) return extImgFallback;

  const mediaMatch = mediaItems.find((img: any) => img.key === fallbackKey);
  if (mediaMatch?.src) return mediaMatch.src;

  // 3. Still missing? Show nothing
  console.warn(
    `No image found for keys "${primaryKey}" or "${fallbackKey}" in:`,
    item.title || item.id
  );
  return undefined;
};

const DetailCard: React.FC<DetailCardProps> = ({
  item,
  aspectRatio = 1,
  imageKey,
}) => {
  const finalKey: string =
    imageKey ||
    getImageKeyByAspectRatio(aspectRatio) ||
    "imgFeaturedWebBanner16x9";

  const imageUri = resolveImageSrc(item, imageKey || "", aspectRatio);

  const duration = item.extensions?.duration;

  return (
    <View style={styles.episodeRow}>
      <View style={styles.thumbnailWrapper}>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.episodeImage}
            resizeMode="cover"
          />
        )}

        {duration ? (
          <View style={styles.durationOverlay}>
            <Text style={styles.durationText}>{formatDuration(duration)}</Text>
          </View>
        ) : null}
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.episodeTitle}>{item.title}</Text>
        <Text style={styles.episodeSubtitle}>
          {item.extensions?.seasonEpisode}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  episodeRow: {
    flexDirection: "row",
    margin: 15,
    alignItems: "center",
  },
  thumbnailWrapper: {
    position: "relative",
  },
  episodeImage: {
    width: 180,
    height: 100,
    borderRadius: 5,
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
  episodeTitle: {
    color: "#fff",
    fontWeight: "600",
  },
  episodeSubtitle: {
    color: "#aaa",
  },
});

export default DetailCard;
