import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Confirm, Container, Divider, Icon, Modal, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MenuSistema from "../../MenuSistema";

export default function ListCliente() {
  const [lista, setLista] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState({});

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/cliente")
      .then((response) => {
        setLista(response.data);
      })
      .catch(() => {
        console.log("Erro ao carregar lista de clientes.");
      });
  }

  function formatarData(dataParam) {
    if (!dataParam) return "";
    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }

  function confirmarRemover(id) {
    setIdRemover(id);
    setOpenConfirm(true);
  }

  function remover() {
    axios.delete("http://localhost:8080/api/cliente/" + idRemover)
      .then(() => {
        setOpenConfirm(false);
        carregarLista();
      })
      .catch(() => {
        console.log("Erro ao remover cliente.");
      });
  }

  function visualizar(id) {
    axios.get("http://localhost:8080/api/cliente/" + id)
      .then((response) => {
        setClienteSelecionado(response.data);
        setOpenModal(true);
      })
      .catch(() => {
        console.log("Erro ao visualizar cliente.");
      });
  }

  return (
    <div>
      <MenuSistema tela={"cliente"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>Cliente</h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-cliente"
            />

            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                  <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((cliente) => (
                  <Table.Row key={cliente.id}>
                    <Table.Cell>{cliente.nome}</Table.Cell>
                    <Table.Cell>{cliente.cpf}</Table.Cell>
                    <Table.Cell>{formatarData(cliente.dataNascimento)}</Table.Cell>
                    <Table.Cell>{cliente.foneCelular}</Table.Cell>
                    <Table.Cell>{cliente.foneFixo}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="blue"
                        title="Visualizar registro completo"
                        icon
                        onClick={() => visualizar(cliente.id)}
                      >
                        <Icon name="eye" />
                      </Button>
                      &nbsp;

                      <Link to="/form-cliente" state={{ id: cliente.id }}>
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados deste cliente"
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
                        title="Clique aqui para remover este cliente"
                        icon
                        onClick={() => confirmarRemover(cliente.id)}
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
        <Modal.Header>Detalhes do Cliente</Modal.Header>
        <Modal.Content>
          <p><strong>Nome:</strong> {clienteSelecionado.nome}</p>
          <p><strong>CPF:</strong> {clienteSelecionado.cpf}</p>
          <p><strong>Data de Nascimento:</strong> {formatarData(clienteSelecionado.dataNascimento)}</p>
          <p><strong>Fone Celular:</strong> {clienteSelecionado.foneCelular}</p>
          <p><strong>Fone Fixo:</strong> {clienteSelecionado.foneFixo}</p>
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