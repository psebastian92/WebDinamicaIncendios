package com.logica;

import java.sql.Date;

public class DatoClimatico {
    private Date fecha;
    private double temperaturaGeneral;
    private double temperaturaPeligrosa;
    private double humedadTierra;
    private double aire;
    private double gases;

    public DatoClimatico(Date fecha, double temperaturaGeneral, double temperaturaPeligrosa, double humedadTierra, double aire, double gases) {
        this.fecha = fecha;
        this.temperaturaGeneral = temperaturaGeneral;
        this.temperaturaPeligrosa = temperaturaPeligrosa;
        this.humedadTierra = humedadTierra;
        this.aire = aire;
        this.gases = gases;
    }

    // Getters
    public Date getFecha() {
        return fecha;
    }

    public double getTemperaturaGeneral() {
        return temperaturaGeneral;
    }

    public double getTemperaturaPeligrosa() {
        return temperaturaPeligrosa;
    }

    public double getHumedadTierra() {
        return humedadTierra;
    }

    public double getAire() {
        return aire;
    }

    public double getGases() {
        return gases;
    }
}
