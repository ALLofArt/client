import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const useImgFetch = (page, duration, sortBy) => {
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendQuery = useCallback(async () => {
    const URL = `/api/gallery/?duration=${duration}&sort_by=${sortBy}&page=${page} `;
    try {
      await axios.get(URL).then((response) => {
        console.log(duration, sortBy, response);
        setImages((prev) => [...new Set([...prev, ...response.data])]);
        setHasMore(response.data.length > 0);
        setIsLoading(false);
      });
    } catch (e) {
      throw new Error(`에러${e.message}`);
    }
  }, [page]);

  useEffect(() => {
    setImages([]);
  }, [duration]);

  useEffect(() => {
    setImages([]);
  }, [sortBy]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery]);

  return { images, hasMore, isLoading };
};
export default useImgFetch;
