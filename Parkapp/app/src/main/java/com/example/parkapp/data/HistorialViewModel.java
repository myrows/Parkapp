package com.example.parkapp.data;





import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.model.Historial;
import com.example.parkapp.retrofit.model.Zona;

import java.util.List;

public class HistorialViewModel extends AndroidViewModel {
    String idAparcamiento;
    HistorialRepository historialRepository;
    LiveData<List<Historial>> historial;

    public HistorialViewModel(@NonNull Application application) {
        super(application);
        historialRepository = new HistorialRepository();
        historial = historialRepository.getHistorialOfAparcamiento(idAparcamiento);
    }


    public LiveData<List<Historial>> getHistorialOfAparcamiento(String idAparcamiento){
        return historialRepository.getHistorialOfAparcamiento(idAparcamiento);
    }
}

