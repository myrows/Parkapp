package com.example.parkapp.data;



import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.model.Zona;

import java.util.List;

public class AparcamientoViewModel extends AndroidViewModel {
    AparcamientoRepository aparcamientoRepository;
    LiveData<List<Aparcamiento>> aparcamientos;
    LiveData<Aparcamiento> aparcamiento;
    String zonaId;

    public AparcamientoViewModel(@NonNull Application application) {
        super(application);
        aparcamientoRepository = new AparcamientoRepository();
        zonaId = SharedPreferencesManager.getSomeStringValue("zonaId");
        aparcamientos = aparcamientoRepository.getAparcamientosOfZona(zonaId);
    }

    public LiveData<List<Aparcamiento>> getAparcamientos(){

        return aparcamientos;
    }




    public LiveData<Aparcamiento> getAparcamiento(String id){
        aparcamiento = aparcamientoRepository.getDetalleAparcamiento(id);
        return aparcamiento;
    }

}
