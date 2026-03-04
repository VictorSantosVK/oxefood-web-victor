import InputMask from 'comigo-tech-react-input-mask';
import { useState } from 'react';
import { Button, Container, Divider, Form, FormField, Icon, TextArea, Message } from 'semantic-ui-react';
import MenuSistema from "../../MenuSistema";

export default function FormProduto() {

    const [titulo, setTitulo] = useState("");
    const [codigo, setCodigo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valorUnitario, setValorUnitario] = useState("");
    const [tempoMin, setTempoMin] = useState("");
    const [tempoMax, setTempoMax] = useState("");
    const [mensagem, setMensagem] = useState("");

    function salvar() {

        const produto = {
            titulo,
            codigo,
            descricao,
            valorUnitario,
            tempoMin,
            tempoMax
        };

        console.log("Produto cadastrado (simulação):", produto);

        setMensagem("Produto cadastrado com sucesso (simulação).");

        // Limpar formulário
        setTitulo("");
        setCodigo("");
        setDescricao("");
        setValorUnitario("");
        setTempoMin("");
        setTempoMax("");
    }

    return (

          <><div>
            <MenuSistema tela={"cliente"} />

            <div style={{ marginTop: "3%" }}>
                <Container textAlign="justified">...</Container>
            </div>
        </div><div>
                <div style={{ marginTop: '3%' }}>
                    <Container textAlign='justified'>

                        <h2>
                            <span style={{ color: 'darkgray' }}>
                                Produto &nbsp;
                                <Icon name='angle double right' size="small" />
                            </span>
                            Cadastro
                        </h2>

                        <Divider />

                        <div style={{ marginTop: '4%' }}>
                            <Form>

                                <Form.Group>

                                    <Form.Input
                                        required
                                        fluid
                                        label='Título'
                                        width={12}
                                        maxLength="50"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                    >
                                        <InputMask
                                            placeholder="Informe o título do produto"
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)} />
                                    </Form.Input>

                                    <Form.Input
                                        required
                                        fluid
                                        width={6}
                                        label='Código do Produto'
                                        value={codigo}
                                        onChange={(e) => setCodigo(e.target.value)}
                                    >
                                        <InputMask
                                            placeholder="Informe o código do produto"
                                            value={codigo}
                                            onChange={(e) => setCodigo(e.target.value)} />
                                    </Form.Input>

                                </Form.Group>

                                <FormField
                                    control={TextArea}
                                    label='Descrição'
                                    placeholder='Informe a descrição do produto'
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)} />

                                <Form.Group>

                                    <Form.Input
                                        fluid
                                        required
                                        label='Valor Unitário'
                                        width={6}
                                        value={valorUnitario}
                                        onChange={(e) => setValorUnitario(e.target.value)} />

                                    <Form.Input
                                        fluid
                                        label='Tempo de Entrega Mínimo em Minutos'
                                        width={6}
                                    >
                                        <InputMask
                                            placeholder="30"
                                            value={tempoMin}
                                            onChange={(e) => setTempoMin(e.target.value)} />
                                    </Form.Input>

                                    <Form.Input
                                        fluid
                                        label='Tempo de Entrega Máximo em Minutos'
                                        width={6}
                                    >
                                        <InputMask
                                            placeholder="40"
                                            value={tempoMax}
                                            onChange={(e) => setTempoMax(e.target.value)} />
                                    </Form.Input>

                                </Form.Group>

                                {mensagem && (
                                    <Message
                                        positive
                                        content={mensagem}
                                        style={{ marginTop: '2%' }} />
                                )}

                            </Form>

                            <div style={{ marginTop: '4%' }}>

                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>

                                <Button
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='blue'
                                    floated='right'
                                    onClick={salvar}
                                >
                                    <Icon name='save' />
                                    Salvar
                                </Button>

                            </div>

                        </div>
                    </Container>
                </div>
            </div></>
    );
}