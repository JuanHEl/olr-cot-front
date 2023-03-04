import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { axiosInstances } from '../../instances/axiosInstances';
import { getCookie } from 'cookies-next';
import Box from '@mui/material/Box';
import { IconButton, Checkbox, CircularProgress } from '@mui/material';
import { Lock } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
// import CustomizedAlert from '../common/Alert';
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

// Los estilos de las celdas de la tabla
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#121858',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

// El estilo de las columnas de la tabla
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// El estilo del popover que se activa cuando no se tiene seleccionado un administrador para eliminar
const StyledPopover = styled(Popover)(({ theme }) => ({
    '& .MuiPopover-paper': {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
    },
}));

// El tipo de Usuario/Administrador -> De hecho si es un administrador, pero por convención se queda como user
type User = {
    id: number;
    nombre: string;
    email: string;
    tipo_administrador: string;
};

export const UsuariosTables = () => {

    // Se mandará a llamar la alerta personalizada y así es como se pintará
    // const [openAlert, setOpenAlert] = useState(false);
    // const [alertSeverity, setAlertSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('success');
    // const [alertMessage, setAlertMessage] = useState('');
    // const handleShowAlert = (severity: 'error' | 'warning' | 'info' | 'success', message: string) => {
    //     setAlertSeverity(severity);
    //     setAlertMessage(message);
    //     setOpenAlert(true);
    // };

    // const handleCloseAlert = () => {
    //     setOpenAlert(false);
    // };

    // Se declaran los state que se utilizaran para diferentes funciones
    const [users, setUsers] = useState<User[]>([]);  // Recibe los usuarios de la base de datos
    const [editedUser, setEditedUser] = useState<User | null>(null); // Guarda el usuario editarlo para mandarlo a la base de datos
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Estado que guarda si se activa el popover de editar
    const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null); // Estado que guarda si se activa el popover de cancelar
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // Guarda si existe un id de un usuario/administrador que eliminar
    const [showDeleteDialog, setShowDeleteDialog] = useState(false); // Bandera para verificar si se activa el dialog de eliminar

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
            try {
                const response = await axiosInstances.put('administrador/', editedUser, {
                    headers: { 'token': token },
                });
                if (response.status === 201) {
                    // const data = response.data;
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
            // console.log('No existe ningun elemento a eliminar')
            return setAnchorEl1(event.currentTarget);
        }
        // console.log('El siguiente id será eliminado: ', selectedUserId)
        setShowDeleteDialog(true)
    }

    const handleConfirmDelete = async () => {
        const token = getCookie('TOKEN');
        try {
            const response = await axiosInstances.put('administrador/delete_admin', { id_eliminar: selectedUserId }, {
                headers: { 'token': token },
            });
            if (response.status === 201) {
                setShowDeleteDialog(false);
                fetchUsers();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUserSelect = (id: number) => {
        setSelectedUserId(id === selectedUserId ? null : id);
    };

    const handleClose = () => {
        setAnchorEl1(null);
    };

    const open = Boolean(anchorEl1);
    const id = open ? 'simple-popover' : undefined;



    const [openNewUser, setOpenNewUser] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [nombreNewUser, setNombreNewUser] = useState('');
    const [emailNewUser, setEmailNewUser] = useState('');
    const [passwordNewUser, setPasswordNewUser] = useState('');
    const [tipoNewUser, setTipoNewUser] = useState('');

    const handleCloseNewUser = () => {
        setOpenNewUser(false);
    };

    const handleToggleNewUser = () => {
        setOpenNewUser(!openNewUser);
    };

    const handleSubmitNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const token = getCookie('TOKEN');
            const response = await axiosInstances.post(
                'administrador/',
                {
                    nombre: nombreNewUser,
                    email: emailNewUser,
                    password: passwordNewUser,
                    tipo_administrador: tipoNewUser,
                },
                {
                    headers: { 'TOKEN': token },
                }
            );
            // console.log(response.data);
            setOpenNewUser(false);
            setNombreNewUser('');
            setEmailNewUser('');
            setPasswordNewUser('');
            setTipoNewUser('');
            setSubmitting(false);
            fetchUsers();
        } catch (error) {
            console.error(error);
            setSubmitting(false);
        }
    };


    const [editedUserId, setEditedUserId] = useState<number | null>(null); // Guarda si existe un id de un usuario/administrador que eliminar
    const [anchorElReplacePass, setAnchorElReplacePass] = useState<HTMLElement | null>(null) // Estado que guarda si se activa el popover de editar
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleOpenPopover = (id: number) => {
        // console.log({ id, })
        setEditedUserId(id);
        setAnchorElReplacePass(document.getElementById(`edit-${id}`));
    };

    const handleCloseReplacePass = () => {
        setAnchorElReplacePass(null);
    };

    const handleConfirm = async () => {
        if (newPassword === confirmPassword && editedUserId) {
            try {
                const token = getCookie('TOKEN');
                const response = await axiosInstances.put(
                    'administrador/replace_password',
                    {
                        id_editPassword: editedUserId,
                        newPassword: newPassword
                    },
                    {
                        headers: { 'TOKEN': token },
                    }
                );
                if (response.status === 201) {
                    setNewPassword('');
                    setConfirmPassword('');
                    fetchUsers();
                    // handleShowAlert('success', '¡Se ha actualizado la contraseña con éxito!')
                }
            } catch (error) {
                console.log(error);
            }
            handleCloseReplacePass();
        } else {
            alert('Las contraseñas no coinciden');
        }
    };

    const openReplacePassword = Boolean(anchorElReplacePass);

    const fetchUsers = async () => {
        try {
            const token = getCookie('TOKEN');
            const response = await axiosInstances.get('administrador/show_all_admins', {
                headers: { 'TOKEN': token }
            });
            if (response.status === 200) {
                const data = response.data;
                setUsers(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="center">Nombre</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Tipo de administrador</StyledTableCell>
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
                                <StyledTableCell align="center">{user.nombre}</StyledTableCell>
                                <StyledTableCell align="center">{user.email}</StyledTableCell>
                                <StyledTableCell align="center">{user.tipo_administrador}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button
                                        variant="contained"
                                        color='info'
                                        id={`edit-${user.id}`}
                                        onClick={() => handleEditUser(user)}
                                    >
                                        Editar
                                    </Button>

                                    <IconButton onClick={() => handleOpenPopover(user.id)}>
                                        <Lock />
                                    </IconButton>

                                    <Popover
                                        sx={{ m: 1 }}
                                        open={openReplacePassword}
                                        anchorEl={anchorElReplacePass}
                                        onClose={handleCloseReplacePass}
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
                                            label="Nueva Contraseña"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <TextField
                                            sx={{ m: 2 }}
                                            label="Confirmar Contraseña"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <Button sx={{ m: 2, alignContent: 'end' }} variant="contained" onClick={handleConfirm}>Confirmar</Button>
                                    </Popover>
                                    {/* <CustomizedAlert open={openAlert} onClose={handleCloseAlert} severity={alertSeverity} message={alertMessage} /> */}

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
                                            sx={{ m: 2, alignContent: 'end' }} variant="contained" onClick={handleSaveUser}>
                                            Guardar
                                        </Button>
                                    </Popover>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box m={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    onClick={handleToggleNewUser}
                    variant='outlined'
                    color='primary'
                >Añadir</Button>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openNewUser}
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
                        <Typography color='black'>Agregar usuario</Typography>
                        <Box component='form' onSubmit={handleSubmitNewUser} m={2} p={2}>
                            <TextField
                                sx={{ mb: 2 }}
                                label='Nombre'
                                value={nombreNewUser}
                                onChange={(e) => setNombreNewUser(e.target.value)}
                                fullWidth
                                required
                            />
                            <TextField
                                sx={{ mb: 2 }}
                                label='Email'
                                type='email'
                                value={emailNewUser}
                                onChange={(e) => setEmailNewUser(e.target.value)}
                                fullWidth
                                required
                            />
                            <TextField
                                sx={{ mb: 2 }}
                                label='Contraseña'
                                type='password'
                                value={passwordNewUser}
                                onChange={(e) => setPasswordNewUser(e.target.value)}
                                fullWidth
                                required
                            />
                            <TextField
                                sx={{ mb: 2 }}
                                label='Tipo'
                                value={tipoNewUser}
                                onChange={(e) => setTipoNewUser(e.target.value)}
                                fullWidth
                                required
                            />
                            <Box mt={2} display='flex' justifyContent='flex-end'>
                                <Button onClick={handleCloseNewUser} disabled={submitting}>
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
                <Button
                    onClick={handleDeleteUser}
                    variant='outlined'
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
