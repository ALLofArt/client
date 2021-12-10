import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

export default function Navigation() {
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
          <DesktopHomeLink>
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
          </DesktopHomeLink>
        </div>
      </DesktopMainGridContainer>
    </MainNavigation>
  );
}

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

const DesktopMainGridContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 85px;
  padding-right: 85px;

  @media only screen and (max-width: 45rem) {
    display: none;
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
  padding: 1rem 1.875vw;
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
    transition: all 0.3s ease;
  }

  :hover > span::after {
    content: "";
    width: 100%;
    left: 0;
    border-bottom: 2px solid #000;
    transition: all 0.3s ease;
  }
`;

const DesktopHomeLink = styled.div`
  display: block;
  width: 5rem;
  height: 5rem;
  margin-bottom: -1.875rem;
  position: absolute;
  top: 3.125rem;
  right: 3.125rem;
  cursor: pointer;
`;
