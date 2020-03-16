package com.example.parkapp.data.zona;

import android.widget.Toast;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.parkapp.common.MyApp;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Zona;
import com.example.parkapp.retrofit.service.ParkappService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class ZonaRepository {
    LiveData<List<Zona>> allZonas;
    ParkappService service;

    public ZonaRepository() {
        service = ServiceGenerator.createServiceZona(ParkappService.class);
        allZonas = getAllZonas();
    }

    public LiveData<List<Zona>> getAllZonas(){
        final MutableLiveData<List<Zona>> dataZona = new MutableLiveData<>();

        Call<List<Zona>> call = service.getZonas();
        call.enqueue(new Callback<List<Zona>>() {
            @Override
            public void onResponse(Call<List<Zona>> call, Response<List<Zona>> response) {
                if (response.isSuccessful()) {
                    dataZona.setValue(response.body());
                }else{
                    Toast.makeText(MyApp.getContext(), "No se ha podido obtener resultados de la api", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Zona>> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });

        return dataZona;
    }
}
