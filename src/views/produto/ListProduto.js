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
      .then((response) => setLista(response.data));
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
      });
  }

  function visualizar(id) {
    axios.get("http://localhost:8080/api/produto/" + id)
      .then((response) => {
        setProdutoSelecionado(response.data);
        setOpenModal(true);
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

            <br /><br /><br />

            <Table color="orange" celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Código</Table.HeaderCell>
                  <Table.HeaderCell>Título</Table.HeaderCell>
                  <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                  <Table.HeaderCell>Tempo Mín.</Table.HeaderCell>
                  <Table.HeaderCell>Tempo Máx.</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((produto) => (
                  <Table.Row key={produto.id}>
                    <Table.Cell>{produto.codigo}</Table.Cell>
                    <Table.Cell>{produto.titulo}</Table.Cell>
                    <Table.Cell>{produto.valorUnitario}</Table.Cell>
                    <Table.Cell>{produto.tempoEntregaMinimo}</Table.Cell>
                    <Table.Cell>{produto.tempoEntregaMaximo}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button inverted circular color="blue" icon onClick={() => visualizar(produto.id)}>
                        <Icon name="eye" />
                      </Button>
                      &nbsp;

                      <Link to="/form-produto" state={{ id: produto.id }}>
                        <Button inverted circular color="green" icon>
                          <Icon name="edit" />
                        </Button>
                      </Link>
                      &nbsp;

                      <Button inverted circular color="red" icon onClick={() => confirmarRemover(produto.id)}>
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
          <p><strong>Código:</strong> {produtoSelecionado.codigo}</p>
          <p><strong>Título:</strong> {produtoSelecionado.titulo}</p>
          <p><strong>Descrição:</strong> {produtoSelecionado.descricao}</p>
          <p><strong>Valor Unitário:</strong> {produtoSelecionado.valorUnitario}</p>
          <p><strong>Tempo Entrega Mínimo:</strong> {produtoSelecionado.tempoEntregaMinimo}</p>
          <p><strong>Tempo Entrega Máximo:</strong> {produtoSelecionado.tempoEntregaMaximo}</p>
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