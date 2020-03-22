package com.example.parkapp.aparcamientosPopulares;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;

import com.example.parkapp.PopularAparcamientoActivity;
import com.example.parkapp.R;

import com.example.parkapp.common.MyApp;
import com.example.parkapp.data.AparcamientoViewModel;
import com.example.parkapp.recylcerview.aparcamiento.AparcamientoFragment;
import com.example.parkapp.recylcerview.aparcamiento.MyAparcamientoRecyclerViewAdapter;
import com.example.parkapp.retrofit.model.Aparcamiento;

import java.util.ArrayList;
import java.util.List;


public class AparcamientosPopularesFragment extends Fragment {

    private static final String ARG_COLUMN_COUNT = "column-count";
    private int mColumnCount = 1;
    private AparcamientosPopularesFragment.OnListFragmentInteractionListener mListener;
    AparcamientoViewModel aparcamientoViewModel;
    Context context;
    RecyclerView recyclerView;
    MyAparcamientosPopularesRecyclerViewAdapter adapter;
    List<Aparcamiento> listadoAparcamientosPopulares = new ArrayList<>();

    public AparcamientosPopularesFragment() {
    }


    @SuppressWarnings("unused")
    public static AparcamientoFragment newInstance(int columnCount) {
        AparcamientoFragment fragment = new AparcamientoFragment();

        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;

    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        aparcamientoViewModel = new ViewModelProvider(getActivity()).get(AparcamientoViewModel.class);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_aparcamiento_list, container, false);


        if (view instanceof RecyclerView) {

            context = view.getContext();
            recyclerView = (RecyclerView) view;

            if (mColumnCount <= 1) {

                recyclerView.setLayoutManager(new LinearLayoutManager(context));

            } else {

                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));

            }
            adapter = new MyAparcamientosPopularesRecyclerViewAdapter(listadoAparcamientosPopulares, mListener);
            recyclerView.setAdapter(adapter);

            loadAparcamientos();
        }
        return view;
    }

    public void loadAparcamientos() {
        aparcamientoViewModel.getAparcamientosPopulares().observe(getActivity(), new Observer<List<Aparcamiento>>() {
            @Override
            public void onChanged(List<Aparcamiento> results) {
                listadoAparcamientosPopulares = results;
                adapter.setData(listadoAparcamientosPopulares);
            }
        });
    }



    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof AparcamientosPopularesFragment.OnListFragmentInteractionListener) {
            mListener = (AparcamientosPopularesFragment.OnListFragmentInteractionListener) context;
        } else {

            throw new RuntimeException(context.toString()
                    + " must implement OnListFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }




    public interface OnListFragmentInteractionListener {
        void onListFragmentInteraction(Aparcamiento item);
    }
}
