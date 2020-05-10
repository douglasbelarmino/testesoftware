import React from 'react';
import { Link } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';

import { Add, ExitToApp } from '@material-ui/icons';

import { logout } from '../../services/auth';

import { Style } from './styles';


export default function Menu() {
  return (
    <Style>
      <AppBar position="fixed">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">
              <Link to="/app">
                Empresas
              </Link>
            </Typography>
            <Link to="empresa-cadastro">
              <IconButton title="Adicionar" color="inherit" style={{ marginLeft: '10px' }} aria-label="menu">
                <Add />
              </IconButton>
            </Link>
          </div>
          <IconButton title="Sair" color="inherit" aria-label="menu" onClick={logout}>
            <ExitToApp />
          </IconButton>

        </Toolbar>
      </AppBar>
    </Style>
  );
}
