import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Confirm, Container, Divider, Icon, Modal, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MenuSistema from "../../MenuSistema";

export default function ListEntregador() {
  const [lista, setLista] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [entregadorSelecionado, setEntregadorSelecionado] = useState({});

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/entregador")
      .then((response) => {
        setLista(response.data);
      })
      .catch(() => {
        console.log("Erro ao carregar lista de entregadores.");
      });
  }

  function confirmarRemover(id) {
    setIdRemover(id);
    setOpenConfirm(true);
  }

  function remover() {
    axios.delete("http://localhost:8080/api/entregador/" + idRemover)
      .then(() => {
        setOpenConfirm(false);
        carregarLista();
      })
      .catch(() => {
        console.log("Erro ao remover entregador.");
      });
  }

  function visualizar(id) {
    axios.get("http://localhost:8080/api/entregador/" + id)
      .then((response) => {
        setEntregadorSelecionado(response.data);
        setOpenModal(true);
      })
      .catch(() => {
        console.log("Erro ao visualizar entregador.");
      });
  }

  return (
    <div>
      <MenuSistema tela={"entregador"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>Entregador</h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-entregador"
            />

            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>RG</Table.HeaderCell>
                  <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                  <Table.HeaderCell>Placa Veículo</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((entregador) => (
                  <Table.Row key={entregador.id}>
                    <Table.Cell>{entregador.nome}</Table.Cell>
                    <Table.Cell>{entregador.cpf}</Table.Cell>
                    <Table.Cell>{entregador.rg}</Table.Cell>
                    <Table.Cell>{entregador.foneCelular}</Table.Cell>
                    <Table.Cell>{entregador.placaVeiculo}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="blue"
                        title="Visualizar registro completo"
                        icon
                        onClick={() => visualizar(entregador.id)}
                      >
                        <Icon name="eye" />
                      </Button>
                      &nbsp;

                      <Link to="/form-entregador" state={{ id: entregador.id }}>
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados deste entregador"
                          icon
                        >
                          <Icon name="edit" />
                        </Button>
                      </Link>
                      &nbsp;

                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este entregador"
                        icon
                        onClick={() => confirmarRemover(entregador.id)}
                      >
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>

      <Confirm
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() => remover()}
        content="Tem certeza que deseja remover esse registro?"
      />

      <Modal open={openModal} onClose={() => setOpenModal(false)} size="small">
        <Modal.Header>Detalhes do Entregador</Modal.Header>
        <Modal.Content>
          <p><strong>ID:</strong> {entregadorSelecionado.id}</p>
          <p><strong>Nome:</strong> {entregadorSelecionado.nome}</p>
          <p><strong>CPF:</strong> {entregadorSelecionado.cpf}</p>
          <p><strong>RG:</strong> {entregadorSelecionado.rg}</p>
          <p><strong>Fone Celular:</strong> {entregadorSelecionado.foneCelular}</p>
          <p><strong>Placa Veículo:</strong> {entregadorSelecionado.placaVeiculo}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey" onClick={() => setOpenModal(false)}>
            Fechar
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}