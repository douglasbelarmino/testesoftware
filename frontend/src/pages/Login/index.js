import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Grid,
  FormControl,
  Typography,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import api from '../../services/api';
import { login } from '../../services/auth';

import { Style } from './styles';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [alert, setAlert] = useState({
    messageClass: '',
    message: '',
  });

  const [labelWidth, setLabelWidth] = useState(0);
  const labelRef = useRef(0);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setLabelWidth(labelRef.current.offsetWidth);
  }, [labelWidth]);

  async function handleSubmit() {
    try {
      const response = await api.post('/autenticacao', {
        email,
        senha,
      });

      const { message, ok } = response.data;

      if (ok) {
        setAlert({ messageClass: 'message success-message', message });

        login(response.data.token);

        setTimeout(() => {
          props.history.push('/app');
        }, 2000);
      } else {
        setAlert({ messageClass: 'message error-message', message });
      }
    } catch (error) {
      setAlert({ messageClass: 'message error-message', message: 'Ocorreu um erro, tente novamente' });
    }
  }

  return (
    <Style>
      <Container maxWidth="sm">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: '100vh' }}
        >
          <Typography className="form-control" align="center" variant="h4">
            Login
          </Typography>
          <FormControl className="form-control" variant="outlined">
            <InputLabel ref={labelRef} htmlFor="email">
              E-mail
            </InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              labelWidth={labelWidth}
            />
          </FormControl>

          <FormControl className="form-control" variant="outlined">
            <InputLabel ref={labelRef} htmlFor="senha">Senha</InputLabel>
            <OutlinedInput
              id="senha"
              type={showPassword ? 'text' : 'password'}
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              labelWidth={labelWidth}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
          <div
            className={alert.messageClass}
          >
            {alert.message}
          </div>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Entrar
            </Button>
            <Button variant="contained" color="default">
              <Link to="/cadastro">Cadastre-se</Link>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Style>
  );
}
