package com.example.parkapp.data.zona;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.example.parkapp.retrofit.model.Zona;

import java.util.List;

public class ZonaViewModel extends AndroidViewModel {
    ZonaRepository zonaRepository;
    LiveData<List<Zona>> zonas;

    public ZonaViewModel(@NonNull Application application) {
        super(application);
        zonaRepository = new ZonaRepository();
        zonas = zonaRepository.getAllZonas();
    }

    public LiveData<List<Zona>> getZonas(){
        return zonas;
    }
}
