package com.example.parkapp.historial;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.example.parkapp.R;
import com.example.parkapp.retrofit.model.Historial;

public class HistorialActivity extends AppCompatActivity implements HistorialAparcamientoFragment.OnListFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_historial);
    }

    @Override
    public void onListFragmentInteraction(Historial item) {

    }
}
