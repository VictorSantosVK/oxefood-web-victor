import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }
    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }
    return (
        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-entregador'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>DataNasc</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>F. Celular</Table.HeaderCell>
                                    <Table.HeaderCell>F. Fixo</Table.HeaderCell>
                                    <Table.HeaderCell>RG</Table.HeaderCell>
                                    <Table.HeaderCell>QtddEntrReal</Table.HeaderCell>
                                    <Table.HeaderCell>Frete</Table.HeaderCell>
                                    <Table.HeaderCell>Rua</Table.HeaderCell>
                                    <Table.HeaderCell>Compl.</Table.HeaderCell>
                                    <Table.HeaderCell>Nº</Table.HeaderCell>
                                    <Table.HeaderCell>Bairro</Table.HeaderCell>
                                    <Table.HeaderCell>Cidade</Table.HeaderCell>
                                    <Table.HeaderCell>UF</Table.HeaderCell>
                                    <Table.HeaderCell>CEP</Table.HeaderCell>
                                    <Table.HeaderCell>Ativo</Table.HeaderCell>

                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(entrtegador => (

                                    <Table.Row key={entrtegador.id}>
                                        <Table.Cell>{entrtegador.nome}</Table.Cell>
                                        <Table.Cell>{formatarData(entrtegador.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{entrtegador.cpf}</Table.Cell>
                                        <Table.Cell>{entrtegador.foneCelular}</Table.Cell>
                                        <Table.Cell>{entrtegador.foneFixo}</Table.Cell>
                                        <Table.Cell>{entrtegador.rg}</Table.Cell>
                                        <Table.Cell>{entrtegador.qtdEntregaRealizadas}</Table.Cell>
                                        <Table.Cell>{entrtegador.valorFrete}</Table.Cell>
                                        <Table.Cell>{entrtegador.enderecoRua}</Table.Cell>
                                        <Table.Cell>{entrtegador.enderecoComplemento}</Table.Cell>
                                        <Table.Cell>{entrtegador.enderecoNumero}</Table.Cell>
                                        <Table.Cell>{entrtegador.enderecoBairro}</Table.Cell>
                                        <Table.Cell>{entrtegador.enderecoCidade}</Table.Cell>
                                        <Table.Cell>{entrtegador.enderecoUf}</Table.Cell>
                                        <Table.Cell>{entrtegador.enderecoCep}</Table.Cell>
                                        <Table.Cell>{entrtegador.ativo}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste entregador'
                                                icon>
                                                <Icon name='edit' />
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este entregador'
                                                icon>
                                                <Icon name='trash' />
                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>

        </div>
    )
}