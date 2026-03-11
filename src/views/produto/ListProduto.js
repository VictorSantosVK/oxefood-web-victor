import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Confirm, Container, Divider, Icon, Modal, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MenuSistema from "../../MenuSistema";

export default function ListProduto() {
  const [lista, setLista] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState({});

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/produto")
      .then((response) => {
        setLista(response.data);
      })
      .catch(() => {
        console.log("Erro ao carregar lista de produtos.");
      });
  }

  function confirmarRemover(id) {
    setIdRemover(id);
    setOpenConfirm(true);
  }

  function remover() {
    axios.delete("http://localhost:8080/api/produto/" + idRemover)
      .then(() => {
        setOpenConfirm(false);
        carregarLista();
      })
      .catch(() => {
        console.log("Erro ao remover produto.");
      });
  }

  function visualizar(id) {
    axios.get("http://localhost:8080/api/produto/" + id)
      .then((response) => {
        setProdutoSelecionado(response.data);
        setOpenModal(true);
      })
      .catch(() => {
        console.log("Erro ao visualizar produto.");
      });
  }

  return (
    <div>
      <MenuSistema tela={"produto"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>Produto</h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-produto"
            />

            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>Descrição</Table.HeaderCell>
                  <Table.HeaderCell>Valor</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((produto) => (
                  <Table.Row key={produto.id}>
                    <Table.Cell>{produto.nome}</Table.Cell>
                    <Table.Cell>{produto.descricao}</Table.Cell>
                    <Table.Cell>{produto.valor}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="blue"
                        title="Visualizar registro completo"
                        icon
                        onClick={() => visualizar(produto.id)}
                      >
                        <Icon name="eye" />
                      </Button>
                      &nbsp;

                      <Link to="/form-produto" state={{ id: produto.id }}>
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados deste produto"
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
                        title="Clique aqui para remover este produto"
                        icon
                        onClick={() => confirmarRemover(produto.id)}
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
        <Modal.Header>Detalhes do Produto</Modal.Header>
        <Modal.Content>
          <p><strong>ID:</strong> {produtoSelecionado.id}</p>
          <p><strong>Nome:</strong> {produtoSelecionado.nome}</p>
          <p><strong>Descrição:</strong> {produtoSelecionado.descricao}</p>
          <p><strong>Valor:</strong> {produtoSelecionado.valor}</p>
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