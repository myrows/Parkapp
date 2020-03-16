package com.example.parkapp.data.resena;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.retrofit.model.Resena;

import java.util.List;

public class ResenaViewModel extends AndroidViewModel {
    ResenaRepository resenaRepository;
    LiveData<List<Resena>> resenas;
    String zonaId;

    public ResenaViewModel(@NonNull Application application) {
        super(application);
        zonaId = SharedPreferencesManager.getSomeStringValue("zonaId");
        resenaRepository = new ResenaRepository();
        resenas = resenaRepository.getAllResenas(zonaId);
    }

    public LiveData<List<Resena>> getResenas(){
        return resenas;
    }
}
