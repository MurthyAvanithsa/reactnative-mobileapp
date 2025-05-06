import { getImageKeyByAspectRatio } from "@/utils/imageConfig";
import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";

interface CardItemProps {
  item: {
    extensions?: Record<string, any>;
    media_group?: Array<{
      type: string;
      media_item: Array<{ key: string; src: string }>;
    }>;
  };
  cardWidth: number;
  cardHeight: number;
  imageKey: string;
  aspectRatio?: number;
  secondaryImageKey?: string;
  cssProps?: any;
  index?: number;
  currentPage?: number;
  highlightActive?: boolean;
  onStartWatching?: (item: any) => void;
  onAddToList?: (item: any) => void;
  onPress?: () => void;
}

// Helper function to resolve image by key
const resolveImageSrc = (item: any, key: string): string | null => {
  const extImg = item.extensions?.[key];
  if (extImg) return extImg;

  const mediaItems =
    item.media_group?.find((group: any) => group.type === "image")
      ?.media_item || [];
  const fallback = mediaItems.find((mi: any) => mi.key === key);
  return fallback?.src || null;
};

const CardItem = React.memo(
  ({
    item,
    cardWidth,
    cardHeight,
    imageKey,
    aspectRatio,
    secondaryImageKey,
    cssProps,
    index,
    currentPage,
    highlightActive,
    onStartWatching,
    onAddToList,
    onPress,
  }: CardItemProps) => {
    const imagekeybyaspectRatio = getImageKeyByAspectRatio(aspectRatio || 1);
    // console.log("imagekey: ", imagekey);
    const mainImage = resolveImageSrc(item, imagekeybyaspectRatio || imageKey);

    const secondaryImage = secondaryImageKey
      ? resolveImageSrc(item, secondaryImageKey)
      : null;
    if (!mainImage) return null;

    const isActive = highlightActive && index === currentPage;
    const containerStyle = {
      width: cardWidth,
      height: cardHeight,
      opacity: highlightActive ? (index === currentPage ? 1 : 0.5) : 1,
      transform: [
        { scale: highlightActive && index !== currentPage ? 0.95 : 1 },
      ],
      borderRadius: cssProps?.borderRadius,
      borderColor: cssProps?.borderColor || "transparent",
      borderWidth: cssProps?.borderWidth || 0,
      marginRight: cssProps?.marginRight || 0,
      marginLeft: cssProps?.marginLeft || 0,
      marginTop: cssProps?.marginTop || 0,
    };

    return (
      <>
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.cardContainer, containerStyle]}>
            <Image source={{ uri: mainImage }} style={cssProps?.cardImage} />
            {secondaryImage && (
              <Image
                source={{ uri: secondaryImage }}
                style={[
                  StyleSheet.absoluteFillObject,
                  cssProps?.secondaryImage,
                ]}
              />
            )}
          </View>
        </TouchableOpacity>

        {highlightActive && isActive && (
          <View style={cssProps.overlay}>
            <View style={cssProps.buttonRow}>
              <TouchableOpacity
                style={cssProps.buttonPrimary}
                onPress={() => onStartWatching?.(item)}
              >
                <Text style={cssProps.buttonText}>Start Watching</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={cssProps.buttonSecondary}
                onPress={() => onAddToList?.(item)}
              >
                <Text style={cssProps.buttonSecondaryText}>
                  + My List & More
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  cardContainer: {
    overflow: "hidden",
  },
});

export default CardItem;
