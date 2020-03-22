package com.example.parkapp.recyclerview.zona;

import androidx.core.app.ActivityCompat;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.RecyclerView;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.parkapp.R;
import com.example.parkapp.ZonaDetailActivity;
import com.example.parkapp.common.MyApp;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.data.zona.ZonaViewModel;
import com.example.parkapp.recyclerview.zona.ZonaFragment.OnListFragmentInteractionListener;
import com.example.parkapp.retrofit.model.Zona;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;

import java.text.DecimalFormat;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import static java.lang.Thread.sleep;

public class MyZonaRecyclerViewAdapter extends RecyclerView.Adapter<MyZonaRecyclerViewAdapter.ViewHolder> {

    private List<Zona> mValues;
    private final OnListFragmentInteractionListener mListener;
    Context ctx;
    Location currentLocation;
    FusedLocationProviderClient fusedLocationProviderClient;
    private static final int REQUEST_LOCATION = 1;
    //double latitude;
    //double longitude;
    LocationManager locationManager;
    double latitude, longitude;
    private static DecimalFormat df = new DecimalFormat("0.00");

    public MyZonaRecyclerViewAdapter(List<Zona> items, OnListFragmentInteractionListener listener) {
        mValues = items;
        mListener = listener;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_zona, parent, false);

        ctx = parent.getContext();

        locationManager = (LocationManager) ctx.getSystemService(Context.LOCATION_SERVICE);
        getLocation();

        return new ViewHolder(view);
    }

    private void getLocation() {
        if (ActivityCompat.checkSelfPermission(ctx, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(ctx, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions((Activity) ctx, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, REQUEST_LOCATION);
        }else {
            Location locationGps = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
            Location locationNetwork = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
            Location locationPassive = locationManager.getLastKnownLocation(LocationManager.PASSIVE_PROVIDER);

            if(locationGps != null){
                latitude = locationGps.getLatitude();
                longitude = locationGps.getLongitude();
            }
        }
    }

    private void fetchLastLocation() {
        Task<Location> task = fusedLocationProviderClient.getLastLocation();
        task.addOnSuccessListener(new OnSuccessListener<Location>() {
            @Override
            public void onSuccess(Location location) {
                if(location != null){
                    currentLocation = location;
                }
            }
        });
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        if(mValues != null) {
            holder.mItem = mValues.get(position);
            holder.tName.setText(holder.mItem.getNombre());
            holder.tUbicacion.setText(holder.mItem.getUbicacion());

            Collections.sort(mValues, new ComparatorDistance());

            float results[] = new float[10];
            Location.distanceBetween(latitude, longitude, holder.mItem.getLatitud(), holder.mItem.getLongitud(), results);
            holder.tDistancia.setText(df.format((double)results[0]/1000)+" km");
            holder.mItem.setDistancia((double)results[0]/1000);

            Glide
                    .with(ctx)
                    .load("https://parkappsalesianos.herokuapp.com/parkapp/avatar/"+holder.mItem.getAvatar())
                    .into(holder.imageZona);
        }

        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (null != mListener) {
                    SharedPreferencesManager.setSomeStringValue("zonaId",holder.mItem.getId());
                    Intent goDetailZona = new Intent(ctx, ZonaDetailActivity.class);
                    goDetailZona.putExtra("zonaId", holder.mItem.getId());
                    ctx.startActivity(goDetailZona);
                    mListener.onListFragmentInteraction(holder.mItem);
                }
            }
        });
    }

    public class ComparatorDistance implements Comparator<Zona> {

        @Override
        public int compare(Zona o1, Zona o2) {
            return o1.getDistancia().compareTo(o2.getDistancia());
        }
    }



    private void getCurrentLocation(){
        LocationRequest locationRequest = new LocationRequest();
        locationRequest.setInterval(1000);
        locationRequest.setFastestInterval(3000);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);

        LocationServices.getFusedLocationProviderClient(MyApp.getContext())
                .requestLocationUpdates(locationRequest, new LocationCallback(){
                    @Override
                    public void onLocationResult(LocationResult locationResult) {
                        super.onLocationResult(locationResult);
                        LocationServices.getFusedLocationProviderClient(MyApp.getContext())
                                .removeLocationUpdates(this);
                        if(locationResult != null && locationResult.getLocations().size() > 0){
                            int latestLocationIndex = locationResult.getLocations().size() - 1;
                            //latitude = locationResult.getLocations().get(latestLocationIndex).getLatitude();
                            //longitude = locationResult.getLocations().get(latestLocationIndex).getLongitude();
                        }
                    }
                }, Looper.getMainLooper());
    }

    public void setData(List<Zona> resultList){
        this.mValues = resultList;
        notifyDataSetChanged();
    }

    @Override
    public int getItemCount() {
        if(mValues != null) {
            return mValues.size();
        }else{
            return 0;
        }
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView tName, tUbicacion, tDistancia;
        public final ImageView imageZona;

        public Zona mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;

            tName = view.findViewById(R.id.NombreAparcamiento);
            tUbicacion = view.findViewById(R.id.ZonaAparcamiento);
            tDistancia = view.findViewById(R.id.textViewDistanciaZona);
            imageZona = view.findViewById(R.id.imagenAparcamiento);
        }
    }
}
