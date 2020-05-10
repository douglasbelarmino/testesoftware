import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import {
  Container,
  Grid,
  FormControl,
  Typography,
  InputLabel,
  OutlinedInput,
  Button,
} from '@material-ui/core';
import api from '../../../services/api';
import Menu from '../../../components/Menu';
import { Style } from './styles';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id || null,
      razaoSocial: '',
      cnpj: '',
      email: '',
      telefone: '',
      responsavel: '',
      cidade: '',
      labelRef: 0,
      cnpjMessage: '',
      messageClass: '',
      message: '',
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });

  };

  handleSubmit = async () => {
    let { id, razaoSocial, cnpj, email, telefone, responsavel, cidade } = this.state;
    cnpj = cnpj.replace(/[^0-9]+/g, '');
    telefone = telefone.replace(/[^0-9]+/g, '');
    let response = null;

    if (id === null) {
      response = await api.post("/empresa", {
        razaoSocial, cnpj, email, telefone, responsavel, cidade
      });
    }
    else {
      response = await api.put(`/empresa/${id}`, {
        razaoSocial, cnpj, email, telefone, responsavel, cidade
      });

    }

    const { ok, message } = response.data;

    if (ok) {
      this.setState({ message, messageClass: 'message success-message' });

      setTimeout(() => {
        this.props.history.push("/app");
      }, 2000);
    }
    else {
      this.setState({ message, messageClass: 'message error-message' });
    }
  }

  handleCnpj = async () => {
    let { cnpj } = this.state;
    cnpj = cnpj.replace(/[^0-9]+/g, '');
    if (cnpj.length !== 0) {
      if (cnpj.length === 14) {

        try {
          const response = await api.post('/empresa-cnpj', {
            cnpj,
          });

          const { message, ok } = response.data;

          if (ok) this.setState({ cnpjMessage: '' });
          else this.setState({ cnpjMessage: message });
        } catch (error) {
          this.setState({ cnpjMessage: 'Ocorreu um erro, tente novamente.' });
        }
      } else {
        this.setState({ cnpjMessage: 'CNPJ invalido.' });
      }
    }
  };

  componentDidMount() {
    const { id } = this.state;
    if (id !== null)
      this.findOne(this.state.id);
  }

  async findOne(id) {
    const response = await api.post(`/empresa/${id}`);

    const { ok } = response.data;

    if (ok) {
      const { empresa } = response.data;
      const {
        razaoSocial,
        cnpj,
        email,
        telefone,
        responsavel,
        cidade, } = empresa;

      this.setState({
        razaoSocial,
        cnpj,
        email,
        telefone,
        responsavel,
        cidade,
      });
    }
  }

  render() {
    const {
      id,
      labelRef,
      razaoSocial,
      cnpj,
      email,
      telefone,
      responsavel,
      cidade,
      cnpjMessage,
      message,
      messageClass,
    } = this.state;

    return (
      <Style>
        <Menu />
        <Container maxWidth="sm" style={{
          paddingTop: '12vh', paddingBottom: '10px',
        }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography className="form-control" align="center" variant="h4">
              {id === null ? "Cadastro" : "Alteração"}
            </Typography>

            <FormControl className="form-control" variant="outlined">
              <InputLabel ref={labelRef} htmlFor="cnpj">
                CNPJ
              </InputLabel>
              <OutlinedInput
                value={cnpj}
                labelWidth={40}
                onChange={this.handleChange}
                onBlur={this.handleCnpj}
                name="cnpj"
                inputComponent={cnpjMask}
              />
              <h1 className="input-error-message">{cnpjMessage}</h1>
            </FormControl>

            <FormControl className="form-control" variant="outlined">
              <InputLabel ref={labelRef} htmlFor="razaoSocial">
                Razão Social
              </InputLabel>
              <OutlinedInput
                name="razaoSocial"
                value={razaoSocial}
                onChange={this.handleChange}
                labelWidth={92}
              />
            </FormControl>

            <FormControl className="form-control" variant="outlined">
              <InputLabel ref={labelRef} htmlFor="email">
                E-mail
              </InputLabel>
              <OutlinedInput
                name="email"
                value={email}
                onChange={this.handleChange}
                labelWidth={45}
              />
            </FormControl>

            <FormControl className="form-control" variant="outlined">
              <InputLabel ref={labelRef} htmlFor="telefone">
                Telefone
              </InputLabel>
              <OutlinedInput
                name="telefone"
                value={telefone}
                onChange={this.handleChange}
                labelWidth={62}
                inputComponent={telefoneMask}
              />
            </FormControl>

            <FormControl className="form-control" variant="outlined">
              <InputLabel ref={labelRef} htmlFor="responsavel">
                Responsável
              </InputLabel>
              <OutlinedInput
                name="responsavel"
                value={responsavel}
                onChange={this.handleChange}
                labelWidth={90}
              />
            </FormControl>

            <FormControl className="form-control" variant="outlined">
              <InputLabel ref={labelRef} htmlFor="cidade">
                Cidade
              </InputLabel>
              <OutlinedInput
                name="cidade"
                value={cidade}
                onChange={this.handleChange}
                labelWidth={50}
              />
            </FormControl>

            <div
              className={messageClass}
            >
              {message}
            </div>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >

              <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                {id === null ? "Cadastrar" : "Atualizar"}
              </Button>
              <Button variant="contained" color="default">
                <Link to="/app">Voltar</Link>
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Style>
    );
  }
}



function cnpjMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}

    />
  );
}

function telefoneMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}

    />
  );
}
