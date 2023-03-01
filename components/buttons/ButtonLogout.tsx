import React from 'react'
import { useRouter } from 'next/router';
import { authSlice } from '../../store/slices/authSlice';
import { getCookie,deleteCookie } from 'cookies-next';
import { Box, Button } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useDispatch } from 'react-redux';

export const ButtonLogout = () => {

    const router = useRouter()
    const dispatch=useDispatch()
    const {loggout} = authSlice.actions
    
    const Click = ()=>{
        dispatch(loggout({}))
    }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', mt:2}}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button endIcon={<LogoutRoundedIcon/>} onClick={Click}></Button>
    </Box>
  )
}
