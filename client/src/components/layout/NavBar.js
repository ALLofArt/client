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
import React, { useState, useEffect } from "react";
import Link from "next/link";



const headersData = [
  {
    label: "Analysis Style",
    href: "/analysis",
  },
  {
    label: "Sign In",
    href: "/signin",
  },
  {
    label: "Sign up",
    href: "/signup",
  },
  {
    label: "About",
    href: "/about",
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#f7c73b",
    paddingRight: "79px",
    paddingLeft: "118px",

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
    justifyContent: "space-between",
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
        <Link href="/" passHref>
          <Toolbar className={toolbar}>
            {femmecubatorLogo}

            <div>{getMenuButtons()}</div>
          </Toolbar>
        </Link>
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

        <Link href="/" passHref>{femmecubatorLogo}</Link>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label , href}) => {
      return (
        <Link href={href} key={label} passHref>
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const femmecubatorLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      All of Art
    </Typography>
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
      <AppBar className={header} >
        {mobileView ? displayMobile() : displayDesktop()}
          </AppBar>
          <Toolbar/>
    </header>
  );
}
