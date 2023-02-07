import React from 'react'
import { Container, Box } from '@mui/material';
import { DatosLogin } from '../../forms/formLogin/DatosLogin';

export const LoginForm = () => {
  return (
    <Container>
        <Box>
          <DatosLogin/>
        </Box>
    </Container>
  )
}
