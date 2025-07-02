/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import EntregasPage from "../entregaspage";

// Simula window.alert para evitar errores en el test
window.alert = jest.fn();

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            idEntrega: 1,
            idPedido: 1001,
            idTransporte: 501,
            fechaSalida: "2024-06-01",
            fechaLlegada: "2024-06-03",
            estado: "Entregado",
          },
        ]),
    })
  );
});

describe("EntregasPage", () => {
  test("debe mostrar entregas y permitir insertar", async () => {
    render(<EntregasPage />);

    await waitFor(() => {
      expect(screen.getByText("Entregado")).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
    expect(screen.getByText("Insertar")).toBeInTheDocument();
    expect(screen.getByText("Entregado")).toBeInTheDocument();
    expect(screen.getByText("2024-06-01")).toBeInTheDocument();
    expect(screen.getByText("2024-06-03")).toBeInTheDocument();
  });
});
