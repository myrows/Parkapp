package com.example.parkapp.recylcerview.aparcamiento;

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
import com.example.parkapp.common.MyApp;
import com.example.parkapp.recylcerview.aparcamiento.AparcamientoFragment.OnListFragmentInteractionListener;
import com.example.parkapp.retrofit.model.Aparcamiento;

import java.util.List;


public class MyAparcamientoRecyclerViewAdapter extends RecyclerView.Adapter<MyAparcamientoRecyclerViewAdapter.ViewHolder> {

    private List<Aparcamiento> aparcamientoList;
    private final OnListFragmentInteractionListener mListener;
    Context ctx;

    public MyAparcamientoRecyclerViewAdapter(List<Aparcamiento> aparcamientos, OnListFragmentInteractionListener listener) {
        aparcamientoList = aparcamientos;
        mListener = listener;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_aparcamiento, parent, false);

        ctx = parent.getContext();

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        if(aparcamientoList != null){
        holder.aparcamiento = aparcamientoList.get(position);

        holder.nombre.setText(aparcamientoList.get(position).getNombre());

            Glide
                    .with(ctx)
                    .load("http://10.0.2.2:3000/parkapp/avatar/"+holder.aparcamiento.getAvatar())
                    .into(holder.imagenAparcamiento);



            holder.mView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    if (holder.aparcamiento != null) {
                        Intent i = new Intent(ctx, DetalleAparcamientoActivity.class);
                        i.putExtra("APARCAMIENTO_ID", holder.aparcamiento.getId());
                        i.putExtra("ZONA_ID",holder.aparcamiento.getZonaId());
                        ctx.startActivity(i);
                        //TODO el id del usuario es null puede ocuparlo, si es distinto a null, desactivar la opcion del boton
                    }

                }
            });
        }
    }



    public void setData(List<Aparcamiento> resultList){
        this.aparcamientoList = resultList;
        notifyDataSetChanged();
    }

    @Override
    public int getItemCount() {
        if(aparcamientoList != null) {
            return aparcamientoList.size();
        }else{
            return 0;
        }
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView nombre;
        public final TextView zona;
        public final ImageView imagenAparcamiento;
        public Aparcamiento aparcamiento;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            nombre = (TextView) view.findViewById(R.id.NombreAparcamiento);
            zona = view.findViewById(R.id.ZonaAparcamiento);
            imagenAparcamiento = view.findViewById(R.id.imagenAparcamiento);
        }

}
}


