package com.example.parkapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.DialogFragment;

import android.os.Bundle;
import android.view.View;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.parkapp.common.MyApp;
import com.example.parkapp.data.resena.AnotacionDialogfragment;
import com.example.parkapp.data.resena.CustomDialogListener;
import com.example.parkapp.recyclerview.resena.ResenaFragment;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Resena;
import com.example.parkapp.retrofit.service.ParkappService;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ResenaActivity extends AppCompatActivity implements ResenaFragment.OnListFragmentInteractionListener, CustomDialogListener {

    FloatingActionButton fbtnResena;
    Resena resena;
    ParkappService service;
    RatingBar rate;
    TextView txtMsgRate;
    int myRating = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resena);

        fbtnResena = findViewById(R.id.floatAddResena);
        rate = findViewById(R.id.ratingBarResena);
        txtMsgRate = findViewById(R.id.textViewMessageR);

        service = ServiceGenerator.createServiceResena(ParkappService.class);

        fbtnResena.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AnotacionDialogfragment anotacionDialogfragment = new AnotacionDialogfragment();
                anotacionDialogfragment.show(getSupportFragmentManager(), null);
                anotacionDialogfragment.setStyle(DialogFragment.STYLE_NO_TITLE, android.R.style.Theme_Holo_Light_Dialog_NoActionBar_MinWidth);
            }
        });
    }

    @Override
    public void onListFragmentInteraction(Resena item) {

    }

    @Override
    public void submittedinformation(String title, String body, int rate) {
        resena = new Resena(title, body, rate, "", getIntent().getExtras().get("zonaId").toString());

        Call<ResponseBody> call = service.createResena(resena);
        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if(response.isSuccessful()){
                    Toast.makeText(ResenaActivity.this, "Gracias por aportar tu reseña", Toast.LENGTH_SHORT).show();
                }else{
                    Toast.makeText(ResenaActivity.this, "Ha ocurrido un error", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Toast.makeText(ResenaActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
