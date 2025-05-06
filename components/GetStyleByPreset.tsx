function GetStyleByPreset(preset: string) {
  switch (preset) {
    case "FeaturedHomeRail":
      return {
        showTitle: false,
        imageKey: "imgFlixMobileFeature6x9",
        tilesToShow: 1.2,
        aspectRatio: 1.2,
        highlightActive: true,
        cssProps: {
          cardSpacing: 12,
          height: 480,
          borderRadius: 16,
          cardImage: {
            flex: 1,
            right: 5,
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            borderTopRightRadius: 16, // apply all corners if needed
            borderBottomRightRadius: 16,
            resizeMode: "cover",
          },
        },
      };
    case "LiveChannels":
      return {
        showTitle: true,
        imageKey: "imgFlixMobileFeature6x9",
        tilesToShow: 1.5,
        aspectRatio: 0.6,
        cssProps: {
          cardSpacing: 12,
          borderRadius: 4,
          height: 150,
          bordercolor: "#fff",
          borderwidth: 1,
          cardImage: {
            flex: 1,
            //   position: "absolute",
            right: 5,
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            borderTopRightRadius: 4, // apply all corners if needed
            borderBottomRightRadius: 4,
          },
        },
      };
    case "InlineFeature":
      return {
        showTitle: false,
        imageKey: "imgInlineFeature16x9_QR",
        tilesToShow: 1,
        aspectRatio: 0.6,
        cssProps: {
          cardSpacing: 12,
          padding: 10,
          borderRadius: 8,
          height: 100,
          cardImage: {
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            borderTopRightRadius: 8, // apply all corners if needed
            borderBottomRightRadius: 8,
          },
        },
      };
    case "16x9-NoTitle":
      return {
        showTitle: true,
        imageKey: "imgFlixMobileFeature6x9",
        tilesToShow: 1.8,
        aspectRatio: 0.6,
        onViewAll: () => {},
        cssProps: {
          cardSpacing: 12,
          borderRadius: 4,
          marginLeft: 30,
          height: 100,
          cardImage: {
            flex: 1,
            //   position: "absolute",
            right: 5,
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            borderTopRightRadius: 4, // apply all corners if needed
            borderBottomRightRadius: 4,
            resizeMode: "cover",
          },
        },
      };
    case "2x3-NoTitle":
      return {
        showTitle: true,
        imageKey: "imgFlixMobileFeature6x9",
        tilesToShow: 1.8,
        aspectRatio: 0.6,
        onViewAll: () => {},
        cssProps: {
          cardSpacing: 12,
          borderRadius: 4,
          marginLeft: 30,
          height: 100,
          cardImage: {
            flex: 1,
            //   position: "absolute",
            right: 5,
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            borderTopRightRadius: 4, // apply all corners if needed
            borderBottomRightRadius: 4,
            resizeMode: "cover",
          },
        },
      };
    case "1x1TopTen":
      return {
        showTitle: true,
        imageKey: "imgFlixMobileFeature6x9",
        tilesToShow: 1.7,
        aspectRatio: 1.2,
        secondaryImageKey: "imgTopTenNumber",
        cssProps: {
          cardSpacing: 12,
          height: 200,
          secondaryImage: {
            resizeMode: "contain",
            zIndex: -1,
            width: "100%",
            height: "100%",
          },
          cardImage: {
            flex: 1,
            position: "absolute",
            right: 5,
            width: 120,
            height: 200,
            borderRadius: 8,
            resizeMode: "cover",
          },
        },
      };
    // case "MyList":
    //   return {
    //     backgroundColor: "#000",
    //     color: "#fff",
    //   };
    default:
      return {
        showTitle: true,
        imageKey: "imgFlixMobileFeature6x9",
        tilesToShow: 2,
        aspectRatio: 1.78,
        cssProps: {
          cardSpacing: 12,
          borderRadius: 8,
          cardImage: {
            resizeMode: "cover",
            width: "100%",
            height: "100%",
            borderRadius: 8,
          },
        },
      };
  }
}
export default GetStyleByPreset;
