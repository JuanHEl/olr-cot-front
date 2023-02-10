import React from 'react'
import { Container, Skeleton, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const SkeletonCotizador = () => {
  return (
    <Container>
        <Box justifyContent='center' sx={{ width: '100%', marginRight: 0.5, my: 15 }}>
            <Box display="flex" justifyContent="center" m={5}>
                    <CircularProgress sx={{ alignContent:'center', justifySelf:'center' }} />
            </Box>
            <Skeleton variant="rounded" width='calc(100%)' height={250} sx={{ alignContent:'center' }} />
        </Box>
    </Container>
  )
}
