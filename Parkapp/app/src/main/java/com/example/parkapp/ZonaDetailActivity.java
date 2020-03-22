package com.example.parkapp;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.location.Location;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Looper;
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
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.stream.Collectors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ZonaDetailActivity extends AppCompatActivity {

    ImageView imageZona, imgResena, imgGoNavigation;
    TextView tName, tUbicacion,tDistancia, tFirstHourO, tSecondHourO, tThirdHourO,
    tFirstHourD, tSecondHourD, tThirdHourD;
    Button btnAparcar;
    ParkappService parkappService;
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
    private static DecimalFormat df = new DecimalFormat("0.00");
    //int [] listHorarioDisponible;
    int numRep;
    int horasAMostrar;
    Location currentLocation;
    FusedLocationProviderClient fusedLocationProviderClient;
    double latitude;
    double longitude;

    @RequiresApi(api = Build.VERSION_CODES.N)
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
        tFirstHourO = findViewById(R.id.textViewFirstHour);
        tSecondHourO = findViewById(R.id.textViewSecondHour);
        tThirdHourO = findViewById(R.id.textViewThirdHour);
        tFirstHourD = findViewById(R.id.textViewFirstHourD);
        tSecondHourD = findViewById(R.id.textViewSecondHourD);
        tThirdHourD = findViewById(R.id.textViewThirdHourD);

        parkappService = ServiceGenerator.createServiceZona(ParkappService.class);

        getCurrentLocation();

        //Obtengo la información de la zona que he seleccionado

        Call<ZonaDetail> call = parkappService.getZonaById(getIntent().getExtras().get("zonaId").toString());
        call.enqueue(new Callback<ZonaDetail>() {
            @Override
            public void onResponse(Call<ZonaDetail> call, Response<ZonaDetail> response) {
                if(response.isSuccessful()){
                    ZonaDetail myZona = response.body();

                    tName.setText(myZona.getNombre());
                    tUbicacion.setText(myZona.getUbicacion());
                    float results[] = new float[10];
                    Location.distanceBetween(latitude, longitude, myZona.getLatitud(), myZona.getLongitud(), results);
                    tDistancia.setText((df.format((double)results[0]/1000))+" km");

                    Glide
                            .with(MyApp.getContext())
                            .load("https://parkappsalesianos.herokuapp.com/parkapp/avatar/"+myZona.getAvatar())
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

        addHourOfAparcamientoOcupado();
        addHourOfAparcamientoDisponible();
        //fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(this);
        //fetchLastLocation();
    }

    private void getCurrentLocation(){
        LocationRequest locationRequest = new LocationRequest();
        locationRequest.setInterval(1000);
        locationRequest.setFastestInterval(3000);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);

        LocationServices.getFusedLocationProviderClient(ZonaDetailActivity.this)
                .requestLocationUpdates(locationRequest, new LocationCallback(){
                    @Override
                    public void onLocationResult(LocationResult locationResult) {
                        super.onLocationResult(locationResult);
                        LocationServices.getFusedLocationProviderClient(ZonaDetailActivity.this)
                                .removeLocationUpdates(this);
                        if(locationResult != null && locationResult.getLocations().size() > 0){
                            int latestLocationIndex = locationResult.getLocations().size() - 1;
                            latitude = locationResult.getLocations().get(latestLocationIndex).getLatitude();
                            longitude = locationResult.getLocations().get(latestLocationIndex).getLongitude();
                        }
                    }
                }, Looper.getMainLooper());
    }

    private void fetchLastLocation() {
        Task<Location> result = fusedLocationProviderClient.getLastLocation();
        result.addOnCompleteListener(this, task -> {
            if(task.isSuccessful() && task.getResult() != null){
                currentLocation = task.getResult();
            }else{
                Toast.makeText(this, "Localización no detectada", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void addHourOfAparcamientoOcupado(){
        //Se obtiene todos los historiales de fechas de todos los aparcamientos
        Call<List<Historial>> call = parkappService.getAllHistorial();
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
                    Toast.makeText(ZonaDetailActivity.this, "Error al obtener los datos", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<List<Historial>> call, Throwable t) {
                Toast.makeText(ZonaDetailActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void addHourOfAparcamientoDisponible(){
        //Se obtiene todos los historiales de fechas de todos los aparcamientos
        Call<List<Historial>> call = parkappService.getAllHistorial();
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


}
