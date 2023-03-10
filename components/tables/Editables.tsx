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
  Box,
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
interface editable {
  id: number;
  campo: string;
  valor: number;
  tipo: string;
}

export const Editables = () => {

  const [editable, setEditable] = useState<editable[]>([]); // Guarda los editables de la base de datos

  const [editedEditable, setEditedEditable] = useState<editable | null>(null); // Guarda el editable modificado para mandarlo a la base de datos
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Estado que guarda si se activa el dialog de editar

  const handleEditEditable = (editable: editable) => {
    setEditedEditable(editable);
    setAnchorEl(document.getElementById(`edit-${editable.id}`));
  };

  const handleCancelEdit = () => {
    setEditedEditable(null);
    setAnchorEl(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedEditable((prevEditable) => {
      if (prevEditable) {
        return { ...prevEditable, [name]: value };
      } else {
        return null;
      }
    });
  };

  const handleSaveEditable = async () => {
    const token = getCookie('TOKEN');
    if (editedEditable) {
      try {
        const response = await axiosInstances.put('editable/', editedEditable, {
          headers: { 'token': token },
        });
        if (response.status === 200) {
          // const data = response.data;
          setEditable(editable.map((tipoA) => (tipoA.id === editedEditable.id ? editedEditable : tipoA)));
          setEditedEditable(null);
          setAnchorEl(null);
          fetchEditable();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchEditable = async () => {
    const token = getCookie('TOKEN');
    try {
      const response = await axiosInstances.get('editable/', {
        headers: { 'TOKEN': token }
      });
      // console.log('El response es:', response.data.data)
      if (response.status === 200) {
        const data = response.data;
        setEditable(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchEditable();
  }, []);


  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Tipo de Activos">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Campo</StyledTableCell>
              <StyledTableCell align="center">Valor</StyledTableCell>
              <StyledTableCell align="center">Tipo</StyledTableCell>
              <StyledTableCell align="center">Editable</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {editable.map((edit) => (
              <StyledTableRow key={edit.id}>
                <TableCell component="th" scope="row" align="center">{edit.id}
                </TableCell>
                <TableCell align="center">{edit.campo}</TableCell>
                <TableCell align="center">{edit.valor}</TableCell>
                <TableCell align="center">{edit.tipo}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color='info'
                    id={`edit-${edit.id}`}
                    onClick={() => handleEditEditable(edit)}
                  >
                    Editar
                  </Button>

                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={anchorEl !== null && editedEditable?.id === edit.id}
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
                      <TextField
                        sx={{ m: 2 }}
                        label="Campo"
                        name="campo"
                        value={editedEditable?.campo || ''}
                        onChange={handleInputChange}
                      />
                      <TextField
                        sx={{ m: 2 }}
                        label="Valor"
                        name="valor"
                        value={editedEditable?.valor || ''}
                        onChange={handleInputChange}
                      />
                      <Box mt={2} display='flex' justifyContent='flex-end'>
                        <Button onClick={handleCancelEdit}>
                          Cancelar
                        </Button>
                        <Button
                          sx={{ m: 2, alignContent: 'end' }} variant="contained" onClick={handleSaveEditable}>
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
