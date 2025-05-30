package com.logica;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/LeerDatos")
public class LeerDatos extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        List<DatoClimatico> datos = new ArrayList<>();

        try (Connection conexion = ConexionBD.obtenerConexion();
        	     Statement statement = conexion.createStatement();
        	     ResultSet rs = statement.executeQuery(
        	             "SELECT id, Fecha, Temperatura_general, Temperatura_peligrosa, Humedad_tierra, aire, gases FROM datos")) {

        	     System.out.println("Conexión exitosa a la base de datos.");

            boolean tieneDatos = false;  // Para verificar si se están recuperando datos

            // Iteramos sobre los resultados
            while (rs.next()) {
                tieneDatos = true;

                Date fecha = rs.getDate("Fecha");
                double temperaturaGeneral = rs.getDouble("Temperatura_general");
                double temperaturaPeligrosa = rs.getDouble("Temperatura_peligrosa");
                double humedadTierra = rs.getDouble("Humedad_tierra");
                double aire = rs.getDouble("aire");
                double gases = rs.getDouble("gases");

                // Verificar si los datos se están extrayendo correctamente
                System.out.println("Fecha: " + fecha + ", Temperatura general: " + temperaturaGeneral +
                                   ", Temperatura peligrosa: " + temperaturaPeligrosa +
                                   ", Humedad tierra: " + humedadTierra +
                                   ", Aire: " + aire + ", Gases: " + gases);

                DatoClimatico dato = new DatoClimatico(fecha, temperaturaGeneral, temperaturaPeligrosa,
                        humedadTierra, aire, gases);
                datos.add(dato);
            }

            if (!tieneDatos) {
                System.out.println("No se encontraron datos en la base de datos.");
            }
            
            // Agregar los datos al request
            request.setAttribute("datos", datos);
            
            // Despachar al JSP
            request.getRequestDispatcher("vistas/PaginaClima.jsp").forward(request, response);

        } catch (SQLException e) {
            e.printStackTrace();  // Esto mostrará el error completo en la consola
            request.setAttribute("errorMessage", "Error de base de datos: " + e.getMessage());
            request.getRequestDispatcher("vistas/ErrorPage.jsp").forward(request, response);
        }
    }
}
