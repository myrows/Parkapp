package com.example.parkapp;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationManagerCompat;
import androidx.fragment.app.DialogFragment;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
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

import com.example.parkapp.data.resena.AnotacionDialogfragment;
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

public class MiAparcamientoActivity extends AppCompatActivity implements CustomMiAparcamientoDialogfragment {

    Button desocupar,listadoHorario;
    TextView nombre,zona;
    ImageView avatar;
    ParkappService service;
    ServiceGenerator serviceGenerator;
    Aparcamiento aparcamiento;
    Aparcamiento aparcamientoUpdated;




    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mi_aparcamiento);

        Bundle extras = getIntent().getExtras();
        final String idAparcamiento = extras.getString("MIAPARCAMIENTOID");
        nombre = findViewById(R.id.NombreMiAparcamiento);
       zona = findViewById(R.id.zonaMiAparcamiento);
       avatar = findViewById(R.id.imagenMiAparcamiento);
       desocupar = findViewById(R.id.ButtonOcupar);
       listadoHorario = findViewById(R.id.buttonHistoriales);


        final String idZona = extras.getString("IDZONA");
        final String idHistorial = SharedPreferencesManager.getSomeStringValue("historial_id");
        final String fechaEntrada = SharedPreferencesManager.getSomeStringValue("fecha_entrada");
        final String horarioEntrada = SharedPreferencesManager.getSomeStringValue("horario_entrada");

           service = serviceGenerator.createServiceZona(ParkappService.class);


           //CALLBACK ZONA
           Call<ZonaDetail> callZona = service.getZonaById(idZona);

           callZona.enqueue(new Callback<ZonaDetail>() {
               @Override
               public void onResponse(Call<ZonaDetail> call, Response<ZonaDetail> response) {
                   if (response.isSuccessful()) {
                       zona.setText(response.body().getNombre());

                   } else {
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
                   if (response.isSuccessful()) {
                       aparcamiento = response.body();
                       nombre.setText(aparcamiento.getNombre());

                       Glide
                               .with(MyApp.getContext())
                               .load("https://parkappsalesianos.herokuapp.com/parkapp/avatar/" + aparcamiento.getAvatar())
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
                   AparcamientoDialogfragment aparcamientoDialogfragment = new AparcamientoDialogfragment();
                   aparcamientoDialogfragment.show(getSupportFragmentManager(), null);
                   aparcamientoDialogfragment.setStyle(DialogFragment.STYLE_NO_TITLE, android.R.style.Theme_Holo_Light_Dialog_NoActionBar_MinWidth);
                   /*//CallBack para coger el id del aparcamiento
                   Call<List<Aparcamiento>> call = service.getAparcamientoOfUser(SharedPreferencesManager.getSomeStringValue("userId"));
                   call.enqueue(new Callback<List<Aparcamiento>>() {
                       @Override
                       public void onResponse(Call<List<Aparcamiento>> call, Response<List<Aparcamiento>> response) {
                           if(response.isSuccessful()){
                               final Aparcamiento aparcamientoUpdate = new Aparcamiento(response.body().get(0).getPuntuacion(), aparcamiento.getNombre(), aparcamiento.getDimension(),
                                       aparcamiento.getLongitud(), aparcamiento.getLatitud(), "");
                               Call<ResponseBody> callUpdate = service.updateAparcamiento(idAparcamiento, aparcamientoUpdate);
                               callUpdate.enqueue(new Callback<ResponseBody>() {
                                   @RequiresApi(api = Build.VERSION_CODES.O)
                                   @Override
                                   public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                                       if (response.isSuccessful()) {
                                           //CALLBACK PARA UPDATEAR EL HISTORIAL
                                           final Historial historialUpdate = new Historial(horarioEntrada, LocalDateTime.now().toString(),
                                                   fechaEntrada, idAparcamiento);
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
                                           showNotification(desocupar);
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
                       }

                       @Override
                       public void onFailure(Call<List<Aparcamiento>> call, Throwable t) {

                       }
                   });*/
               }
           });
           listadoHorario.setOnClickListener(new View.OnClickListener() {
               @Override
               public void onClick(View v) {
                   Intent i = new Intent(MiAparcamientoActivity.this, HorasAparcamientoActivity.class);
                   i.putExtra("aparcamientoId", idAparcamiento);
                   startActivity(i);
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

    @Override
    public void submittedinformation(int puntuacion) {
        //Callback para obtener mi aparcamiento
        Call<Aparcamiento> call = service.getAparcamiento(SharedPreferencesManager.getSomeStringValue("MIAPARCAMIENTOID"));

        call.enqueue(new Callback<Aparcamiento>() {

            @Override
            public void onResponse(Call<Aparcamiento> call, Response<Aparcamiento> response) {
                //Toast.makeText(MiAparcamientoActivity.this, "Callback mi aparcamiento", Toast.LENGTH_SHORT).show();
                if(response.isSuccessful()){

                    Aparcamiento myAparcamiento = response.body();
                    aparcamientoUpdated = new Aparcamiento(myAparcamiento.getPuntuacion() + puntuacion, myAparcamiento.getDimension(), myAparcamiento.getLongitud(), myAparcamiento.getLatitud(), myAparcamiento.getNombre(), myAparcamiento.getUserId());

                    //Callback para actualizar la puntuación
                    Call<ResponseBody> updateAparcamiento = service.updateAparcamiento(response.body().getId(), aparcamientoUpdated);
                    updateAparcamiento.enqueue(new Callback<ResponseBody>() {

                        @Override
                        public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                            if(response.isSuccessful()){

                                Intent i = new Intent(MiAparcamientoActivity.this, MainActivity.class);
                                startActivity(i);
                                Toast.makeText(MiAparcamientoActivity.this, "Has valorado este aparcamiento correctamente, muchas gracias", Toast.LENGTH_SHORT).show();

                            }else{
                                Toast.makeText(MiAparcamientoActivity.this, "Error al obtener los datos", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<ResponseBody> call, Throwable t) {

                        }
                    });
                }else{
                    Toast.makeText(MiAparcamientoActivity.this, "Error al obtener los datos", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Aparcamiento> call, Throwable t) {

            }
        });
    }
}
