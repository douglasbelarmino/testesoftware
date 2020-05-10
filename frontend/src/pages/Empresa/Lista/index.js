import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons/';
import api from '../../../services/api.js';
import Menu from '../../../components/Menu';
import { Style } from './styles';

export default class Lista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      idSelecionado: null,
      cnpjSelecionado: '',
      message: '',
      messageClass: '',
      lista: [],
    };
  }

  async componentDidMount() {
    const response = await api.get('/empresa');
    const { empresa } = response.data;

    this.index(empresa);
  }

  index(empresa) {
    this.setState({ lista: empresa });
  }

  handleDelete = async () => {
    let { idSelecionado } = this.state;

    const response = await api.delete(`/empresa/${idSelecionado}`);

    const { ok, message } = response.data;

    if (ok) {
      this.setState({ message, messageClass: 'message success-message' });

      setTimeout(() => {
        this.handleClose();
        window.location.reload();
      }, 2000);
    }
    else {
      this.setState({ message, messageClass: 'message error-message' });
    }
  }

  handleClickOpen = (id, cnpj) => {
    this.setState({ open: true, idSelecionado: id, cnpjSelecionado: cnpj });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { lista, open, cnpjSelecionado, message, messageClass, } = this.state;

    return (
      <>
        <Menu />
        <Container
          maxWidth="xl"
          style={{
            paddingTop: '12vh', paddingBottom: '10px',
          }}
        >
          <Grid
            container

            direction="column"

          >
            <Paper>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">#</TableCell>
                    <TableCell align="left">Razão Social</TableCell>
                    <TableCell align="left">CNPJ</TableCell>
                    <TableCell align="left">E-mail</TableCell>
                    <TableCell align="left">Telefone</TableCell>
                    <TableCell align="left">Responsável</TableCell>
                    <TableCell align="left">Cidade</TableCell>
                    <TableCell align="center">Ação</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {lista.map((i) => (
                    <TableRow hover key={i.id}>
                      <TableCell>{i.id}</TableCell>
                      <TableCell>{i.razaoSocial}</TableCell>
                      <TableCell>{i.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')}</TableCell>
                      <TableCell>{i.email}</TableCell>
                      <TableCell>{i.telefone.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')}</TableCell>
                      <TableCell>{i.responsavel}</TableCell>
                      <TableCell>{i.cidade}</TableCell>
                      <TableCell align="center">
                        <Grid
                          container
                          justify="center"
                          alignItems="center"
                          direction="row"
                        >
                          <Link to={`empresa-alterar/${i.id}`}>
                            <IconButton aria-label="edit" title="Editar">
                              <Edit />
                            </IconButton>
                          </Link>
                          <IconButton aria-label="delete" title="Excluir" onClick={() => this.handleClickOpen(i.id, i.cnpj)}>
                            <Delete />
                          </IconButton>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}

                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Container>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirmação de Exclusão"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deseja realmente excluir a empresa com o CNPJ <b>{cnpjSelecionado.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')}</b>?
              </DialogContentText>
            <Style>
              <div>
                <p className={messageClass}>{message}</p>
              </div>
            </Style>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDelete} color="primary">
              Sim
          </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Não
          </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
