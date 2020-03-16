package com.example.parkapp.retrofit.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Historial {
    private LocalDateTime fechaEntrada;
    private LocalDateTime fechaSalida;
    private LocalDate dia;
    private String aparcamientoId;

    public Historial(LocalDateTime fechaEntrada, LocalDate dia, String aparcamientoId) {
        this.fechaEntrada = fechaEntrada;
        this.dia = dia;
        this.aparcamientoId = aparcamientoId;
    }

    public Historial(LocalDateTime fechaEntrada, LocalDateTime fechaSalida, LocalDate dia,String aparcamientoId) {
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        this.dia = dia;
        this.aparcamientoId = aparcamientoId;
    }

    public LocalDateTime getFechaEntrada() {
        return fechaEntrada;
    }

    public void setFechaEntrada(LocalDateTime fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public LocalDateTime getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(LocalDateTime fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public LocalDate getDia() {
        return dia;
    }

    public void setDia(LocalDate dia) {
        this.dia = dia;
    }

    public String getAparcamientoId() {
        return aparcamientoId;
    }

    public void setAparcamientoId(String aparcamientoId) {
        this.aparcamientoId = aparcamientoId;
    }
}
