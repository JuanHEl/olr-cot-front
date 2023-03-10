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
interface TipoActivo {
  id: number;
  tipo_activo: string;
}

export const TipoActivoTable = () => {

  const [tipoActivos, setTipoActivos] = useState<TipoActivo[]>([]); // Guarda los tipos de Activo de la base de datos
  const [selectedTipoActivoId, setSelectedTipoActivoId] = useState<number | null>(null); // Guarda el ID del tipo de activo seleccionado en la tabla

  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null); // Estado que guarda si se activa el popover de cancelar
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // Bandera para verificar si se activa el dialog de eliminar

  const [editedTipoActivo, setEditedTipoActivo] = useState<TipoActivo | null>(null); // Guarda el tipo de activo editarlo para mandarlo a la base de datos
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Estado que guarda si se activa el dialog de editar

  const [openNewTipoActivo, setOpenNewTipoActivo] = useState(false); // Bandera que sirve para ver si se abre el componente para agregar un nuevo Tipo de Activo
  const [submitting, setSubmitting] = useState(false); // Cierra el componente para agregar un nuevo tipo de activo
  const [newTipoActivo, setNewTipoActivo] = useState(''); //Guarda los nuevos valores del tipo de activo

  const handleClose = () => {
    setAnchorEl1(null);
  };

  const handleDelete = async (event: React.MouseEvent<HTMLElement>) => {
    if (!selectedTipoActivoId) {
      // console.log('No existe ningun elemento a eliminar')
      return setAnchorEl1(event.currentTarget);
    }
    // console.log('El siguiente id será eliminado: ', selectedUserId)
    setShowDeleteDialog(true)
  }
  const handleConfirmDelete = async () => {
    const token = getCookie('TOKEN');
    try {
      console.log('Aqui está el id que se eliminará: ', selectedTipoActivoId)
      const response = await axiosInstances.put('tipo_activo/delete_tipo_activo', { id_eliminar: selectedTipoActivoId }, {
        headers: { 'token': token },
      });
      console.log('aqui está el response:', response)
      if (response.status === 201) {
        setShowDeleteDialog(false);
        fetchTipoActivos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const open = Boolean(anchorEl1);
  const id = open ? 'simple-popover' : undefined;

  const handleCloseNewTipoActivo = () => {
    setOpenNewTipoActivo(false);
  };

  const handleToggleNewTipoActivo = () => {
    setOpenNewTipoActivo(!openNewTipoActivo);
  };

  const handleSubmitNewTipoActivo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = getCookie('TOKEN');
      console.log('Tipo Activo: ', newTipoActivo)
      const response = await axiosInstances.post('tipo_activo/',
        {
          tipo_activo: newTipoActivo,
        },
        {
          headers: { 'TOKEN': token },
        }
      );
      if (response.status === 201) {
        // console.log(response.data);
        setOpenNewTipoActivo(false);
        setSubmitting(false);
        fetchTipoActivos();
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  const handleEditTipoActivo = (tipoActivo: TipoActivo) => {
    setEditedTipoActivo(tipoActivo);
    setAnchorEl(document.getElementById(`edit-${tipoActivo.id}`));
  };

  const handleCancelEdit = () => {
    setEditedTipoActivo(null);
    setAnchorEl(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedTipoActivo((prevTipoActivo) => {
      if (prevTipoActivo) {
        return { ...prevTipoActivo, [name]: value };
      } else {
        return null;
      }
    });
  };

  const handleSaveTipoActivo = async () => {
    const token = getCookie('TOKEN');
    if (editedTipoActivo) {
      try {
        const response = await axiosInstances.put('tipo_activo/', editedTipoActivo, {
          headers: { 'token': token },
        });
        if (response.status === 200) {
          // const data = response.data;
          setTipoActivos(tipoActivos.map((tipoA) => (tipoA.id === editedTipoActivo.id ? editedTipoActivo : tipoA)));
          setEditedTipoActivo(null);
          setAnchorEl(null);
          fetchTipoActivos();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchTipoActivos = async () => {
    const token = getCookie('TOKEN');
    try {
      const response = await axiosInstances.get('tipo_activo/show_all_tipo_activo', {
        headers: { 'TOKEN': token }
      });
      console.log('El response es:', response)
      if (response.status === 200) {
        const data = response.data;
        setTipoActivos(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTipoActivos();
  }, []);

  const handleCheckboxChange = (id: number) => {
    if (selectedTipoActivoId === id) {
      setSelectedTipoActivoId(null);
    } else {
      setSelectedTipoActivoId(id);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Tipo de Activos">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Tipo de Activo</StyledTableCell>
              <StyledTableCell align="center">Editar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tipoActivos.map((tipoActivo) => (
              <StyledTableRow key={tipoActivo.id}>
                <TableCell component="th" scope="row" align="center">
                  <Checkbox
                    checked={selectedTipoActivoId === tipoActivo.id}
                    onChange={() => handleCheckboxChange(tipoActivo.id)}
                  // disabled={selectedTipoActivoId !== null && selectedTipoActivoId !== tipoActivo.id}
                  />
                  {tipoActivo.id}
                </TableCell>
                <TableCell align="center">{tipoActivo.tipo_activo}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color='info'
                    id={`edit-${tipoActivo.id}`}
                    onClick={() => handleEditTipoActivo(tipoActivo)}
                  >
                    Editar
                  </Button>

                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={anchorEl !== null && editedTipoActivo?.id === tipoActivo.id}
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
                        label="Tipo de Activo"
                        name="tipo_activo"
                        value={editedTipoActivo?.tipo_activo || ''}
                        onChange={handleInputChange}
                      />
                      <Box mt={2} display='flex' justifyContent='flex-end'>
                        <Button onClick={handleCancelEdit}>
                          Cancelar
                        </Button>
                        <Button
                          sx={{ m: 2, alignContent: 'end' }} variant="contained" onClick={handleSaveTipoActivo}>
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
          onClick={handleToggleNewTipoActivo}
        >
          Añadir
        </Button>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openNewTipoActivo}
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
            <Typography color='black'>Agregar Tipo de Activo</Typography>
            <Box component='form' onSubmit={handleSubmitNewTipoActivo} m={2} p={2}>
              <TextField
                sx={{ mb: 2 }}
                label='Nombre'
                value={newTipoActivo}
                onChange={(e) => setNewTipoActivo(e.target.value)}
                fullWidth
                required
              />
              <Box mt={2} display='flex' justifyContent='flex-end'>
                <Button onClick={handleCloseNewTipoActivo} disabled={submitting}>
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
            ¿Estás seguro de que quieres eliminar este Tipo de Activo?
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
