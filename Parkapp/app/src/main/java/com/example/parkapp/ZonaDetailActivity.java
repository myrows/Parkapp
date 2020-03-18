package com.example.parkapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.parkapp.common.MyApp;
import com.example.parkapp.recylcerview.aparcamiento.AparcamientoFragment;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Historial;
import com.example.parkapp.retrofit.model.Horario;
import com.example.parkapp.retrofit.model.ZonaDetail;
import com.example.parkapp.retrofit.service.ParkappService;
import com.google.android.gms.common.util.ArrayUtils;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ZonaDetailActivity extends AppCompatActivity {

    ImageView imageZona, imgResena, imgGoNavigation;
    TextView tName, tUbicacion,tDistancia, tFirstHourD;
    Button btnAparcar;
    ParkappService parkappService;
    List<Historial> listHistorial = new ArrayList<>();
    List<Horario> listHorario = new ArrayList<>();
    HashMap<Integer, Integer> listHorarioMap = new HashMap<Integer, Integer>();
    int numRep;

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
        tFirstHourD = findViewById(R.id.textViewFirstHourD);

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

        getHourOfAparcamiento();
    }

    public void getHourOfAparcamiento(){
        //Se obtiene todos los historiales de fechas de todos los aparcamientos
        Call<List<Historial>> call = parkappService.getAllHistorial();
        call.enqueue(new Callback<List<Historial>>() {
            @Override
            public void onResponse(Call<List<Historial>> call, Response<List<Historial>> response) {
                if(response.isSuccessful()){
                    listHistorial = response.body();

                    if(listHistorial != null && listHistorial.size() > 0){

                        agregarHoras();


                        Toast.makeText(ZonaDetailActivity.this, listHorarioMap+ "horas", Toast.LENGTH_SHORT).show();

                        //Toast.makeText(ZonaDetailActivity.this, listHorario.get(0).getHora()+","+listHorario.get(1).getHora()+","+ listHorario.get(2).getHora()+","+listHorario.get(3).getHora(), Toast.LENGTH_SHORT).show();

                    }else{

                    }
                }else{
                    Toast.makeText(ZonaDetailActivity.this, "Error al obtener los datos", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Historial>> call, Throwable t) {
                Toast.makeText(ZonaDetailActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void agregarHoras(){

        for(int i = 0; i < listHistorial.size(); i++){
            int count = 0;
            String date = listHistorial.get(i).getFechaEntrada();
            DateTime dt = DateTime.parse(date);
            int hour = dt.getHourOfDay();

            for (int j = 0; j < listHistorial.size(); j++) {
                String datej = listHistorial.get(j).getFechaEntrada();
                DateTime dtj = DateTime.parse(datej);
                int hourj = dtj.getHourOfDay();

                if (hour == hourj) {
                    //Se le suma 1 cada vez que encontramos una hora coincidente dentro del array con la hora seleccionada por el for (i)
                    count++;
                }
            }
            listHorarioMap.put(hour, count);
        }
    }
}
