import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useRouterScroll } from "@moxy/next-router-scroll";
import apiUrl from "../lib/api";
import * as Style from "../styles/styledcomponents";

export default function Artists() {
  const [artistsList, setArtistsList] = useState([]);
  // const { updateScroll } = useRouterScroll();
  // console.log("useRouterScroll: ", useRouterScroll());
  // const { updateScroll = () => {} } = useRouterScroll() || {};
  const getAllArtists = useCallback(async () => {
    try {
      const response = await axios.get("/api/artist");
      setArtistsList(response.data);
    } catch (e) {
      console.log(e.response);
    }
  });

  useEffect(() => {
    getAllArtists();
    console.log("new");
  }, []);

  const observerOption = {
    root: null,
    rootMargin: "0px 0px 30px 0px",
    threshold: 0.2,
  };

  useEffect(() => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    }, observerOption);
    const lazyImgs = document.querySelectorAll(".lazy-img");
    lazyImgs.forEach((el) => {
      io.observe(el);
    });
  });

  // useEffect(() => {
  //   updateScroll();
  // }, []);

  return (
    <Style.Container>
      <Style.SectionContainer>
        <Style.GridRow>
          <Style.Title>Painter Information</Style.Title>
        </Style.GridRow>
        <Style.IntroWrapper>
          <Style.Markdown>
            <h3>
              {/* TODO: 문구 수정 */}
              동해물과 백두산이 마르고 닳도록, 하나님이 보우하사 우리나라 만세.
              무궁화 삼천리 화려강산. 대한사람 대한으로 길이 보전하세.
            </h3>
          </Style.Markdown>
        </Style.IntroWrapper>
      </Style.SectionContainer>
      <Style.SectionContainer>
        <Style.Hr />
      </Style.SectionContainer>
      <Style.SectionContainer>
        <Style.MainGridRow>
          {artistsList.map((artistInfo) => (
            <Link
              href={`/artists/${artistInfo.id}`}
              key={`${artistInfo.name}-${artistInfo.id}`}
            >
              <Style.PageTeaser>
                <Style.ImageWrapper>
                  <Style.TeaserImage>
                    <Style.Images
                      src="/images/gray.png"
                      data-src={`${apiUrl}${artistInfo.profile}`}
                      alt={artistInfo.name}
                      className="lazy-img"
                      width="100"
                      height="100"
                    />
                  </Style.TeaserImage>
                  <Style.NameBox>
                    <Style.Name>{artistInfo.name}</Style.Name>
                  </Style.NameBox>
                </Style.ImageWrapper>
              </Style.PageTeaser>
            </Link>
          ))}
        </Style.MainGridRow>
      </Style.SectionContainer>
    </Style.Container>
  );
}
