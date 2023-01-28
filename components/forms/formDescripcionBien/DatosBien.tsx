import React, { ChangeEvent, useState } from 'react'
import { Container, Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button, Input } from '@mui/material';

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


// constantes y funciones de MARCAS
const marcas = [
    'Acura',
    'Audi',
    'Aston',
    'Chevrolet',
    'Fiat',
    'Mazda',
    'Mercedes',
    'Nissan',
    'Seat',
    'Volkswagen',
  ];


// constantes y funciones de MODELOS
const modelos = [
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
  ];

  
// constantes y funciones de MODELOS
const estados = [
    'AGUASCALIENTES',
    'BAJA CALIFORNIA',
    'BAJA CALIFORNIA SUR',
    'CHIHUAHUA',
    'CHIAPAS',
    'CAMPECHE',
    'CIUDAD DE MEXICO',
    'COAHUILA',
    'COLIMA',
    'DURANGO',
    'GUERRERO',
    'GUANAJUATO',
    'HIDALGO',
    'JALISCO',
    'MICHOACAN',
    'ESTADO DE MEXICO',
    'MORELOS',
    'NAYARIT',
    'NUEVO',
    'OAXACA',
    'PUEBLA',
    'QUINTANA ROO',
    'QUERETARO',
    'SINALOA',
    'SAN LUIS POTOSI',
    'SONORA',
    'TABASCO',
    'TLAXCALA',
    'TAMAULIPAS',
    'VERACRUZ',
    'YUCATAN',
    'ZACATECAS',
  ];

// Función para agregar un input
type TipoAccesorios = {
    id:number;
    nombre: string;
    descripcion: string;
    valor: number;
  }

