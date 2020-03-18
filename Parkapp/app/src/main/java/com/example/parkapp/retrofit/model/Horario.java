package com.example.parkapp.retrofit.model;

public class Horario {

    private int hora;
    private int countHour;

    public Horario(int hora, int countHour) {
        this.hora = hora;
        this.countHour = countHour;
    }

    public int getHora() {
        return hora;
    }

    public void setHora(int hora) {
        this.hora = hora;
    }

    public int getCountHour() {
        return countHour;
    }

    public void setCountHour(int countHour) {
        this.countHour = countHour;
    }
}
