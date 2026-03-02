import InputMask from 'comigo-tech-react-input-mask';
import { useState } from 'react';
import { Button, Container, Divider, Form, Icon, Radio, Message } from 'semantic-ui-react';

const options = [
    { key: 'AC', text: 'Acre', value: 'AC' },
    { key: 'AL', text: 'Alagoas', value: 'AL' },
    { key: 'AP', text: 'Amapá', value: 'AP' },
    { key: 'AM', text: 'Amazonas', value: 'AM' },
    { key: 'BA', text: 'Bahia', value: 'BA' },
    { key: 'CE', text: 'Ceará', value: 'CE' },
    { key: 'DF', text: 'Distrito Federal', value: 'DF' },
    { key: 'ES', text: 'Espírito Santo', value: 'ES' },
    { key: 'GO', text: 'Goiás', value: 'GO' },
    { key: 'MA', text: 'Maranhão', value: 'MA' },
    { key: 'MT', text: 'Mato Grosso', value: 'MT' },
    { key: 'MS', text: 'Mato Grosso do Sul', value: 'MS' },
    { key: 'MG', text: 'Minas Gerais', value: 'MG' },
    { key: 'PA', text: 'Pará', value: 'PA' },
    { key: 'PB', text: 'Paraíba', value: 'PB' },
    { key: 'PR', text: 'Paraná', value: 'PR' },
    { key: 'PE', text: 'Pernambuco', value: 'PE' },
    { key: 'PI', text: 'Piauí', value: 'PI' },
    { key: 'RJ', text: 'Rio de Janeiro', value: 'RJ' },
    { key: 'RN', text: 'Rio Grande do Norte', value: 'RN' },
    { key: 'RS', text: 'Rio Grande do Sul', value: 'RS' },
    { key: 'RO', text: 'Rondônia', value: 'RO' },
    { key: 'RR', text: 'Roraima', value: 'RR' },
    { key: 'SC', text: 'Santa Catarina', value: 'SC' },
    { key: 'SP', text: 'São Paulo', value: 'SP' },
    { key: 'SE', text: 'Sergipe', value: 'SE' },
    { key: 'TO', text: 'Tocantins', value: 'TO' },
];

export default function FormEntregador() {

    const [form, setForm] = useState({
        nome: '',
        cpf: '',
        rg: '',
        dataNascimento: '',
        celular: '',
        fixo: '',
        qtdEntregas: '',
        valorFrete: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        cep: '',
        uf: '',
        complemento: '',
        ativo: true
    });

    const [mensagem, setMensagem] = useState('');

    function handleChange(e, { name, value }) {
        setForm({ ...form, [name]: value });
    }

    function salvar() {
        console.log("Entregador cadastrado (simulação):", form);
        setMensagem("Entregador cadastrado com sucesso (simulação).");

        setForm({
            nome: '',
            cpf: '',
            rg: '',
            dataNascimento: '',
            celular: '',
            fixo: '',
            qtdEntregas: '',
            valorFrete: '',
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            cep: '',
            uf: '',
            complemento: '',
            ativo: true
        });
    }

    return (
        <div style={{ marginTop: '3%' }}>
            <Container textAlign='justified'>

                <h2>
                    <span style={{ color: 'darkgray' }}>
                        Entregador &nbsp;
                        <Icon name='angle double right' size="small" />
                    </span>
                    Cadastro
                </h2>

                <Divider />

                <div style={{ marginTop: '4%' }}>

                    <Form>

                        <Form.Group>
                            <Form.Input
                                label='Nome'
                                name='nome'
                                width={9}
                                value={form.nome}
                                onChange={handleChange}
                            />

                            <Form.Input label='CPF' width={5}>
                                <InputMask
                                    mask="999.999.999-99"
                                    value={form.cpf}
                                    onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                                />
                            </Form.Input>

                            <Form.Input
                                label='RG'
                                name='rg'
                                width={4}
                                value={form.rg}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Input label='DT Nascimento' width={4}>
                                <InputMask
                                    mask="99/99/9999"
                                    value={form.dataNascimento}
                                    onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
                                />
                            </Form.Input>

                            <Form.Input label='Fone Celular' width={5}>
                                <InputMask
                                    mask="(99) 99999-9999"
                                    value={form.celular}
                                    onChange={(e) => setForm({ ...form, celular: e.target.value })}
                                />
                            </Form.Input>

                            <Form.Input label='Fone Fixo' width={5}>
                                <InputMask
                                    mask="(99) 9999-9999"
                                    value={form.fixo}
                                    onChange={(e) => setForm({ ...form, fixo: e.target.value })}
                                />
                            </Form.Input>

                            <Form.Input
                                label='QTD Entregas'
                                name='qtdEntregas'
                                width={4}
                                value={form.qtdEntregas}
                                onChange={handleChange}
                            />

                            <Form.Input
                                label='Valor por Frete'
                                name='valorFrete'
                                width={4}
                                value={form.valorFrete}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Input label='Rua' name='rua' width={16} value={form.rua} onChange={handleChange} />
                            <Form.Input label='Número' name='numero' width={4} value={form.numero} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Input label='Bairro' name='bairro' width={9} value={form.bairro} onChange={handleChange} />
                            <Form.Input label='Cidade' name='cidade' width={9} value={form.cidade} onChange={handleChange} />

                            <Form.Input label='CEP' width={3}>
                                <InputMask
                                    mask="99999-999"
                                    value={form.cep}
                                    onChange={(e) => setForm({ ...form, cep: e.target.value })}
                                />
                            </Form.Input>
                        </Form.Group>

                        <Form.Select
                            label='UF'
                            options={options}
                            name='uf'
                            value={form.uf}
                            onChange={handleChange}
                            fluid
                            selection
                        />

                        <Form.Input
                            label='Complemento'
                            name='complemento'
                            value={form.complemento}
                            onChange={handleChange}
                        />

                        <Form.Field>
                            <label>Ativo:</label>
                            <Form.Group inline>
                                <Radio
                                    label='Sim'
                                    checked={form.ativo === true}
                                    onChange={() => setForm({ ...form, ativo: true })}
                                />
                                <Radio
                                    label='Não'
                                    checked={form.ativo === false}
                                    onChange={() => setForm({ ...form, ativo: false })}
                                />
                            </Form.Group>
                        </Form.Field>

                        {mensagem && (
                            <Message positive content={mensagem} />
                        )}

                    </Form>

                    <div style={{ marginTop: '4%' }}>
                        <Button inverted circular icon labelPosition='left' color='orange'>
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
    );
}