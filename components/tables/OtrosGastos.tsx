import { useEffect, useState } from 'react';
import { axiosInstances } from '../../instances/axiosInstances';
import { getCookie } from 'cookies-next';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Popover,
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

// El estilo del popover que se activa cuando no se tiene seleccionado un administrador para eliminar
const StyledPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
}));

// Se declaran de que tipo serán las variables
interface otros_gastos {
  id:number;
  plazo:number;
  instalacion:number;
  gps_anual:number;
  gastos_notariales:number;
  total:number;
}

export const OtrosGastos = () => {

  const [otrosGastos, setOtrosGastos] = useState<otros_gastos[]>([]); // Guarda los tipos de Activo de la base de datos

  const [editedOtrosGastos, setEditedOtrosGastos] = useState<otros_gastos | null>(null); // Guarda el tipo de activo editarlo para mandarlo a la base de datos
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Estado que guarda si se activa el dialog de editar

  const handleEditOtrosGastos = (vOtrosGastos: otros_gastos) => {
    setEditedOtrosGastos(vOtrosGastos);
    setAnchorEl(document.getElementById(`edit-${vOtrosGastos.id}`));
  };

  const handleCancelEdit = () => {
    setEditedOtrosGastos(null);
    setAnchorEl(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedOtrosGastos((prevOtrosGastos) => {
      if (prevOtrosGastos) {
        return { ...prevOtrosGastos, [name]: value };
      } else {
        return null;
      }
    });
  };

  const handleSaveOtrosGastos = async () => {
    const token = getCookie('TOKEN');
    if (editedOtrosGastos) {
      try {
        const response = await axiosInstances.put('valores_otros_gastos/', editedOtrosGastos, {
          headers: { 'token': token },
        });
        if (response.status === 200) {
          // const data = response.data;
          setOtrosGastos(otrosGastos.map((tipoA) => (tipoA.id === editedOtrosGastos.id ? editedOtrosGastos : tipoA)));
          setEditedOtrosGastos(null);
          setAnchorEl(null);
          fetchOtrosGastos();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchOtrosGastos();
  }, []);

  const fetchOtrosGastos = async () => {
    const token = getCookie('TOKEN');
    try {
      const response = await axiosInstances.get('valores_otros_gastos/show_all_otros_gastos', {
        headers: { 'TOKEN': token }
      });
      console.log('El response es:', response.data.data)
      if (response.status === 200) {
        const data = response.data;
        setOtrosGastos(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Tipo de Activos">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Plazo</StyledTableCell>
              <StyledTableCell align="center">instalacion</StyledTableCell>
              <StyledTableCell align="center">gps_anual</StyledTableCell>
              <StyledTableCell align="center">gastos_notariales</StyledTableCell>
              <StyledTableCell align="center">total</StyledTableCell>
              <StyledTableCell align="center">Editar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {otrosGastos.map((vOtrosG) => (
              <StyledTableRow key={vOtrosG.id}>
                <TableCell component="th" scope="row" align="center">{vOtrosG.id}
                </TableCell>
                <TableCell align="center">{vOtrosG.plazo} meses</TableCell>
                <TableCell align="center">{vOtrosG.instalacion}</TableCell>
                <TableCell align="center">{vOtrosG.gps_anual}</TableCell>
                <TableCell align="center">{vOtrosG.gastos_notariales}</TableCell>
                <TableCell align="center">{vOtrosG.total}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color='info'
                    id={`edit-${vOtrosG.id}`}
                    onClick={() => handleEditOtrosGastos(vOtrosG)}
                  >
                    Editar
                  </Button>

                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={anchorEl !== null && editedOtrosGastos?.id === vOtrosG.id}
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
                      <Typography color='black'>El plazo es de {vOtrosG.plazo} meses</Typography>
                      <TextField
                        sx={{ m: 2 }}
                        label="Instalación"
                        name="instalacion"
                        value={editedOtrosGastos?.instalacion || ''}
                        onChange={handleInputChange}
                      />
                      <TextField
                        sx={{ m: 2 }}
                        label="GPS Anual"
                        name="gps_anual"
                        value={editedOtrosGastos?.gps_anual || ''}
                        onChange={handleInputChange}
                      />
                      <TextField
                        sx={{ m: 2 }}
                        label="Gastos notariales"
                        name="gastos_notariales"
                        value={editedOtrosGastos?.gastos_notariales || ''}
                        onChange={handleInputChange}
                      />
                      <Box mt={2} display='flex' justifyContent='flex-end'>
                        <Button onClick={handleCancelEdit}>
                          Cancelar
                        </Button>
                        <Button
                          sx={{ m: 2, alignContent: 'end' }} variant="contained" onClick={handleSaveOtrosGastos}>
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
