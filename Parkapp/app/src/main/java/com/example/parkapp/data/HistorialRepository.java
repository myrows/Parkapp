package com.example.parkapp.data;




import android.widget.Toast;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.parkapp.common.MyApp;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.model.Historial;
import com.example.parkapp.retrofit.model.Zona;
import com.example.parkapp.retrofit.service.ParkappService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class HistorialRepository {

    String idAparcamiento;
    LiveData<List<Historial>> allHistoriales;
    ParkappService service;

    public HistorialRepository() {
        service = ServiceGenerator.createServiceZona(ParkappService.class);
        allHistoriales = getHistorialOfAparcamiento(idAparcamiento);
    }

    public LiveData<List<Historial>> getHistorialOfAparcamiento(String idAparcamiento){
        final MutableLiveData<List<Historial>> data = new MutableLiveData<>();

        Call<List<Historial>> call = service.getHistorialOfAparcamiento(idAparcamiento);
        call.enqueue(new Callback<List<Historial>>() {
            @Override
            public void onResponse(Call<List<Historial>>call, Response<List<Historial>> response) {
                if(response.isSuccessful()){
                    data.setValue(response.body());
                }
                else {
                    Toast.makeText(MyApp.getContext(), "No se ha podido obtener resultados de la api", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<List<Historial>> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
        return data;
    }
}


