package com.example.parkapp.data.resena;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;

import com.example.parkapp.R;
import com.example.parkapp.common.MyApp;
import com.example.parkapp.common.SharedPreferencesManager;

public class AnotacionDialogfragment extends DialogFragment {

    private EditText body;
    private EditText title;
    private RatingBar rate;
    private CustomDialogListener customDialogListener;
    int myRating = 0;
    private TextView txtMsgRate;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return LayoutInflater.from(getActivity()).inflate(R.layout.dialog_fragment_anotaciones, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        title = view.findViewById(R.id.editTextTituloD);
        body = view.findViewById(R.id.editTextBodyD);
        rate = view.findViewById(R.id.ratingBarResena);
        txtMsgRate = view.findViewById(R.id.textViewMessageR);

        rate.setOnRatingBarChangeListener(new RatingBar.OnRatingBarChangeListener() {
            @Override
            public void onRatingChanged(RatingBar ratingBar, float rating, boolean fromUser) {
                int rat = (int) rating;

                myRating = (int) ratingBar.getRating();

                switch (rat){
                    case 1:
                        txtMsgRate.setText("Muy mal");
                        break;
                    case 2:
                        txtMsgRate.setText("Mal");
                        break;
                    case 3:
                        txtMsgRate.setText("Mejorable");
                        break;
                    case 4:
                        txtMsgRate.setText("Bien");
                        break;
                    case 5:
                        txtMsgRate.setText("Excelente! :)");
                        break;
                }
            }
        });

        view.findViewById(R.id.buttonSave).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String titleR = title.getText().toString().trim();
                String bodyR = title.getText().toString().trim();

                customDialogListener.submittedinformation(titleR, bodyR, myRating, SharedPreferencesManager.getSomeStringValue("avatar"));
                dismiss();
            }
        });
        view.findViewById(R.id.buttonCancel).setOnClickListener(new View.OnClickListener() {
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
        customDialogListener = (CustomDialogListener) context;
    }catch (ClassCastException e){
        e.printStackTrace();
    }

    }
}
