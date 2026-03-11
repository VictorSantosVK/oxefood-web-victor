import { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormEntregador() {
  const { state } = useLocation();

  const [idEntregador, setIdEntregador] = useState();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [foneCelular, setFoneCelular] = useState("");
  const [placaVeiculo, setPlacaVeiculo] = useState("");

  useEffect(() => {
    if (state != null && state.id != null) {
      axios.get("http://localhost:8080/api/entregador/" + state.id)
        .then((response) => {
          setIdEntregador(response.data.id);
          setNome(response.data.nome);
          setCpf(response.data.cpf);
          setRg(response.data.rg);
          setFoneCelular(response.data.foneCelular);
          setPlacaVeiculo(response.data.placaVeiculo);
        });
    }
  }, [state]);

  function salvar() {
    let entregadorRequest = {
      nome,
      cpf,
      rg,
      foneCelular,
      placaVeiculo
    };

    if (idEntregador != null) {
      axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
        .then(() => console.log("Entregador alterado com sucesso."));
    } else {
      axios.post("http://localhost:8080/api/entregador", entregadorRequest)
        .then(() => console.log("Entregador cadastrado com sucesso."));
    }
  }

  return (
    <div>
      <MenuSistema tela={"entregador"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            <span style={{ color: "darkgray" }}>
              Entregador &nbsp;<Icon name="angle double right" size="small" />
            </span>
            {idEntregador ? " Alteração" : " Cadastro"}
          </h2>

          <Divider />

          <Form>
            <Form.Input label="Nome" value={nome} onChange={e => setNome(e.target.value)} />

            <Form.Input label="CPF">
              <InputMask mask="999.999.999-99" value={cpf} onChange={e => setCpf(e.target.value)} />
            </Form.Input>

            <Form.Input label="RG" value={rg} onChange={e => setRg(e.target.value)} />

            <Form.Input label="Fone Celular">
              <InputMask mask="(99) 99999-9999" value={foneCelular} onChange={e => setFoneCelular(e.target.value)} />
            </Form.Input>

            <Form.Input label="Placa Veículo" value={placaVeiculo} onChange={e => setPlacaVeiculo(e.target.value)} />
          </Form>

          <div style={{ marginTop: "4%" }}>
            <Link to="/list-entregador">
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