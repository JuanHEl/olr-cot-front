import { useEffect, useState } from 'react';
import { axiosInstances } from '../../instances/axiosInstances';
import { getCookie } from 'cookies-next';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  TextField,
  Backdrop,
  styled
} from '@mui/material';

// Estilos de las celdas de la tabla
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: '#121858',
  color: theme.palette.secondary.contrastText,
}));

// Estilo de las columnas de la tabla
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Se declaran de que tipo serán las variables
interface tasas {
  id: number;
  plazo: number;
  tasa_a: number;
  tasa_b: number;
  tasa_alfa: number;
  tasa_beta: number;
  tasa_gamma: number
}

const selectedTipoActivo = ['Autos', 'Tracto Camión', 'Bicicletas']

export const Tasas = () => {

  const [tasas, setTasas] = useState<tasas[]>([]); // Guarda los tipos de Activo de la base de datos

  const [editedTasas, setEditedTasas] = useState<tasas | null>(null); // Guarda el tipo de activo editarlo para mandarlo a la base de datos
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Estado que guarda si se activa el dialog de editar

  const handleEditTasas = (tasas: tasas) => {
    setEditedTasas(tasas);
    setAnchorEl(document.getElementById(`edit-${tasas.id}`));
  };

  const handleCancelEdit = () => {
    setEditedTasas(null);
    setAnchorEl(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedTasas((prevTasas) => {
      if (prevTasas) {
        return { ...prevTasas, [name]: value };
      } else {
        return null;
      }
    });
  };

  const handleSaveTasas = async () => {
    const token = getCookie('TOKEN');
    if (editedTasas) {
      try {
        const response = await axiosInstances.put('valores_tasas/', editedTasas, {
          headers: { 'token': token },
        });
        if (response.status === 200) {
          // const data = response.data;
          setTasas(tasas.map((tipoA) => (tipoA.id === editedTasas.id ? editedTasas : tipoA)));
          setEditedTasas(null);
          setAnchorEl(null);
          fetchTasas();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [tipoActivo, setTipoActivo] = useState('Autos') // constante que va a determinar el valor para realizar la petición para el tipo de activo

  const handleChangeTipoActivo = (event: SelectChangeEvent) => {
    setTipoActivo(event.target.value as string);
    fetchTasas()
  };

  const fetchTasas = async () => {
    const token = getCookie('TOKEN');
    try {
      const response = await axiosInstances.get(`valores_tasas/${tipoActivo}`, {
        headers: { 'TOKEN': token }
      });
      // console.log('El response es:', response.data.data)
      if (response.status === 200) {
        const data = response.data;
        setTasas(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchTasas();
  }, [tipoActivo]);


  return (
    <>
      <Box sx={{ minWidth: 120, m:2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo de activo</InputLabel>
          <Select
            value={tipoActivo}
            label="Tipo de activo"
            onChange={handleChangeTipoActivo}
          >
            {selectedTipoActivo.map((tipoAct) => (
              <MenuItem key={tipoAct} value={tipoAct}>
                {tipoAct}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="Tipo de Activos">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Plazo</StyledTableCell>
              <StyledTableCell align="center">Tasa A</StyledTableCell>
              <StyledTableCell align="center">Tasa B</StyledTableCell>
              <StyledTableCell align="center">Tasa Alfa</StyledTableCell>
              <StyledTableCell align="center">Tasa Beta</StyledTableCell>
              <StyledTableCell align="center">Tasa Gamma</StyledTableCell>
              <StyledTableCell align="center">Editar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasas.map((tasa) => (
              <StyledTableRow key={tasa.id}>
                <TableCell component="th" scope="row" align="center">{tasa.id}
                </TableCell>
                <TableCell align="center">{tasa.plazo} meses</TableCell>
                <TableCell align="center">{tasa.tasa_a}</TableCell>
                <TableCell align="center">{tasa.tasa_b}</TableCell>
                <TableCell align="center">{tasa.tasa_alfa}</TableCell>
                <TableCell align="center">{tasa.tasa_beta}</TableCell>
                <TableCell align="center">{tasa.tasa_gamma}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color='info'
                    id={`edit-${tasa.id}`}
                    onClick={() => handleEditTasas(tasa)}
                  >
                    Editar
                  </Button>

                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={anchorEl !== null && editedTasas?.id === tasa.id}
                  >
                    <Box
                      textAlign='center'
                      p={2}
                      sx={{
                        m: 2,
                        backgroundColor: 'Menu',
                        borderRadius: '10px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)'
                      }}
                    >
                      <Typography color='black'>El plazo es de {tasa.plazo} meses</Typography>
                      <TextField
                        sx={{ m: 2 }}
                        label="A"
                        name="tasa_a"
                        value={editedTasas?.tasa_a || ''}
                        onChange={handleInputChange}
                      />
                      <TextField
                        sx={{ m: 2 }}
                        label="B"
                        name="tasa_b"
                        value={editedTasas?.tasa_b || ''}
                        onChange={handleInputChange}
                      />
                      <TextField
                        sx={{ m: 2 }}
                        label="ALFA"
                        name="tasa_alfa"
                        value={editedTasas?.tasa_alfa || ''}
                        onChange={handleInputChange}
                      />
                      <TextField
                        sx={{ m: 2 }}
                        label="BETA"
                        name="tasa_beta"
                        value={editedTasas?.tasa_beta || ''}
                        onChange={handleInputChange}
                      />
                      <TextField
                        sx={{ m: 2 }}
                        label="GAMMA"
                        name="tasa_gamma"
                        value={editedTasas?.tasa_gamma || ''}
                        onChange={handleInputChange}
                      />
                      <Box mt={2} display='flex' justifyContent='flex-end'>
                        <Button onClick={handleCancelEdit}>
                          Cancelar
                        </Button>
                        <Button
                          sx={{ m: 2, alignContent: 'end' }} variant="contained" onClick={handleSaveTasas}>
                          Guardar
                        </Button>
                      </Box>
                    </Box>
                  </Backdrop>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
