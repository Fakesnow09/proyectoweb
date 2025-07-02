 import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PedidosPage from "../pedidospage";

// Simulación de fetch con jest-fetch-mock
beforeEach(() => {
  fetch.resetMocks();
});

test("debe renderizar título y formulario", async () => {
  // Simula una respuesta vacía del backend
  fetch.mockResponseOnce(JSON.stringify([]));

  render(<PedidosPage />);

  // Espera a que los elementos aparezcan después del fetch y setState
  await waitFor(() => {
    expect(screen.getByText("PEDIDOS")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Id_Cliente")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Id_Producto")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Cantidad")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Estado")).toBeInTheDocument();
    expect(screen.getByText("Insertar")).toBeInTheDocument();
  });
});
