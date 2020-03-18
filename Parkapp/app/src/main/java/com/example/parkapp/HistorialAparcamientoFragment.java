package com.example.parkapp;

import android.content.Context;
import android.os.Bundle;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.parkapp.MyHistorialAparcamientoRecyclerViewAdapter;
import com.example.parkapp.R;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.data.AparcamientoViewModel;
import com.example.parkapp.data.HistorialViewModel;
import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.model.Historial;
import com.example.parkapp.retrofit.model.Zona;
import java.util.ArrayList;
import java.util.List;


public class HistorialAparcamientoFragment extends Fragment {


    private static final String ARG_COLUMN_COUNT = "column-count";
    private int mColumnCount = 1;
    private OnListFragmentInteractionListener mListener;
    HistorialViewModel historialViewModel;
    Context context;
    RecyclerView recyclerView;
    MyHistorialAparcamientoRecyclerViewAdapter adapter;
    List<Historial> listadoHistorial = new ArrayList<>();

    public HistorialAparcamientoFragment() {
    }


    @SuppressWarnings("unused")
    public static HistorialAparcamientoFragment newInstance(int columnCount) {
        HistorialAparcamientoFragment fragment = new HistorialAparcamientoFragment();

        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;

    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        historialViewModel = new ViewModelProvider(getActivity()).get(HistorialViewModel.class);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_historial_aparcamiento_list, container, false);


        if (view instanceof RecyclerView) {

            context = view.getContext();
            recyclerView = (RecyclerView) view;

            if (mColumnCount <= 1) {

                recyclerView.setLayoutManager(new LinearLayoutManager(context));

            } else {

                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));

            }
            adapter = new MyHistorialAparcamientoRecyclerViewAdapter(listadoHistorial,mListener);
            recyclerView.setAdapter(adapter);

            loadHistorial();
        }
        return view;
    }

    public void loadHistorial() {
        historialViewModel.getHistorialOfAparcamiento().observe(getActivity(), new Observer<List<Historial>>() {
            @Override
            public void onChanged(List<Historial> results) {
                listadoHistorial = results;
                adapter.setData(listadoHistorial);
            }
        });
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnListFragmentInteractionListener) {
            mListener = (OnListFragmentInteractionListener) context;
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
        void onListFragmentInteraction(Historial item);
    }
}
