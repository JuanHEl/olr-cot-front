import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { axiosInstances } from '../../instances/axiosInstances';
import { getCookie } from 'cookies-next';
import Box from '@mui/material/Box';
import { IconButton, Checkbox } from '@mui/material';
import { Lock } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Popover,
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#121858',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const StyledPopover = styled(Popover)(({ theme }) => ({
    '& .MuiPopover-paper': {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
    },
  }));
  

type User = {
    id: number;
    nombre: string;
    email: string;
    tipo_administrador: string;
};

export const UsuariosTables = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editedUser, setEditedUser] = useState<User | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleEditUser = (user: User) => {
        setEditedUser(user);
        setAnchorEl(document.getElementById(`edit-${user.id}`));
    };

    const handleCancelEdit = () => {
        setEditedUser(null);
        setAnchorEl(null);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedUser((prevUser) => {
            if (prevUser) {
                return { ...prevUser, [name]: value };
            } else {
                return null;
            }
        });
    };

    const handleSaveUser = async () => {
        const token = getCookie('TOKEN');
        if (editedUser) {
            // console.log('El usuario editado es: ', editedUser);
            // console.log('El token de seguridad es: ', token);
            try {
                const response = await axiosInstances.put('administrador/', editedUser, {
                    headers: { 'token': token },
                });
                if (response.status === 201) {
                    const data = response.data;
                    setUsers(users.map((user) => (user.id === editedUser.id ? editedUser : user)));
                    setEditedUser(null);
                    setAnchorEl(null);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleDeleteUser = async (event: React.MouseEvent<HTMLElement>) => {
        if (!selectedUserId) {
            setAnchorEl1(event.currentTarget);
            return console.log('No existe ningun elemento a eliminar')
        }
        // console.log('El usuario editado es: ', editedUser);
        // console.log('El token de seguridad es: ', token);
        console.log('El siguiente id será eliminado: ', selectedUserId)

        setShowDeleteDialog(true)
        // const response = await axiosInstances.put('administrador/', editedUser, {
        //     headers: { 'token': token },
        // });
        // if (response.status === 201) {
        //     const data = response.data;
        //     setUsers(users.map((user) => (user.id === editedUser.id ? editedUser : user)));
        //     setEditedUser(null);
        //     setAnchorEl(null);
        // }
    }

    const handleConfirmDelete = async () => {
        const token = getCookie('TOKEN');
        console.log('Hello')
        try {
            const response = await axiosInstances.put('administrador/delete_admin', {id_eliminar:selectedUserId} ,{
                headers: { 'token': token },
            });
            if (response.status === 201) {
                setShowDeleteDialog(false);
            }
        } catch (error) {
            console.log(error);
        }
        // if (deletingUser) {
        //     console.log('El usuario a borrar es: ', deletingUser);
        //     console.log('El token de seguridad es: ', token);
        //     try {
        //         const response = await axiosInstances.delete(`administrador/${deletingUser.id}`, {
        //             headers: { 'token': token },
        //         });
        //         if (response.status === 200) {
        //             setUsers(users.filter((user) => user.id !== deletingUser.id));
        //             setDeletingUser(null);
        //             setShowDeleteDialog(false);
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    };

    const handleUserSelect = (id: number) => {
        setSelectedUserId(id === selectedUserId ? null : id);
    };

    
  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl1(null);
  };

  const open = Boolean(anchorEl1);
  const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = getCookie('TOKEN');
                const response = await axiosInstances.get('administrador/show_all_admins', {
                    headers: { 'TOKEN': token }
                });
                if (response.status === 200) {
                    const data = response.data;
                    // console.log('La data es:', data);
                    // console.log('El tipo de administradores desde la base son, ', data.data);
                    // console.log({ data: data.data });
                    // console.log('Los administradores son: ', data.data);
                    setUsers(data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="right">Nombre</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Tipo de administrador</StyledTableCell>
                            <StyledTableCell align="center">Editar</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="row">
                                    {user.id}
                                    <Checkbox
                                        checked={user.id === selectedUserId}
                                        onChange={() => handleUserSelect(user.id)}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="right">{user.nombre}</StyledTableCell>
                                <StyledTableCell align="right">{user.email}</StyledTableCell>
                                <StyledTableCell align="right">{user.tipo_administrador}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button
                                        variant="contained"
                                        id={`edit-${user.id}`}
                                        onClick={() => handleEditUser(user)}
                                    >
                                        Editar
                                    </Button>
                                    <IconButton>
                                        <Lock />
                                    </IconButton>
                                    <Popover
                                        sx={{ m: 2 }}
                                        open={anchorEl !== null && editedUser?.id === user.id}
                                        anchorEl={anchorEl}
                                        onClose={handleCancelEdit}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <TextField
                                            sx={{ m: 2 }}
                                            label="Nombre"
                                            name="nombre"
                                            value={editedUser?.nombre || ''}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            sx={{ m: 2 }}
                                            label="Email"
                                            name="email"
                                            value={editedUser?.email || ''}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            sx={{ m: 2 }}
                                            label="Tipo de administrador"
                                            name="tipo_administrador"
                                            value={editedUser?.tipo_administrador || ''}
                                            onChange={handleInputChange}
                                        />
                                        <Button
                                            sx={{ m: 2 }} variant="contained" onClick={handleSaveUser}>
                                            Guardar
                                        </Button>
                                    </Popover>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box textAlign='right' m={2}>
                <Button
                    onClick={handleDeleteUser}
                    variant='contained'
                    color='error'
                >Eliminar</Button>
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
                    <Typography>Selecciona el elemento que deseas eliminar</Typography>
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
                        ¿Estás seguro de que quieres eliminar este usuario?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDeleteDialog(false)}>Cancelar</Button>
                    <Button onClick={handleConfirmDelete}>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
