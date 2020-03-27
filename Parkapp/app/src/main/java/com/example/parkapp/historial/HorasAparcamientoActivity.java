package com.example.parkapp.historial;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.parkapp.R;
import com.example.parkapp.common.MyApp;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.login.LoginActivity;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.model.Historial;
import com.example.parkapp.retrofit.service.ParkappService;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.firebase.auth.FirebaseAuth;

import org.joda.time.DateTime;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HorasAparcamientoActivity extends AppCompatActivity {
    ParkappService parkappService;
    TextView tFirstHourO, tSecondHourO, tThirdHourO, tFirstHourD, tSecondHourD, tThirdHourD;
    ImageView imageAparcamiento;
    List<Historial> listHistorial = new ArrayList<>();
    List<Historial> listHistorialDisponible = new ArrayList<>();
    HashMap<Integer, Integer> listHorarioMap = new HashMap<Integer, Integer>();
    HashMap<Integer, Integer> listHorarioMapDisponible = new HashMap<Integer, Integer>();
    LinkedList<Map.Entry<Integer, Integer>> list;
    Comparator<Map.Entry<Integer, Integer>> comparator;
    LinkedList<Map.Entry<Integer, Integer>> listDisponible;
    Comparator<Map.Entry<Integer, Integer>> comparatorDisponible;
    List<Integer> listHorarioOcupado = new ArrayList<>();
    List<Integer> listHorarioDisponible = new ArrayList<>();
    int horasAMostrar;
    private FirebaseAuth mAuth;
    private GoogleSignInClient mGoogleSignInClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_horas_aparcamiento);

        tFirstHourO = findViewById(R.id.textViewFirstHourOH);
        tSecondHourO = findViewById(R.id.textViewSecondHourOH);
        tThirdHourO = findViewById(R.id.textViewThirdHourOH);
        tFirstHourD = findViewById(R.id.textViewFirstHourDH);
        tSecondHourD = findViewById(R.id.textViewSecondHourDH);
        tThirdHourD = findViewById(R.id.textViewThirdHourDH);
        imageAparcamiento = findViewById(R.id.imageViewAparcamientoHora);

        parkappService = ServiceGenerator.createServiceAparcamiento(ParkappService.class);

        Call<Aparcamiento> call = parkappService.getAparcamiento(getIntent().getExtras().get("aparcamientoId").toString());
        call.enqueue(new Callback<Aparcamiento>() {
            @Override
            public void onResponse(Call<Aparcamiento> call, Response<Aparcamiento> response) {
                if(response.isSuccessful()){
                    Glide
                            .with(MyApp.getContext())
                            .load("https://parkappsalesianos.herokuapp.com/parkapp/avatar/"+response.body().getAvatar())
                            .into(imageAparcamiento);
                }else{
                    Toast.makeText(HorasAparcamientoActivity.this, "No se han podido obtener datos", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Aparcamiento> call, Throwable t) {
                Toast.makeText(HorasAparcamientoActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });

        addHourOfAparcamientoOcupado();
        addHourOfAparcamientoDisponible();
    }

    public void addHourOfAparcamientoOcupado(){
        //Se obtiene todos los historiales de fechas de todos los aparcamientos
        Call<List<Historial>> call = parkappService.getHistorialOfAparcamientoById(getIntent().getExtras().get("aparcamientoId").toString());
        call.enqueue(new Callback<List<Historial>>() {
            @RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onResponse(Call<List<Historial>> call, Response<List<Historial>> response) {
                if(response.isSuccessful()){
                    listHistorial = response.body();

                    if(listHistorial != null && listHistorial.size() > 0){
                        horasAMostrar = 3;

                        agregarHoras();
                        ordenarHorasPorCantidad();
                        cantidadHorasOcupadas(horasAMostrar);

                        //Set de las horas ocupadas
                        if(listHorarioOcupado.size() >= horasAMostrar) {
                            tFirstHourO.setText(listHorarioOcupado.get(0) + ":00 h");
                            tSecondHourO.setText(listHorarioOcupado.get(1) + ":00 h");
                            tThirdHourO.setText(listHorarioOcupado.get(2) + ":00 h");
                        }
                    }else{
                    }
                }else{
                    Toast.makeText(HorasAparcamientoActivity.this, "Error al obtener los datos", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<List<Historial>> call, Throwable t) {
                Toast.makeText(HorasAparcamientoActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void addHourOfAparcamientoDisponible(){
        //Se obtiene todos los historiales de fechas de todos los aparcamientos
        Call<List<Historial>> call = parkappService.getHistorialOfAparcamientoById(getIntent().getExtras().get("aparcamientoId").toString());
        call.enqueue(new Callback<List<Historial>>() {
            @RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onResponse(Call<List<Historial>> call, Response<List<Historial>> response) {
                if(response.isSuccessful()){
                    listHistorialDisponible = response.body();

                    if(listHistorialDisponible != null && listHistorialDisponible.size() > 0){
                        horasAMostrar = 3;

                        agregarHorasDisponible();
                        ordenarHorasPorCantidadDisponible();
                        cantidadHorasDisponible(horasAMostrar);

                        if(listHorarioDisponible.size() >= horasAMostrar) {
                            //Set de las horas ocupadas
                            tFirstHourD.setText(listHorarioDisponible.get(0) + ":00 h");
                            tSecondHourD.setText(listHorarioDisponible.get(1) + ":00 h");
                            tThirdHourD.setText(listHorarioDisponible.get(2) + ":00 h");
                        }
                    }else{
                    }
                }else{
                    Toast.makeText(HorasAparcamientoActivity.this, "Error al obtener los datos", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<List<Historial>> call, Throwable t) {
                Toast.makeText(HorasAparcamientoActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void agregarHoras(){

        for(int i = 0; i < listHistorial.size(); i++) {
            int count = 0;
            String date = listHistorial.get(i).getFechaEntrada();
            if (date != null) {
                DateTime dt = DateTime.parse(date);
                int hour = dt.getHourOfDay();

                for (int j = 0; j < listHistorial.size(); j++) {
                    String datej = listHistorial.get(j).getFechaEntrada();
                    if (datej != null) {
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
    }

    public void agregarHorasDisponible(){

        for(int i = 0; i < listHistorialDisponible.size(); i++) {
            int count = 0;
            String date = listHistorialDisponible.get(i).getFechaSalida();
            if (date != null) {
                DateTime dt = DateTime.parse(date);
                int hour = dt.getHourOfDay();

                for (int j = 0; j < listHistorialDisponible.size(); j++) {
                    String datej = listHistorialDisponible.get(j).getFechaSalida();
                    if (datej != null) {
                        DateTime dtj = DateTime.parse(datej);
                        int hourj = dtj.getHourOfDay();

                        if (hour == hourj) {
                            //Se le suma 1 cada vez que encontramos una hora coincidente dentro del array con la hora seleccionada por el for (i)
                            count++;
                        }
                    }
                }
                listHorarioMapDisponible.put(hour, count);
            }
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    public void ordenarHorasPorCantidad(){
        list = new LinkedList<>(listHorarioMap.entrySet());
        comparator = Comparator.comparing(Map.Entry::getValue);
        Collections.sort(list, comparator.reversed());
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    public void ordenarHorasPorCantidadDisponible(){
        listDisponible = new LinkedList<>(listHorarioMapDisponible.entrySet());
        comparatorDisponible = Comparator.comparing(Map.Entry::getValue);
        Collections.sort(listDisponible, comparatorDisponible.reversed());
    }

    public void cantidadHorasOcupadas(int cant){
        if(list.size() >= cant) {
            for (int i = 0; i < cant; i++) {
                listHorarioOcupado.add(list.get(i).getKey());
            }
            Collections.sort(listHorarioOcupado, new Comparator<Integer>() {
                @Override
                public int compare(Integer o1, Integer o2) {
                    return o1.compareTo(o2);
                }
            });
        }
    }

    public void cantidadHorasDisponible(int cant){
        if(listDisponible.size() >= cant) {
            for (int i = 0; i < cant; i++) {
                listHorarioDisponible.add(listDisponible.get(i).getKey());
            }
            Collections.sort(listHorarioDisponible, new Comparator<Integer>() {
                @Override
                public int compare(Integer o1, Integer o2) {
                    return o1.compareTo(o2);
                }
            });
        }else{
            Toast.makeText(this, "No tiene suficientes datos para mostrar el horario", Toast.LENGTH_SHORT).show();
        }
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
