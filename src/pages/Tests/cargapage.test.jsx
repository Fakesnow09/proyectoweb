/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CargaPage from "../cargapage";


// Simula window.alert para evitar errores en test
window.alert = jest.fn();

// Mock de fetch con datos de carga
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            idCarga: 1,
            idTransporte: 101,
            descripcion: "Carga de electrodomésticos",
            peso: 800,
            estado: "En tránsito",
          },
        ]),
    })
  );
});

describe("CargaPage", () => {
  test("debe mostrar cargas y permitir insertar", async () => {
    render(<CargaPage />);

    // Espera a que los datos se carguen y aparezca una fila con el texto simulado
    await waitFor(() => {
      expect(screen.getByText("Carga de electrodomésticos")).toBeInTheDocument();
    });

    // Verificaciones adicionales
    expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
    expect(screen.getByText("En tránsito")).toBeInTheDocument();
    expect(screen.getByText("Insertar")).toBeInTheDocument();
  });
});
