import React, { FormEvent, useState } from 'react'
import { Button, Container, Grid, TextField, Typography} from "@mui/material";

export const DatosCliente = () => {

    const [valorFactura, setValorFactura] = useState({ value: "", touched: false })
    const [valorAccesorios, setValorAccesorios] = useState({ value: "", touched: false })
    const [valorRentas, setValorRentas] = useState({ value: "", touched: false })
    const [valorFondoReservaMensual, setValorFondoReservaMensual] = useState({ value: "", touched: false })
    const [valorComisionApertura, setValorComisionApertura] = useState({ value: "", touched: false })
    const [valorSeguroAnualC, setValorSeguroAnualC] = useState({ value: "", touched: false })
    const [valorOtrosGastos, setValorOtrosGastos] = useState({ value: "", touched: false })
    const [valorFondoReserva, setValorFondoReserva] = useState({ value: "", touched: false })
    const [valorAnticipoArrendamiento, setValorAnticipoArrendamiento] = useState({ value:"", touched: false })
    const [valorResidual, setValorResidual] = useState({ value: "", touched: false })
    const [plazo, setPlazo] = useState({ value: "", touched: false })
    const [cotizacion, setCotizacion] = useState({ montoArrendamiento:0, comisionApSinIva:0, valorResidual:0, rentaMensual:0 })

    const cotiza = () => {
        if(valorFactura.value=='' || valorAccesorios.value=='' || plazo.value=='' || valorComisionApertura.value=='' || valorResidual.value==''){
            console.log('*******Faltan campos*******')
        }
      console.log('En Cotiza, el valor factura:', valorFactura)
      let vFSInIVA = parseFloat(valorFactura.value) / 1.16
      let valorResidualSinIva = vFSInIVA * (parseFloat(valorResidual.value)/100)
      console.log('valor residual',valorResidualSinIva)
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
      // Monto de arrendamiento  = Valor factura + Accesorios + Otros gastos (con IVA) – Valor inicial del arrendamiento + Comisión por apertura con IVA
      // Valor inicial del arrendamiento = Total pago inicial, - Seguro anual con IVA, -  Rentas en depósito con IVA
  
      console.log('Anticipo: ', valorAnticipoArrendamiento.value)
      console.log('Rentas en depósito: ', valorRentas.value)
      console.log('Seguro anual: ', valorSeguroAnualC.value)
      let valorInicialArrendamiento = parseFloat(valorAnticipoArrendamiento.value)
      if( parseFloat(valorRentas.value) > 0 ){
        valorInicialArrendamiento -= parseFloat(valorRentas.value)
      }
      if( parseFloat(valorSeguroAnualC.value) > 0 ){
        valorInicialArrendamiento -= parseFloat(valorSeguroAnualC.value)
      }
      console.log('Aquí esta el valor inicial del arrendamiento', valorInicialArrendamiento)
  
      let montoArrendamiento = parseFloat(valorFactura.value) + parseFloat(valorAccesorios.value) + (otrosGastos * 1.16) - valorInicialArrendamiento
  
      console.log('Monto Arrendamiento: ',montoArrendamiento)
      let comisionAp = montoArrendamiento * parseFloat(valorComisionApertura.value)/100
      console.log('Comisión Con IVA',comisionAp)
      let comisionApSinIva = comisionAp/1.16
      console.log('Comision: ', comisionApSinIva)
      let montoArrendamientoFinal = montoArrendamiento + comisionAp
      console.log('Arrendamiento final',montoArrendamientoFinal)
      let montoArrendamientoFinalSinIva = montoArrendamientoFinal/1.16
      console.log('Arrendamiento Sin iva',montoArrendamientoFinalSinIva)
  
      const PMT = (rate:number, nper:number, pv:number, fv:number, type:number) => {
        let pmt, pvif;
    
        fv || (fv = 0);
        type || (type = 0);
    
        if (rate === 0)
            return -(pv + fv) / nper;
    
        pvif = Math.pow(1 + rate, nper);
        pmt = - rate * (pv * pvif + fv) / (pvif - 1);
    
        if (type === 1)
            pmt /= (1 + rate);
        return pmt;
        }
        // console.log('Renta mensual',PMT(0.0242, 12,-823141.90, 5000, 0))
        let rentaMensual =PMT(0.0258, parseInt(plazo.value),-montoArrendamientoFinalSinIva.toFixed(2), 0, 0)
        console.log('Renta mensual',PMT(0.0258, parseInt(plazo.value),-montoArrendamientoFinalSinIva.toFixed(2), 0, 0))
        
      setCotizacion(currentValue => ({ ...currentValue, montoArrendamiento:montoArrendamientoFinalSinIva , comisionApSinIva, valorResidual:valorResidualSinIva, rentaMensual }))
    }
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      cotiza()
    }


  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3} sx={{ position:'relative' }}>
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
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                onChange={(e) => setValorAnticipoArrendamiento(currentValue => ({ ...currentValue, value: e.target.value }))}
                id="anticipoArrendamiento"
                name="anticipoArrendamiento"
                label="Anticipo del arrendamiento"
                fullWidth
                value={valorAnticipoArrendamiento.value}
                variant="outlined"
                onBlur={()=>setValorAnticipoArrendamiento(currentValue => ({ ...currentValue, touched: true }))}
                color={valorAnticipoArrendamiento.value==''? 'warning' : 'info'}
                helperText={valorAnticipoArrendamiento.touched&&valorAnticipoArrendamiento.value==''? 'El valor del anticipo es requerido' : ''}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                onChange={(e) => setValorResidual(currentValue => ({ ...currentValue, value: e.target.value }))}
                id="valorResidual"
                name="valorResidual"
                label="Valor residual (porcentaje)"
                fullWidth
                value={valorResidual.value}
                variant="outlined"
                onBlur={()=>setValorResidual(currentValue => ({ ...currentValue, touched: true }))}
                color={valorResidual.value==''? 'warning' : 'info'}
                helperText={valorResidual.touched&&valorResidual.value==''? 'El valor residual es requerido' : ''}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button color="success" size='large' variant="contained" type='submit'> Cotizar </Button>
            </Grid>
        </Grid>
      </form>
      {
        cotizacion.comisionApSinIva == 0 || isNaN(cotizacion.comisionApSinIva) && cotizacion.montoArrendamiento==0 || isNaN(cotizacion.montoArrendamiento) && cotizacion.valorResidual==0 || isNaN(cotizacion.valorResidual) && cotizacion.rentaMensual==0 || isNaN(cotizacion.rentaMensual)? 
          '':
        (
          <Container>
            <Typography>La comision por apertura es: {cotizacion.comisionApSinIva}</Typography>
            <Typography>El monto del arrendamiento es: {cotizacion.montoArrendamiento}</Typography>
            <Typography>El valor residual del arrendamiento es: {cotizacion.valorResidual}</Typography>
            <Typography>El valor de la renta mensual del arrendamiento es: {cotizacion.rentaMensual}</Typography>
          </Container>
        )
      }
    </Container>
  )
}
