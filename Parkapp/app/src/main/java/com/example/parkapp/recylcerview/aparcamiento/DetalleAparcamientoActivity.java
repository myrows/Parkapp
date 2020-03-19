package com.example.parkapp.recylcerview.aparcamiento;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.parkapp.MiAparcamientoActivity;
import com.example.parkapp.R;
import com.example.parkapp.common.MyApp;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.data.AparcamientoViewModel;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.model.Historial;
import com.example.parkapp.retrofit.model.ZonaDetail;
import com.example.parkapp.retrofit.service.ParkappService;

import java.time.LocalDate;
import java.time.LocalDateTime;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DetalleAparcamientoActivity extends AppCompatActivity {

    TextView dimension, nombre, zona;
    ImageView imagenDetalle;
    Button ocupar, miAparcamiento;
    Aparcamiento Iaparcamiento;
    ZonaDetail IzonaDetail;
    ServiceGenerator serviceGenerator;
    ParkappService service;
    AparcamientoViewModel aparcamientoViewModel;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detalle_aparcamiento);

        dimension = findViewById(R.id.DimensionAparcamientoDetalle);
        nombre = findViewById(R.id.NombreMiAparcamiento);
        imagenDetalle = findViewById(R.id.imagenMiAparcamiento);
        zona = findViewById(R.id.zonaMiAparcamiento);
        ocupar = findViewById(R.id.ButtonDesocupar);
        miAparcamiento = findViewById(R.id.buttonMiAparcamiento);
        service = serviceGenerator.createServiceZona(ParkappService.class);

        Bundle extras = getIntent().getExtras();
        final String aparcamientoId = extras.getString("APARCAMIENTO_ID");
        String idZona = extras.getString("ZONA_ID");
        final String idUsuario = SharedPreferencesManager.getSomeStringValue("userId");
        final Intent i = new Intent(DetalleAparcamientoActivity.this, MiAparcamientoActivity.class);
        i.putExtra("MIAPARCAMIENTOID", aparcamientoId);
        i.putExtra("IDZONA",idZona);


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


        Call<Aparcamiento> call = service.getAparcamiento(aparcamientoId);
        call.enqueue(new Callback<Aparcamiento>() {
            @Override
            public void onResponse(final Call<Aparcamiento> call, Response<Aparcamiento> response) {
                if(response.isSuccessful()){
                    final Aparcamiento aparcamiento = response.body();
                    nombre.setText(aparcamiento.getNombre());
                    dimension.setText(aparcamiento.getDimension());


                    Glide
                            .with(MyApp.getContext())
                            .load("http://10.0.2.2:3000/parkapp/avatar/"+aparcamiento.getAvatar())
                            .into(imagenDetalle);
                    SharedPreferencesManager.setSomeStringValue("http://10.0.2.2:3000/parkapp/avatar/"+aparcamiento.getAvatar(),"AVATAR_APARCAMIENTO");



                    if(!aparcamiento.getUserId().equals("")){
                        ocupar.setBackgroundColor(Color.parseColor("#c2c2c2"));
                        ocupar.setClickable(false);
                        Toast.makeText(MyApp.getContext(),"EL APARCAMIENTO YA ESTA OCUPADO",Toast.LENGTH_SHORT).show();

                    }
                    if(idUsuario.equals(aparcamiento.getUserId())){
                        miAparcamiento.setClickable(true);
                    }else if(!idUsuario.equals(aparcamiento.getUserId())){
                        miAparcamiento.setBackgroundColor(Color.parseColor("#c2c2c2"));
                        miAparcamiento.setClickable(false);
                    }
                    if(idUsuario.equals(aparcamiento.getUserId())){
                        miAparcamiento.setClickable(true);
                    }else if(!idUsuario.equals(aparcamiento.getUserId())){
                        miAparcamiento.setBackgroundColor(Color.parseColor("#c2c2c2"));
                        miAparcamiento.setClickable(false);
                    }

                        ocupar.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                final Aparcamiento aparcamientoUpdate = new Aparcamiento(aparcamiento.getNombre(),aparcamiento.getDimension(),
                                        aparcamiento.getLongitud(),aparcamiento.getLatitud(),idUsuario);
                                Call<ResponseBody> callUpdate = service.updateAparcamiento(aparcamientoId,aparcamientoUpdate);
                                callUpdate.enqueue(new Callback<ResponseBody>() {

                                    @RequiresApi(api = Build.VERSION_CODES.O)
                                    @Override
                                    public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {

                                        final Historial historialNuevo = new Historial(LocalDateTime.now().toString(),"",LocalDate.now().toString(),aparcamientoId);
                                        //CALLBACK NUEVO HISTORIAL
                                        final Call<Historial> nuevoHistorial = service.nuevoHistorial(historialNuevo);
                                        nuevoHistorial.enqueue(new Callback<Historial>() {
                                            @Override
                                            public void onResponse(Call<Historial> call, Response<Historial> response) {
                                                if(response.isSuccessful()){
                                                Toast.makeText(MyApp.getContext(),"HISTORIAL AÑADIDO",Toast.LENGTH_SHORT).show();
                                                i.putExtra("historial_id", response.body().getId());
                                                i.putExtra("fecha_entrada", response.body().getDia());
                                                i.putExtra("horario_entrada",response.body().getFechaEntrada());
                                                }
                                            }

                                            @Override
                                            public void onFailure(Call<Historial> call, Throwable t) {
                                                Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
                                            }
                                        });

                                        //CALLBACK APARCAMIENTO
                                        Toast.makeText(MyApp.getContext(),"EL APARCAMIENTO HA SIDO OCUPADO CORRECTAMENTE",Toast.LENGTH_SHORT).show();
                                        ocupar.setClickable(false);
                                        ocupar.setBackgroundColor(Color.parseColor("#c2c2c2"));
                                        miAparcamiento.setBackgroundColor(Color.parseColor("#9E0018"));
                                        miAparcamiento.setClickable(true);

                                        miAparcamiento.setOnClickListener(new View.OnClickListener() {
                                            @Override
                                            public void onClick(View v) {

                                                startActivity(i);
                                           }
                                        });
                                    }

                                    @Override
                                    public void onFailure(Call<ResponseBody> call, Throwable t) {
                                        Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
                                    }
                                });




                            }
                        });
                    }
                }

            @Override
            public void onFailure(Call<Aparcamiento> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });

        miAparcamiento.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                startActivity(i);
            }
        });
    }
}

