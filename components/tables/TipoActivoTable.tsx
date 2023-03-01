import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Popover } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';

const StyledPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
}));

export const TipoActivoTable = () => {
  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl1(null);
  };

  const open = Boolean(anchorEl1);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Container>
      <Button onClick={handleClick}>Open Popover</Button>
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
    </Container>
  );
};

