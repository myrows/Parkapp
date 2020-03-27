package com.example.parkapp;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationManagerCompat;
import androidx.fragment.app.DialogFragment;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
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
import com.example.parkapp.retrofit.model.Resena;
import com.example.parkapp.retrofit.model.ZonaDetail;
import com.example.parkapp.retrofit.service.ParkappService;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.material.snackbar.Snackbar;
import com.google.firebase.auth.FirebaseAuth;

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
    Aparcamiento aparcamientoUpdated;
    private FirebaseAuth mAuth;
    private GoogleSignInClient mGoogleSignInClient;
    List<Aparcamiento> aparcamientos;
    String miAparcamiento;




    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mi_aparcamiento);

        Bundle extras = getIntent().getExtras();
        final String idAparcamiento = SharedPreferencesManager.getSomeStringValue("aparcamiento_id");
        final String idUsuario = SharedPreferencesManager.getSomeStringValue("userId");

        nombre = findViewById(R.id.NombreMiAparcamiento);
       zona = findViewById(R.id.zonaMiAparcamiento);
       avatar = findViewById(R.id.imagenMiAparcamiento);
       desocupar = findViewById(R.id.ButtonOcupar);
       listadoHorario = findViewById(R.id.buttonHistoriales);


        final String idZona = SharedPreferencesManager.getSomeStringValue("ZONAID");
        String idHistorial = SharedPreferencesManager.getSomeStringValue("historial_id");
        String fechaEntrada = SharedPreferencesManager.getSomeStringValue("fecha_entrada");
        String horarioEntrada = SharedPreferencesManager.getSomeStringValue("horario_entrada");

           service = serviceGenerator.createServiceZona(ParkappService.class);





           //CALLBACK APARCAMIENTO
           Call<List<Aparcamiento>> callAparcamiento = service.getAparcamientoOfUsuario(idUsuario);

           callAparcamiento.enqueue(new Callback<List<Aparcamiento>>() {
               @Override
               public void onResponse(Call<List<Aparcamiento>> call, Response<List<Aparcamiento>> response) {
                   if (response.isSuccessful() && !response.body().isEmpty()) {
                       aparcamientos = response.body();
                       nombre.setText(aparcamientos.get(0).getNombre());
                       miAparcamiento = aparcamientos.get(0).getId();

                       Glide
                               .with(MyApp.getContext())
                               .load("https://parkappsalesianos.herokuapp.com/parkapp/avatar/" + aparcamientos.get(0).getAvatar())
                               .into(avatar);

                       Call<ZonaDetail> callZona = service.getZonaById(aparcamientos.get(0).getZonaId());

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


                   }if(response.body().isEmpty()){
                       desocupar.setClickable(false);
                       desocupar.setBackgroundColor(Color.parseColor("#c2c2c2"));
                       nombre.setText("Sin información");
                       listadoHorario.setBackgroundResource(R.drawable.ic_sad);
                       listadoHorario.setClickable(false);
                       Glide.with(MyApp.getContext())
                               .load(R.drawable.ic_traffic)
                               .into(avatar);
                       Snackbar snackbar3 = Snackbar.make(desocupar,"NO TIENE NINGUN APARCAMIENTO OCUPADO",Snackbar.LENGTH_LONG);
                       View sbView = snackbar3.getView();
                       zona.setVisibility(View.GONE);
                       sbView.setBackgroundColor(Color.parseColor("#9E0018"));
                       snackbar3.show();

                   }
               }

               @Override
               public void onFailure(Call<List<Aparcamiento>> call, Throwable t) {
                   if(aparcamientos.isEmpty()){
                       desocupar.setClickable(false);
                       desocupar.setBackgroundColor(Color.parseColor("#c2c2c2"));
                       nombre.setText("Sin información");
                       listadoHorario.setBackgroundResource(R.drawable.ic_sad);
                       listadoHorario.setClickable(false);
                       Glide.with(MyApp.getContext())
                               .load(R.drawable.ic_traffic)
                               .into(avatar);
                       Snackbar snackbar3 = Snackbar.make(desocupar,"NO TIENE NINGUN APARCAMIENTO OCUPADO",Snackbar.LENGTH_LONG);
                       View sbView = snackbar3.getView();
                       zona.setVisibility(View.GONE);
                       sbView.setBackgroundColor(Color.parseColor("#9E0018"));
                       snackbar3.show();
                   }
               }
           });


           desocupar.setOnClickListener(new View.OnClickListener() {
               @Override
               public void onClick(View v) {







                   //CallBack para coger el id del aparcamiento
                   Call<Aparcamiento> call = service.getAparcamiento(miAparcamiento);
                   call.enqueue(new Callback<Aparcamiento>() {
                       @Override
                       public void onResponse(Call<Aparcamiento> call, Response<Aparcamiento> response) {
                           if(response.isSuccessful()){
                               final Aparcamiento aparcamientoUpdate = new Aparcamiento(response.body().getPuntuacion(), response.body().getNombre(), response.body().getDimension(),
                                      response.body().getLongitud(), response.body().getLatitud(), "");
                               String miaparcamiento = response.body().getId();


                               Call<ResponseBody> callUpdate = service.updateAparcamiento(response.body().getId(), aparcamientoUpdate);
                               callUpdate.enqueue(new Callback<ResponseBody>() {
                                   @RequiresApi(api = Build.VERSION_CODES.O)
                                   @Override
                                   public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                                       if (response.isSuccessful()) {
                                           //CALLBACK PARA UPDATEAR EL HISTORIAL
                                           Call<List<Historial>> callHistorial = service.getHistorialFechaSalidaNull(miAparcamiento);

                                           callHistorial.enqueue(new Callback<List<Historial>>() {
                                               @Override
                                               public void onResponse(Call<List<Historial>>call, Response<List<Historial>>response) {
                                                   if(response.isSuccessful()){
                                                       final Historial historialUpdate = new Historial(response.body().get(0).getFechaEntrada(), LocalDateTime.now().toString(),
                                                               response.body().get(0).getDia(), miaparcamiento);
                                                       Call<ResponseBody> updateCall = service.updateHistorial(response.body().get(0).getId(), historialUpdate);

                                                       updateCall.enqueue(new Callback<ResponseBody>() {
                                                           @Override
                                                           public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                                                               if (response.isSuccessful()) {
                                                                   AparcamientoDialogfragment aparcamientoDialogfragment = new AparcamientoDialogfragment();
                                                                   aparcamientoDialogfragment.show(getSupportFragmentManager(), null);
                                                                   aparcamientoDialogfragment.setStyle(DialogFragment.STYLE_NO_TITLE, android.R.style.Theme_Holo_Light_Dialog_NoActionBar_MinWidth);
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

                                                   }
                                               }

                                               @Override
                                               public void onFailure(Call<List<Historial>> call, Throwable t) {

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
                       public void onFailure(Call<Aparcamiento> call, Throwable t) {

                       }
                   });
               }
           });

           listadoHorario.setOnClickListener(new View.OnClickListener() {
               @Override
               public void onClick(View v) {
                   Intent i = new Intent(MiAparcamientoActivity.this, HorasAparcamientoActivity.class);
                   i.putExtra("aparcamientoId", aparcamientos.get(0).getId());
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
        Call<Aparcamiento> call = service.getAparcamiento(miAparcamiento);

        call.enqueue(new Callback<Aparcamiento>() {

            @Override
            public void onResponse(Call<Aparcamiento> call, Response<Aparcamiento> response) {
                //Toast.makeText(MiAparcamientoActivity.this, "Callback mi aparcamiento", Toast.LENGTH_SHORT).show();
                if(response.isSuccessful()){
                    Aparcamiento myAparcamiento  = response.body();

                    if(myAparcamiento.getPuntuacion() == null){
                        myAparcamiento.setPuntuacion(0);
                    }
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

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.nav_menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {

        switch (item.getItemId()){
            case R.id.logout:
                GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                        .requestIdToken(getString(R.string.default_web_client_id))
                        .requestEmail()
                        .build();

                mGoogleSignInClient = GoogleSignIn.getClient(this, gso);
                mAuth = FirebaseAuth.getInstance();
                mAuth.signOut();
                mGoogleSignInClient.signOut();

                SharedPreferencesManager.setSomeStringValue("tokenId", null);
                Intent login = new Intent(this, LoginActivity.class);
                startActivity(login);
                break;
        }

        return super.onOptionsItemSelected(item);
    }
}
