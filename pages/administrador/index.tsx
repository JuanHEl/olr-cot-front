import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { Container, Box } from "@mui/material";
import { SkeletonCotizador } from "../../components/skeletons/SkeletonCotizador";
import { TabAdmin } from "../../components/cards/cardAdmin";
import { GetStaticProps } from "next";

export default function cotizadorHome() {
  const router = useRouter();
  // const dispatch = useDispatch()
  const token = getCookie("TOKEN");

  // variable que determina si ya cargó y está correctamente verificado
  const [loading, setLoading] = useState(true);

  // Verifica si es un usuario verificado con un token
  useEffect(() => {
    // if (!token) router.push('/login')
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  return (
    <Container>
      <Box>{loading ? <SkeletonCotizador /> : <TabAdmin />}</Box>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      restricted: true,
      userAllowed: ["Administrador"],
    },
  };
};
