import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormProduto() {
  const { state } = useLocation();

  const [idProduto, setIdProduto] = useState();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    if (state != null && state.id != null) {
      axios.get("http://localhost:8080/api/produto/" + state.id)
        .then((response) => {
          setIdProduto(response.data.id);
          setNome(response.data.nome);
          setDescricao(response.data.descricao);
          setValor(response.data.valor);
        });
    }
  }, [state]);

  function salvar() {
    let produtoRequest = {
      nome,
      descricao,
      valor
    };

    if (idProduto != null) {
      axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
        .then(() => console.log("Produto alterado com sucesso."));
    } else {
      axios.post("http://localhost:8080/api/produto", produtoRequest)
        .then(() => console.log("Produto cadastrado com sucesso."));
    }
  }

  return (
    <div>
      <MenuSistema tela={"produto"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            <span style={{ color: "darkgray" }}>
              Produto &nbsp;<Icon name="angle double right" size="small" />
            </span>
            {idProduto ? " Alteração" : " Cadastro"}
          </h2>

          <Divider />

          <Form>
            <Form.Input label="Nome" value={nome} onChange={e => setNome(e.target.value)} />
            <Form.TextArea label="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
            <Form.Input label="Valor" value={valor} onChange={e => setValor(e.target.value)} />
          </Form>

          <div style={{ marginTop: "4%" }}>
            <Link to="/list-produto">
              <Button inverted circular icon labelPosition="left" color="orange">
                <Icon name="reply" />
                Voltar
              </Button>
            </Link>

            <Button inverted circular icon labelPosition="left" color="blue" floated="right" onClick={salvar}>
              <Icon name="save" />
              Salvar
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}