package com.example.parkapp;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationManagerCompat;

import android.app.Notification;
import android.app.NotificationChannel;
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
import com.example.parkapp.common.MyApp;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.model.Historial;
import com.example.parkapp.retrofit.model.ZonaDetail;
import com.example.parkapp.retrofit.service.ParkappService;
import com.google.android.material.snackbar.Snackbar;

import java.time.LocalDateTime;
import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MiAparcamientoNavigationActivity extends AppCompatActivity {

    Button desocupar,listadoHorario;
    TextView nombre,zona;
    ImageView avatar;
    ParkappService service;
    ServiceGenerator serviceGenerator;
    List<Aparcamiento> aparcamiento;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mi_aparcamiento_navigation);

        nombre = findViewById(R.id.NombreMiAparcamiento);
        zona = findViewById(R.id.zonaMiAparcamiento);
        avatar = findViewById(R.id.imagenMiAparcamiento);
        desocupar = findViewById(R.id.ButtonOcupar);
        listadoHorario = findViewById(R.id.buttonHistoriales);


        final String idHistorial = SharedPreferencesManager.getSomeStringValue("historial_id");
        final String fechaEntrada = SharedPreferencesManager.getSomeStringValue("fecha_entrada");
        final String horarioEntrada = SharedPreferencesManager.getSomeStringValue("horario_entrada");
        final String zonaId = SharedPreferencesManager.getSomeStringValue("ZONAID");
        final String aparcamientoId = SharedPreferencesManager.getSomeStringValue("APARCAMIENTOID");
        final  String userId = SharedPreferencesManager.getSomeStringValue("userId");

        service = serviceGenerator.createServiceZona(ParkappService.class);


        //CALLBACK ZONA
        Call<ZonaDetail> callZona = service.getZonaById(zonaId);

        callZona.enqueue(new Callback<ZonaDetail>() {
            @Override
            public void onResponse(Call<ZonaDetail> call, Response<ZonaDetail> response) {
                if (response.isSuccessful()) {
                    zona.setText(response.body().getNombre());

                }
                else {
                    Toast.makeText(MyApp.getContext(), "No se ha podido obtener resultados de la api", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ZonaDetail> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });


        //CALLBACK APARCAMIENTO
        Call<List<Aparcamiento>> callAparcamiento = service.getAparcamientoOfUsuario(userId);

        callAparcamiento.enqueue(new Callback<List<Aparcamiento>>() {
            @Override
            public void onResponse(Call<List<Aparcamiento>> call, Response<List<Aparcamiento>> response) {
                if (response.isSuccessful()) {
                    aparcamiento = response.body();
                    if(aparcamiento.isEmpty()){
                        desocupar.setClickable(false);
                        desocupar.setBackgroundColor(Color.parseColor("#c2c2c2"));
                        nombre.setText("Sin información");
                        listadoHorario.setBackgroundResource(R.drawable.ic_sad);
                        listadoHorario.setClickable(false);
                        Glide.with(MyApp.getContext())
                                .load(R.drawable.ic_traffic)
                                .into(avatar);
                        Snackbar snackbar3 = Snackbar.make(desocupar, "NO TIENE NINGUN APARCAMIENTO OCUPADO", Snackbar.LENGTH_LONG);
                        View sbView = snackbar3.getView();
                        zona.setVisibility(View.GONE);
                        sbView.setBackgroundColor(Color.parseColor("#9E0018"));
                        snackbar3.show();
                    }else{
                        listadoHorario.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                Intent i = new Intent(MiAparcamientoNavigationActivity.this, HorasAparcamientoActivity.class);
                                i.putExtra("aparcamientoId", aparcamiento.get(0).getId());
                                startActivity(i);
                            }
                        });
                    nombre.setText(aparcamiento.get(0).getNombre());
                    Glide
                            .with(MyApp.getContext())
                            .load("https://parkappsalesianos.herokuapp.com/parkapp/avatar/" + response.body().get(0).getAvatar())
                            .into(avatar);
                    }

                }

            }

            @Override
            public void onFailure(Call<List<Aparcamiento>> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });

        desocupar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final Aparcamiento aparcamientoUpdate = new Aparcamiento(aparcamiento.get(0).getNombre(), aparcamiento.get(0).getDimension(),
                        aparcamiento.get(0).getLongitud(), aparcamiento.get(0).getLatitud(), "");
                Call<ResponseBody> callUpdate = service.updateAparcamiento(aparcamiento.get(0).getId(), aparcamientoUpdate);
                callUpdate.enqueue(new Callback<ResponseBody>() {
                    @RequiresApi(api = Build.VERSION_CODES.O)
                    @Override
                    public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                        if (response.isSuccessful()) {

                            //CALLBACK PARA UPDATEAR EL HISTORIAL
                            final Historial historialUpdate = new Historial(horarioEntrada, LocalDateTime.now().toString(),
                                    fechaEntrada, aparcamiento.get(0).getId());
                            Call<ResponseBody> updateCall = service.updateHistorial(idHistorial, historialUpdate);

                            updateCall.enqueue(new Callback<ResponseBody>() {
                                @Override
                                public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                                    if (response.isSuccessful()) {

                                        Toast.makeText(MyApp.getContext(), "HISTORIAL ACTUALIZADO", Toast.LENGTH_SHORT).show();
                                    } else {
                                        Toast.makeText(MyApp.getContext(), "No se ha podido obtener resultados de la api", Toast.LENGTH_SHORT).show();
                                    }
                                }

                                @Override
                                public void onFailure(Call<ResponseBody> call, Throwable t) {
                                    Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
                                }
                            });

                            //Siguiendo callback desocupar
                            Intent i = new Intent(MiAparcamientoNavigationActivity.this, MainActivity.class);
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

    }
    public void showNotification(View v){
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
            NotificationChannel notificationChannel = new NotificationChannel("002","002", NotificationManager.IMPORTANCE_DEFAULT);
            notificationChannel.setDescription("Description");

            NotificationManager notificationManager = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);
            notificationManager.createNotificationChannel(notificationChannel);

            Notification.Builder builder = new Notification.Builder(this,"002");

            builder.setSmallIcon(R.drawable.ic_pinterest2)
                    .setContentText("El aparcamiento ha sido desocupado con exito")
                    .setContentTitle("Aparcamiento Descupado")
                    .setPriority(Notification.PRIORITY_DEFAULT);

            NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(this);
            notificationManagerCompat.notify(002, builder.build());


        }else{
            Notification.Builder builder = new Notification.Builder(this);
            builder.setSmallIcon(R.drawable.ic_pinterest2)
                    .setContentText("El aparcamiento ha sido desocupado con exito")
                    .setContentTitle("Aparcamiento Descupado")
                    .setPriority(Notification.PRIORITY_DEFAULT);
            NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(this);
            notificationManagerCompat.notify(002, builder.build());
        }
    }
}
