package com.example.parkapp.recylcerview.aparcamiento;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
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

import com.example.parkapp.LoginActivity;
import com.example.parkapp.PopularAparcamientoActivity;
import com.example.parkapp.R;
import com.example.parkapp.common.MyApp;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.data.AparcamientoViewModel;
import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.model.Zona;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.firebase.auth.FirebaseAuth;

import java.util.ArrayList;
import java.util.List;


public class AparcamientoFragment extends Fragment {


    private static final String ARG_COLUMN_COUNT = "column-count";
    private int mColumnCount = 1;
    private OnListFragmentInteractionListener mListener;
    AparcamientoViewModel aparcamientoViewModel;
    Context context;
    RecyclerView recyclerView;
    MyAparcamientoRecyclerViewAdapter adapter;
    List<Aparcamiento> listadoAparcamientos = new ArrayList<>();
    private FirebaseAuth mAuth;
    private GoogleSignInClient mGoogleSignInClient;

    public AparcamientoFragment() {
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
            adapter = new MyAparcamientoRecyclerViewAdapter(listadoAparcamientos, mListener);
            recyclerView.setAdapter(adapter);

            loadAparcamientos();
        }
        return view;
    }

    public void loadAparcamientos() {
        aparcamientoViewModel.getAparcamientos().observe(getActivity(), new Observer<List<Aparcamiento>>() {
            @Override
            public void onChanged(List<Aparcamiento> results) {
                listadoAparcamientos = results;
                adapter.setData(listadoAparcamientos);
            }
        });
    }

    private void showAlertDialog(){
        final AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setCancelable(false);
        builder.setMessage("¿Desea ver los aparcamientos mas populares?");

        builder.setPositiveButton("ACEPTAR", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Intent i = new Intent(MyApp.getContext(), PopularAparcamientoActivity.class);
                startActivity(i);
                dialog.dismiss();
            }
        });

        builder.setNegativeButton("CANCELAR", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });

        builder.create().show();

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
    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        setHasOptionsMenu(true);
    }

    @Override
    public void onCreateOptionsMenu(@NonNull Menu menu, @NonNull MenuInflater inflater) {
        inflater.inflate(R.menu.aparcamiento_menu, menu);
        super.onCreateOptionsMenu(menu, inflater);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {

        switch (item.getItemId()){
            case R.id.PopularAparcamiento:
                showAlertDialog();
                break;
            case R.id.logout:
                GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                        .requestIdToken(getString(R.string.default_web_client_id))
                        .requestEmail()
                        .build();

                mGoogleSignInClient = GoogleSignIn.getClient(context, gso);
                mAuth = FirebaseAuth.getInstance();
                mAuth.signOut();
                mGoogleSignInClient.signOut();

                SharedPreferencesManager.setSomeStringValue("tokenId", null);
                Intent login = new Intent(context, LoginActivity.class);
                startActivity(login);
        }

        return super.onOptionsItemSelected(item);
    }


    public interface OnListFragmentInteractionListener {
        void onListFragmentInteraction(Aparcamiento item);
    }
}
