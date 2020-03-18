package com.example.parkapp.data;


import android.widget.Toast;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.parkapp.common.MyApp;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.model.Zona;
import com.example.parkapp.retrofit.service.ParkappService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class AparcamientoRepository {

    LiveData<List<Aparcamiento>> allAparcamientos;
    ParkappService service;
    String zonaId;

    public AparcamientoRepository() {
        service = ServiceGenerator.createServiceZona(ParkappService.class);
        zonaId = SharedPreferencesManager.getSomeStringValue("zonaId");
        allAparcamientos = getAparcamientosOfZona(zonaId);
    }

    public LiveData<List<Aparcamiento>> getAparcamientos(){
        final MutableLiveData<List<Aparcamiento>> data = new MutableLiveData<>();

        Call<List<Aparcamiento>> call = service.getAparcamientos();
        call.enqueue(new Callback<List<Aparcamiento>>() {
            @Override
            public void onResponse(Call<List<Aparcamiento>> call, Response<List<Aparcamiento>> response) {
                if (response.isSuccessful()) {
                    data.setValue(response.body());
                }else{
                    Toast.makeText(MyApp.getContext(), "No se ha podido obtener resultados de la api", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Aparcamiento>> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });

        return data;
    }

    public LiveData<List<Aparcamiento>> getAparcamientosOfZona(String zonaId){
        final MutableLiveData<List<Aparcamiento>> data = new MutableLiveData<>();

        Call<List<Aparcamiento>> call = service.getAparcanientoOfZona(zonaId);
        call.enqueue(new Callback<List<Aparcamiento>>() {
            @Override
            public void onResponse(Call<List<Aparcamiento>> call, Response<List<Aparcamiento>> response) {
                if (response.isSuccessful()) {
                    data.setValue(response.body());
                }else{
                    Toast.makeText(MyApp.getContext(), "No se ha podido obtener resultados de la api", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Aparcamiento>> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });

        return data;
    }

    public LiveData<Aparcamiento> getDetalleAparcamiento(String id){
        final MutableLiveData<Aparcamiento> data = new MutableLiveData<>();

        Call<Aparcamiento> call = service.getAparcamiento(id);
        call.enqueue(new Callback<Aparcamiento>() {
            @Override
            public void onResponse(Call<Aparcamiento> call, Response<Aparcamiento> response) {
                if(response.isSuccessful()){
                    data.setValue(response.body());
                }
                else {
                    Toast.makeText(MyApp.getContext(), "No se ha podido obtener resultados de la api", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Aparcamiento> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
        return data;
    }

}

