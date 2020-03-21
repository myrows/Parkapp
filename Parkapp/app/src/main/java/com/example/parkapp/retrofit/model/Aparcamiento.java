package com.example.parkapp.retrofit.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Aparcamiento {
    @SerializedName("puntuacion")
    @Expose
    private Integer puntuacion;
    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("dimension")
    @Expose
    private String dimension;
    @SerializedName("longitud")
    @Expose
    private Double longitud;
    @SerializedName("latitud")
    @Expose
    private Double latitud;
    @SerializedName("avatar")
    @Expose
    private String avatar;
    @SerializedName("nombre")
    @Expose
    private String nombre;
    @SerializedName("userId")
    @Expose
    private String userId;
    @SerializedName("zonaId")
    @Expose
    private String zonaId;
    @SerializedName("__v")
    @Expose
    private Integer v;


    public Aparcamiento(String id, String nombre, String dimension, Double longitud, Double latitud, String avatar, String userId, String zonaId) {
        this.id = id;
        this.nombre = nombre;
        this.dimension = dimension;
        this.longitud = longitud;
        this.latitud = latitud;
        this.avatar = avatar;
        this.userId = userId;
        this.zonaId = zonaId;
    }

    public Aparcamiento(String nombre, String dimension, Double longitud, Double latitud, String userId) {
        this.nombre = nombre;
        this.dimension = dimension;
        this.longitud = longitud;
        this.latitud = latitud;
        this.userId = userId;
    }

    public Aparcamiento(Integer puntuacion, String dimension, Double longitud, Double latitud, String avatar, String nombre, String userId, String zonaId) {
        this.puntuacion = puntuacion;
        this.dimension = dimension;
        this.longitud = longitud;
        this.latitud = latitud;
        this.avatar = avatar;
        this.nombre = nombre;
        this.userId = userId;
        this.zonaId = zonaId;
    }

    public Aparcamiento(Integer puntuacion, String dimension, Double longitud, Double latitud, String nombre, String userId) {
        this.puntuacion = puntuacion;
        this.dimension = dimension;
        this.longitud = longitud;
        this.latitud = latitud;
        this.nombre = nombre;
        this.userId = userId;
    }

    public Integer getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(Integer puntuacion) {
        this.puntuacion = puntuacion;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDimension() {
        return dimension;
    }

    public void setDimension(String dimension) {
        this.dimension = dimension;
    }

    public Double getLongitud() {
        return longitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public Double getLatitud() {
        return latitud;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getZonaId() {
        return zonaId;
    }

    public void setZonaId(String zonaId) {
        this.zonaId = zonaId;
    }

    public Integer getV() {
        return v;
    }

    public void setV(Integer v) {
        this.v = v;
    }
}
