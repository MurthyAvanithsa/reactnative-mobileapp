import { useEffect, useState } from "react";

type FeedItem = {
  preset_name: string;
  index: number;
  data: any;
  error?: boolean;
};

export const useHpcData = () => {
  const [data, setData] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  type FeedUrl = {
    preset_name: string;
    index: number;
    feed_url: string;
  };
  const ROOT_URL =
    "https://tbn-dsp-curation-api-prod.tbncloud.com/web/homepage?okta_id=00umjfdz1wOCMOjE8697&network=TBN&app_name=TBN";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rootRes = await fetch(ROOT_URL);
        const rootJson = await rootRes.json();

        const feedUrls: FeedUrl[] = rootJson.entry.map((item: any) => ({
          preset_name: item.preset_name,
          index: item.index,
          feed_url: item.feed_url,
        }));
        // console.log("feedUrls: ", feedUrls);
        const feedData: FeedItem[] = await Promise.all(
          feedUrls.map(async ({ preset_name, index, feed_url }) => {
            // console.log("Fetching feed for: ", feed_url + "&app_name=TBN");
            try {
              const res = await fetch(feed_url + "&app_name=TBN");
              const json = await res.json();
              // console.log("json: ", json);
              return { preset_name, index, data: json };
            } catch {
              return { preset_name, index, data: null, error: true };
            }
          })
        );

        setData(feedData);
      } catch (error) {
        console.error("Error loading root feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};
