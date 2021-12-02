import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
export default function Artist() {
  const [artistInfo, setArtistInfo] = useState({
    name: "Leonardo Da Vinci",
    genre: "",
    years: "",
    nation: "",
    desc: "",
  });
  const router = useRouter();
  const params = router.query.id;
  console.log(router.query);
  const fetch = async () => {
    try {
      const response = await axios.get(`api/artists/${params}`);
      // TODO: console.log 삭제
      console.log(response.data);
      setArtistInfo(response.data);
    } catch (e) {
      console.log(e.response);
    }
  };
  return <div>{artistInfo && <>{artistInfo.name}</>}</div>;
}
