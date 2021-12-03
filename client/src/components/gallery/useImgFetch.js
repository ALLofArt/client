import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const useImgFetch = (page, duration, sortBy) => {
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendQuery = useCallback(async () => {
    const URL = `/api/gallery?duration=${duration}?sort_by=${sortBy}?page=${page} `;
    await axios.get(URL).then((response) => {
      console.log(response);
      setImages((prev) => [...new Set([...prev, ...response.data])]);
      setHasMore(response.data.length >= images.length ? true : false);
      setIsLoading(false);
    });
  }, [page]);

  useEffect(() => {
    sendQuery();
    console.log(page, images, hasMore);
  }, [sendQuery, page]);

  return { hasMore, images, isLoading };
};
export default useImgFetch;
