import { Box, Divider, SxProps, Typography } from "@mui/material";
import React, { FC } from "react";
import BackupTableRoundedIcon from "@mui/icons-material/BackupTableRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import RequestQuoteRoundedIcon from "@mui/icons-material/RequestQuoteRounded";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { roles } from "../../../interfaces/storeInterfaces/sliceAdminInterface";
import { useRouter } from "next/router";

//OPCIONES DEL ADMINISTRADOR
const OPTIONS: AOProps[] = [
  {
    title: "Tablas",
    id: 1,
    icon: (props) => <BackupTableRoundedIcon {...props} />,
    path: "/administrador",
  },
  {
    title: "Dashboard",
    id: 2,
    icon: (props) => <DashboardRoundedIcon {...props} />,
    path: "/",
  },
  {
    title: "Cotizador",
    id: 3,
    icon: (props) => (
      <Box sx={{ display: "flex" }}>
        <RequestQuoteRoundedIcon {...props} />
        <Divider sx={dividerStyles} orientation="vertical" flexItem />
        <RequestQuoteOutlinedIcon {...props} />
      </Box>
    ),
    path: "/cotizador",
  },
  {
    title: "Calculadora",
    id: 4,
    icon: (props) => <CalculateOutlinedIcon {...props} />,
    path: "/",
  },
  {
    title: "Checklist",
    id: 5,
    icon: (props) => <FormatListBulletedRoundedIcon {...props} />,
    path: "/",
  },
];

const ALLOWED: {
  [key in roles as string]: number[];
} = {
  Administrador: [1, 2, 3, 4],
  Promotor: [3, 4],
  Validador: [5],
};

//COMPONENTE PRINCIPAL DEL ARCHIVO
export const AdministratorsMainOptions = () => {
  //REDUX
  const { authorization } = useSelector((state: RootState) => state.auth);
  //REDUX

  return (
    <Box sx={bgContainerStyles}>
      <Box sx={optionsContainerStyles}>
        {authorization &&
          OPTIONS.filter((option) =>
            ALLOWED[authorization as string].includes(option.id)
          ).map((option) => (
            <Box key={option.id} sx={optionItemContainerStyles}>
              <AdministratorOption {...option} />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

//COMPONENTE PARA UNA OPCIÓN
type AOProps = {
  id: number;
  title: string;
  icon: (props: { sx: SxProps }) => JSX.Element;
  path: string;
};
const AdministratorOption: FC<AOProps> = ({ title, icon, path }) => {
  const router = useRouter();
  return (
    <Box sx={optionItemStyles} onClick={() => router.push(path)}>
      <Box sx={optionItemIconsContainerStyles}>
        {icon({ sx: optionItemIconsStyles })}
      </Box>
      <Typography sx={optionItemTitleStyles}>{title}</Typography>
    </Box>
  );
};

//ESTILOS DEL COMPONENTE PRINCIPAL
const bgContainerStyles: SxProps = {
  bgcolor: "var(--light-grey-color)",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
};
const optionsContainerStyles: SxProps = {
  width: "1200px",
  maxWidth: "95%",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
  gap: { md: "60px", xs: "20px" },
  pb: { lg: 0, xs: 5 },
};
const optionItemContainerStyles: SxProps = {
  flex: 1,
  minWidth: { sm: "400px", xs: "95%" },
};
//ESTILOS DEL COMPONENTE PRINCIPAL
//ESTILOS PARA EL COMPONENTE ITEMOPTION
const optionItemStyles: SxProps = {
  bgcolor: "var(--dark-blue-color)",
  borderRadius: "10px",
  overflow: "hidden",
  width: "100%",
  cursor: "pointer",
  boxShadow: "0 0 20px rgba(0,0,0, 0.25)",
};
const optionItemIconsContainerStyles: SxProps = {
  minHeight: { sm: "200px", xs: "150px" },
  bgcolor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const optionItemTitleStyles: SxProps = {
  textAlign: "center",
  fontSize: { sm: "38px", xs: "24px" },
  fontWeight: "600",
  color: "white",
  py: 2,
};

const optionItemIconsStyles: SxProps = {
  width: { sm: "150px", xs: "85px" },
  height: { sm: "150px", xs: "85px" },
  color: "var(--dark-blue-color)",
};
//ESTILOS PARA EL COMPONENTE ITEMOPTION

//ESTILOS AISLADOS
const dividerStyles: SxProps = {
  display: "inline-block",
  width: "6px",
  borderRadius: "40px",
  backgroundColor: "var(--dark-blue-color)",
  mx: { sm: "40px", xs: "15px" },
};
