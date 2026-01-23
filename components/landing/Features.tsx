"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PieChartIcon from "@mui/icons-material/PieChart";
import CategoryIcon from "@mui/icons-material/Category";
import GroupsIcon from "@mui/icons-material/Groups";

const features = [
  {
    title: "Expense Tracking",
    description:
      "Easily log every transaction and keep your finances organized in real-time.",
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Insightful Analytics",
    description:
      "Visualize your spending patterns with beautiful charts and actionable data.",
    icon: <PieChartIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Smart Categories",
    description:
      "Organize items using Kategoria and Semikategoria for precise tracking.",
    icon: <CategoryIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Shared Expenses",
    description:
      "Collaborate with family or business partners to manage shared budgets.",
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
  },
];

export default function Features() {
  return (
    <Box
      id="features"
      sx={{ py: { xs: 10, md: 15 }, backgroundColor: "#eef7f1" }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 800,
              mb: 2,
            }}
          >
            Master Your Money
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: "700px", mx: "auto" }}
          >
            Powerful features designed to give you a clear picture of where your
            money goes.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  textAlign: "center",
                  p: 2,
                  borderRadius: 4,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.05)",
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "inline-flex",
                      p: 2,
                      borderRadius: 3,
                      backgroundColor: "rgba(150, 186, 148, 0.2)",
                      color: "#357252",
                      mb: 3,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
