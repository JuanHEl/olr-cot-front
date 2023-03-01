import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { axiosInstances } from '../../instances/axiosInstances';
import { getCookie } from 'cookies-next';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
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

    //   useEffect(() => {
    //     const fetchUsers = async () => {
    //       const response = await fetch('http://localhost:8006/api/administrador/show_all_admins');
    //       const data = await response.json();
    //       setUsers(data);
    //     };
    //     fetchUsers();
    //   }, []);

    const handleEditUser = (user: User) => {
        setEditedUser(user);
    };

    const handleCancelEdit = () => {
        setEditedUser(null);
    };

    const handleSaveUser = async () => {
        const token = getCookie('TOKEN')
        if (editedUser) {
            console.log('El usuario editado es: ', editedUser)
            console.log('El token de seguridad es: ', token)
            try {
                const response = await axiosInstances.put('administrador/', editedUser, {
                    headers: { 'token': token },
                })
                if (response.status === 201) {
                    const data = response.data;
                    setUsers(users.map((user) => (user.id === editedUser.id ? editedUser : user)));
                    setEditedUser(null);
                }
            } catch (error) {
                console.log(error)
            }
            // const response = await fetch(`http://localhost:8006/api/administrador/${editedUser.id}`, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(editedUser),
            // });
            // const data = await response.json();
            // setUsers(users.map((user) => (user.id === editedUser.id ? editedUser : user)));
            // setEditedUser(null);
        }
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


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = getCookie('TOKEN')
                const response = await axiosInstances.get('administrador/show_all_admins', {
                    headers: { 'TOKEN': token }
                })
                if (response.status === 200) {
                    const data = response.data;
                    console.log('La data es:', data)
                    console.log('El tipo de administradores desde la base son, ', data.data)
                    console.log({ data: data.data })
                    console.log('Los administradores son: ', users)
                    setUsers(data.data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsers()
    }, [])


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Nombre</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Tipo</StyledTableCell>
                            <StyledTableCell>Acciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="row">
                                    {user.id}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {editedUser && editedUser.id === user.id ? (
                                        <TextField value={editedUser.nombre} name="nombre" onChange={handleInputChange} />
                                    ) : (
                                        user.nombre
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {editedUser && editedUser.id === user.id ? (
                                        <TextField value={editedUser.email} name="email" onChange={handleInputChange} />
                                    ) : (
                                        user.email
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {editedUser && editedUser.id === user.id ? (
                                        <TextField value={editedUser.tipo_administrador} name="tipo" onChange={handleInputChange} />
                                    ) : (
                                        user.tipo_administrador
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {editedUser && editedUser.id === user.id ? (
                                        <>
                                            <Button variant="outlined" color="primary" onClick={handleSaveUser}>
                                                Guardar
                                            </Button>
                                            <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
                                                Cancelar
                                            </Button>
                                        </>
                                    ) : (
                                        <Button variant="outlined" onClick={() => handleEditUser(user)}>
                                            Editar
                                        </Button>
                                    )}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
