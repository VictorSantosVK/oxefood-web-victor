import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./views/home/Home";

import ListCliente from "./views/cliente/ListCliente";
import FormCliente from "./views/cliente/FormCliente";

import ListProduto from "./views/produto/ListProduto";
import FormProduto from "./views/produto/FormProduto";

import ListEntregador from "./views/entregador/ListEntregador";
import FormEntregador from "./views/entregador/FormEntregador";

import ListPromocao from "./views/promocao/ListPromocao";
import FormPromocao from "./views/promocao/FormPromocao";

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<ListCliente />} />

      <Route path="/list-cliente" element={<ListCliente />} />
      <Route path="/form-cliente" element={<FormCliente />} />

      <Route path="/list-produto" element={<ListProduto />} />
      <Route path="/form-produto" element={<FormProduto />} />

      <Route path="/list-entregador" element={<ListEntregador />} />
      <Route path="/form-entregador" element={<FormEntregador />} />

      <Route path="/list-promocao" element={<ListPromocao />} />
      <Route path="/form-promocao" element={<FormPromocao />} />
    </Routes>
  );
}

export default Rotas;