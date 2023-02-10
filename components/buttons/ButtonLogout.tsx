import React from 'react'
import { useRouter } from 'next/router';
import { getCookie,deleteCookie } from 'cookies-next';
import { Box, Button } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export const ButtonLogout = () => {

    const router = useRouter()
    
    const Click = ()=>{
        const laCookie=getCookie('TOKEN')
        deleteCookie('TOKEN')
        return router.push('/login')
    }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', mt:2}}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button endIcon={<LogoutRoundedIcon/>} onClick={Click}></Button>
    </Box>
  )
}
