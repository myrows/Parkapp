package com.example.parkapp.aparcamientos;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.example.parkapp.R;
import com.example.parkapp.recylcerview.aparcamiento.AparcamientoFragment;
import com.example.parkapp.retrofit.model.Aparcamiento;

public class AparcamientoActivity extends AppCompatActivity implements AparcamientoFragment.OnListFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_aparcamiento);
    }

    @Override
    public void onListFragmentInteraction(Aparcamiento item) {

    }
}
