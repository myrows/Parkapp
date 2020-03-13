package com.example.parkapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.ebanx.swipebtn.OnStateChangeListener;
import com.ebanx.swipebtn.SwipeButton;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Login;
import com.example.parkapp.retrofit.model.UserLogin;
import com.example.parkapp.retrofit.service.ParkappService;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    EditText edtEmail, edtPassword;
    String token;
    SwipeButton swipeButton;
    ParkappService service;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        edtEmail = findViewById(R.id.editTextEmail);
        edtPassword = findViewById(R.id.editTextPassword);

        swipeButton = findViewById(R.id.swipe_btn);

        swipeButton.setOnStateChangeListener(new OnStateChangeListener() {
            @Override
            public void onStateChange(boolean active) {
                if(active){
                    if (!edtEmail.getText().toString().isEmpty() && !edtPassword.getText().toString().isEmpty()){
                        if(token == null){
                            service = ServiceGenerator.createServiceLogin(ParkappService.class);
                            Login login = new Login(edtEmail.getText().toString(), edtPassword.getText().toString());

                            Call<UserLogin> call = service.login(login);
                            call.enqueue(new Callback<UserLogin>() {
                                @Override
                                public void onResponse(Call<UserLogin> call, Response<UserLogin> response) {
                                    if(response.isSuccessful()){
                                        Intent goMainActivity = new Intent(LoginActivity.this, MainActivity.class);
                                        startActivity(goMainActivity);
                                        Toast.makeText(LoginActivity.this, "Bienvenido, "+response.body().getUsername(), Toast.LENGTH_SHORT).show();
                                        token = response.body().getToken();

                                        //SharedPreferencesManager.setSomeStringValue("token", token);
                                    }else{
                                        Toast.makeText(LoginActivity.this, "Email y/o contraseña incorrecta", Toast.LENGTH_SHORT).show();
                                    }
                                }

                                @Override
                                public void onFailure(Call<UserLogin> call, Throwable t) {
                                    Toast.makeText(LoginActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                                }
                            });
                        }else{
                            Intent goMainActivity = new Intent(LoginActivity.this, MainActivity.class);
                            startActivity(goMainActivity);
                        }

                    }else{
                        Toast.makeText(LoginActivity.this, "Uno de los campos está sin rellenar", Toast.LENGTH_SHORT).show();
                    }
                }else{

                }
            }
        });
    }
}
