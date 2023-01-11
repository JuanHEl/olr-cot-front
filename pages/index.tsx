import { Button, Container, Grid, TextField, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{mt:5}}>
      <Typography variant="h2" gutterBottom textAlign='center'>
        Cotizador
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="valorFactura"
            name="valorFactura"
            label="Valor factura"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="costoAccesorios"
            name="costoAccesorios"
            label="Costo de accesorios"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="rentasDeposito"
            name="rentasDeposito"
            label="Rentas en depósito"
            fullWidth
            variant="standard"
            type='number'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="fondoReserva"
            name="fondoReserva"
            label="Fondo de reserva mensual"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="comisionApertura"
            name="comisionApertura"
            label="Comisión por apertura"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="seguroAnual"
            name="seguroAnual"
            label="Seguro anual de contado"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="otrosGastos"
            name="otrosGastos"
            label="Otros gastos"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fondoReserva"
            name="fondoReserva"
            label="Fondo de reserva"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="valorResidual"
            name="valorResidual"
            label="Valor residual"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign:'center' }}>
          <Button color="info" variant="contained"> Cotizar </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
