 import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import InventariosPage from "../inventariospage";

beforeEach(() => {
  // Simular datos de inventario
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            idInventario: 1,
            nombre: "Laptop",
            categoria: "Electrónica",
            cantidadStock: 10,
            fechaIngreso: "2024-06-20",
          },
          {
            idInventario: 2,
            nombre: "Impresora",
            categoria: "Oficina",
            cantidadStock: 5,
            fechaIngreso: "2024-06-18",
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("InventariosPage", () => {
  test("debe renderizar datos del inventario y el formulario", async () => {
    render(<InventariosPage />);

    // Verificar que el título y el campo de búsqueda existan
    expect(screen.getByText("INVENTARIOS")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();

    // Esperar que los datos mock aparezcan en la tabla
    await waitFor(() => {
      expect(screen.getByText("Laptop")).toBeInTheDocument();
      expect(screen.getByText("Impresora")).toBeInTheDocument();
    });

    // Verificar que los campos del formulario estén presentes
    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Categoría")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Cantidad")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Fecha ingreso")).toBeInTheDocument();

    // Botón de Insertar
    expect(screen.getByText("Insertar")).toBeInTheDocument();
  });
});
