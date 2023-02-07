import React from 'react'
import { Container, Box } from '@mui/material';
import { LoginForm } from '../../components/cards/cardLogin';

export default function loginHome(){
  return (
    <Container>
      <Box>
        <LoginForm/>
      </Box>
    </Container>
  )
}
