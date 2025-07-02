/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import ProductosPage from "../productospage";

// Simula window.alert para evitar error
window.alert = jest.fn();

// Simula fetch con un producto de ejemplo
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            idProducto: 1,
            nombre: "Manzanas",
            categoria: "Frutas",
            cantidad: 30,
            fechaVencimiento: "2025-08-30",
            marca: "Natural",
            precioUnitario: 1500,
          },
        ]),
    })
  );
});

describe("ProductosPage", () => {
  test("debe mostrar productos y permitir insertar", async () => {
    render(<ProductosPage />);

    // ✅ Esperar a que se muestre el producto "Manzanas"
    const producto = await screen.findByText("Manzanas");
    expect(producto).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
    expect(screen.getByText("Frutas")).toBeInTheDocument();
    expect(screen.getByText("Natural")).toBeInTheDocument();
    expect(screen.getByText("Insertar")).toBeInTheDocument();
  });
});
