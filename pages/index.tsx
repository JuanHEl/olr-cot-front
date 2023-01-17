import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { FormEvent, useEffect, useState } from 'react'

// import { useForm, SubmitHandler } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";

// type InputsForm = {
//   valorResidual: string,
//   fondoReserva: string,
//   otrosGastos: string,
//   seguroAnual: string,
//   comisionApertura: string,
//   fondoReservaMens: string,
//   rentasDeposito: string,
//   costoAccesorios: string,
//   valorFactura: string,
// };


// const schema = yup.object({
//   valorResidual: yup.string().required(),
//   fondoReserva: yup.string().required(),
//   otrosGastos: yup.string().required(),
//   seguroAnual: yup.string().required(),
//   comisionApertura: yup.string().required(),
//   fondoReservaMens: yup.string().required(),
//   rentasDeposito: yup.string().required(),
//   costoAccesorios: yup.string().required(),
//   valorFactura: yup.string().required()
// }).required();


export default function Home() {

  const [valorFactura, setValorFactura] = useState({ value: "", touched: false })
  const [valorAccesorios, setValorAccesorios] = useState({ value: "", touched: false })
  const [valorRentas, setValorRentas] = useState({ value: "", touched: false })
  const [valorFondoReservaMensual, setValorFondoReservaMensual] = useState({ value: "", touched: false })
  const [valorComisionApertura, setValorComisionApertura] = useState({ value: "", touched: false })
  const [valorSeguroAnualC, setValorSeguroAnualC] = useState({ value: "", touched: false })
  const [valorOtrosGastos, setValorOtrosGastos] = useState({ value: "", touched: false })
  const [valorFondoReserva, setValorFondoReserva] = useState({ value: "", touched: false })
  const [valorResidual, setValorResidual] = useState({ value: "", touched: false })
  const [plazo, setPlazo] = useState({ value: "", touched: false })
  const [cotizacion, setCotizacion] = useState({montoArrendamiento:0,comisionApSinIva:0})


  const handleChangeVF = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValorFactura(currentValue => ({ ...currentValue, value: event.target.value }))
  }

  const cotiza = () => {
    console.log('En Cotiza, el valor factura:', valorFactura)
    let vFSInIVA = parseFloat(valorFactura.value) % 1.16
    let valorResidualSinIva = vFSInIVA * .20
    let otrosGastos = 0
    if(parseInt(plazo.value)==12){
      otrosGastos=9800
    }else if (parseInt(plazo.value)>=13 && parseInt(plazo.value)<=24){
      otrosGastos=14100
    }else if (parseInt(plazo.value)>=25 && parseInt(plazo.value)<=35){
      otrosGastos=18400
    }else if (parseInt(plazo.value)>=36 && parseInt(plazo.value)<=48){
      otrosGastos=22700
    }
    let montoArrendamiento = parseFloat(valorFactura.value) + parseFloat(valorAccesorios.value) + (otrosGastos * 1.16)
    console.log('Monto Arrendamiento: ',montoArrendamiento)
    let comisionAp = montoArrendamiento * parseInt(valorComisionApertura.value)/100
    let comisionApSinIva = comisionAp/1.16
    console.log('Comision: ', comisionApSinIva)
    setCotizacion(currentValue => ({ ...currentValue, montoArrendamiento , comisionApSinIva }))
  }

  // const submitContact = async (event: FormEvent) => {
  //   event.preventDefault();
  //   console.log(event)
  // };

  // const { register, handleSubmit, watch, formState: { errors } } = useForm<InputsForm>();
  // const onSubmit: SubmitHandler<InputsForm> = data => console.log(data);

  // const { register, handleSubmit, formState: { errors } } = useForm<InputsForm>({
  //   resolver: yupResolver(schema)
  // });
  // const onSubmit = (data: InputsForm) => {
  //   setValorFactura(data.valorFactura)
  //   setValorAccesorios(data.costoAccesorios)
  //   setValorRentas(data.rentasDeposito)
  //   setValorFondoReservaMensual(data.fondoReservaMens)
  //   setValorComisionApertura(data.comisionApertura)
  //   setValorSeguroAnualC(data.seguroAnual)
  //   setValorOtrosGastos(data.otrosGastos)
  //   setValorFondoReserva(data.fondoReserva)
  //   setValorResidual(data.valorResidual)
  //   setRefresh(prev => !prev)
  // };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    // console.log({ valorFactura, valorAccesorios, valorRentas, valorFondoReservaMensual, valorComisionApertura, valorSeguroAnualC, valorOtrosGastos, valorFondoReserva, valorResidual })
    cotiza()
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h2" gutterBottom textAlign='center'>
        Cotizador
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => setValorFactura(currentValue => ({ ...currentValue, value: e.target.value }))}
              id="valorFactura"
              name="valorFactura"
              label="Valor factura"
              fullWidth
              value={valorFactura.value}
              variant="outlined"
              onBlur={()=>setValorFactura(currentValue => ({ ...currentValue, touched: true }))}
              color={valorFactura.value==''? 'warning' : 'info'}
              helperText={valorFactura.touched&&valorFactura.value==''? 'El valor de la factura es requerido':''}
            // color={errors.valorFactura? 'warning' : 'info'}
            // helperText={errors.valorFactura? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => setValorAccesorios(currentValue => ({ ...currentValue, value: e.target.value }))}
              id="costoAccesorios"
              name="costoAccesorios"
              label="Costo de accesorios"
              fullWidth
              value={valorAccesorios.value}
              variant="outlined"
              onBlur={()=>setValorAccesorios(currentValue => ({ ...currentValue, touched: true }))}
              color={valorAccesorios.value==''? 'warning' : 'info'}
              helperText={valorAccesorios.touched&&valorAccesorios.value==''? 'El valor de accesorios es requerido' : ''}
            // color={errors.costoAccesorios? 'warning' : 'info'}
            // helperText={errors.costoAccesorios? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setValorRentas(currentValue => ({ ...currentValue, value: e.target.value }))}
              id="rentasDeposito"
              name="rentasDeposito"
              label="Rentas en depósito"
              fullWidth
              value={valorRentas.value}
              variant="outlined"
              onBlur={()=>setValorRentas(currentValue => ({ ...currentValue, touched: true }))}
              color={valorRentas.value==''? 'warning' : 'info'}
              helperText={valorRentas.touched&&valorRentas.value==''? 'El valor de las rentas es requerido' : ''}
            // color={errors.rentasDeposito? 'warning' : 'info'}
            // helperText={errors.rentasDeposito? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setValorFondoReserva(currentValue => ({ ...currentValue, value: e.target.value }))}
              id="fondoReserva"
              name="fondoReserva"
              label="Fondo de reserva"
              fullWidth
              value={valorFondoReserva.value}
              variant="outlined"
              onBlur={()=>setValorFondoReserva(currentValue => ({ ...currentValue, touched: true }))}
              color={valorFondoReserva.value==''? 'warning' : 'info'}
              helperText={valorFondoReserva.touched&&valorFondoReserva.value==''? 'El valor de fondo de reserva es requerido' : ''}
            // color={errors.fondoReserva? 'warning' : 'info'}
            // helperText={errors.fondoReserva? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => setValorComisionApertura(currentValue => ({ ...currentValue, value: e.target.value }))}
              id="comisionApertura"
              name="comisionApertura"
              label="Comisión por apertura"
              fullWidth
              value={valorComisionApertura.value}
              variant="outlined"
              onBlur={()=>setValorComisionApertura(currentValue => ({ ...currentValue, touched: true }))}
              color={valorComisionApertura.value==''? 'warning' : 'info'}
              helperText={valorComisionApertura.touched&&valorComisionApertura.value==''? 'El valor de la comisión por apertura es requerido' : ''}
            // color={errors.comisionApertura? 'warning' : 'info'}
            // helperText={errors.comisionApertura? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => setValorSeguroAnualC(currentValue => ({ ...currentValue, value: e.target.value }))}
              id="seguroAnual"
              name="seguroAnual"
              label="Seguro anual de contado"
              fullWidth
              value={valorSeguroAnualC.value}
              variant="outlined"
              onBlur={()=>setValorSeguroAnualC(currentValue => ({ ...currentValue, touched: true }))}
              color={valorSeguroAnualC.value==''? 'warning' : 'info'}
              helperText={valorSeguroAnualC.touched&&valorSeguroAnualC.value==''? 'El valor del seguro anual es requerido' : ''}
            // color={errors.seguroAnual? 'warning' : 'info'}
            // helperText={errors.seguroAnual? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => setValorOtrosGastos(currentValue => ({ ...currentValue, value: e.target.value }))}
              id="otrosGastos"
              name="otrosGastos"
              label="Otros gastos"
              fullWidth
              value={valorOtrosGastos.value}
              variant="outlined"
              onBlur={()=>setValorOtrosGastos(currentValue => ({ ...currentValue, touched: true }))}
              color={valorOtrosGastos.value==''? 'warning' : 'info'}
              helperText={valorOtrosGastos.touched&&valorOtrosGastos.value==''? 'El valor de otros gastos es requerido' : ''}
            // color={errors.otrosGastos? 'warning' : 'info'}
            // helperText={errors.otrosGastos? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => setValorFondoReservaMensual(currentValue => ({ ...currentValue, value: e.target.value }))}
              id="fondoReservaMens"
              name="fondoReservaMens"
              label="Fondo de reserva"
              fullWidth
              value={valorFondoReservaMensual.value}
              variant="outlined"
              onBlur={()=>setValorFondoReservaMensual(currentValue => ({ ...currentValue, touched: true }))}
              color={valorFondoReservaMensual.value==''? 'warning' : 'info'}
              helperText={valorFondoReservaMensual.touched&&valorFondoReservaMensual.value==''? 'El valor del fondo de reserva es requerido' : ''}
            // color={errors.fondoReservaMens? 'warning' : 'info'}
            // helperText={errors.fondoReservaMens? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              onChange={(e) => setValorResidual(currentValue => ({ ...currentValue, value: e.target.value }))}
              id="valorResidual"
              name="valorResidual"
              label="Valor residual"
              fullWidth
              value={valorResidual.value}
              variant="outlined"
              onBlur={()=>setValorResidual(currentValue => ({ ...currentValue, touched: true }))}
              color={valorResidual.value==''? 'warning' : 'info'}
              helperText={valorResidual.touched&&valorResidual.value==''? 'El valor residual es requerido' : ''}
            // color={errors.valorResidual? 'warning' : 'info'}
            // helperText={errors.valorResidual? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              onChange={(e) => setPlazo(currentValue => ({ ...currentValue, value: e.target.value }))}
              id="plazo"
              name="plazo"
              label="Plazo"
              fullWidth
              value={plazo.value}
              variant="outlined"
              onBlur={()=>setPlazo(currentValue => ({ ...currentValue, touched: true }))}
              color={plazo.value==''? 'warning' : 'info'}
              helperText={plazo.touched&&plazo.value==''? 'El plazo es requerido' : ''}
            // color={errors.valorResidual? 'warning' : 'info'}
            // helperText={errors.valorResidual? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button color="info" variant="contained" type='submit'> Cotizar </Button>
          </Grid>
        </Grid>
      </form>
      {
        cotizacion.comisionApSinIva == 0 || isNaN(cotizacion.comisionApSinIva) && cotizacion.montoArrendamiento==0 || isNaN(cotizacion.montoArrendamiento) ? 
          '':
        (
          <Container>
            <Typography>La comision por apertura es: {cotizacion.comisionApSinIva}</Typography>
            <Typography>El monto del arrendamiento es: {cotizacion.montoArrendamiento}</Typography>
          </Container>
        )
      }

      {/* <form onSubmit={handleSubmit(onSubmit)}>
            <TextField {...register("valorResidual")}
              required
              id="valorResidual"
              name="valorResidual"
              label="Valor residual"
              fullWidth
              variant="outlined"
            />
            <TextField {...register("fondoReserva")}
              required
              id="fondoReserva"
              name="fondoReserva"
              label="Fondo de reserva"
              fullWidth
              variant="outlined"
            />
            <TextField {...register("otrosGastos")}
              required
              id="otrosGastos"
              name="otrosGastos"
              label="Otros gastos"
              fullWidth
              variant="outlined"
            />
            <TextField {...register("seguroAnual")}
              id="seguroAnual"
              name="seguroAnual"
              label="Seguro anual de contado"
              fullWidth
              variant="outlined"
            />
            <TextField {...register("comisionApertura")}
              required
              id="comisionApertura"
              name="comisionApertura"
              label="Comisión por apertura"
              fullWidth
              variant="outlined"
            />
            <TextField {...register("fondoReservaMens")}
              id="fondoReservaMens"
              name="fondoReservaMens"
              label="Fondo de reserva mensual"
              fullWidth
              variant="outlined"
            />
            <TextField {...register("rentasDeposito")}
              required
              id="rentasDeposito"
              name="rentasDeposito"
              label="Rentas en depósito"
              fullWidth
              variant="outlined"
              type='number'
            />
            <TextField {...register("costoAccesorios")}
              required
              id="costoAccesorios"
              name="costoAccesorios"
              label="Costo de accesorios"
              fullWidth
              variant="outlined"
            />
            <TextField {...register("valorFactura")}
              required
              id="valorFactura"
              name="valorFactura"
              label="Valor factura"
              fullWidth
              variant="outlined"
            /> */}
      {/* register your input into the hook by invoking the "register" function */}
      {/* <TextField defaultValue="test" {...register("example")} /> */}

      {/* include validation with required or other standard HTML validation rules */}
      {/* <TextField {...register("exampleRequired", { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}

      {/* <input type="submit" />
    </form> */}

    </Container>
  )
}
