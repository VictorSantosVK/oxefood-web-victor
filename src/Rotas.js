import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./views/home/Home";

import ListCliente from "./views/cliente/ListCliente";
import FormCliente from "./views/cliente/FormCliente";

import ListProduto from "./views/produto/ListProduto";
import FormProduto from "./views/produto/FormProduto";

import ListEntregador from "./views/entregador/ListEntregador";
import FormEntregador from "./views/entregador/FormEntregador";

function Rotas() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/list-cliente" element={<ListCliente />} />
      <Route path="/form-cliente" element={<FormCliente />} />

      <Route path="/list-produto" element={<ListProduto />} />
      <Route path="/form-produto" element={<FormProduto />} />

      <Route path="/list-entregador" element={<ListEntregador />} />
      <Route path="/form-entregador" element={<FormEntregador />} />

    </Routes>
  );
}

export default Rotas;