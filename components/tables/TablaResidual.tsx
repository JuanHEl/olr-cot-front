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
interface valores_residuales {
  id: number;
  plazo: number;
  minimo: number;
  maximo: number;
}

export const TablaResidual = () => {

  const [vResiduales, setVResiduales] = useState<valores_residuales[]>([]); // Guarda los tipos de Activo de la base de datos

  const [editedVResiduales, setEditedVResiduales] = useState<valores_residuales | null>(null); // Guarda el tipo de activo editarlo para mandarlo a la base de datos
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Estado que guarda si se activa el dialog de editar

  const handleEditTasas = (vResiduales: valores_residuales) => {
    setEditedVResiduales(vResiduales);
    setAnchorEl(document.getElementById(`edit-${vResiduales.id}`));
  };

  const handleCancelEdit = () => {
    setEditedVResiduales(null);
    setAnchorEl(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedVResiduales((prevVResiduales) => {
      if (prevVResiduales) {
        return { ...prevVResiduales, [name]: value };
      } else {
        return null;
      }
    });
  };

  const handleSaveVResiduales = async () => {
    const token = getCookie('TOKEN');
    if (editedVResiduales) {
      try {
        const response = await axiosInstances.put('valores_residuales/', editedVResiduales, {
          headers: { 'token': token },
        });
        if (response.status === 200) {
          // const data = response.data;
          setVResiduales(vResiduales.map((tipoA) => (tipoA.id === editedVResiduales.id ? editedVResiduales : tipoA)));
          setEditedVResiduales(null);
          setAnchorEl(null);
          fetchVResiduales();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchVResiduales();
  }, []);

  const fetchVResiduales = async () => {
    const token = getCookie('TOKEN');
    try {
      const response = await axiosInstances.get('valores_residuales/show_all_valor_residual', {
        headers: { 'TOKEN': token }
      });
      // console.log('El response es:', response.data.data)
      if (response.status === 200) {
        const data = response.data;
        setVResiduales(data.data);
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
              <StyledTableCell align="center">Mínimo</StyledTableCell>
              <StyledTableCell align="center">Máximo</StyledTableCell>
              <StyledTableCell align="center">Editar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vResiduales.map((vResid) => (
              <StyledTableRow key={vResid.id}>
                <TableCell component="th" scope="row" align="center">{vResid.id}
                </TableCell>
                <TableCell align="center">{vResid.plazo} meses</TableCell>
                <TableCell align="center">{vResid.minimo}</TableCell>
                <TableCell align="center">{vResid.maximo}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color='info'
                    id={`edit-${vResid.id}`}
                    onClick={() => handleEditTasas(vResid)}
                  >
                    Editar
                  </Button>

                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={anchorEl !== null && editedVResiduales?.id === vResid.id}
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
                      <Typography color='black'>El plazo es de {vResid.plazo} meses</Typography>
                      <TextField
                        sx={{ m: 2 }}
                        label="Mínimo"
                        name="minimo"
                        value={editedVResiduales?.minimo || ''}
                        onChange={handleInputChange}
                      />
                      <TextField
                        sx={{ m: 2 }}
                        label="Máximo"
                        name="maximo"
                        value={editedVResiduales?.maximo || ''}
                        onChange={handleInputChange}
                      />
                      <Box mt={2} display='flex' justifyContent='flex-end'>
                        <Button onClick={handleCancelEdit}>
                          Cancelar
                        </Button>
                        <Button
                          sx={{ m: 2, alignContent: 'end' }} variant="contained" onClick={handleSaveVResiduales}>
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
