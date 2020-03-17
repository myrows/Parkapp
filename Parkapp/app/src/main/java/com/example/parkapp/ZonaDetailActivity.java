package com.example.parkapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.parkapp.common.MyApp;
import com.example.parkapp.recylcerview.aparcamiento.AparcamientoFragment;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.ZonaDetail;
import com.example.parkapp.retrofit.service.ParkappService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ZonaDetailActivity extends AppCompatActivity {

    ImageView imageZona, imgResena, imgGoNavigation;
    TextView tName, tUbicacion,tDistancia;
    Button btnAparcar;
    ParkappService parkappService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_zona_detail);

        imageZona = findViewById(R.id.imageViewZonaDetail);
        tName = findViewById(R.id.textViewNameZona);
        tUbicacion = findViewById(R.id.textViewUbicacionZ);
        btnAparcar = findViewById(R.id.buttonAparcarAqui);
        tDistancia = findViewById(R.id.textViewDistanciaZ);
        imgResena = findViewById(R.id.imageViewResenaZona);
        imgGoNavigation = findViewById(R.id.imageViewLlegarZona);

        parkappService = ServiceGenerator.createServiceZona(ParkappService.class);

        //Obtengo la información de la zona que he seleccionado

        Call<ZonaDetail> call = parkappService.getZonaById(getIntent().getExtras().get("zonaId").toString());
        call.enqueue(new Callback<ZonaDetail>() {
            @Override
            public void onResponse(Call<ZonaDetail> call, Response<ZonaDetail> response) {
                if(response.isSuccessful()){
                    ZonaDetail myZona = response.body();

                    tName.setText(myZona.getNombre());
                    tUbicacion.setText(myZona.getUbicacion());
                    tDistancia.setText(myZona.getDistancia()+" km");

                    Glide
                            .with(MyApp.getContext())
                            .load("http://10.0.2.2:3000/parkapp/avatar/"+myZona.getAvatar())
                            .into(imageZona);
                }
            }

            @Override
            public void onFailure(Call<ZonaDetail> call, Throwable t) {

            }
        });

        btnAparcar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent goAparcamiento = new Intent(ZonaDetailActivity.this, AparcamientoActivity.class);
                goAparcamiento.putExtra("nameZona", tName.getText());
                goAparcamiento.putExtra("ubicacionZona", tUbicacion.getText());
                startActivity(goAparcamiento);
            }
        });

        imgResena.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent goResena = new Intent(ZonaDetailActivity.this, ResenaActivity.class);
                goResena.putExtra("zonaId", getIntent().getExtras().get("zonaId").toString());
                startActivity(goResena);
            }
        });

        //Intent sobre la ubicación de la zona para ir a la navegación
        imgGoNavigation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Uri gmmIntentUri = Uri.parse("google.navigation:q="+tName.getText());
                Intent mapIntent = new Intent(Intent.ACTION_VIEW, gmmIntentUri);
                mapIntent.setPackage("com.google.android.apps.maps");
                startActivity(mapIntent);
            }
        });
    }
}
