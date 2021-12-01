import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import AnalysisSum from "../../src/components/AnalysisSum";

export default function Analysis() {
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg/800px-Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg",
  );
  const [sortArr, setSortArr] = useState([
    ["Picasso", 99.9],
    ["Heezy", 80.8],
    ["Eunsun", 50.5],
    ["Hyeon", 5.8],
    ["Kiwon", 3],
  ]);
  const router = useRouter();
  const params = router.query.id;

  const fetch = async () => {
    try {
      const response = await axios.get(`api/style/${params}`);
      console.log(response.data);
    } catch (e) {
      console.log(e.response);
      //   if (e.response.status === 404) {
      //     router.push("/notfound");
      //   }
    }
  };

  useEffect(() => {
    fetch();
  });

  return (
    <div>
      {params}
      {sortArr[0] && <AnalysisSum image={image} sortArr={sortArr} />}
    </div>
  );
}
