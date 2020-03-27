package com.example.parkapp.recyclerview.resena;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
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
import com.example.parkapp.R;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.data.resena.ResenaViewModel;
import com.example.parkapp.retrofit.model.Resena;
import com.example.parkapp.retrofit.model.Zona;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.firebase.auth.FirebaseAuth;

import java.util.ArrayList;
import java.util.List;

/**
 * A fragment representing a list of Items.
 * <p/>
 * Activities containing this fragment MUST implement the {@link OnListFragmentInteractionListener}
 * interface.
 */
public class ResenaFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private OnListFragmentInteractionListener mListener;
    Context context;
    RecyclerView recyclerView;
    ResenaViewModel resenaViewModel;
    List<Resena> listResena = new ArrayList<>();
    MyResenaRecyclerViewAdapter adapter;
    private FirebaseAuth mAuth;
    private GoogleSignInClient mGoogleSignInClient;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public ResenaFragment() {
    }

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static ResenaFragment newInstance(int columnCount) {
        ResenaFragment fragment = new ResenaFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        resenaViewModel = new ViewModelProvider(getActivity()).get(ResenaViewModel.class);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_resena_list, container, false);

        // Set the adapter
        if (view instanceof RecyclerView) {
            context = view.getContext();
            recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
            adapter = new MyResenaRecyclerViewAdapter(listResena, mListener);
            recyclerView.setAdapter(adapter);

            loadResenaData();
        }
        return view;
    }

    public void loadResenaData() {
        resenaViewModel.getResenas().observeForever(new Observer<List<Resena>>() {
            @Override
            public void onChanged(List<Resena> resenas) {
                listResena = resenas;
                adapter.setData(listResena);
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

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p/>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnListFragmentInteractionListener {
        // TODO: Update argument type and name
        void onListFragmentInteraction(Resena item);
    }

    @Override
    public void onCreateOptionsMenu(@NonNull Menu menu, @NonNull MenuInflater inflater) {
        inflater.inflate(R.menu.nav_menu, menu);
        super.onCreateOptionsMenu(menu, inflater);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {

        switch (item.getItemId()){
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
}
