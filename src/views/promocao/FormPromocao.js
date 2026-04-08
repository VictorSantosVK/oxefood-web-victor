import React, { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";

import MenuSistema from "../../MenuSistema";

export default function FormPromocao() {

    const { state } = useLocation();

    const [idPromocao, setIdPromocao] = useState(undefined);
    const [titulo, setTitulo] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [regra, setRegra] = useState("");
    const [valorDesconto, setValorDesconto] = useState("");

    useEffect(() => {
        if (state && state.id) {
            axios
                .get(`http://localhost:8080/api/promocao/${state.id}`)
                .then((response) => {
                    const data = response.data;

                    setIdPromocao(data.id);
                    setTitulo(data.titulo);
                    setDataInicio(data.dataInicio);
                    setDataFim(data.dataFim);
                    setRegra(data.regra);
                    setValorDesconto(data.valorDesconto);
                });
        }
    }, [state]);

    function salvar() {
        if (!titulo || !dataInicio || !dataFim) return;

        const promocaoRequest = {
            titulo,
            dataInicio,
            dataFim,
            regra,
            valorDesconto
        };

        const request = idPromocao
            ? axios.put(`http://localhost:8080/api/promocao/${idPromocao}`, promocaoRequest)
            : axios.post("http://localhost:8080/api/promocao", promocaoRequest);

        request.then(() => {

            
        });
    }

    const isEdicao = idPromocao !== undefined;

    return (
        <div>
            <MenuSistema tela="promocao" />

            <div style={{ marginTop: "3%" }}>
                <Container textAlign="justified">

                    <h2>
                        <span style={{ color: "darkgray" }}>
                            Promoção &nbsp;
                            <Icon name="angle double right" size="small" />
                        </span>
                        {isEdicao ? "Alteração" : "Cadastro"}
                    </h2>

                    <Divider />

                    <div style={{ marginTop: "4%" }}>
                        <Form>

                            <Form.Input
                                required
                                fluid
                                label="Título"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />

                            <Form.Group widths="equal">
                                <Form.Input required fluid label="A partir de">
                                    <InputMask
                                        mask="99/99/9999"
                                        value={dataInicio}
                                        onChange={(e) => setDataInicio(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input required fluid label="Terminando em">
                                    <InputMask
                                        mask="99/99/9999"
                                        value={dataFim}
                                        onChange={(e) => setDataFim(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.TextArea
                                fluid
                                label="Regra"
                                value={regra}
                                onChange={(e) => setRegra(e.target.value)}
                            />

                            <Form.Input
                                fluid
                                label="Valor Desconto"
                                type="number"
                                value={valorDesconto}
                                onChange={(e) => setValorDesconto(e.target.value)}
                            />

                        </Form>

                        <div style={{ marginTop: "4%" }}>
                            <Link to="/list-promocao">
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition="left"
                                    color="orange"
                                >
                                    <Icon name="reply" />
                                    Voltar
                                </Button>
                            </Link>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition="left"
                                color="blue"
                                floated="right"
                                onClick={salvar}
                            >
                                <Icon name="save" />
                                Salvar
                            </Button>
                        </div>

                    </div>
                </Container>
            </div>
        </div>
    );
}