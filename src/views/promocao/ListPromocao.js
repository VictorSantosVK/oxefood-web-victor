import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Confirm, Container, Divider, Icon, Modal, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MenuSistema from "../../MenuSistema";

export default function ListPromocao() {
  const [lista, setLista] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [promocaoSelecionada, setPromocaoSelecionada] = useState({});

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/promocao")
      .then((response) => {
        setLista(response.data);
      })
      .catch(() => {
        console.log("Erro ao carregar lista de promoções.");
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
    axios.delete("http://localhost:8080/api/promocao/" + idRemover)
      .then(() => {
        setOpenConfirm(false);
        carregarLista();
      })
      .catch(() => {
        console.log("Erro ao remover promoção.");
      });
  }

  function visualizar(id) {
    axios.get("http://localhost:8080/api/promocao/" + id)
      .then((response) => {
        setPromocaoSelecionada(response.data);
        setOpenModal(true);
      })
      .catch(() => {
        console.log("Erro ao visualizar promoção.");
      });
  }

  function ativarDesativar(id) {
    axios.put("http://localhost:8080/api/promocao/ativar-desativar/" + id)
      .then(() => {
        carregarLista();
      })
      .catch(() => {
        console.log("Erro ao ativar/desativar promoção.");
      });
  }

  return (
    <div>
      <MenuSistema tela={"promocao"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>Promocao</h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-promocao"
            />

            <br />
            <br />
            <br />

            <Table color="orange" celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Título</Table.HeaderCell>
                  <Table.HeaderCell>Data Início</Table.HeaderCell>
                  <Table.HeaderCell>Data Fim</Table.HeaderCell>
                  <Table.HeaderCell>Promo Válida</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((promocao) => (
                  <Table.Row key={promocao.id}>
                    <Table.Cell>{promocao.titulo}</Table.Cell>
                    <Table.Cell>{formatarData(promocao.dataInicio)}</Table.Cell>
                    <Table.Cell>{formatarData(promocao.dataFim)}</Table.Cell>
                    <Table.Cell>{String(promocao.promoValida)}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="blue"
                        title="Visualizar registro completo"
                        icon
                        onClick={() => visualizar(promocao.id)}
                      >
                        <Icon name="eye" />
                      </Button>
                      &nbsp;

                      <Link to="/form-promocao" state={{ id: promocao.id }}>
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Editar promoção"
                          icon
                        >
                          <Icon name="edit" />
                        </Button>
                      </Link>
                      &nbsp;

                      <Button
                        inverted
                        circular
                        color="yellow"
                        title="Ativar ou desativar promoção"
                        icon
                        onClick={() => ativarDesativar(promocao.id)}
                      >
                        <Icon name="power off" />
                      </Button>
                      &nbsp;

                      <Button
                        inverted
                        circular
                        color="red"
                        title="Remover promoção"
                        icon
                        onClick={() => confirmarRemover(promocao.id)}
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
  <Modal.Header>Detalhamento da Promoção</Modal.Header>
  <Modal.Content>
    <p><strong>Título:</strong> {promocaoSelecionada.titulo}</p>
    <p><strong>Data de Início:</strong> {formatarData(promocaoSelecionada.dataInicio)}</p>
    <p><strong>Data de Fim:</strong> {formatarData(promocaoSelecionada.dataFim)}</p>
    <p><strong>Regra:</strong> {promocaoSelecionada.regra}</p>
    <p><strong>Valor do Desconto:</strong> {promocaoSelecionada.valorDesconto}</p>
    <p><strong>Promoção Válida:</strong> {promocaoSelecionada.promoValida ? "Sim" : "Não"}</p>
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