 import React from "react";
 // Mock para evitar errores con alert
global.alert = jest.fn();
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ClientesPage from "../clientespage";

// Simula el fetch para listar clientes
beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (!options) {
      // Simulación de GET
      return Promise.resolve({
        json: () => Promise.resolve([
          {
            idCliente: 1,
            nombre: "Ana",
            apellido: "Torres",
            correo: "ana@example.com",
            telefono: "123456789",
            direccion: "Calle 123",
            ciudad: "Bogotá"
          }
        ])
      });
    }

    // Simulación de POST (insertar o eliminar)
    return Promise.resolve({
      json: () => Promise.resolve({ mensaje: "Operación exitosa" })
    });
  });
});

test("debe mostrar clientes y permitir insertar", async () => {
  render(<ClientesPage />);

  // Verificar que se renderiza título y botón
  expect(screen.getByText("CLIENTES")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();

  // Verificar cliente de prueba en la tabla
  await waitFor(() => {
    expect(screen.getByText("Ana")).toBeInTheDocument();
    expect(screen.getByText("Torres")).toBeInTheDocument();
  });

  // Rellenar el formulario
  fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Luis" } });
  fireEvent.change(screen.getByPlaceholderText("Apellido"), { target: { value: "Gómez" } });
  fireEvent.change(screen.getByPlaceholderText("Correo"), { target: { value: "luis@example.com" } });
  fireEvent.change(screen.getByPlaceholderText("Teléfono"), { target: { value: "987654321" } });
  fireEvent.change(screen.getByPlaceholderText("Dirección"), { target: { value: "Av 45" } });
  fireEvent.change(screen.getByPlaceholderText("Ciudad"), { target: { value: "Medellín" } });

  // Enviar el formulario
  fireEvent.click(screen.getByText("Insertar"));

  // Verificar que el alert fue llamado
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(2); // POST + nuevo GET
  });
});
