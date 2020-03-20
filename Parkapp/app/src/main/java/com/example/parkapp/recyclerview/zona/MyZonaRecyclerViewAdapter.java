package com.example.parkapp.recyclerview.zona;

import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.parkapp.R;
import com.example.parkapp.ZonaDetailActivity;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.recyclerview.zona.ZonaFragment.OnListFragmentInteractionListener;
import com.example.parkapp.retrofit.model.Zona;

import java.util.List;

public class MyZonaRecyclerViewAdapter extends RecyclerView.Adapter<MyZonaRecyclerViewAdapter.ViewHolder> {

    private List<Zona> mValues;
    private final OnListFragmentInteractionListener mListener;
    Context ctx;

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

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        if(mValues != null) {
            holder.mItem = mValues.get(position);

            holder.tName.setText(holder.mItem.getNombre());
            holder.tDistancia.setText(holder.mItem.getDistancia()+" km");
            holder.tUbicacion.setText(holder.mItem.getUbicacion());

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
