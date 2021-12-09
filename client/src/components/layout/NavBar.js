import {
  AppBar,
  Toolbar,
  Typography,
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
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
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

export default function Header() {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);

  const { mobileView, drawerOpen } = state;

  const throttle = function (callback, waitTime) {
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
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
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

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        <div style={{ width: "80vw" }}>{getMenuButtons()}</div>
        {AllOfArtLogo}
      </Toolbar>
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

        <Link href="/" passHref>
          {AllOfArtLogo}
        </Link>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link href={href} key={label} passHref>
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const AllOfArtLogo = (
    <HomePageLogo>
      <Link href="/" passHref>
        <img src="/images/allofart.png" alt="logo" width="100" />
      </Link>
    </HomePageLogo>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link href={href} key={label} passHref>
          <Button className={menuButton}>{label}</Button>
        </Link>
      );
    });
  };

  return (
    <header>
      <Nav className={hide && "hide"}>
        <AppBar className={header} elevation={0}>
          {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
      </Nav>
    </header>
  );
}

const HomePageLogo = styled.div`
  display: block;
  width: 5em;
  height: 5em;
  /* margin-bottom: -1.875rem; */
  position: absolute;
  top: 23px;
  right: 0;
  :hover {
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  width: 100%;
  height: 123px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 2;
  /* background-color: inherit; */
  transition: transform 0.4s;
  &.hide {
    transform: translateY(-123px);
  }
`;
