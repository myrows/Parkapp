package com.example.parkapp.recyclerview.resena;

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
import com.example.parkapp.recyclerview.resena.ResenaFragment.OnListFragmentInteractionListener;
import com.example.parkapp.retrofit.model.Resena;
import com.example.parkapp.retrofit.model.Zona;

import java.util.List;

import jp.wasabeef.glide.transformations.CropCircleTransformation;


public class MyResenaRecyclerViewAdapter extends RecyclerView.Adapter<MyResenaRecyclerViewAdapter.ViewHolder> {

    private List<Resena> mValues;
    private final OnListFragmentInteractionListener mListener;
    Context ctx;

    public MyResenaRecyclerViewAdapter(List<Resena> items, OnListFragmentInteractionListener listener) {
        mValues = items;
        mListener = listener;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_resena, parent, false);

        ctx = parent.getContext();

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {

        if(mValues != null) {
            holder.mItem = mValues.get(position);

            holder.tTitulo.setText(holder.mItem.getTitle());
            holder.tBody.setText(holder.mItem.getBody());
            holder.ratingResena.setRating(holder.mItem.getRate());

            Glide
                    .with(ctx)
                    .load("https://parkappsalesianos.herokuapp.com/parkapp/avatar/"+holder.mItem.getAvatar())
                    .apply(new RequestOptions().bitmapTransform(new CropCircleTransformation()))
                    .into(holder.imageResena);



        }

        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (null != mListener) {
                    // Notify the active callbacks interface (the activity, if the
                    // fragment is attached to one) that an item has been selected.
                    mListener.onListFragmentInteraction(holder.mItem);
                }
            }
        });
    }

    public void setData(List<Resena> resultList){
        this.mValues = resultList;
        notifyDataSetChanged();
    }

    @Override
    public int getItemCount() {
        if(mValues != null){
            return mValues.size();
        }else{
            return 0;
        }

    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final ImageView imageResena;
        public final TextView tTitulo, tBody;
        public final RatingBar ratingResena;


        public Resena mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;

            imageResena= view.findViewById(R.id.imageViewResena);
            tTitulo = view.findViewById(R.id.textViewTituloResena);
            tBody = view.findViewById(R.id.textViewBodyResena);
            ratingResena = view.findViewById(R.id.ratingBarResena);

        }

    }
}
