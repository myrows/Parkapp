package com.example.parkapp.retrofit.service;

import com.example.parkapp.retrofit.model.Login;
import com.example.parkapp.retrofit.model.UserLogin;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ParkappService {

    @POST("/parkapp/login")
    Call<UserLogin> login(@Body Login login);
}
