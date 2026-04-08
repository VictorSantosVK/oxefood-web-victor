import { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { Link, useLocation } from "react-router-dom";
import { Button, Checkbox, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../../views/util/Util";

export default function FormEntregador() {
  const { state } = useLocation();

  const [idEntregador, setIdEntregador] = useState();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [foneCelular, setFoneCelular] = useState("");
  const [foneFixo, setFoneFixo] = useState("");
  const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState("");
  const [valorFrete, setValorFrete] = useState("");
  const [enderecoRua, setEnderecoRua] = useState("");
  const [enderecoComplemento, setEnderecoComplemento] = useState("");
  const [enderecoNumero, setEnderecoNumero] = useState("");
  const [enderecoBairro, setEnderecoBairro] = useState("");
  const [enderecoCidade, setEnderecoCidade] = useState("");
  const [enderecoCep, setEnderecoCep] = useState("");
  const [enderecoUf, setEnderecoUf] = useState("");
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    if (state != null && state.id != null) {
      axios.get("http://localhost:8080/api/entregador/" + state.id)
        .then((response) => {
          setIdEntregador(response.data.id);
          setNome(response.data.nome || "");
          setCpf(response.data.cpf || "");
          setRg(response.data.rg || "");
          setDataNascimento(formatarData(response.data.dataNascimento));
          setFoneCelular(response.data.foneCelular || "");
          setFoneFixo(response.data.foneFixo || "");
          setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas || "");
          setValorFrete(response.data.valorFrete || "");
          setEnderecoRua(response.data.enderecoRua || "");
          setEnderecoComplemento(response.data.enderecoComplemento || "");
          setEnderecoNumero(response.data.enderecoNumero || "");
          setEnderecoBairro(response.data.enderecoBairro || "");
          setEnderecoCidade(response.data.enderecoCidade || "");
          setEnderecoCep(response.data.enderecoCep || "");
          setEnderecoUf(response.data.enderecoUf || "");
          setAtivo(response.data.ativo || false);

          console.log("Entregador carregado com sucesso.");
          notifySuccess("Entregador carregado com sucesso.");
        })
        .catch(() => {
          console.log("Erro ao carregar entregador.");
          notifyError("Erro ao carregar entregador.");
        });
    }
  }, [state]);

  function formatarData(dataParam) {
    if (!dataParam) return "";
    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }

  function salvar() {
    const entregadorRequest = {
      nome,
      cpf,
      rg,
      dataNascimento,
      foneCelular,
      foneFixo,
      qtdEntregasRealizadas: qtdEntregasRealizadas === "" ? null : Number(qtdEntregasRealizadas),
      valorFrete: valorFrete === "" ? null : Number(valorFrete),
      enderecoRua,
      enderecoComplemento,
      enderecoNumero,
      enderecoBairro,
      enderecoCidade,
      enderecoCep,
      enderecoUf,
      ativo
    };

    if (idEntregador != null) {
      axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
        .then(() => {
          console.log("Entregador alterado com sucesso.");
          notifySuccess("Entregador alterado com sucesso.");
        })
        .catch(() => {
          console.log("Erro ao alterar entregador.");
          notifyError("Erro ao alterar entregador.");
        });
    } else {
      axios.post("http://localhost:8080/api/entregador", entregadorRequest)
        .then(() => {
          console.log("Entregador cadastrado com sucesso.");
          notifySuccess("Entregador cadastrado com sucesso.");
        })
        .catch(() => {
          console.log("Erro ao cadastrar entregador.");
          notifyError("Erro ao cadastrar entregador.");
        });
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
            <Form.Group widths="equal">
              <Form.Input label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />

              <Form.Input label="CPF">
                <InputMask mask="999.999.999-99" value={cpf} onChange={(e) => setCpf(e.target.value)} />
              </Form.Input>

              <Form.Input label="RG" value={rg} onChange={(e) => setRg(e.target.value)} />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input label="Data Nascimento">
                <InputMask mask="99/99/9999" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
              </Form.Input>

              <Form.Input label="Fone Celular">
                <InputMask mask="(99) 99999-9999" value={foneCelular} onChange={(e) => setFoneCelular(e.target.value)} />
              </Form.Input>

              <Form.Input label="Fone Fixo">
                <InputMask mask="(99) 9999-9999" value={foneFixo} onChange={(e) => setFoneFixo(e.target.value)} />
              </Form.Input>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input label="Qtd. Entregas Realizadas" value={qtdEntregasRealizadas} onChange={(e) => setQtdEntregasRealizadas(e.target.value)} />
              <Form.Input label="Valor Frete" value={valorFrete} onChange={(e) => setValorFrete(e.target.value)} />
              <Form.Field>
                <label>Ativo</label>
                <Checkbox checked={ativo} onChange={(e, data) => setAtivo(data.checked)} />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input label="Rua" value={enderecoRua} onChange={(e) => setEnderecoRua(e.target.value)} />
              <Form.Input label="Complemento" value={enderecoComplemento} onChange={(e) => setEnderecoComplemento(e.target.value)} />
              <Form.Input label="Número" value={enderecoNumero} onChange={(e) => setEnderecoNumero(e.target.value)} />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input label="Bairro" value={enderecoBairro} onChange={(e) => setEnderecoBairro(e.target.value)} />
              <Form.Input label="Cidade" value={enderecoCidade} onChange={(e) => setEnderecoCidade(e.target.value)} />

              <Form.Input label="CEP">
                <InputMask mask="99999-999" value={enderecoCep} onChange={(e) => setEnderecoCep(e.target.value)} />
              </Form.Input>

              <Form.Input label="UF" value={enderecoUf} onChange={(e) => setEnderecoUf(e.target.value)} />
            </Form.Group>
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