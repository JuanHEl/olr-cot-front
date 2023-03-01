import React from 'react'
import { Tabs, Tab } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { UsuariosTables, TipoActivoTable } from '../tables';


const tabsOptions = ["Usuario", "Tipo activo", "Modelo", "Marca", "Estado", "Tabla residual", "Otros gastos", "Editables", "Tasas"];

// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
// }

// function TabPanel(props: TabPanelProps) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`vertical-tabpanel-${index}`}
//             aria-labelledby={`vertical-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     {children}
//                 </Box>
//             )}
//         </div>
//     );
// }

const a11yProps = (index: number) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export const TabAdminTabs = () => {

    // Se declara un state para controlar el tab que se va a mostrar
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'inline-flex', height: 500 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Usuario" {...a11yProps(0)} />
                <Tab label="Tipo activo" {...a11yProps(1)} />
                <Tab label="Modelo" {...a11yProps(2)} />
                <Tab label="Marca" {...a11yProps(3)} />
                <Tab label="Estado" {...a11yProps(4)} />
                <Tab label="Tabla residual" {...a11yProps(5)} />
                <Tab label="Otros gastos" {...a11yProps(6)} />
                <Tab label="Editables" {...a11yProps(7)} />
                <Tab label="Tasas" {...a11yProps(8)} />
            </Tabs>
            <Box width='calc(100%)' justifyContent='center' display='block'>
            {tabsOptions.map((label, index) => (
                value === index ?
                    index === 0 ?
                        <Box key={index} m={1}>
                            <Typography> {label} </Typography>
                            <UsuariosTables />
                        </Box> :
                        index === 1 ?
                            <Box key={index} m={1}>
                                <Typography> {label} </Typography>
                                <TipoActivoTable/>
                            </Box> :
                            index === 2 ?
                                <Box key={index} m={1}>
                                    <Typography> {label} </Typography>
                                </Box> :
                                index === 3 ?
                                    <Box key={index} m={1}>
                                        <Typography> {label} </Typography>
                                    </Box> :
                                    index === 4 ?
                                        <Box key={index} m={1}>
                                            <Typography> {label} </Typography>
                                        </Box> :
                                        index === 5 ?
                                            <Box key={index} m={1}>
                                                <Typography> {label} </Typography>
                                            </Box> :
                                            index === 6 ?
                                                <Box key={index} m={1}>
                                                    <Typography> {label} </Typography>
                                                </Box> :
                                                index === 7 ?
                                                    <Box key={index} m={1}>
                                                        <Typography> {label} </Typography>
                                                    </Box> :
                                                    index === 8 ?
                                                        <Box key={index} m={1}>
                                                            <Typography> {label} </Typography>
                                                        </Box> : ''
                    :
                    ''
            ))}

            </Box>
            {/* <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
            </TabPanel>
            <TabPanel value={value} index={7}>
                Item Eight
            </TabPanel>
            <TabPanel value={value} index={8}>
                Item Nine
            </TabPanel> */}
        </Box>
    )
}

