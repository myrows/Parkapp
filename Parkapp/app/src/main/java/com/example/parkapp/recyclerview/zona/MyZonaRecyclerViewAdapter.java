package com.example.parkapp.recyclerview.zona;

import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.location.Location;
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
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;

import java.util.List;

import static java.lang.Thread.sleep;

public class MyZonaRecyclerViewAdapter extends RecyclerView.Adapter<MyZonaRecyclerViewAdapter.ViewHolder> {

    private List<Zona> mValues;
    private final OnListFragmentInteractionListener mListener;
    Context ctx;
    Location currentLocation;
    FusedLocationProviderClient fusedLocationProviderClient;
    private static final int REQUEST_CODE = 101;

    public MyZonaRecyclerViewAdapter(List<Zona> items, OnListFragmentInteractionListener listener) {
        mValues = items;
        mListener = listener;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_zona, parent, false);

        ctx = parent.getContext();


        return new ViewHolder(view);
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
        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(ctx);
        fetchLastLocation();
        if(mValues != null) {
            holder.mItem = mValues.get(position);
            holder.tName.setText(holder.mItem.getNombre());
            holder.tUbicacion.setText(holder.mItem.getUbicacion());

            /*float results[] = new float[10];
            Location.distanceBetween(currentLocation.getLatitude(), currentLocation.getLongitude(), holder.mItem.getLatitud(), holder.mItem.getLongitud(), results);
            holder.tDistancia.setText(results[0]+" km");*/

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
