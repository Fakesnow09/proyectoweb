 import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import RutaPage from "../rutapage";

// Mock de fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]), // simulamos que no hay rutas
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test("debe renderizar título y formulario", async () => {
  render(<RutaPage />);

  // Espera a que cargue el título
  await waitFor(() => {
    expect(screen.getByText("RUTAS")).toBeInTheDocument();
  });

  // Verifica campos del formulario
  expect(screen.getByPlaceholderText("Origen")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Destino")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Tiempo estimado")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Vehículo")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Estado")).toBeInTheDocument();
  expect(screen.getByText("Insertar")).toBeInTheDocument();
});
