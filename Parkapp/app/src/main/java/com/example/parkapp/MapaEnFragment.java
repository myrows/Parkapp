package com.example.parkapp;

import androidx.fragment.app.FragmentActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import com.example.parkapp.common.MyApp;
import com.example.parkapp.recylcerview.aparcamiento.DetalleAparcamientoActivity;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Zona;
import com.example.parkapp.retrofit.service.ParkappService;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MapaEnFragment extends FragmentActivity implements OnMapReadyCallback {
    ParkappService service;
    private GoogleMap mMap;
    List<Zona> listadoZonas;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_mapa_en_fragment);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }


    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        service = ServiceGenerator.createServiceZona(ParkappService.class);
        Call<List<Zona>> call = service.getZonas();

        call.enqueue(new Callback<List<Zona>>() {
            @Override
            public void onResponse(Call<List<Zona>> call, Response<List<Zona>> response) {
                if(response.isSuccessful()){
                    listadoZonas = response.body();

                    for(int i = 0; i<listadoZonas.size(); i++){

                        //SI NO ESTA VACIO
                        List<Double> LatIng =null;
                        LatIng.add(listadoZonas.get(i).getLatitud());
                        LatIng.add((listadoZonas.get(i).getLongitud()));
                        if(!LatIng.isEmpty()){
                            Marker m = mMap.addMarker(new MarkerOptions()
                                    .position(new LatLng(listadoZonas.get(i).getLatitud(),listadoZonas.get(i).getLongitud()))
                                    .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED))
                                    .title(listadoZonas.get(i).getNombre()));

                            mMap.moveCamera(CameraUpdateFactory.newLatLng(new LatLng(37.389170, -5.984487)));



                        }
                    }
                    mMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener() {
                        @Override
                        public boolean onMarkerClick(Marker marker) {
                            Intent i = new Intent(MapaEnFragment.this,
                                    DetalleAparcamientoActivity.class);
                            startActivity(i);

                            return false;
                        }
                    });


                }

            }


            @Override
            public void onFailure(Call<List<Zona>> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error al realizar la petición", Toast.LENGTH_SHORT).show();
            }

        });
    }
}
