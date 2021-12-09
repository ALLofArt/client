import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import TotalAnalysisData from "../../src/components/TotalAnalysisData";
import * as Style from "../../styles/styledcomponents";

export default function Analysis() {
  const [analysisInfo, setAnalysisInfo] = useState({
    artistName: "",
    artistId: 0,
    userPainting: "",
    styleResult: [],
    desc: "",
    artistImages: [],
  });

  const {
    artistName,
    artistId,
    artistImages,
    userPainting,
    styleResult,
    desc,
  } = analysisInfo;
  const router = useRouter();
  const params = router.query.id;
  console.log("params", params);
  const getAnalysisData = useCallback(async () => {
    try {
      const response = await axios.get(`api/style/${params}`);
      const sortable = [];
      const paintResult = response.data.style_result;
      Object.keys(paintResult).forEach((key) => {
        if (paintResult[key]) {
          sortable.push([key, paintResult[key]]);
        }
      });
      // TODO: console.log 지우기
      console.log(response.data);
      setAnalysisInfo((prevState) => ({
        ...prevState,
        userPainting: response.data.image_url,
        artistName: response.data.artist_name,
        artistImages: response.data.artist_images,
        artistId: response.data.artist_id,
        desc: response.data.artist_bio,
        styleResult: sortable,
      }));
    } catch (e) {
      console.log(e.response);
    }
  }, []);

  useEffect(() => {
    getAnalysisData();
  }, [params]);

  return (
    <Style.Container>
      <Style.SectionContainer>
        {styleResult[0] && (
          <TotalAnalysisData
            userPainting={userPainting}
            styleResult={styleResult}
            artistName={artistName}
            artistId={artistId}
            artistImages={artistImages}
            desc={desc}
          />
        )}
      </Style.SectionContainer>
    </Style.Container>
  );
}
