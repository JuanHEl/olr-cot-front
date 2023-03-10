import { Box, Divider, SxProps, Typography } from "@mui/material";
import React, { FC } from "react";
import BackupTableRoundedIcon from "@mui/icons-material/BackupTableRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import RequestQuoteRoundedIcon from "@mui/icons-material/RequestQuoteRounded";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";

//OPCIONES DEL ADMINISTRADOR
const OPTIONS: AOProps[] = [
  {
    title: "Tablas",
    id: 1,
    icon: (props) => <BackupTableRoundedIcon {...props} />,
  },
  {
    title: "Dashboard",
    id: 2,
    icon: (props) => <DashboardRoundedIcon {...props} />,
  },
  {
    title: "Cotizador",
    id: 3,
    icon: (props) => (
      <Box sx={{display: 'flex'}}>
        <RequestQuoteRoundedIcon {...props} />
        <Divider
          orientation="vertical"
          flexItem
          style={{
            display: "inline-block",
            width: "6px",
            borderRadius: "40px",
            backgroundColor: "var(--dark-blue-color)",
            margin: "0 40px",
          }}
        />
        <RequestQuoteOutlinedIcon {...props} />
      </Box>
    ),
  },
  {
    title: "Calculadora",
    id: 4,
    icon: (props) => <CalculateOutlinedIcon {...props} />,
  },
];

//COMPONENTE PRINCIPAL DEL ARCHIVO
export const AdministratorsMainOptions = () => {
  return (
    <Box sx={bgContainerStyles}>
      <Box sx={optionsContainerStyles}>
        {OPTIONS.map((option) => (
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
};
const AdministratorOption: FC<AOProps> = ({ title, icon }) => {
  return (
    <Box
      sx={optionItemStyles}
      onClick={() => console.log("you had press " + title)}
    >
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
  width: "1400px",
  maxWidth: "95%",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
  gap: "20px",
};
const optionItemContainerStyles: SxProps = {
  flex: 1,
  minWidth: { sm: "500px", xs: "95%" },
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
  minHeight: "250px",
  bgcolor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const optionItemTitleStyles: SxProps = {
  textAlign: "center",
  fontSize: "38px",
  fontWeight: "600",
  color: "white",
  py: 3,
};

const optionItemIconsStyles: SxProps = {
  width: "150px",
  height: "150px",
  color: "var(--dark-blue-color)",
};
//ESTILOS PARA EL COMPONENTE ITEMOPTION
