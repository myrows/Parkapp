package com.example.parkapp.data.resena;

import android.widget.Toast;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.parkapp.common.MyApp;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Resena;
import com.example.parkapp.retrofit.service.ParkappService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ResenaRepository {
    LiveData<List<Resena>> allResenas;
    ParkappService parkappService;
    String zonaId;

    public ResenaRepository() {
        zonaId = SharedPreferencesManager.getSomeStringValue("zonaId");
        parkappService = ServiceGenerator.createServiceResena(ParkappService.class);
        allResenas = getAllResenas(zonaId);
    }

    public LiveData<List<Resena>> getAllResenas(String zonaId){
        final MutableLiveData<List<Resena>> dataResena = new MutableLiveData<>();

        Call<List<Resena>> call = parkappService.getResenaByZona(zonaId);
        call.enqueue(new Callback<List<Resena>>() {
            @Override
            public void onResponse(Call<List<Resena>> call, Response<List<Resena>> response) {
                if (response.isSuccessful()){
                    dataResena.setValue(response.body());
                }else{
                    Toast.makeText(MyApp.getContext(), "No se ha podido obtener resultados de la api", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Resena>> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });

        return dataResena;
    }
}
