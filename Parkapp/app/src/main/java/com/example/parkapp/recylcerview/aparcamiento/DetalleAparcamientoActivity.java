package com.example.parkapp.recylcerview.aparcamiento;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationManagerCompat;

import android.app.Notification;
import android.app.NotificationManager;
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
import com.google.android.material.snackbar.Snackbar;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import android.app.NotificationChannel;

public class DetalleAparcamientoActivity extends AppCompatActivity {

    TextView dimension, nombre, zona;
    ImageView imagenDetalle;
    Button ocupar, miAparcamiento;
    Aparcamiento Iaparcamiento;
    ZonaDetail IzonaDetail;
    ServiceGenerator serviceGenerator;
    ParkappService service;
    AparcamientoViewModel aparcamientoViewModel;
    List<Aparcamiento> listadoAparcamientos = new ArrayList<>();
    public final String CHANNEL_ID = "001";
    Snackbar snackbar;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detalle_aparcamiento);




        dimension = findViewById(R.id.DimensionAparcamientoDetalle);
        nombre = findViewById(R.id.NombreMiAparcamiento);
        imagenDetalle = findViewById(R.id.imagenMiAparcamiento);
        zona = findViewById(R.id.zonaMiAparcamiento);
        ocupar = findViewById(R.id.ButtonOcupar);
        miAparcamiento = findViewById(R.id.buttonMiAparcamiento);
        service = serviceGenerator.createServiceZona(ParkappService.class);

        Bundle extras = getIntent().getExtras();
        final String aparcamientoId = extras.getString("APARCAMIENTO_ID");
        String idZona = SharedPreferencesManager.getSomeStringValue("ZONAID");
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

        Call<List<Aparcamiento>> callTodosAparcamientos = service.getAparcamientos();
        callTodosAparcamientos.enqueue(new Callback<List<Aparcamiento>>() {
            @Override
            public void onResponse(Call<List<Aparcamiento>> call, Response<List<Aparcamiento>> response) {
                if(response.isSuccessful()){
                    listadoAparcamientos = response.body();
                    for(int i = 0; i<listadoAparcamientos.size(); i++){
                        if(listadoAparcamientos.get(i).getUserId().equals(idUsuario)){
                            ocupar.setBackgroundColor(Color.parseColor("#c2c2c2"));
                            ocupar.setClickable(false);
                            snackbar = Snackbar.make(ocupar,"NO PUEDES OCUPAR MAS DE UN APARCAMIENTO",Snackbar.LENGTH_SHORT);
                            View sbView = snackbar.getView();
                            sbView.setBackgroundColor(Color.parseColor("#9E0018"));
                            snackbar.show();
                        }
                    }
                }
            }

            @Override
            public void onFailure(Call<List<Aparcamiento>> call, Throwable t) {

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
                            .load("https://parkappsalesianos.herokuapp.com/parkapp/avatar/"+aparcamiento.getAvatar())
                            .into(imagenDetalle);



                    if(!aparcamiento.getUserId().equals("")){
                        ocupar.setBackgroundColor(Color.parseColor("#c2c2c2"));
                        ocupar.setClickable(false);
                        Snackbar snackbar2 = Snackbar.make(ocupar,"EL APARCAMIENTO YA ESTA OCUPADO",Snackbar.LENGTH_LONG);
                        View sbView = snackbar2.getView();
                        sbView.setBackgroundColor(Color.parseColor("#9E0018"));
                        snackbar2.show();

                    }
                    if(idUsuario.equals(aparcamiento.getUserId())){
                        miAparcamiento.setClickable(true);
                    }else if(!idUsuario.equals(aparcamiento.getUserId())){
                        miAparcamiento.setBackgroundColor(Color.parseColor("#c2c2c2"));
                        miAparcamiento.setClickable(false);
                    }
                   /* if(idUsuario.equals(aparcamiento.getUserId())){
                        miAparcamiento.setClickable(true);
                    }else if(!idUsuario.equals(aparcamiento.getUserId())){
                        miAparcamiento.setBackgroundColor(Color.parseColor("#c2c2c2"));
                        miAparcamiento.setClickable(false);
                    }*/

                        ocupar.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                Call<Aparcamiento> call = service.getAparcamiento(aparcamiento.getId());
                                call.enqueue(new Callback<Aparcamiento>() {
                                    @Override
                                    public void onResponse(Call<Aparcamiento> call, Response<Aparcamiento> response) {
                                        if(response.isSuccessful()){
                                            final Aparcamiento aparcamientoUpdate = new Aparcamiento(response.body().getPuntuacion(), aparcamiento.getNombre(),aparcamiento.getDimension(),
                                                    aparcamiento.getLongitud(),aparcamiento.getLatitud(),idUsuario);
                                            Call<ResponseBody> callUpdate = service.updateAparcamiento(aparcamientoId,aparcamientoUpdate);
                                            callUpdate.enqueue(new Callback<ResponseBody>() {

                                                @RequiresApi(api = Build.VERSION_CODES.O)
                                                @Override
                                                public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                                                    SharedPreferencesManager.setSomeStringValue("APARCAMIENTOID",aparcamientoId);
                                                    final Historial historialNuevo = new Historial(LocalDateTime.now().toString(),"",LocalDate.now().toString(),aparcamientoId);
                                                    //CALLBACK NUEVO HISTORIAL
                                                    final Call<Historial> nuevoHistorial = service.nuevoHistorial(historialNuevo);
                                                    nuevoHistorial.enqueue(new Callback<Historial>() {
                                                        @Override
                                                        public void onResponse(Call<Historial> call, Response<Historial> response) {
                                                            if(response.isSuccessful()){
                                                                Toast.makeText(MyApp.getContext(),"HISTORIAL AÑADIDO",Toast.LENGTH_SHORT).show();
                                                                SharedPreferencesManager.setSomeStringValue("historial_id", response.body().getId());
                                                                SharedPreferencesManager.setSomeStringValue("fecha_entrada", response.body().getDia());
                                                                SharedPreferencesManager.setSomeStringValue("horario_entrada",response.body().getFechaEntrada());
                                                            }
                                                        }

                                                        @Override
                                                        public void onFailure(Call<Historial> call, Throwable t) {
                                                            Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
                                                        }
                                                    });



                                                    showNotification(ocupar);
                                                    //CALLBACK APARCAMIENTO

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
                                    }

                                    @Override
                                    public void onFailure(Call<Aparcamiento> call, Throwable t) {

                                    }
                                });


                                //SharedPreferencesManager.setSomeStringValue("IDEAPARCAMIENTO",response.body().getId());


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
    public void showNotification(View v){
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
            NotificationChannel notificationChannel = new NotificationChannel("001","001",NotificationManager.IMPORTANCE_DEFAULT);
            notificationChannel.setDescription("Description");

            NotificationManager notificationManager = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);
            notificationManager.createNotificationChannel(notificationChannel);

            Notification.Builder builder = new Notification.Builder(this,"001");

            builder.setSmallIcon(R.drawable.ic_pinterest2)
                    .setContentText("El aparcamiento ha sido ocupado con exito")
                    .setContentTitle("Aparcamiento Ocupado")
                    .setPriority(Notification.PRIORITY_DEFAULT);

            NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(this);
            notificationManagerCompat.notify(001, builder.build());


        }else{
            Notification.Builder builder = new Notification.Builder(this);
            builder.setSmallIcon(R.drawable.ic_pinterest2)
                    .setContentText("El aparcamiento ha sido ocupado con exito")
                    .setContentTitle("Aparcamiento Ocupado")
                    .setPriority(Notification.PRIORITY_DEFAULT);
            NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(this);
            notificationManagerCompat.notify(001, builder.build());
        }
    }
}

