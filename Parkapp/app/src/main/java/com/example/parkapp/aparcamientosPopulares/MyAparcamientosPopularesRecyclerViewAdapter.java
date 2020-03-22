package com.example.parkapp.aparcamientosPopulares;

import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.parkapp.R;

import com.example.parkapp.common.MyApp;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.recylcerview.aparcamiento.AparcamientoFragment.OnListFragmentInteractionListener;
import com.example.parkapp.recylcerview.aparcamiento.DetalleAparcamientoActivity;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.model.ZonaDetail;
import com.example.parkapp.retrofit.service.ParkappService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class MyAparcamientosPopularesRecyclerViewAdapter extends RecyclerView.Adapter<MyAparcamientosPopularesRecyclerViewAdapter.ViewHolder> {

    private List<Aparcamiento> aparcamientoList;
    private final AparcamientosPopularesFragment.OnListFragmentInteractionListener mListener;
    Context ctx;
    ParkappService service;
    ServiceGenerator serviceGenerator;


    public MyAparcamientosPopularesRecyclerViewAdapter(List<Aparcamiento> aparcamientos, AparcamientosPopularesFragment.OnListFragmentInteractionListener listener) {
        aparcamientoList = aparcamientos;
        mListener = listener;
    }

    @Override
    public MyAparcamientosPopularesRecyclerViewAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_aparcamiento, parent, false);

        ctx = parent.getContext();

        return new MyAparcamientosPopularesRecyclerViewAdapter.ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final MyAparcamientosPopularesRecyclerViewAdapter.ViewHolder holder, final int position) {
        if(aparcamientoList != null){
            service = serviceGenerator.createServiceZona(ParkappService.class);
            holder.aparcamiento = aparcamientoList.get(position);
            Call<ZonaDetail> call = service.getZonaById(holder.aparcamiento.getZonaId());

            call.enqueue(new Callback<ZonaDetail>() {
                @Override
                public void onResponse(Call<ZonaDetail> call, Response<ZonaDetail> response) {
                    if(response.isSuccessful()){
                        holder.zona.setText(response.body().getNombre());
                    }else
                    {
                        Toast.makeText(MyApp.getContext(), "No se ha podido obtener resultados de la api", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<ZonaDetail> call, Throwable t) {
                    Toast.makeText(MyApp.getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
                }
            });

            holder.nombre.setText(aparcamientoList.get(position).getNombre());

            Glide
                    .with(ctx)
                    .load("https://parkappsalesianos.herokuapp.com/parkapp/avatar/"+holder.aparcamiento.getAvatar())
                    .into(holder.imagenAparcamiento);



            holder.mView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    if (null != mListener) {
                        Intent i = new Intent(ctx, DetalleAparcamientoActivity.class);
                        SharedPreferencesManager.setSomeStringValue("aparcamiento_id",holder.aparcamiento.getId());
                        i.putExtra("APARCAMIENTO_ID", holder.aparcamiento.getId());
                        SharedPreferencesManager.setSomeStringValue("ZONAID", holder.aparcamiento.getZonaId());
                        ctx.startActivity(i);
                        mListener.onListFragmentInteraction(holder.aparcamiento);
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
