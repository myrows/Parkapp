package com.example.parkapp;


import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.parkapp.R;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Zona;
import com.example.parkapp.retrofit.service.ParkappService;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

import java.io.IOException;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


/**
 * A simple {@link Fragment} subclass.
 */
public class MapaEnFragment extends Fragment implements OnMapReadyCallback {
    ParkappService service;
    GoogleMap mMap;
    List<Zona> listado;

    public MapaEnFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.activity_mapa_en_fragment, container, false);

        SupportMapFragment mapFragment = (SupportMapFragment) getChildFragmentManager()
                .findFragmentById(R.id.map);

        mapFragment.getMapAsync(this);

        return v;
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        service = ServiceGenerator.createServiceZona(ParkappService.class);
        Call<List<Zona>> call = service.getZonas();

        call.enqueue(new Callback<List<Zona>>() {
            @Override
            public void onResponse(Call<List<Zona>> call, Response<List<Zona>> response) {
                if(response.isSuccessful()){
                    listado = response.body();

                    for(int i = 0; i<listado.size(); i++){
                        //SI NO ESTA VACIO
                        if(listado.get(i).getLatitud() != null && listado.get(i).getLongitud() != null) {
                            Marker m = mMap.addMarker(new MarkerOptions()
                                    .position(new LatLng(listado.get(i).getLatitud(),listado.get(i).getLongitud()))
                                    .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED))
                                    .title(listado.get(i).getNombre()));

                            mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(37.3828300, -5.9731700),12.0f));

                        }
                    }
                }
            }
            @Override
            public void onFailure(Call<List<Zona>> call, Throwable t) {
                Toast.makeText(getContext(), "Error al realizar la petición", Toast.LENGTH_SHORT).show();
            }

        });
    }
}
