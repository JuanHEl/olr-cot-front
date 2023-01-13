import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { FormEvent, useState } from 'react'

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

type InputsForm = {
  // example: string,
  // exampleRequired: string,
  valorResidual: string,
  fondoReserva: string,
  otrosGastos: string,
  seguroAnual: string,
  comisionApertura: string,
  fondoReservaMens: string,
  rentasDeposito: string,
  costoAccesorios: string,
  valorFactura: string,
};


const schema = yup.object({
  valorResidual: yup.string().required(),
  fondoReserva: yup.string().required(),
  otrosGastos: yup.string().required(),
  seguroAnual: yup.string().required(),
  comisionApertura: yup.string().required(),
  fondoReservaMens: yup.string().required(),
  rentasDeposito: yup.string().required(),
  costoAccesorios: yup.string().required(),
  valorFactura: yup.string().required()
}).required();


export default function Home() {

  const [valorFactura, setValorFactura] = useState('')
  const [valorAccesorios, setValorAccesorios] = useState('')
  const [valorRentas, setValorRentas] = useState('')
  const [valorFondoReservaMensual, setValorFondoReservaMensual] = useState('')
  const [valorComisionApertura, setValorComisionApertura] = useState('')
  const [valorSeguroAnualC, setValorSeguroAnualC] = useState('')
  const [valorOtrosGastos, setValorOtrosGastos] = useState('')
  const [valorFondoReserva, setValorFondoReserva] = useState('')
  const [valorResidual, setValorResidual] = useState('')

  
  const handleChangeVF = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValorFactura(event.target.value)
  }

  const cotiza = () => {
    // console.log(valorFactura)
  }
  const submitContact = async (event: FormEvent ) => {
    event.preventDefault();
    console.log(event)
  };


  
  // const { register, handleSubmit, watch, formState: { errors } } = useForm<InputsForm>();
  // const onSubmit: SubmitHandler<InputsForm> = data => console.log(data);
  
  const { register, handleSubmit, formState: { errors } } = useForm<InputsForm>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: InputsForm) => console.log(data);
  

  return (
    <Container sx={{mt:5}}>
      <Typography variant="h2" gutterBottom textAlign='center'>
        Cotizador
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField {...register("valorFactura")}
              id="valorFactura"
              name="valorFactura"
              label="Valor factura"
              fullWidth
              variant="outlined"
              color={errors.valorFactura? 'warning' : 'info'}
              helperText={errors.valorFactura? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField {...register("costoAccesorios")}
              id="costoAccesorios"
              name="costoAccesorios"
              label="Costo de accesorios"
              fullWidth
              variant="outlined"
              color={errors.costoAccesorios? 'warning' : 'info'}
              helperText={errors.costoAccesorios? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField {...register("rentasDeposito")}
              id="rentasDeposito"
              name="rentasDeposito"
              label="Rentas en depósito"
              fullWidth
              variant="outlined"
              color={errors.rentasDeposito? 'warning' : 'info'}
              helperText={errors.rentasDeposito? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField {...register("fondoReserva")}
              id="fondoReserva"
              name="fondoReserva"
              label="Fondo de reserva mensual"
              fullWidth
              variant="outlined"
              color={errors.fondoReserva? 'warning' : 'info'}
              helperText={errors.fondoReserva? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField {...register("comisionApertura")}
              id="comisionApertura"
              name="comisionApertura"
              label="Comisión por apertura"
              fullWidth
              variant="outlined"
              color={errors.comisionApertura? 'warning' : 'info'}
              helperText={errors.comisionApertura? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField {...register("seguroAnual")}
              id="seguroAnual"
              name="seguroAnual"
              label="Seguro anual de contado"
              fullWidth
              variant="outlined"
              color={errors.seguroAnual? 'warning' : 'info'}
              helperText={errors.seguroAnual? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField {...register("otrosGastos")}
              id="otrosGastos"
              name="otrosGastos"
              label="Otros gastos"
              fullWidth
              variant="outlined"
              color={errors.otrosGastos? 'warning' : 'info'}
              helperText={errors.otrosGastos? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField {...register("fondoReservaMens")}
              id="fondoReservaMens"
              name="fondoReservaMens"
              label="Fondo de reserva"
              fullWidth
              variant="outlined"
              color={errors.fondoReservaMens? 'warning' : 'info'}
              helperText={errors.fondoReservaMens? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField {...register("valorResidual")}
              id="valorResidual"
              name="valorResidual"
              label="Valor residual"
              fullWidth
              variant="outlined"
              color={errors.valorResidual? 'warning' : 'info'}
              helperText={errors.valorResidual? 'El valor de la factura es requerido' : ''}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign:'center' }}>
            <Button color="info" variant="contained" onClick={() => cotiza()} type='submit'> Cotizar </Button>
          </Grid>
        </Grid>
      </form>



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
