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
  Checkbox,
  Popover,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
  TextField,
  CircularProgress,
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
interface modelo {
  id: number;
  year: string;
}

export const ModeloTable = () => {

  const [modelo, setModelo] = useState<modelo[]>([]); // Guarda los tipos de Activo de la base de datos
  const [selectedModeloId, setSelectedModeloId] = useState<number | null>(null); // Guarda el ID del tipo de activo seleccionado en la tabla

  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null); // Estado que guarda si se activa el popover de cancelar
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // Bandera para verificar si se activa el dialog de eliminar

  const [editedModelo, setEditedModelo] = useState<modelo | null>(null); // Guarda el tipo de activo editarlo para mandarlo a la base de datos
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Estado que guarda si se activa el dialog de editar

  const [openNewModelo, setOpenNewModelo] = useState(false); // Bandera que sirve para ver si se abre el componente para agregar un nuevo Tipo de Activo
  const [submitting, setSubmitting] = useState(false); // Cierra el componente para agregar un nuevo tipo de activo
  const [newModelo, setNewModelo] = useState(''); //Guarda los nuevos valores del tipo de activo

  const handleClose = () => {
    setAnchorEl1(null);
  };

  const handleDelete = async (event: React.MouseEvent<HTMLElement>) => {
    if (!selectedModeloId) {
      // console.log('No existe ningun elemento a eliminar')
      return setAnchorEl1(event.currentTarget);
    }
    // console.log('El siguiente id será eliminado: ', selectedUserId)
    setShowDeleteDialog(true)
  }
  const handleConfirmDelete = async () => {
    const token = getCookie('TOKEN');
    try {
      console.log('Aqui está el id que se eliminará: ', selectedModeloId)
      const response = await axiosInstances.put('years/delete_year', { id_eliminar: selectedModeloId }, {
        headers: { 'token': token },
      });
      console.log('aqui está el response:', response)
      if (response.status === 201) {
        setShowDeleteDialog(false);
        fetchModelo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const open = Boolean(anchorEl1);
  const id = open ? 'simple-popover' : undefined;

  const handleCloseNewModelo = () => {
    setOpenNewModelo(false);
  };

  const handleToggleNewModelo = () => {
    setOpenNewModelo(!openNewModelo);
  };

  const handleSubmitNewModelo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = getCookie('TOKEN');
      console.log('Tipo Activo: ', newModelo)
      const response = await axiosInstances.post('years/',
        {
          year: newModelo,
        },
        {
          headers: { 'TOKEN': token },
        }
      );
      if (response.status === 201) {
        // console.log(response.data);
        setOpenNewModelo(false);
        setSubmitting(false);
        fetchModelo();
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  const handleEditModelo = (modelo: modelo) => {
    setEditedModelo(modelo);
    setAnchorEl(document.getElementById(`edit-${modelo.id}`));
  };

  const handleCancelEdit = () => {
    setEditedModelo(null);
    setAnchorEl(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedModelo((prevModelo) => {
      if (prevModelo) {
        return { ...prevModelo, [name]: value };
      } else {
        return null;
      }
    });
  };

  const handleSaveModelo = async () => {
    const token = getCookie('TOKEN');
    if (editedModelo) {
      try {
        const response = await axiosInstances.put('years/', editedModelo, {
          headers: { 'token': token },
        });
        if (response.status === 200) {
          // const data = response.data;
          setModelo(modelo.map((tipoA) => (tipoA.id === editedModelo.id ? editedModelo : tipoA)));
          setEditedModelo(null);
          setAnchorEl(null);
          fetchModelo();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchModelo = async () => {
    const token = getCookie('TOKEN');
    try {
      const response = await axiosInstances.get('years/show_all_years', {
        headers: { 'TOKEN': token }
      });
      console.log('El response es:', response)
      if (response.status === 200) {
        const data = response.data;
        setModelo(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchModelo();
  }, []);

  const handleCheckboxChange = (id: number) => {
    if (selectedModeloId === id) {
      setSelectedModeloId(null);
    } else {
      setSelectedModeloId(id);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Tipo de Activos">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Modelo</StyledTableCell>
              <StyledTableCell align="center">Editar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modelo.map((model) => (
              <StyledTableRow key={model.id}>
                <TableCell component="th" scope="row" align="center">
                  <Checkbox
                    checked={selectedModeloId === model.id}
                    onChange={() => handleCheckboxChange(model.id)}
                  // disabled={selectedTipoActivoId !== null && selectedTipoActivoId !== tipoActivo.id}
                  />
                  {model.id}
                </TableCell>
                <TableCell align="center">{model.year}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color='info'
                    id={`edit-${model.id}`}
                    onClick={() => handleEditModelo(model)}
                  >
                    Editar
                  </Button>

                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={anchorEl !== null && editedModelo?.id === model.id}
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
                        label="Modelo"
                        name="year"
                        value={editedModelo?.year || ''}
                        onChange={handleInputChange}
                      />
                      <Box mt={2} display='flex' justifyContent='flex-end'>
                        <Button onClick={handleCancelEdit}>
                          Cancelar
                        </Button>
                        <Button
                          sx={{ m: 2, alignContent: 'end' }} variant="contained" onClick={handleSaveModelo}>
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
      <Box m={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleToggleNewModelo}
        >
          Añadir
        </Button>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openNewModelo}
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
            <Typography color='black'>Agregar Modelo</Typography>
            <Box component='form' onSubmit={handleSubmitNewModelo} m={2} p={2}>
              <TextField
                sx={{ mb: 2 }}
                label='Nombre'
                value={newModelo}
                onChange={(e) => setNewModelo(e.target.value)}
                fullWidth
                required
              />
              <Box mt={2} display='flex' justifyContent='flex-end'>
                <Button onClick={handleCloseNewModelo} disabled={submitting}>
                  Cancelar
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={submitting}
                >

                  {submitting ? (
                    <CircularProgress size={24} />
                  ) : (
                    'Guardar'
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </Backdrop>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Eliminar
        </Button>
      </Box>
      <Box>
        <StyledPopover
          id={id}
          open={open}
          anchorEl={anchorEl1}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box>
            <Typography>Selecciona el elemento que se desea eliminar</Typography>
          </Box>
        </StyledPopover>
      </Box>
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres eliminar este Modelo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
