import { getImageKeyByAspectRatio } from "@/utils/imageConfig";

export const resolveImageSrc = (
  item: any,
  imageKey?: string,
  aspectRatio: number = 1
): string | undefined => {
  const keyToTry = getImageKeyByAspectRatio(aspectRatio);
  const mediaItems =
    item.media_group?.find((group: any) => group.type === "image")
      ?.media_item || [];
  const match = mediaItems.find((img: any) => img.key === keyToTry);
  return match?.src;
};
