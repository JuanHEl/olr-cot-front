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
interface marca {
  id: number;
  marca: string;
}

export const MarcaTable = () => {

  const [marca, setMarca] = useState<marca[]>([]); // Guarda los tipos de Activo de la base de datos
  const [selectedMarcaId, setSelectedMarcaId] = useState<number | null>(null); // Guarda el ID del tipo de activo seleccionado en la tabla

  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null); // Estado que guarda si se activa el popover de cancelar
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // Bandera para verificar si se activa el dialog de eliminar

  const [editedMarca, setEditedMarca] = useState<marca | null>(null); // Guarda el tipo de activo editarlo para mandarlo a la base de datos
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Estado que guarda si se activa el dialog de editar

  const [openNewMarca, setOpenNewMarca] = useState(false); // Bandera que sirve para ver si se abre el componente para agregar un nuevo Tipo de Activo
  const [submitting, setSubmitting] = useState(false); // Cierra el componente para agregar un nuevo tipo de activo
  const [newMarca, setNewMarca] = useState(''); //Guarda los nuevos valores del tipo de activo

  const handleClose = () => {
    setAnchorEl1(null);
  };

  const handleDelete = async (event: React.MouseEvent<HTMLElement>) => {
    if (!selectedMarcaId) {
      // console.log('No existe ningun elemento a eliminar')
      return setAnchorEl1(event.currentTarget);
    }
    // console.log('El siguiente id será eliminado: ', selectedUserId)
    setShowDeleteDialog(true)
  }
  const handleConfirmDelete = async () => {
    const token = getCookie('TOKEN');
    try {
      console.log('Aqui está el id que se eliminará: ', selectedMarcaId)
      const response = await axiosInstances.put('marca/delete_marca', { id_eliminar: selectedMarcaId }, {
        headers: { 'token': token },
      });
      console.log('aqui está el response:', response)
      if (response.status === 201) {
        setShowDeleteDialog(false);
        fetchMarca();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const open = Boolean(anchorEl1);
  const id = open ? 'simple-popover' : undefined;

  const handleCloseNewMarca = () => {
    setOpenNewMarca(false);
  };

  const handleToggleNewMarca = () => {
    setOpenNewMarca(!openNewMarca);
  };

  const handleSubmitNewMarca = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = getCookie('TOKEN');
      console.log('Tipo Activo: ', newMarca)
      const response = await axiosInstances.post('marca/',
        {
          marca: newMarca,
        },
        {
          headers: { 'TOKEN': token },
        }
      );
      if (response.status === 201) {
        // console.log(response.data);
        setOpenNewMarca(false);
        setSubmitting(false);
        fetchMarca();
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  const handleEditMarca = (marca: marca) => {
    setEditedMarca(marca);
    setAnchorEl(document.getElementById(`edit-${marca.id}`));
  };

  const handleCancelEdit = () => {
    setEditedMarca(null);
    setAnchorEl(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedMarca((prevMarca) => {
      if (prevMarca) {
        return { ...prevMarca, [name]: value };
      } else {
        return null;
      }
    });
  };

  const handleSaveMarca = async () => {
    const token = getCookie('TOKEN');
    if (editedMarca) {
      try {
        const response = await axiosInstances.put('marca/', editedMarca, {
          headers: { 'token': token },
        });
        if (response.status === 200) {
          // const data = response.data;
          setMarca(marca.map((tipoA) => (tipoA.id === editedMarca.id ? editedMarca : tipoA)));
          setEditedMarca(null);
          setAnchorEl(null);
          fetchMarca();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchMarca = async () => {
    const token = getCookie('TOKEN');
    try {
      const response = await axiosInstances.get('marca/show_all_marca', {
        headers: { 'TOKEN': token }
      });
      console.log('El response es:', response)
      if (response.status === 200) {
        const data = response.data;
        setMarca(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMarca();
  }, []);

  const handleCheckboxChange = (id: number) => {
    if (selectedMarcaId === id) {
      setSelectedMarcaId(null);
    } else {
      setSelectedMarcaId(id);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Tipo de Activos">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Marca</StyledTableCell>
              <StyledTableCell align="center">Editar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marca.map((marc) => (
              <StyledTableRow key={marc.id}>
                <TableCell component="th" scope="row" align="center">
                  <Checkbox
                    checked={selectedMarcaId === marc.id}
                    onChange={() => handleCheckboxChange(marc.id)}
                  // disabled={selectedTipoActivoId !== null && selectedTipoActivoId !== tipoActivo.id}
                  />
                  {marc.id}
                </TableCell>
                <TableCell align="center">{marc.marca}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color='info'
                    id={`edit-${marc.id}`}
                    onClick={() => handleEditMarca(marc)}
                  >
                    Editar
                  </Button>

                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={anchorEl !== null && editedMarca?.id === marc.id}
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
                        label="Marca"
                        name="marca"
                        value={editedMarca?.marca || ''}
                        onChange={handleInputChange}
                      />
                      <Box mt={2} display='flex' justifyContent='flex-end'>
                        <Button onClick={handleCancelEdit}>
                          Cancelar
                        </Button>
                        <Button
                          sx={{ m: 2, alignContent: 'end' }} variant="contained" onClick={handleSaveMarca}>
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
          onClick={handleToggleNewMarca}
        >
          Añadir
        </Button>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openNewMarca}
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
            <Typography color='black'>Agregar Marca</Typography>
            <Box component='form' onSubmit={handleSubmitNewMarca} m={2} p={2}>
              <TextField
                sx={{ mb: 2 }}
                label='Nombre'
                value={newMarca}
                onChange={(e) => setNewMarca(e.target.value)}
                fullWidth
                required
              />
              <Box mt={2} display='flex' justifyContent='flex-end'>
                <Button onClick={handleCloseNewMarca} disabled={submitting}>
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
            ¿Estás seguro de que quieres eliminar esta Marca?
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
