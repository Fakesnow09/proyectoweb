/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import AlmacenPage from "../almacenpage";

// Simula window.alert
window.alert = jest.fn();

// Simula fetch
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            idAlmacen: 1,
            nombre: "Almacén Central",
            telefono: "3214567890",
            direccion: "Carrera 45 #12-34",
            ciudad: "Bogotá",
          },
        ]),
    })
  );
});

describe("AlmacenPage", () => {
  test("debe mostrar almacenes y permitir insertar", async () => {
    render(<AlmacenPage />);

    // Espera a que se rendericen los datos
    expect(await screen.findByText("Almacén Central")).toBeInTheDocument();
    expect(await screen.findByText("3214567890")).toBeInTheDocument();
    expect(await screen.findByText("Carrera 45 #12-34")).toBeInTheDocument();
    expect(await screen.findByText("Bogotá")).toBeInTheDocument();
    expect(screen.getByText("Insertar")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
  });
});
