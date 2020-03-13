package com.example.parkapp.retrofit.service;

import com.example.parkapp.retrofit.model.Login;
import com.example.parkapp.retrofit.model.UserLogin;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

public interface ParkappService {

    @POST("/parkapp/login")
    Call<UserLogin> login(@Body Login login);

    @Multipart
    @POST("/parkapp/register")
    Call<ResponseBody> register(@Part MultipartBody.Part avatar,
                                @Part("username") RequestBody username,
                                @Part("email") RequestBody email,
                                @Part("password") RequestBody password);
}
