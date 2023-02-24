import React from 'react'
import { Box, Grid } from '@mui/material';
import { ButtonLogout } from '../../buttons/ButtonLogout';
import styles from './TabAdmin.module.css'
import { TabAdminTabs } from '../../tabs/TabAdminTabs';

export const TabAdmin = () => {
    return (
        <Box>
            <ButtonLogout />
            {/* <Box className={styles.background} sx={{ backgroundImage: "url(/semi-circulo.png)" }}>
                <Box className={styles.img} sx={{ backgroundImage: "url(/OLR_leasing_con_R.png)" }}>
                </Box>
            </Box> */}
            <Box>
                <Box className={styles.card} sx={{ flexGrow: 1 }}>
                    <Grid className={styles.cardHijo} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <TabAdminTabs />
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}
