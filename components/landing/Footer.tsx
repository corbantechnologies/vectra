"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ backgroundColor: "primary.main", color: "#fff", pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              VECTRA
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.8, maxWidth: "300px", lineHeight: 1.8 }}
            >
              Take control of your financial future with Vectra. The most
              intuitive way to track your expenses and income on the go.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              {[
                { icon: <FacebookIcon />, key: "fb" },
                { icon: <TwitterIcon />, key: "tw" },
                { icon: <LinkedInIcon />, key: "li" },
                { icon: <InstagramIcon />, key: "ig" },
              ].map((item) => (
                <IconButton
                  key={item.key}
                  size="small"
                  sx={{
                    color: "inherit",
                    opacity: 0.8,
                    "&:hover": { opacity: 1 },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Product
            </Typography>
            <Stack spacing={1}>
              {["Features", "Integrations", "Pricing", "Changelog"].map(
                (text) => (
                  <MuiLink
                    key={text}
                    component={Link}
                    href="#"
                    color="inherit"
                    underline="none"
                    sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
                  >
                    {text}
                  </MuiLink>
                ),
              )}
            </Stack>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Company
            </Typography>
            <Stack spacing={1}>
              {["About Us", "Contact", "Careers", "Legal"].map((text) => (
                <MuiLink
                  key={text}
                  component={Link}
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
                >
                  {text}
                </MuiLink>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
              Subscribe to get the latest updates on personal finance
              management.
            </Typography>
            {/* Simple newsletter placeholder */}
            <Typography
              variant="caption"
              sx={{ fontStyle: "italic", opacity: 0.5 }}
            >
              Powered by Corban Technologies LTD
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", mb: 4 }} />
        <Box sx={{ textAlign: "center", opacity: 0.6 }}>
          <Typography variant="caption">
            © {currentYear} Corban Technologies LTD. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
