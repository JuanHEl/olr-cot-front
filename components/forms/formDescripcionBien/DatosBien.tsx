import React, { ChangeEvent, useState } from 'react'
import { Container, Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import { deleteAccesorios, setAccesorios, setCantidadUnidades, setEstado, setMarca, setModelo, setPrecioActivo, setTipoActivo, setVersion, updateAccesorios } from '../../../store/slices/datosBien';
import Typography from '@mui/material/Typography';
import uuid from 'react-uuid';

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

export const DatosBien = () => {

    // Se declara el dispatch para poder modificar los estados globales
    const dispatch = useDispatch()

    // Se obtiene los valores del State Global
    const {
        tipoActivo,
        cantidadUnidades,
        marca,
        modelo,
        version,
        estado,
        precioActivo,
        accesorios,
    } = useSelector((state: RootState) => state.bien)

    // Constantes y funciones de TIPO DE ACTIVO
    const [tipoActivoState, setTipoActivoState] = useState({ value: "", touched: false })
    const handleChangeTipoActivoState = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTipoActivoState(currentValue => ({ ...currentValue, value: event.target.value as string }));
        dispatch(setTipoActivo(event.target.value))
    };

    // Constantes y funciones de CANTIDAD DE UNIDADES
    const [cantidadUnidadesState, setCantidadUnidadesState] = useState({ value: 0, touched: false })
    const handleChangeCantidadUnidadesState = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCantidadUnidadesState(currentValue => ({ ...currentValue, value: Number(event.target.value) }));
        dispatch(setCantidadUnidades(Number(event.target.value)))
    };

    // Constantes y funciones de MARCAS
    const [marcaState, setMarcaState] = useState({ value: "", touched: false })
    const handleChangeMarca = (event: SelectChangeEvent) => {
        setMarcaState(currentValue => ({ ...currentValue, value: event.target.value as string }));
        dispatch(setMarca(event.target.value))
    };

    // Constantes y funciones de MODELOS
    const [modeloState, setModeloState] = useState({ value: "", touched: false })
    const handleChangeModelo = (event: SelectChangeEvent) => {
        setModeloState(currentValue => ({ ...currentValue, value: event.target.value as string }));
        dispatch(setModelo(event.target.value))
    };

    // Constantes y funciones de ESTADOS
    const [estadoState, setEstadoState] = useState({ value: "", touched: false })
    const handleChangeEstado = (event: SelectChangeEvent) => {
        setEstadoState(currentValue => ({ ...currentValue, value: event.target.value as string }));
        dispatch(setEstado(event.target.value))
    };

    // Constantes y funciones de VERSION
    const [versionState, setVersionState] = useState({ value: "", touched: false })
    const handleChangeVersion = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setVersionState(currentValue => ({ ...currentValue, value: event.target.value as string }));
        dispatch(setVersion(event.target.value))
    };

    // Constantes y funciones de PRECIO DEL ACTIVO
    const [precioActivoState, setPrecioActivoState] = useState({ value: 0, touched: false })
    const handleChangePrecioActivo = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPrecioActivoState(currentValue => ({ ...currentValue, value: Number(event.target.value) }));
        dispatch(setPrecioActivo(Number(event.target.value)))
    };

    // Lista que guarda el contenido de los ACCESORIOS
    // const [accesoriosState, setAccesoriosState] = useState<IUaccesorios[]>(accesorios)
    const [count, setCount] = useState(0);

    const handleRemoveItem = (id: string) => {
        // console.log(id)
        // setAccesoriosState((listaAccesorios) =>
        //     listaAccesorios.filter((newAccesorio) => newAccesorio.idAccesorio !== id)
        // )
        dispatch(deleteAccesorios(id))
        // setAccesorios(accesorios.slice(accesorios.indexOf(index)))
    }

    const click = (accesorio: { nombre: string, descripcion: string, valor: number }) => {
        const claveUnica = uuid().slice(0,8)
        // const small_id = claveUnica.slice(0,8)
        // console.log(claveUnica)

        // console.log('Accesorios: ', accesoriosState.length)
        // console.log('Conteo en: ', count)
        // setAccesoriosState(prevAccesorio => [
        //     ...prevAccesorio,
        //     { idAccesorio: claveUnica, nombreAccesorio: accesorio.nombre, descripcionAccesorio: accesorio.descripcion, valorAccesorio: accesorio.valor },
        // ])
        dispatch(setAccesorios({ idAccesorio: claveUnica, nombreAccesorio: accesorio.nombre, descripcionAccesorio: accesorio.descripcion, valorAccesorio: accesorio.valor }))
        // setCount(count + 1)
    }

    const updateData = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
        // console.log(e)
        // console.log('EL ESTADO GLOBAL: ', accesorios)
        // console.log('Estado useSTATE: ',accesoriosState)
        // console.log('Tipo del accesorio: ', typeof(accesorios))
        // console.log('Tipo del accesorioState: ', typeof(accesoriosState))
        const keyname = e.target.name
        const value = e.target.value
        // console.log('keyname: ',keyname)
        // console.log('value: ',value)
        dispatch(updateAccesorios({keyname,value,id}))
        // let auxAccesorios = [...accesorios]
        // // console.log('AuxAccesoriosState: ', auxAccesorios)
        // const index = auxAccesorios.findIndex((accesorio) => accesorio.idAccesorio === id)
        // console.log('Index: ',index)
        // if (index < 0) {
        //     console.log('Entra en la condicional')
        //     return ''
        // }
        // console.log('AuxAccesorios: ',auxAccesorios)
        // console.log('Aux En Index: ',auxAccesorios[index][keyname])
        // auxAccesorios[index][keyname] = value
        // console.log('Aux En Index, después de la asignación: ',auxAccesorios[index][keyname])
        // setAccesoriosState(auxAccesorios)
        // console.log('Auxiliar', auxAccesorios[0])
        // dispatch(updateAccesorios({ idAccesorio: auxAccesorios[index].idAccesorio, descripcionAccesorio: auxAccesorios[index].descripcionAccesorio, nombreAccesorio: auxAccesorios[index].nombreAccesorio, valorAccesorio: auxAccesorios[index].valorAccesorio }))
    }

    return (
        <Container>
            <Grid container spacing={3} sx={{ position: 'relative' }}>
                <Grid container item spacing={3} xs={12} sm={6} sx={{ textAlign: 'center' }}>

                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <TextField
                            onChange={handleChangeTipoActivoState}
                            id="tipoActivo"
                            name="tipoActivo"
                            label="Tipo de activo"
                            fullWidth
                            value={tipoActivo}
                        // variant="outlined"
                        // onBlur={()=>setValorOtrosGastos(currentValue => ({ ...currentValue, touched: true }))}
                        // color={valorOtrosGastos.value==''? 'warning' : 'info'}
                        // helperText={valorOtrosGastos.touched&&valorOtrosGastos.value==''? 'El valor de otros gastos es requerido' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <TextField
                            onChange={handleChangeCantidadUnidadesState}
                            id="cantidadUnidades"
                            name="cantidadUnidades"
                            label="Cantidad de unidades"
                            type='number'
                            fullWidth
                            value={cantidadUnidades}
                        // variant="outlined"
                        // onBlur={()=>setValorOtrosGastos(currentValue => ({ ...currentValue, touched: true }))}
                        // color={valorOtrosGastos.value==''? 'warning' : 'info'}
                        // helperText={valorOtrosGastos.touched&&valorOtrosGastos.value==''? 'El valor de otros gastos es requerido' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>

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
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>

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
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <TextField
                            onChange={handleChangeVersion}
                            id="version"
                            name="version"
                            label="Versión"
                            fullWidth
                            value={version}
                        // variant="outlined"
                        // onBlur={()=>setValorOtrosGastos(currentValue => ({ ...currentValue, touched: true }))}
                        // color={valorOtrosGastos.value==''? 'warning' : 'info'}
                        // helperText={valorOtrosGastos.touched&&valorOtrosGastos.value==''? 'El valor de otros gastos es requerido' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>

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
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <TextField
                            onChange={handleChangePrecioActivo}
                            id="precioActivo"
                            name="precioActivo"
                            label="Precio del activo"
                            fullWidth
                            value={precioActivo}
                        // variant="outlined"
                        // onBlur={()=>setValorOtrosGastos(currentValue => ({ ...currentValue, touched: true }))}
                        // color={valorOtrosGastos.value==''? 'warning' : 'info'}
                        // helperText={valorOtrosGastos.touched&&valorOtrosGastos.value==''? 'El valor de otros gastos es requerido' : ''}
                        />
                    </Grid>
                </Grid>

                <Grid container item spacing={3} xs={12} sm={6} sx={{ textAlign: 'center' }}>
                    <Grid item xs={12} sx={{ textAlign: 'center', height: '500px', overflowX: 'auto' }}>

                        {accesorios && accesorios.length > 0 && accesorios.map(({ idAccesorio, descripcionAccesorio, nombreAccesorio, valorAccesorio }, index) => {
                            return (
                                <Grid container width='95%' alignContent='end' spacing={1} border={1} borderColor='primary' borderRadius={2} key={index} p={1} m={1}>
                                    <Typography> El id:{ idAccesorio } </Typography>

                                    <Typography>Accesorio #{index + 1}</Typography>
                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <TextField label='Nombre' fullWidth name='nombreAccesorio' value={nombreAccesorio} onChange={(e) => updateData(e, idAccesorio)} />
                                    </Grid>
                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <TextField label='Descripción' fullWidth name='descripcionAccesorio' value={descripcionAccesorio} onChange={(e) => updateData(e, idAccesorio)} />
                                    </Grid>
                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <TextField label='Valor' fullWidth name='valorAccesorio' value={valorAccesorio} onChange={(e) => updateData(e, idAccesorio)} />
                                    </Grid>
                                    <Button variant='outlined' sx={{ marginTop: 1 }} color='error' onClick={() => handleRemoveItem(idAccesorio)}
                                    >
                                        Delete
                                    </Button>
                                </Grid>
                            );
                        })}

                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Button variant='contained' onClick={() => click({ nombre: '', descripcion: '', valor: 0 })}>
                            + Añadir accesorio
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