export const DatosBien = () => {
    
    // Constantes y funciones de MARCAS
    const [marca, setMarca] = useState('')
    const handleChangeMarca = (event: SelectChangeEvent) => {
      setMarca(event.target.value as string);
    };

    // Constantes y funciones de MODELOS
    const [modelo, setModelo] = useState('')
    const handleChangeModelo = (event: SelectChangeEvent) => {
      setModelo(event.target.value as string);
    };
    
    // Constantes y funciones de ESTADOS
    const [estado, setEstado] = useState('')
    const handleChangeEstado = (event: SelectChangeEvent) => {
      setEstado(event.target.value as string);
    };

    // Lista que guarda el contenido de los ACCESORIOS
    const [accesorios, setAccesorios] = useState<TipoAccesorios[]>([])
    const [count, setCount] = useState(0);

    const handleRemoveItem = (id:number) => {
        console.log(id)
        setAccesorios((listaAccesorios) =>
        listaAccesorios.filter((newAccesorio) => newAccesorio.id !== id)
        )
        // setAccesorios(accesorios.slice(accesorios.indexOf(index)))
    }
    const click = (accesorio: {nombre:string, descripcion:string, valor:number}) => {
        console.log('Accesorios: ',accesorios.length)
        console.log('Conteo en: ',count)
        setAccesorios(prevAccesorio => [
            ...prevAccesorio,
            { id:count ,nombre: accesorio.nombre, descripcion: accesorio.descripcion, valor:accesorio.valor},
        ])
        setCount(count+1)
    }

    const updateData = (e:ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>,id:number) => {
        console.log(e)
        const keyname = e.target.name
        const value = e.target.value
        const auxAccesorios = [...accesorios]
        const index = auxAccesorios.findIndex((accesorio) => accesorio.id === id)
        if(index<0){
            return  ''
        }
        auxAccesorios[index][keyname] = value
        setAccesorios(auxAccesorios)
    }

  return (
    <Container>
        <Grid container spacing={3} sx={{ position:'relative' }}>
            <Grid container item spacing={3} xs={12} sm={6} sx={{ textAlign:'center' }}>

                <Grid item xs={12}sx={{ textAlign:'center' }}>
                    <TextField
                    // onChange={(e) => setValorOtrosGastos(currentValue => ({ ...currentValue, value: e.target.value }))}
                    id="tipoActivo"
                    name="tipoActivo"
                    label="Tipo de activo"
                    fullWidth
                    // value={valorOtrosGastos.value}
                    // variant="outlined"
                    // onBlur={()=>setValorOtrosGastos(currentValue => ({ ...currentValue, touched: true }))}
                    // color={valorOtrosGastos.value==''? 'warning' : 'info'}
                    // helperText={valorOtrosGastos.touched&&valorOtrosGastos.value==''? 'El valor de otros gastos es requerido' : ''}
                    />
                </Grid>
                <Grid item xs={12}sx={{ textAlign:'center' }}>
                    <TextField
                    // onChange={(e) => setValorOtrosGastos(currentValue => ({ ...currentValue, value: e.target.value }))}
                    id="cantidadUnidades"
                    name="cantidadUnidades"
                    label="Cantidad de unidades"
                    type='number'
                    fullWidth
                    // value={valorOtrosGastos.value}
                    // variant="outlined"
                    // onBlur={()=>setValorOtrosGastos(currentValue => ({ ...currentValue, touched: true }))}
                    // color={valorOtrosGastos.value==''? 'warning' : 'info'}
                    // helperText={valorOtrosGastos.touched&&valorOtrosGastos.value==''? 'El valor de otros gastos es requerido' : ''}
                    />
                </Grid>
                <Grid item xs={12}sx={{ textAlign:'center' }}>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Marca</InputLabel>
                        <Select
                        labelId="marca"
                        id="marca"
                        value={marca}
                        label="Marca"
                        onChange={handleChangeMarca}
                        MenuProps={MenuProps}
                        >
                            <MenuItem value="">
                            <em> Ninguno </em>
                            </MenuItem>
                            {marcas.map((marca) => (
                                <MenuItem key={marca} value={marca}> {marca} </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </Grid>
                <Grid item xs={12}sx={{ textAlign:'center' }}>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Modelo</InputLabel>
                        <Select
                        labelId="modelo"
                        id="modelo"
                        value={modelo}
                        label="Modelo"
                        onChange={handleChangeModelo}
                        MenuProps={MenuProps}
                        >
                            <MenuItem value="">
                            <em> Ninguno </em>
                            </MenuItem>
                            {modelos.map((modelo) => (
                                <MenuItem key={modelo} value={modelo}> {modelo} </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </Grid>
                <Grid item xs={12}sx={{ textAlign:'center' }}>
                    <TextField
                    // onChange={(e) => setValorOtrosGastos(currentValue => ({ ...currentValue, value: e.target.value }))}
                    id="version"
                    name="version"
                    label="Versión"
                    fullWidth
                    // value={valorOtrosGastos.value}
                    // variant="outlined"
                    // onBlur={()=>setValorOtrosGastos(currentValue => ({ ...currentValue, touched: true }))}
                    // color={valorOtrosGastos.value==''? 'warning' : 'info'}
                    // helperText={valorOtrosGastos.touched&&valorOtrosGastos.value==''? 'El valor de otros gastos es requerido' : ''}
                    />
                </Grid>
                <Grid item xs={12}sx={{ textAlign:'center' }}>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                        <Select
                        labelId="estado"
                        id="estado"
                        value={estado}
                        label="Estado"
                        onChange={handleChangeEstado}
                        MenuProps={MenuProps}
                        >
                            <MenuItem value="">
                            <em> Ninguno </em>
                            </MenuItem>
                            {estados.map((estado) => (
                                <MenuItem key={estado} value={estado}> {estado} </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </Grid>
                <Grid item xs={12}sx={{ textAlign:'center' }}>
                    <TextField
                    // onChange={(e) => setValorOtrosGastos(currentValue => ({ ...currentValue, value: e.target.value }))}
                    id="precioActivo"
                    name="precioActivo"
                    label="Precio del activo"
                    fullWidth
                    // value={valorOtrosGastos.value}
                    // variant="outlined"
                    // onBlur={()=>setValorOtrosGastos(currentValue => ({ ...currentValue, touched: true }))}
                    // color={valorOtrosGastos.value==''? 'warning' : 'info'}
                    // helperText={valorOtrosGastos.touched&&valorOtrosGastos.value==''? 'El valor de otros gastos es requerido' : ''}
                    />
                </Grid>
            </Grid>

            <Grid container item spacing={3} xs={12} sm={6} sx={{ textAlign:'center' }}>
                <Grid item xs={12} sx={{ textAlign:'center' }}>

                    {accesorios&&accesorios.length>0 && accesorios.map(({id,nombre,descripcion,valor}, index) => {
                        return (
                            <Grid container border={1} borderColor='primary' borderRadius={2} key={index} p={1} m={1}>
                                <Grid item xs={12} sx={{ textAlign:'center', width:'100%' }}>
                                    <TextField label='Nombre' name='nombre' value={nombre} onChange={(e)=> updateData(e,id)}/>
                                </Grid>
                                <Grid item xs={12}sx={{ textAlign:'center' }}>
                                    <TextField label='Descripción' name='descripcion' value={descripcion} onChange={(e)=> updateData(e,id)}/>
                                </Grid>
                                <Grid item xs={12}sx={{ textAlign:'center' }}>
                                    <TextField label='Valor' name='valor' value={valor} onChange={(e)=> updateData(e,id)}/>
                                </Grid>
                                <Button variant='outlined' color='error' onClick={()=>handleRemoveItem(id)}
                                >
                                    Delete
                                </Button>
                            </Grid>
                        );
                    })}

                </Grid>
                <Grid item xs={12}sx={{ textAlign:'center' }}>
                    <Button variant='contained' onClick={() =>click({ nombre:'', descripcion:'', valor:0 }) }>
                        + Añadir accesorio
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </Container>
  )
}
