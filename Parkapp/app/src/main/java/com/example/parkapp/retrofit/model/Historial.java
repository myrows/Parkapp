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
    private String fechaEntrada;
    @SerializedName("fechaSalida")
    @Expose
    private String fechaSalida;
    @SerializedName("dia")
    @Expose
    private String dia;
    @SerializedName("__v")
    @Expose
    private Integer v;
    @SerializedName("aparcamientoId")
    @Expose
    private String aparcamientoId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFechaEntrada() {
        return fechaEntrada;
    }

    public void setFechaEntrada(String fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public String getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(String fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public Integer getV() {
        return v;
    }

    public void setV(Integer v) {
        this.v = v;
    }

    public String getAparcamientoId() {
        return aparcamientoId;
    }

    public void setAparcamientoId(String aparcamientoId) {
        this.aparcamientoId = aparcamientoId;
    }
}
