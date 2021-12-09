import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const useImgFetch = (page, duration, sortBy) => {
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const sendQuery = useCallback(async () => {
    const URL = `/api/gallery?duration=${duration}&sort_by=${sortBy}&page=${page}`;
    if (hasMore) {
      try {
        await axios.get(URL).then((response) => {
          if (response.data === "no content") {
            setHasMore(false);
          } else {
            setImages((prev) => [...new Set([...prev, ...response.data])]);
            setHasMore(response.data.length > 0);
            setIsLoading(false);
          }
        });
      } catch (e) {
        setHasMore(false);
      }
    }
  }, [page, sortBy, duration]);

  useEffect(() => {
    sendQuery();
  }, [page]);

  useEffect(() => {
    setImages([]);
    setHasMore(true);
  }, [duration, sortBy]);

  return { images, hasMore, isLoading };
};
export default useImgFetch;
