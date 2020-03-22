package com.example.parkapp;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;

import com.example.parkapp.common.MyApp;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.data.resena.CustomDialogListener;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.service.ParkappService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AparcamientoDialogfragment extends DialogFragment {

    ImageView imgEmot;
    TextView tValorate;
    RatingBar rtBar;
    Button cancel, save;
    int myRating = 0;
    CustomMiAparcamientoDialogfragment customMiAparcamientoDialogfragment;
    ParkappService parkappService;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return LayoutInflater.from(getActivity()).inflate(R.layout.dialog_aparcamiento_fragment, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        tValorate = view.findViewById(R.id.textViewValorate);
        rtBar = view.findViewById(R.id.ratingBarAparcamiento);
        cancel = view.findViewById(R.id.buttonCancelA);
        save = view.findViewById(R.id.buttonSaveA);
        imgEmot = view.findViewById(R.id.imageViewEmoticon);

        parkappService = ServiceGenerator.createServiceAparcamiento(ParkappService.class);

        rtBar.setOnRatingBarChangeListener(new RatingBar.OnRatingBarChangeListener() {
            @Override
            public void onRatingChanged(RatingBar ratingBar, float rating, boolean fromUser) {
                int rat = (int) rating;

                myRating = (int) ratingBar.getRating();

                switch (rat){
                    case 1:
                        imgEmot.setImageDrawable(getResources().getDrawable(R.drawable.ic_angry));
                        break;
                    case 2:
                        imgEmot.setImageDrawable(getResources().getDrawable(R.drawable.ic_angry_2));
                        break;
                    case 3:
                        imgEmot.setImageDrawable(getResources().getDrawable(R.drawable.ic_happy));
                        break;
                    case 4:
                        imgEmot.setImageDrawable(getResources().getDrawable(R.drawable.ic_grinning));
                        break;
                    case 5:
                        imgEmot.setImageDrawable(getResources().getDrawable(R.drawable.ic_famous));
                        break;

                }
            }
        });

        view.findViewById(R.id.buttonSaveA).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                customMiAparcamientoDialogfragment.submittedinformation(myRating);
                dismiss();
            }
        });

        view.findViewById(R.id.buttonCancelA).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dismiss();
            }
        });
    }

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);

        try {
            customMiAparcamientoDialogfragment = (CustomMiAparcamientoDialogfragment) context;
        }catch (ClassCastException e){
            e.printStackTrace();
        }

    }
}
