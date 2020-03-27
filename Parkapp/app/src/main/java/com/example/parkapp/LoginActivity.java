package com.example.parkapp;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.ebanx.swipebtn.OnStateChangeListener;
import com.ebanx.swipebtn.SwipeButton;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Login;
import com.example.parkapp.retrofit.model.UserLogin;
import com.example.parkapp.retrofit.service.ParkappService;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.HashMap;
import java.util.Map;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.example.parkapp.MapsActivity.MY_PERMISSIONS_REQUEST_LOCATION;

public class LoginActivity extends AppCompatActivity {

    EditText edtEmail, edtPassword;
    String token;
    SwipeButton swipeButton;
    TextView txtRegister;
    ParkappService service;
    private SignInButton signInButton;
    private GoogleSignInClient mGoogleSignInClient;
    private String TAG = "LoginActivity";
    private FirebaseAuth mAuth;
    private int RC_SIGN_IN = 1;
    private FirebaseFirestore db = FirebaseFirestore.getInstance();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        if(SharedPreferencesManager.getSomeStringValue("tokenId") != null) {
            Intent goMain = new Intent(LoginActivity.this, MainActivity.class);
            startActivity(goMain);
        }

        checkLocationPermission();

        signInButton = findViewById(R.id.sign_in_button);

        edtEmail = findViewById(R.id.editTextEmail);
        edtPassword = findViewById(R.id.editTextPassword);

        swipeButton = findViewById(R.id.swipe_btn);

        txtRegister = findViewById(R.id.textViewRegistrarse);

        mAuth = FirebaseAuth.getInstance();

        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build();

        mGoogleSignInClient = GoogleSignIn.getClient(this,gso);

        signInButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                signIn();
            }
        });

        txtRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent goRegister = new Intent(LoginActivity.this, RegisterActivity.class);
                startActivity(goRegister);
            }
        });

        swipeButton.setOnStateChangeListener(new OnStateChangeListener() {
            @Override
            public void onStateChange(boolean active) {
                if(active){
                    if (!edtEmail.getText().toString().isEmpty() && !edtPassword.getText().toString().isEmpty()){
                        if(token == null){
                            service = ServiceGenerator.createServiceLogin(ParkappService.class);
                            Login login = new Login(edtEmail.getText().toString(), edtPassword.getText().toString());

                            Call<UserLogin> call = service.login(login);
                            call.enqueue(new Callback<UserLogin>() {
                                @Override
                                public void onResponse(Call<UserLogin> call, Response<UserLogin> response) {
                                    if(response.isSuccessful()){
                                        Intent goMainActivity = new Intent(LoginActivity.this, MainActivity.class);
                                        startActivity(goMainActivity);
                                        Toast.makeText(LoginActivity.this, "Bienvenido, "+response.body().getUsername(), Toast.LENGTH_SHORT).show();

                                        SharedPreferencesManager.setSomeStringValue("tokenId", response.body().getToken());
                                        SharedPreferencesManager.setSomeStringValue("userId", response.body().getId());
                                        SharedPreferencesManager.setSomeStringValue("avatar", response.body().getAvatar());
                                    }else{
                                        Toast.makeText(LoginActivity.this, "Email y/o contraseña incorrecta", Toast.LENGTH_SHORT).show();
                                    }
                                }

                                @Override
                                public void onFailure(Call<UserLogin> call, Throwable t) {
                                    Toast.makeText(LoginActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                                }
                            });
                        }else{
                            Intent goMainActivity = new Intent(LoginActivity.this, MainActivity.class);
                            startActivity(goMainActivity);
                        }

                    }else{
                        Toast.makeText(LoginActivity.this, "Uno de los campos está sin rellenar", Toast.LENGTH_SHORT).show();
                    }
                }else{

                }
            }
        });
    }

    public boolean checkLocationPermission() {
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {

            if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                    Manifest.permission.ACCESS_FINE_LOCATION)) {

                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                        MY_PERMISSIONS_REQUEST_LOCATION);


            } else {
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                        MY_PERMISSIONS_REQUEST_LOCATION);
            }
            return false;
        } else {
            return true;
        }
    }

    @Override
    protected void onStart() {
        super.onStart();
        GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(this);
    }

    private void signIn(){
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == RC_SIGN_IN){
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInresult(task);
        }
    }

    private void handleSignInresult(Task<GoogleSignInAccount> completedTask){
        try{
            GoogleSignInAccount acc = completedTask.getResult(ApiException.class);

            FirebaseGoogleAuth(acc);

        }
        catch(ApiException e){
            Toast.makeText(LoginActivity.this, "El registro no se pudo completar",Toast.LENGTH_SHORT).show();
            FirebaseGoogleAuth(null);
        }
    }

    private void FirebaseGoogleAuth(GoogleSignInAccount acct){
        AuthCredential authCredential = GoogleAuthProvider.getCredential(acct.getIdToken(),null);
        mAuth.signInWithCredential(authCredential).addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete(@NonNull Task<AuthResult> task) {
                if(task.isSuccessful()){
                    Toast.makeText(LoginActivity.this, "Login Correcto",Toast.LENGTH_SHORT).show();
                    FirebaseUser user = mAuth.getCurrentUser();
                    updateUI(user);
                    Intent i = new Intent(LoginActivity.this, MainActivity.class);
                    startActivity(i);
                }else{
                    Toast.makeText(LoginActivity.this, "Login Incorrecto",Toast.LENGTH_SHORT).show();
                    updateUI(null);
                }
            }
        });
    }

    private void updateUI(FirebaseUser fUser){
        GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(getApplicationContext());
        //Obtenemos el UID
        SharedPreferencesManager.setSomeStringValue("userId",  fUser.getUid());
        SharedPreferencesManager.setSomeStringValue("tokenId", fUser.getUid());
        if(account != null){
            String name = account.getDisplayName();
            String givenName = account.getGivenName();
            String familyName = account.getFamilyName();
            String email = account.getEmail();
            String id = account.getId();
            Uri foto = account.getPhotoUrl();


            final Map<String, Object> usuario = new HashMap<>();
            usuario.put("name", account.getGivenName());
            usuario.put("surname", account.getFamilyName());
            usuario.put("email", account.getEmail());
            usuario.put("photoUrl", account.getPhotoUrl().toString());

            db.collection("users")
                    .document(fUser.getUid())
                    .get()
                    .addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
                        @Override
                        public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                            if(task.isSuccessful()){
                                DocumentSnapshot document = task.getResult();
                                if(document.exists()){
                                }else{
                                    db.collection("users")
                                            .document(fUser.getUid())
                                            .set(usuario);
                                }
                            }
                        }
                    });

        }
    }
}
