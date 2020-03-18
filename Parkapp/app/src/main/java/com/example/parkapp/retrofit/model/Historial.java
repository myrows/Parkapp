package com.example.parkapp.retrofit.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Historial {
    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("fechaEntrada")
    @Expose
    private LocalDateTime fechaEntrada;
    @SerializedName("fechaSalida")
    @Expose
    private LocalDateTime fechaSalida;
    @SerializedName("dia")
    @Expose
    private LocalDate dia;
    @SerializedName("aparcamientoId")
    @Expose
    private String aparcamientoId;

    public Historial(LocalDateTime fechaEntrada, LocalDate dia, String aparcamientoId) {
        this.fechaEntrada = fechaEntrada;
        this.dia = dia;
        this.aparcamientoId = aparcamientoId;
    }

    public Historial(LocalDateTime fechaEntrada, LocalDateTime fechaSalida, LocalDate dia, String aparcamientoId) {
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        this.dia = dia;
        this.aparcamientoId = aparcamientoId;
    }

    public Historial(String id, LocalDateTime fechaEntrada, LocalDateTime fechaSalida, LocalDate dia, String aparcamientoId) {
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        this.dia = dia;
        this.aparcamientoId = aparcamientoId;
        this.id = id;
    }

    public LocalDateTime getFechaEntrada() {
        return fechaEntrada;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
