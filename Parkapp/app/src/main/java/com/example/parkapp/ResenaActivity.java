package com.example.parkapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.example.parkapp.recyclerview.resena.ResenaFragment;
import com.example.parkapp.retrofit.model.Resena;

public class ResenaActivity extends AppCompatActivity implements ResenaFragment.OnListFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resena);
    }

    @Override
    public void onListFragmentInteraction(Resena item) {

    }
}
