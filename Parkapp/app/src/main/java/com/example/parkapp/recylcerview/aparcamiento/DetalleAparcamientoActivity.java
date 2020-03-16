package com.example.parkapp.recylcerview.aparcamiento;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.parkapp.R;
import com.example.parkapp.common.MyApp;
import com.example.parkapp.data.AparcamientoViewModel;
import com.example.parkapp.data.ZonaViewModel;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.service.ParkappService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DetalleAparcamientoActivity extends AppCompatActivity {

    TextView dimension, nombre, zona;
    ImageView imagenDetalle;
    Button ocupar;
    String idAparcamiento,idZona;
    Aparcamiento Iaparcamiento;
    ServiceGenerator serviceGenerator;
    ParkappService service;
    AparcamientoViewModel aparcamientoViewModel;
    ZonaViewModel zonaViewModel;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detalle_aparcamiento);

        dimension = findViewById(R.id.DimensionAparcamientoDetalle);
        nombre = findViewById(R.id.NombreAparcamientoDetalle);
        imagenDetalle = findViewById(R.id.ImagenDetalleAparcamiento);
        zona = findViewById(R.id.ZonaAparcamientoDetalle);
        ocupar = findViewById(R.id.ButtonOcupar);

        Bundle extras = getIntent().getExtras();
        idAparcamiento = extras.getString("APARCAMIENTO_ID");
        idZona = extras.getString("ZONA_ID");

        Toast.makeText(this, "Id: " + idAparcamiento, Toast.LENGTH_SHORT).show();
        Toast.makeText(this, "Id: " + idZona, Toast.LENGTH_SHORT).show();
        service = serviceGenerator.createServiceZona(ParkappService.class);

        zonaViewModel = new ViewModelProvider(this).get(ZonaViewModel.class);
        zonaViewModel



        aparcamientoViewModel = new ViewModelProvider(this).get(AparcamientoViewModel.class);
        aparcamientoViewModel.getAparcamiento(idAparcamiento).observeForever(new Observer<Aparcamiento>() {
            @Override
            public void onChanged(final Aparcamiento aparcamiento) {
                Iaparcamiento = aparcamiento;

                Call<Aparcamiento> call = service.getAparcamiento(idAparcamiento);
                call.enqueue(new Callback<Aparcamiento>() {
                    @Override
                    public void onResponse(Call<Aparcamiento> call, Response<Aparcamiento> response) {
                        if(response.isSuccessful() && aparcamiento !=null){
                            Glide
                                    .with(MyApp.getContext())
                                    .load("http://10.0.2.2:3000/parkapp/avatar/"+aparcamiento.getAvatar())
                                    .into(imagenDetalle);
                            dimension.setText(aparcamiento.getDimension());
                            nombre.setText(aparcamiento.getNombre());
                            dimension.setText(aparcamiento.getDimension());

                        }else{

                        }
                    }

                    @Override
                    public void onFailure(Call<Aparcamiento> call, Throwable t) {

                    }
                });
            }
        });
    }
}
