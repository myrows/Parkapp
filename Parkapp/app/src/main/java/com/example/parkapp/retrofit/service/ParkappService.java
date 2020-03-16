package com.example.parkapp.retrofit.service;

import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.model.Historial;
import com.example.parkapp.retrofit.model.Login;
import com.example.parkapp.retrofit.model.Register;
import com.example.parkapp.retrofit.model.Resena;
import com.example.parkapp.retrofit.model.UserLogin;
import com.example.parkapp.retrofit.model.Zona;
import com.example.parkapp.retrofit.model.ZonaDetail;

import java.util.List;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface ParkappService {

    @POST("/parkapp/login")
    Call<UserLogin> login(@Body Login login);

    @Multipart
    @POST("/parkapp/register")
    Call<ResponseBody> register(@Part MultipartBody.Part avatar,
                                @Part("username") RequestBody username,
                                @Part("email") RequestBody email,
                                @Part("password") RequestBody password);

    @GET("/parkapp/zona")
    Call<List<Zona>> getZonas();


    @GET("/parkapp/aparcamiento")
    Call<List<Aparcamiento>> getAparcamientos();

    @GET("/parkapp/aparcamiento/{id}")
    Call<Aparcamiento> getAparcamiento(@Path("id") String id);

    @GET("/parkapp/historial/aparcamiento/{id}")
    Call<List<Historial>> getHistorialOfAparcamiento(@Path("id") String id);
    @GET("/parkapp/zona/{id}")
    Call<ZonaDetail> getZonaById(@Path("id") String zonaId);

    @GET("/parkapp/resena")
    Call<List<Resena>> getResenas();

    @GET("/parkapp/resena/zona/{id}")
    Call<List<Resena>> getResenaByZona(@Path("id") String zonaId);
}
