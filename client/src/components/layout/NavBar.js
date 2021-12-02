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

  const { mobileView, drawerOpen } = state;

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
      <AppBar className={header} elevation={0}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
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
  right: 23px;
  :hover {
    cursor: pointer;
  }
`;
