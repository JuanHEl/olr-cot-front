import React from 'react'
import { Container, Box } from '@mui/material';
import { RegistroForm } from '../../components/cards/cardRegistro';

export default function registroHome(){
  return (
    <Container>
      <Box>
        <RegistroForm/>
      </Box>
    </Container>
  )
}