package com.example.parkapp.recylcerview.aparcamiento;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.parkapp.R;
import com.example.parkapp.common.MyApp;
import com.example.parkapp.data.AparcamientoViewModel;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.model.ZonaDetail;
import com.example.parkapp.retrofit.service.ParkappService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DetalleAparcamientoActivity extends AppCompatActivity {

    TextView dimension, nombre, zona;
    ImageView imagenDetalle;
    Button ocupar;
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
        imagenDetalle = findViewById(R.id.ImagenDetalleAparcamiento);
        zona = findViewById(R.id.ZonaAparcamientoDetalle);
        ocupar = findViewById(R.id.ButtonOcupar);
        service = serviceGenerator.createServiceZona(ParkappService.class);

        Bundle extras = getIntent().getExtras();
        String aparcamientoId = extras.getString("APARCAMIENTO_ID");
        String idZona = extras.getString("ZONA_ID");

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
            public void onResponse(Call<Aparcamiento> call, Response<Aparcamiento> response) {
                if(response.isSuccessful()){
                    Aparcamiento aparcamiento = response.body();
                    nombre.setText(aparcamiento.getNombre());
                    dimension.setText(aparcamiento.getDimension());


                    Glide
                            .with(MyApp.getContext())
                            .load("http://10.0.2.2:3000/parkapp/avatar/"+aparcamiento.getAvatar())
                            .into(imagenDetalle);
                }else {
                    Toast.makeText(MyApp.getContext(), "No se ha podido obtener resultados de la api", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Aparcamiento> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
