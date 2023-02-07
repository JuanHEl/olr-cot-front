import React, { ChangeEvent, useState } from 'react'
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box, Typography, Slider, Container } from '@mui/material';
import AirportShuttleRoundedIcon from '@mui/icons-material/AirportShuttleRounded';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import { setAnticipoArrendamiento, setComisionApertura, setFondoReserva, setPlan, setPlazo, setRentasDeposito, setTipoResidual, setTipoSeguro, setValorResidualConvenido } from '../../../store/slices/datosPlan';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// constantes y funciones de COMISION POR APERTURA
const comisiones = [
    '0',
    '1',
    '2',
    '2.5',
    '3',
    '3.5',
    '4',
  ];


// Constantes y funciones de PLAZO
const marks = [
    {
      value: 12,
      label: '12',
    },
    {
      value: 24,
      label: '24',
    },
    {
      value: 36,
      label: '36',
    },
    {
      value: 48,
      label: '48',
    },
  ];
// function valueLabelPlazo(value: number) {
//     console.log(value)
//     const units = ['KB', 'MB', 'GB', 'TB'];
  
//     let unitIndex = 0;
//     let scaledValue = value;
  
//     while (scaledValue >= 1024 && unitIndex < units.length - 1) {
//       unitIndex += 1;
//       scaledValue /= 1024;
//     }
  
//     return `${scaledValue} ${units[unitIndex]}`;
//   }
  
  // function calculatePlazo(value: number) {
  //   return 2 ** value;
  // }
  

// Constantes y funciones de PLAN
const planes = [
  'Plan A',
  'Plan B',
  'Plan ALPHA',
  'Plan BETA',
  'Plan GAMMA',
];


  

// Constantes y funciones de TIPO DE SEGURO
const seguros = [
  'Incluido',
  'No incluido',
];

  

// Constantes y funciones de TIPO DE RESIDUAL
const residuales = [
  'Porcentaje',
  'Cantidad',
];


