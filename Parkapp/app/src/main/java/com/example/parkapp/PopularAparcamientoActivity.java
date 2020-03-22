package com.example.parkapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.example.parkapp.aparcamientosPopulares.AparcamientosPopularesFragment;
import com.example.parkapp.retrofit.model.Aparcamiento;

public class PopularAparcamientoActivity extends AppCompatActivity implements AparcamientosPopularesFragment.OnListFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_popular_aparcamiento);
    }

    @Override
    public void onListFragmentInteraction(Aparcamiento item) {

    }
}
