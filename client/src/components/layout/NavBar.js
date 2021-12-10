import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

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

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "transparent",
    paddingRight: "79px",
    paddingLeft: "50px",

    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    width: "90vw",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

function AllOfArtLogo() {
  return (
    <HomePageLogo>
      <Link href="/" passHref>
        <LogoImg src="/images/allofart.png" alt="logo" />
      </Link>
    </HomePageLogo>
  );
}
export default function Header() {
  const { header, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);

  const { mobileView, drawerOpen } = state;

  const throttle = (callback, waitTime) => {
    let timerId = null;
    return (e) => {
      if (timerId) return;
      timerId = setTimeout(() => {
        callback.call(this, e);
        timerId = null;
      }, waitTime);
    };
  };

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hideY = pageYOffset !== 0 && deltaY >= 0;
    setHide(hideY);
    setPageY(pageYOffset);
  };
  const throttleScroll = throttle(handleScroll, 50);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", throttleScroll);
    return () => document.removeEventListener("scroll", throttleScroll);
  }, [pageY]);

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link href={href} key={label} passHref>
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link href={href} key={label} passHref>
          <CatergoryButton className={menuButton}>{label}</CatergoryButton>
        </Link>
      );
    });
  };

  const displayDesktop = () => {
    return (
      <div>
        <Toolbar className={toolbar}>
          <div style={{ width: "80vw" }}>{getMenuButtons()}</div>
        </Toolbar>
      </div>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
      </Toolbar>
    );
  };

  return (
    <header>
      <Nav className={hide && "hide"}>
        <AppBar className={header} elevation={0}>
          {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
      </Nav>
      <AllOfArtLogo />
    </header>
  );
}

const HomePageLogo = styled.div`
  display: block;
  /* width: 5em;
  height: 5em; */
  /* margin-bottom: -1.875rem; */
  position: absolute;
  top: 23px;
  right: calc(8% - 20px);
  z-index: 3;
  :hover {
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 2;
  background-color: #fff;
  transition: transform 0.4s;
  &.hide {
    transform: translateY(-123px);
  }
`;

const LogoImg = styled.img`
  width: 5vw;
  min-width: 4rem;
`;

const CatergoryButton = styled(Button)`
  ::after {
    content: "";
    background: currentColor;
    width: 100%;
    height: 0.125 rem;
    display: block;
    margin-top: 0.125 rem;
    position: absolute;
    top: 100%;
    transform: scaleX(0) rotate(0.001deg);
    transform-origin: left center;
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
      transform-origin 0s 0.4s;
  }
`;
