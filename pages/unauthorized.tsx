import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const UnauthorizedPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      router.replace("/");
    }, 5000);
    return () => clearTimeout(unsubscribe);
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography sx={{ fontSize: "60px" }}>
        No estas autorizado para ver esta página
      </Typography>
    </Box>
  );
};

export default UnauthorizedPage;
