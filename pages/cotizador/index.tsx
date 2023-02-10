import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCookie } from 'cookies-next';
import { setCotizacion,setMoverPlazo } from '../../store/slices';
import { RootState } from '../../store/index';
import { url } from 'inspector';
import { BaseForm } from '../../components/cards/cardForms/BaseForm';
import { Container, Typography, Box, Button } from '@mui/material';
import { SkeletonCotizador } from '../../components/skeletons/SkeletonCotizador';


export default function cotizadorHome(){

  const router = useRouter()
  // const dispatch = useDispatch()
  const token = getCookie('TOKEN')

  // variable que determina si ya cargó y está correctamente verificado
  const [loading, setLoading] = useState(true)
  
  // Verifica si es un usuario verificado con un token
  useEffect(()=>{
    if(!token) router.push('/login')
    setTimeout(() => {
      setLoading(false)
    }, 600)
  })

  
  // const hacerestado = () =>{
  //   let cotizacion = {
  //     factura:'hola',
  //     accesorios:'hola',
  //     rentas:'hola',
  //     fondoReservaMensual:'hola',
  //     comisionApertura:'hola',
  //     seguroAnual:'hola',
  //     otrosGastos:'hola',
  //     fondoReserva:'hola',
  //     residual:'hola',
  //     plazo:'hola'
  //   }
  //   dispatch(setCotizacion(cotizacion))
  //   // console.log('Imprimiendo dentro del boton',estado)
  // }
  
  // const { plazo } = useSelector((state:RootState)=>state.cotizacion)
  // console.log('Imprimiendo el estado del useSelector',estado)


  // Condicional que imprime un skeleton previo a cargar la vista 
  // if(loading) return <SkeletonCotizador/>
  
  return (
    <Container>
      <Box>
        {
          loading?
          <SkeletonCotizador/>:
          <BaseForm/>
        }
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
