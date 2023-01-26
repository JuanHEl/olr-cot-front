import React from 'react'
import { Box, Grid } from '@mui/material';
import styles from './BaseForm.module.css'
import { Container } from '@mui/system';
import Image from 'next/image';
import { DatosCliente } from '../../forms/formDatosCliente';
import { StepperForm } from '../../stepper';

export const BaseForm = () => {
  return (
    <Box>
        <Box className={styles.background} sx={{ backgroundImage: "url(/semi-circulo.png)" }}>
            <Box className={styles.img} sx={{ backgroundImage: "url(/OLR_leasing_con_R.png)" }}>
            </Box>
        </Box>
        <Box>
            <Box className={styles.card} sx={{ flexGrow: 1 }}>
                <Grid className={styles.cardHijo} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {/* <Container sx={{ position:'relative', paddingBottom:3 }}> */}
                        <StepperForm/>
                    {/* </Container> */}
                    {/* <DatosCliente/> */}
                </Grid>
            </Box>
        </Box>
    </Box>
  )
}
