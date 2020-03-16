package com.example.parkapp.retrofit.model;

public class Aparcamiento {
    private String id;
    private String nombre;
    private String dimension;
    private Double longitud;
    private Double latitud;
    private String avatar;
    private String userId;
    private String zonaId;


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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
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
}
