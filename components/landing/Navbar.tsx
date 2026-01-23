"use client";

import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", p: 2 }}>
      <Typography
        variant="h6"
        sx={{ my: 2, fontWeight: 700, color: "primary.main" }}
      >
        VECTRA
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Button
              fullWidth
              component={Link}
              href={item.href}
              sx={{ textAlign: "center", color: "text.primary" }}
            >
              <ListItemText primary={item.label} />
            </Button>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ mt: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            component={Link}
            href="/login"
            sx={{ borderRadius: "9999px" }}
          >
            Log In
          </Button>
        </ListItem>
        <ListItem disablePadding sx={{ mt: 1 }}>
          <Button
            fullWidth
            variant="contained"
            component={Link}
            href="/signup"
            sx={{ borderRadius: "9999px" }}
          >
            Sign Up
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar className="container mx-auto max-w-7xl">
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            flexGrow: 1,
            fontWeight: 800,
            letterSpacing: "-0.5px",
            background: "linear-gradient(45deg, #357252 30%, #96ba94 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
          }}
        >
          VECTRA
        </Typography>

        {!isMobile ? (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.href}
                sx={{ color: "text.primary", fontWeight: 500 }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="text"
              component={Link}
              href="/login"
              sx={{ ml: 2 }}
            >
              Log In
            </Button>
            <Button
              variant="contained"
              component={Link}
              href="/signup"
              sx={{ borderRadius: "9999px", px: 3 }}
            >
              Get Started
            </Button>
          </Box>
        ) : (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: "primary.main" }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
