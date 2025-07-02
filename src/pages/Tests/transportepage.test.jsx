import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import TransportePage from "../transportepage";

// Simula fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test("debe renderizar título y formulario de transporte", async () => {
  render(<TransportePage />);

  await waitFor(() => {
    expect(screen.getByText("TRANSPORTE")).toBeInTheDocument();
  });

  expect(screen.getByPlaceholderText("Vehículo")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Id Ruta")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Estado")).toBeInTheDocument();
  expect(screen.getByText("Insertar")).toBeInTheDocument();

  // Opcional: verificar cantidad de inputs si lo deseas
  // expect(screen.getAllByDisplayValue("")).toHaveLength(6);
});
