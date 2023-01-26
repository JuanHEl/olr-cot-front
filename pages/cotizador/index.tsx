import React from 'react'
import { Container, Typography, Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCotizacion,setMoverPlazo } from '../../store/slices';
import { RootState } from '../../store/index';
import { url } from 'inspector';
import { BaseForm } from '../../components/cards/cardForms/BaseForm';


export default function cotizadorHome(){

  const dispatch = useDispatch()

  
  const hacerestado = () =>{
    let cotizacion = {
      factura:'hola',
      accesorios:'hola',
      rentas:'hola',
      fondoReservaMensual:'hola',
      comisionApertura:'hola',
      seguroAnual:'hola',
      otrosGastos:'hola',
      fondoReserva:'hola',
      residual:'hola',
      plazo:'hola'
    }
    dispatch(setCotizacion(cotizacion))
    // console.log('Imprimiendo dentro del boton',estado)
  }
  
  const { plazo } = useSelector((state:RootState)=>state.cotizacion)
  // console.log('Imprimiendo el estado del useSelector',estado)
  return (
    <Container>
      <Box>
        <BaseForm/>
      </Box>
        {/* <Button onClick={() => dispatch(setCotizacion({
          factura:'hello',
          accesorios:'hello',
          rentas:'hello',
          fondoReservaMensual:'hello',
          comisionApertura:'hello',
          seguroAnual:'hello',
          otrosGastos:'hello',
          fondoReserva:'hello',
          residual:'hello',
          plazo:'hello'
        })) }>hacer estado</Button>
        <h1>El estado es: {plazo}</h1> */}
    </Container>
  )
}
