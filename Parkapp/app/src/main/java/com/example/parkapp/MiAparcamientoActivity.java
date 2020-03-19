package com.example.parkapp;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.media.Image;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.parkapp.common.MyApp;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.recylcerview.aparcamiento.AparcamientoFragment;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.model.Historial;
import com.example.parkapp.retrofit.model.ZonaDetail;
import com.example.parkapp.retrofit.service.ParkappService;

import java.time.LocalDateTime;
import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MiAparcamientoActivity extends AppCompatActivity {

    Button desocupar,listadoHorario;
    TextView nombre,zona;
    ImageView avatar;
    ParkappService service;
    ServiceGenerator serviceGenerator;
    Aparcamiento aparcamiento;
    Historial historial;



    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
       setContentView(R.layout.activity_mi_aparcamiento);

       nombre = findViewById(R.id.NombreMiAparcamiento);
       zona = findViewById(R.id.zonaMiAparcamiento);
       avatar = findViewById(R.id.imagenMiAparcamiento);
       desocupar = findViewById(R.id.ButtonDesocupar);
       listadoHorario = findViewById(R.id.buttonHistoriales);
       Bundle extras = getIntent().getExtras();;
       final String idAparcamiento = extras.getString("MIAPARCAMIENTOID");
       final String idZona = extras.getString("IDZONA");
       final String idHistorial = extras.getString("historial_id");
       final String fechaEntrada = extras.getString("fecha_entrada");
       final String horarioEntrada = extras.getString("horario_entrada");
       service = serviceGenerator.createServiceZona(ParkappService.class);



       //CALLBACK ZONA
        Call<ZonaDetail> callZona = service.getZonaById(idZona);

        callZona.enqueue(new Callback<ZonaDetail>() {
            @Override
            public void onResponse(Call<ZonaDetail> call, Response<ZonaDetail> response) {
                if(response.isSuccessful()){
                    zona.setText(response.body().getNombre());

                }else
                {
                    Toast.makeText(MyApp.getContext(), "No se ha podido obtener resultados de la api", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ZonaDetail> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });



        //CALLBACK APARCAMIENTO
        Call<Aparcamiento> callAparcamiento = service.getAparcamiento(idAparcamiento);

        callAparcamiento.enqueue(new Callback<Aparcamiento>() {
            @Override
            public void onResponse(Call<Aparcamiento> call, Response<Aparcamiento> response) {
                if(response.isSuccessful()){
                    aparcamiento = response.body();
                    nombre.setText(aparcamiento.getNombre());

                    Glide
                            .with(MyApp.getContext())
                            .load("http://10.0.2.2:3000/parkapp/avatar/"+aparcamiento.getAvatar())
                            .into(avatar);

                }
            }
            @Override
            public void onFailure(Call<Aparcamiento> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });






                desocupar.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        final Aparcamiento aparcamientoUpdate = new Aparcamiento(aparcamiento.getNombre(), aparcamiento.getDimension(),
                                aparcamiento.getLongitud(), aparcamiento.getLatitud(), "");
                        Call<ResponseBody> callUpdate = service.updateAparcamiento(idAparcamiento, aparcamientoUpdate);
                        callUpdate.enqueue(new Callback<ResponseBody>() {
                            @RequiresApi(api = Build.VERSION_CODES.O)
                            @Override
                            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                                if (response.isSuccessful()) {

                                    //CALLBACK PARA UPDATEAR EL HISTORIAL
                                    final Historial historialUpdate = new Historial(horarioEntrada,LocalDateTime.now().toString(),
                                            fechaEntrada,idAparcamiento);
                                    Call<ResponseBody> updateCall = service.updateHistorial(idHistorial, historialUpdate);

                                    updateCall.enqueue(new Callback<ResponseBody>() {
                                        @Override
                                        public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                                            if(response.isSuccessful()){

                                                Toast.makeText(MyApp.getContext(), "HISTORIAL ACTUALIZADO", Toast.LENGTH_SHORT).show();
                                            }else{
                                                Toast.makeText(MyApp.getContext(), "No se ha podido obtener resultados de la api", Toast.LENGTH_SHORT).show();
                                            }
                                        }

                                        @Override
                                        public void onFailure(Call<ResponseBody> call, Throwable t) {
                                            Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
                                        }
                                    });

                                    //Siguiendo callback desocupar
                                    Toast.makeText(MyApp.getContext(), "EL APARCAMIENTO HA SIDO OCUPADO CORRECTAMENTE", Toast.LENGTH_SHORT).show();
                                    Intent i = new Intent(MiAparcamientoActivity.this, MainActivity.class);
                                    startActivity(i);
                                } else {
                                    Toast.makeText(MyApp.getContext(), "No se ha podido obtener resultados de la api", Toast.LENGTH_SHORT).show();
                                }

                            }

                            @Override
                            public void onFailure(Call<ResponseBody> call, Throwable t) {
                                Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
                            }
                        });
                    }
                });
                listadoHorario.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        Intent i = new Intent(MiAparcamientoActivity.this,HistorialActivity.class);
                        startActivity(i);
                    }
                });


    }
}
