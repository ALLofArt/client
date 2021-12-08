import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const useImgFetch = (page, duration, sortBy) => {
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendQuery = useCallback(async () => {
    const URL = `/api/gallery/?duration=${duration}&sort_by=${sortBy}&page=${page} `;
    await axios.get(URL).then((response) => {
      console.log(duration, sortBy, response);
      setImages((prev) => [...new Set([...prev, ...response.data])]);
      setHasMore(response.data.length > 0 ? true : false);
      setIsLoading(false);
    });
  }, [page]);

  useEffect(() => {
    setImages([]);
    page = 1;
  }, [duration, sortBy]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery]);

  return { hasMore, images, isLoading };
};
export default useImgFetch;
