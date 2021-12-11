import Link from "next/link";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { createMedia } from "@artsy/fresnel";
import { MenuOpen, Close } from "@material-ui/icons";
import { useState } from "react";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 720,
    lg: 1024,
    xl: 1192,
  },
});

const headersData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Analysis Style",
    href: "/analysis",
  },
  {
    label: "Transfer Style",
    href: "/transfer",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Artists",
    href: "/artists",
  },
];

function Navigation() {
  const content = (
    <>
      <Media greaterThanOrEqual="md">
        <DesktopNavigation />
      </Media>
      <Media lessThan="md">
        <MobileNavigation />
      </Media>
    </>
  );

  return <MainNavigation>{content}</MainNavigation>;
}

function DesktopNavigation() {
  return (
    <MainNavigation>
      <DesktopMainGridContainer>
        <DesktopItems>
          {headersData.map((data) => (
            <li role="none" key={data.label}>
              <ButtonLink>
                <span>
                  <Link href={data.href} passHref>
                    {data.label}
                  </Link>
                </span>
              </ButtonLink>
            </li>
          ))}
        </DesktopItems>
        <div style={{ width: "5rem", height: "5rem" }}>
          <HomeLink>
            <Link href="/" passHref>
              <a>
                <Image
                  src="/images/allofart.png"
                  alt="logo"
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                />
              </a>
            </Link>
          </HomeLink>
        </div>
      </DesktopMainGridContainer>
    </MainNavigation>
  );
}
function MobileNavigation() {
  const [close, setClose] = useState(true);
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setClose(!close);
    setOpen(!open);
  };
  return (
    <MobileMainGridContainer>
      {close && (
        <MobileHeader>
          <ButtonIcon onClick={onClick}>
            <MenuOpen />
          </ButtonIcon>
          <HomeLink>
            <Link href="/" passHref>
              <a>
                <Image
                  src="/images/allofart.png"
                  alt="logo"
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                />
              </a>
            </Link>
          </HomeLink>
        </MobileHeader>
      )}
      {open && (
        <>
          <MobileHeader>
            <ButtonIcon onClick={onClick}>
              <Close />
            </ButtonIcon>
          </MobileHeader>
          <MobileMenuGridContainer>
            <MobileMenuHeader>
              <MobileMenuBack> </MobileMenuBack>
              <MenuHeading2>Menu</MenuHeading2>
              <Hr />
              <MobileMenuItems>
                {headersData.map((data) => (
                  <li role="none" key={data.label}>
                    <ButtonLink mobile="true" onClick={onClick}>
                      <span mobile="true">
                        <Link href={data.href} passHref>
                          {data.label}
                        </Link>
                      </span>
                    </ButtonLink>
                  </li>
                ))}
              </MobileMenuItems>
              <Hr />
            </MobileMenuHeader>
          </MobileMenuGridContainer>
        </>
      )}
    </MobileMainGridContainer>
  );
}
export default function ResponsiveFresnelComponent() {
  return (
    <MediaContextProvider>
      <Navigation />
    </MediaContextProvider>
  );
}

const MobileMainGridContainer = styled.div`
  height: 7.5rem;
  padding: 1.875rem calc(8% - 20px);
  width: 100%;
`;

const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const MainNavigation = styled.nav`
  z-index: 4;
  width: 100vw;
  position: fixed;
  a {
    color: #000;
    text-decoration: none;
  }
  @media only screen and (min-width: 45rem) {
    min-height: 6.875rem;
  }
`;

const MobileMenuGridContainer = styled.div`
  padding-left: calc(8% - 20px);
  padding-right: calc(8% - 20px);
  background-color: #f6c83b;
  transition: background-color 0.6s linear;
  min-height: calc(var(--vh, 1vh) * 100);
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 3.75rem;
  left: 0;
  right: 0;
  width: 100%;
`;

const SlideFade = keyframes`
  0% { opacity: 0; transform: translateX(-2.5rem) } to { opacity: 1; transform: translateX(0) }
`;

const MobileMenuHeader = styled.div`
  opacity: 0;
  transform: translateX(-2.5rem);
  -webkit-animation: ${SlideFade} .5s cubic-bezier(.23,1,.32,1) forwards;
  animation: ${SlideFade} .5s cubic-bezier(.23,1,.32,1) forwards;
}
`;

const MobileMenuBack = styled.div`
  height: 1.25rem;
  margin: 1.875rem 0;
`;

const MenuHeading2 = styled.h3`
  font-size: 3rem;
  line-height: 1.083;
  margin-bottom: 1.875rem;
`;

const Hr = styled.hr`
  background: #000;
  height: 3px;
  margin: 0;
  border: 0;
  border-radius: 1px;
  flex: 0 0 auto;
`;

const MobileMenuItems = styled.ul`
  opacity: 0;
  transform: translateX(-2.5rem);
  -webkit-animation: ${SlideFade} 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  animation: ${SlideFade} 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
  display: flex;
  flex-direction: column;
  padding: 1.875rem 0;
  > li:first-child {
    margin-top: -0.938rem;
  }
`;

const DesktopMainGridContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: calc(8% - 20px);
  padding-right: calc(8% - 20px);
`;

const ButtonIcon = styled.button`
  color: #000;
  transition: color 0.2s linear;
  width: 2rem;
  height: 2rem;
  flex: 0 0 auto;
  display: inline-block;
  background: none;
  border: none;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-sizing: content-box;
  line-height: 0;
  padding: 1rem;
  margin: -1rem;
  > svg {
    width: 2rem;
    height: 2rem;
  }
`;

const DesktopItems = styled.ul`
  height: 6.875rem;
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  > li:first-child {
    margin-left: -1.875rem;
  }
  > li:last-child {
    margin-right: -1.875rem;
  }
`;

const ButtonLink = styled.button`
  padding: ${(props) => (props.mobile ? "0.938rem 0;" : "1rem 1.875vw")};
  padding-left: ${(props) => props.endpoint && 0}
  margin: 0;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  display: flex;
  color: #000;
  transition: color 1s linear;
  display: inline-block;
  background: none;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: 1rem;
  text-decoration: none;

  > span {
    position: relative;
    font-size: ${(props) => props.mobile && "1.5rem"};
  }
  > span::after {
    content: "";
    width: 0%;
    right: 0;
    height: 1px;
    display: block;
    position: absolute;
    margin-top: 3px;
    border-bottom: 2px solid #000;
    transition: all 0.5s ease;
  }

  :hover > span::after {
    content: "";
    width: 100%;
    left: 0;
    border-bottom: 2px solid #000;
    transition: all 0.5s ease;
  }
`;

const HomeLink = styled.div`
  display: block;
  width: 5rem;
  height: 5rem;
  margin-bottom: -1.875rem;
  position: absolute;
  top: 3.125rem;
  right: calc(8% - 20px);
  cursor: pointer;
  @media only screen and (max-width: 45rem) {
    width: 4rem;
    height: 4rem;
    top: 1.875rem;
    right: calc(8% - 20px);
  }
`;
