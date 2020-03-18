package com.example.parkapp;

import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.example.parkapp.R;
import com.example.parkapp.HistorialAparcamientoFragment.OnListFragmentInteractionListener;
import com.example.parkapp.retrofit.model.Historial;
import com.example.parkapp.retrofit.model.Resena;
import com.example.parkapp.retrofit.model.Zona;

import java.util.List;

import jp.wasabeef.glide.transformations.CropCircleTransformation;


public class MyHistorialAparcamientoRecyclerViewAdapter extends RecyclerView.Adapter<MyHistorialAparcamientoRecyclerViewAdapter.ViewHolder> {

    private List<Historial> listadoHistorial;
    private final OnListFragmentInteractionListener mListener;
    Context ctx;

    public MyHistorialAparcamientoRecyclerViewAdapter(List<Historial> historiales, OnListFragmentInteractionListener listener) {
        listadoHistorial = historiales;
        mListener = listener;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_historial_aparcamiento, parent, false);
        ctx = parent.getContext();
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {

        if(listadoHistorial != null) {
            holder.historial = listadoHistorial.get(position);

            holder.diaEntrada.setText(holder.historial.getDia().toString());
            holder.fechaEntrada.setText(holder.historial.getFechaEntrada().toString());
            holder.fechaSalida.setText(holder.historial.getFechaSalida().toString());
        }
    }

    public void setData(List<Historial> resultList){
        this.listadoHistorial = resultList;
        notifyDataSetChanged();
    }

    @Override
    public int getItemCount() {
        if(listadoHistorial != null){
            return listadoHistorial.size();
        }else{
            return 0;
        }

    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView fechaEntrada, fechaSalida,diaEntrada;
        public Historial historial;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            diaEntrada = view.findViewById(R.id.fechaEntrada);
            fechaEntrada = view.findViewById(R.id.horarioEntrada);
            fechaSalida = view.findViewById(R.id.horarioSalida);

        }

    }
}