export const DatosPlan = () => {

    // Se declara el dispatch para poder modificar los estados globales
    const dispatch = useDispatch()
    
    // Se obtiene los valores del State Global
    const {
      plazo,
      comisionApertura,
      anticipoArrendamiento,
      plan,
      tipoSeguro,
      rentasDeposito,
      tipoResidual,
      fondoReserva,
      valorResidualConvenido           
     } = useSelector((state:RootState)=>state.plan)


    // Constantes y funciones de COMISION POR APERTURA
    const [comisionAperturaState, setComisionAperturaState] = useState({ value: "", touched: false });
    const handleChange = (event: SelectChangeEvent) => {
      setComisionAperturaState(currentValue => ({...currentValue, value:event.target.value}));
      dispatch(setComisionApertura(event.target.value))
    };

    // Constantes y funciones de PLAZO
    const [plazoState, setPlazoState] = React.useState<number>(24);
    const handleChangeSlider = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
          setPlazoState(newValue);
          dispatch(setPlazo(newValue))
        }
    };

    // Constantes y funciones de PLAN
    const [planState, setPlanState] = useState({ value: "", touched: false })
    const handleChangePlan = (event: SelectChangeEvent) => {
      setPlanState(currentValue => ({...currentValue, value:event.target.value}));
      dispatch(setPlan(event.target.value))
    };
    
    // Constantes y funciones de TIPO DE SEGUROS
    const [tipoSeguroState, setTipoSeguroState] = useState({ value: "", touched: false })
    const handleChangeTipoSeguro = (event: SelectChangeEvent) => {
      setTipoSeguroState(currentValue => ({...currentValue, value:event.target.value}));
      dispatch(setTipoSeguro(event.target.value))
    };
    
    // Constantes y funciones de TIPO DE RESIDUAL
    const [tipoResidualState, setTipoResidualState] = useState({ value: "", touched: false })
    const handleChangeTipoResidual = (event: SelectChangeEvent) => {
      setTipoResidualState(currentValue => ({...currentValue, value:event.target.value}));
      dispatch(setTipoResidual(event.target.value))
    };
    
    // Constantes y funciones de ANTICIPO ARRENDAMIENTO
    const [anticipoArrendamientoState, setAnticipoArrendamientoState] = useState({ value: 0, touched: false });
    const handleChangeAnticipoArrendamiento = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAnticipoArrendamientoState(currentValue => ({...currentValue, value:Number(event.target.value)}));
      dispatch(setAnticipoArrendamiento(Number(event.target.value)))
    };
    
    // Constantes y funciones de RENTAS EN DEPÓSITO
    const [rentasDepositoState, setRentasDepositoState] = useState({ value: 0, touched: false });
    const handleChangeRentasDeposito = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRentasDepositoState(currentValue => ({...currentValue, value:Number(event.target.value)}));
      dispatch(setRentasDeposito(Number(event.target.value)))
    };
    
    // Constantes y funciones de FONDO DE RESERVA
    const [fondoReservaState, setFondoReservaState] = useState({ value: 0, touched: false });
    const handleChangeFondoReserva = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFondoReservaState(currentValue => ({...currentValue, value:Number(event.target.value)}));
      dispatch(setFondoReserva(Number(event.target.value)))
    };
    
    // Constantes y funciones de VALOR RESIDUAL CONVENIDO
    const [valorResidualConvenidoState, setValorResidualConvenidoState] = useState({ value: 0, touched: false });
    const handleChangeValorResidualConvenido = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValorResidualConvenidoState(currentValue => ({...currentValue, value:Number(event.target.value)}));
      dispatch(setValorResidualConvenido(Number(event.target.value)))
    };

  return (
    <Container>
        <Grid container spacing={3} sx={{ position:'relative' }}>
            <Grid item xs={12} sm={6} sx={{display: "flex", justifyContent: "center"}}>              
              <Box sx={{ width: '95%', alignItems:'center', alignContent:'center', alignSelf:'center' }}>
                  <Typography id="non-linear-slider"> Plazo </Typography>
                  <Slider
                      value={plazo}
                      min={12}
                      step={1}
                      max={48}
                      marks={marks}
                      onChange={handleChangeSlider}
                      valueLabelDisplay="auto"
                      aria-labelledby="non-linear-slider"
                      sx={{
                          '& .MuiSlider-thumb': {
                              // Modificar aquí
                            height: 27,
                            width: 32,
                            border: 'none',
                            backgroundColor: 'transparent',
                            backgroundImage: "url(/car.png)",
                            // border: '1px solid currentColor',
                            '&:hover': {
                              boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
                            },
                            '& .airbnb-bar': {
                              height: 9,
                              width: 1,
                              backgroundColor: 'currentColor',
                              marginLeft: 1,
                              marginRight: 1,
                            },
                          },
                          '& .MuiSlider-track': {
                            height: 3,
                          }}}
                  />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Comisión por apertura</InputLabel>
                <Select
                  labelId="comisionApertura"
                  id="comisionApertura"
                  value={comisionApertura}
                  label="Comisión por apertura"
                  onChange={handleChange}
                  MenuProps={MenuProps}
                >
                    <MenuItem value="">
                    <em> Ninguno </em>
                    </MenuItem>
                    {comisiones.map((comision) => (
                        <MenuItem key={comision} value={comision}> {comision} </MenuItem>
                    ))}
                </Select>
              </FormControl>

            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                onChange={handleChangeAnticipoArrendamiento}
                id="anticipoArrendamiento"
                name="anticipoArrendamiento"
                label="Anticipo del arrendamiento"
                fullWidth
                value={anticipoArrendamiento}
                // variant="outlined"
                // onBlur={()=>setValorAnticipoArrendamiento(currentValue => ({ ...currentValue, touched: true }))}
                // color={valorAnticipoArrendamiento.value==''? 'warning' : 'info'}
                // helperText={valorAnticipoArrendamiento.touched&&valorAnticipoArrendamiento.value==''? 'El valor del anticipo es requerido' : ''}
                />
            </Grid>

            <Grid item xs={12} sm={6}>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Plan</InputLabel>
                <Select
                  labelId="planArrendamiento"
                  id="planArrendamiento"
                  value={plan}
                  label="Comisión por apertura"
                  onChange={handleChangePlan}
                  MenuProps={MenuProps}
                >
                    <MenuItem value="">
                    <em> Ninguno </em>
                    </MenuItem>
                    {planes.map((plan) => (
                        <MenuItem key={plan} value={plan}> {plan} </MenuItem>
                    ))}
                </Select>
              </FormControl>

            </Grid>

            <Grid item xs={12} sm={6}>

              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tipo de seguro</InputLabel>
                  <Select
                    labelId="tipoSeguro"
                    id="tipoSeguro"
                    value={tipoSeguro}
                    label="Comisión por apertura"
                    onChange={handleChangeTipoSeguro}
                    MenuProps={MenuProps}
                  >
                      <MenuItem value="">
                      <em> Ninguno </em>
                      </MenuItem>
                      {seguros.map((seguro) => (
                          <MenuItem key={seguro} value={seguro}> {seguro} </MenuItem>
                      ))}
                  </Select>
                </FormControl>

            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                onChange={handleChangeRentasDeposito}
                id="rentasDeposito"
                name="rentasDeposito"
                label="Rentas en depósito"
                fullWidth
                value={rentasDeposito}
                // variant="outlined"
                // onBlur={()=>setValorRentas(currentValue => ({ ...currentValue, touched: true }))}
                // color={valorRentas.value==''? 'warning' : 'info'}
                // helperText={valorRentas.touched&&valorRentas.value==''? 'El valor de las rentas es requerido' : ''}
                />
            </Grid>

            <Grid item xs={12} sm={6}>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo de residual</InputLabel>
                <Select
                  labelId="tipoResidual"
                  id="tipoResidual"
                  value={tipoResidual}
                  label="Tipo de residual"
                  onChange={handleChangeTipoResidual}
                  MenuProps={MenuProps}
                >
                    <MenuItem value="">
                    <em> Ninguno </em>
                    </MenuItem>
                    {residuales.map((residual) => (
                        <MenuItem key={residual} value={residual}> {residual} </MenuItem>
                    ))}
                </Select>
              </FormControl>
              
            </Grid>
            
            <Grid item xs={12} sm={6}>
                <TextField
                onChange={handleChangeFondoReserva}
                id="fondoReservaMens"
                name="fondoReservaMens"
                label="Fondo de reserva"
                fullWidth
                value={fondoReserva}
                // variant="outlined"
                // onBlur={()=>setValorFondoReservaMensual(currentValue => ({ ...currentValue, touched: true }))}
                // color={valorFondoReservaMensual.value==''? 'warning' : 'info'}
                // helperText={valorFondoReservaMensual.touched&&valorFondoReservaMensual.value==''? 'El valor del fondo de reserva es requerido' : ''}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                onChange={handleChangeValorResidualConvenido}
                id="valorResidual"
                name="valorResidual"
                label="Valor residual convenido"
                fullWidth
                value={valorResidualConvenido}
                // variant="outlined"
                // onBlur={()=>setValorOtrosGastos(currentValue => ({ ...currentValue, touched: true }))}
                // color={valorOtrosGastos.value==''? 'warning' : 'info'}
                // helperText={valorOtrosGastos.touched&&valorOtrosGastos.value==''? 'El valor de otros gastos es requerido' : ''}
                />
            </Grid>
        </Grid>
    </Container>
  )
}
