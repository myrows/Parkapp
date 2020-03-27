package com.example.parkapp;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.location.Geocoder;
import android.location.Location;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.ResultReceiver;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.example.parkapp.common.MyApp;
import com.example.parkapp.common.SharedPreferencesManager;
import com.example.parkapp.models.direction.DirectionFinder;
import com.example.parkapp.models.direction.DirectionFinderListener;
import com.example.parkapp.models.direction.Route;
import com.example.parkapp.recylcerview.aparcamiento.DetalleAparcamientoActivity;
import com.example.parkapp.retrofit.generator.ServiceGenerator;
import com.example.parkapp.retrofit.model.Aparcamiento;
import com.example.parkapp.retrofit.model.Zona;
import com.example.parkapp.retrofit.service.ParkappService;
import com.example.parkapp.service.FetchAddressIntentService;
import com.example.parkapp.utils.Connections;
import com.example.parkapp.utils.Constants;
import com.example.parkapp.utils.PermissionGPS;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.Circle;
import com.google.android.gms.maps.model.CircleOptions;
import com.google.android.gms.maps.model.Dash;
import com.google.android.gms.maps.model.Dot;
import com.google.android.gms.maps.model.Gap;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.PatternItem;
import com.google.android.gms.maps.model.Polygon;
import com.google.android.gms.maps.model.PolygonOptions;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;
import com.google.android.gms.tasks.Task;
import com.google.android.libraries.places.compat.Place;
import com.google.android.libraries.places.compat.ui.PlaceAutocompleteFragment;
import com.google.android.libraries.places.compat.ui.PlaceSelectionListener;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.firebase.auth.FirebaseAuth;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by kodetr on 09/05/19.
 */

public class MapsActivity extends AppCompatActivity implements GoogleMap.OnMarkerClickListener, GoogleMap.OnMapClickListener,
        OnMapReadyCallback, DirectionFinderListener {

    private static final String TAG = MapsActivity.class.getSimpleName();
    private LatLng LocationA = new LatLng(37.3828300, -5.9731700);

    private static final float DEFAULT_ZOOM = 9.5f;

    private static final long UPDATE_INTERVAL = 500;
    private static final long FASTEST_UPDATE_INTERVAL = UPDATE_INTERVAL / 5;
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1;
    private static boolean gpsFirstOn = true;

    private GoogleMap map;
    private FusedLocationProviderClient fusedLocationProvider;
    private LocationRequest locationRequest;
    private LocationCallback locationCallback;
    private Location locationgps;
    private ResultReceiver resultReceiver;
    private Marker selectedMarker;
    private LatLng searchLocation;
    private double selectLatitud;
    private double selectLongitud;
    double latitud;
    double longitude;
    private String idAparcamientoSelected;


    private List<Marker> originMarkers = new ArrayList<>();
    private List<Marker> destinationMarker = new ArrayList<>();
    private List<Polyline> polyLinePaths = new ArrayList<>();

    private ProgressDialog progressDialog;

    private ParkappService service;
    List<Zona> listado;
    List<Aparcamiento> aparcamientos;

    //Polygon
    private static final int COLOR_BLACK_ARGB = 0xff000000;
    private static final int COLOR_WHITE_ARGB = 0xffffffff;
    private static final int COLOR_GREEN_ARGB = 0xff388E3C;
    private static final int COLOR_PURPLE_ARGB = 0xff81C784;
    private static final int COLOR_ORANGE_ARGB = 0xffF57F17;
    private static final int COLOR_BLUE_ARGB = 0xffF9A825;

    private static final int POLYGON_STROKE_WIDTH_PX = 8;
    private static final int PATTERN_DASH_LENGTH_PX = 20;
    private static final int PATTERN_GAP_LENGTH_PX = 20;
    private static final PatternItem DOT = new Dot();
    private static final PatternItem DASH = new Dash(PATTERN_DASH_LENGTH_PX);
    private static final PatternItem GAP = new Gap(PATTERN_GAP_LENGTH_PX);
    // Create a stroke pattern of a gap followed by a dash.
    private static final List<PatternItem> PATTERN_POLYGON_ALPHA = Arrays.asList(GAP, DASH);

    // Create a stroke pattern of a dot followed by a gap, a dash, and another gap.
    private static final List<PatternItem> PATTERN_POLYGON_BETA =
            Arrays.asList(DOT, GAP, DASH, GAP);
    private FirebaseAuth mAuth;
    private GoogleSignInClient mGoogleSignInClient;


    @SuppressLint("SetTextI18n")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            checkLocationPermission();
        }

        if (!Connections.checkConnection(this)) {
            Toast.makeText(this, "Error de conexión", Toast.LENGTH_SHORT).show();
            finish();
        }

        init();

        fusedLocationProvider = LocationServices.getFusedLocationProviderClient(this);
        resultReceiver = new ResultReceiver(new Handler()) {
            @Override
            protected void onReceiveResult(int resultCode, Bundle resultData) {
                String addressOutput = resultData.getString(Constants.RESULT_DATA_KEY);
                Toast.makeText(getApplicationContext(), addressOutput, Toast.LENGTH_SHORT).show();
            }
        };

        locationgps = new Location("Point A");

        setupAutoCompleteFragment();

        FloatingActionButton fa = findViewById(R.id.fblocation);
        fa.setOnClickListener(view -> {
            //Toast.makeText(this, searchLocation.latitude+","+searchLocation.longitude, Toast.LENGTH_SHORT).show();
            if(searchLocation != null) {
                try {
                    String origin = locationgps.getLatitude() + "," + locationgps.getLongitude();
                    //new DirectionFinder(MapsActivity.this, origin, searchLocation.latitude + "," + searchLocation.longitude).execute(getString(R.string.google_maps_key));
                    new DirectionFinder(MapsActivity.this, origin, searchLocation.latitude + "," + searchLocation.longitude).execute(getString(R.string.google_maps_key));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }else {
                try {
                    String origin = locationgps.getLatitude() + "," + locationgps.getLongitude();
                    new DirectionFinder(MapsActivity.this, origin, selectLatitud + "," + selectLongitud).execute(getString(R.string.google_maps_key));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            showAlertNavigation();
        });
    }

    @SuppressLint("SetTextI18n")
    private void init() {

        final FloatingActionButton ft = findViewById(R.id.fbsatelite);
        ft.setOnClickListener(view -> {
            if (map != null) {
                int MapType = map.getMapType();
                if (MapType == 1) {
                    ft.setImageResource(R.drawable.ic_satellite_off);
                    map.setMapType(GoogleMap.MAP_TYPE_SATELLITE);
                } else {
                    ft.setImageResource(R.drawable.ic_satellite_on);
                    map.setMapType(GoogleMap.MAP_TYPE_NORMAL);
                }
            }
        });

        FloatingActionButton fm = findViewById(R.id.fbgps);
        fm.setOnClickListener(view -> {
            getDeviceLocation(true);
            if (!Geocoder.isPresent()) {
                showSnackbar(R.string.no_geocoder_available, Snackbar.LENGTH_LONG, 0, null);
            } else {
                showAddress();
            }
        });

        locationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                if (locationResult == null)
                    return;

                for (Location locationUpdate : locationResult.getLocations()) {
                    locationgps = locationUpdate;
                    if (gpsFirstOn) {
                        gpsFirstOn = false;
                        getDeviceLocation(true);
                    }
                }
            }
        };

        locationRequest = new LocationRequest();
        locationRequest.setInterval(UPDATE_INTERVAL);
        locationRequest.setFastestInterval(FASTEST_UPDATE_INTERVAL);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);

        MapFragment mapFragment = (MapFragment) getFragmentManager().findFragmentById(R.id.mapG);
        mapFragment.getMapAsync(this);
    }

    private void setupAutoCompleteFragment() {
        PlaceAutocompleteFragment autocompleteFragment = (PlaceAutocompleteFragment)
                getFragmentManager().findFragmentById(R.id.place_autocomplete_fragment);
        autocompleteFragment.setOnPlaceSelectedListener(new PlaceSelectionListener() {
            @Override
            public void onPlaceSelected(Place place) {
                searchLocation = place.getLatLng();
            }

            @Override
            public void onError(Status status) {
                Log.e("Error", status.getStatusMessage());
            }
        });
    }

    private BitmapDescriptor bitmapDescriptorFromVector(Context context, int vectorResId) {
        Drawable vectorDrawable = ContextCompat.getDrawable(context, vectorResId);
        vectorDrawable.setBounds(0, 0, vectorDrawable.getIntrinsicWidth(), vectorDrawable.getIntrinsicHeight());
        Bitmap bitmap = Bitmap.createBitmap(vectorDrawable.getIntrinsicWidth(), vectorDrawable.getIntrinsicHeight(), Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        vectorDrawable.draw(canvas);
        return BitmapDescriptorFactory.fromBitmap(bitmap);
    }

    private void stylePolygon(Polygon polygon) {
        String type = "";
        // Get the data object stored with the polygon.
        if (polygon.getTag() != null) {
            type = polygon.getTag().toString();
        }

        List<PatternItem> pattern = null;
        int strokeColor = COLOR_BLACK_ARGB;
        int fillColor = COLOR_WHITE_ARGB;

        switch (type) {
            // If no type is given, allow the API to use the default.
            case "alpha":
                // Apply a stroke pattern to render a dashed line, and define colors.
                pattern = PATTERN_POLYGON_ALPHA;
                strokeColor = COLOR_GREEN_ARGB;
                fillColor = COLOR_PURPLE_ARGB;
                break;
            case "beta":
                // Apply a stroke pattern to render a line of dots and dashes, and define colors.
                pattern = PATTERN_POLYGON_BETA;
                strokeColor = COLOR_ORANGE_ARGB;
                fillColor = COLOR_BLUE_ARGB;
                break;
        }

        polygon.setStrokePattern(pattern);
        polygon.setStrokeWidth(POLYGON_STROKE_WIDTH_PX);
        polygon.setStrokeColor(strokeColor);
        polygon.setFillColor(fillColor);
    }

    @Override
    public void onMapReady(GoogleMap gMap) {
        map = gMap;

        service = ServiceGenerator.createServiceZona(ParkappService.class);
        Call<List<Zona>> call = service.getZonas();

        call.enqueue(new Callback<List<Zona>>() {
            @Override
            public void onResponse(Call<List<Zona>> call, Response<List<Zona>> response) {
                if(response.isSuccessful()){
                    listado = response.body();

                    for(int i = 0; i<listado.size(); i++){
                        //SI NO ESTA VACIO
                        if(listado.get(i).getLatitud() != null && listado.get(i).getLongitud() != null) {
                            Marker m = map.addMarker(new MarkerOptions()
                                    .position(new LatLng(listado.get(i).getLatitud(),listado.get(i).getLongitud()))
                                    .icon(bitmapDescriptorFromVector(MyApp.getContext(), R.drawable.ic_parking_lot))
                                    .title(listado.get(i).getNombre()));
                            // Instantiates a new CircleOptions object and defines the center and radius
                            CircleOptions circleOptions = new CircleOptions()
                                    .fillColor(Color.TRANSPARENT)
                                    .strokeColor(0x220000FF)
                                    .fillColor(0x220000FF)
                                    .strokeWidth(5)
                                    .center(new LatLng(listado.get(i).getLatitud(), listado.get(i).getLongitud()))
                                    .radius(750); // In meters

                            // Get back the mutable Circle
                            map.addCircle(circleOptions);
                            map.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(37.3828300, -5.9731700),14.0f));
                        }
                    }
                }
            }
            @Override
            public void onFailure(Call<List<Zona>> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error al realizar la petición", Toast.LENGTH_SHORT).show();
            }

        });
        Call<List<Aparcamiento>> callaAparcamiento = service.getAparcamientos();
        callaAparcamiento.enqueue(new Callback<List<Aparcamiento>>() {
            @Override
            public void onResponse(Call<List<Aparcamiento>> call, Response<List<Aparcamiento>> response) {
                if(response.isSuccessful()){
                    aparcamientos = response.body();

                    for(int i = 0; i<aparcamientos.size(); i++){
                        //SI NO ESTA VACIO
                        if(aparcamientos.get(i).getLatitud() != null && aparcamientos.get(i).getLongitud() != null) {
                            Marker m = map.addMarker(new MarkerOptions()
                                    .position(new LatLng(aparcamientos.get(i).getLatitud(),aparcamientos.get(i).getLongitud()))
                                    .icon(bitmapDescriptorFromVector(MyApp.getContext(), R.drawable.ic_pinterest2))
                                    .title(aparcamientos.get(i).getNombre()));

                            m.setSnippet(aparcamientos.get(i).getId());
                        }

                    }
            } }

            @Override
            public void onFailure(Call<List<Aparcamiento>> call, Throwable t) {

            }
        });

        map.setOnMapClickListener(this);
        map.setOnMarkerClickListener(this);

        map.moveCamera(CameraUpdateFactory.newLatLngZoom(LocationA, DEFAULT_ZOOM));

        map.getUiSettings().setMapToolbarEnabled(false);
        map.getUiSettings().setMyLocationButtonEnabled(false);
//        map.getUiSettings().setCompassEnabled(false);

        // TODO : location
        map.getProjection().getVisibleRegion();

        if (!checkPermission())
            requestPermission();

        getDeviceLocation(false);
    }



    @Override
    public void onDirectionFinderStart() {
        progressDialog = ProgressDialog.show(this, "Espera un momento", "Buscando la ruta más cercana", true);
        if (originMarkers != null) {
            for (Marker marker : originMarkers) {
                marker.remove();
            }
        }
        if (destinationMarker != null) {
            for (Marker marker : destinationMarker) {
                marker.remove();
            }
        }
        if (polyLinePaths != null) {
            for (Polyline polylinePath : polyLinePaths) {
                polylinePath.remove();
            }
        }
    }

    @Override
    public void onDirectionFinderSuccess(List<Route> routes) {
        progressDialog.dismiss();
        polyLinePaths = new ArrayList<>();
        originMarkers = new ArrayList<>();
        destinationMarker = new ArrayList<>();

        for (Route route : routes) {
            map.moveCamera(CameraUpdateFactory.newLatLngZoom(route.startLocation, 15.5f));
            ((TextView) findViewById(R.id.tvDistance)).setText(route.distance.text);
            ((TextView) findViewById(R.id.tvTime)).setText(route.duration.text);

            destinationMarker.add(map.addMarker(new MarkerOptions()
                    .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED))
                    .title(route.endAddress)
                    .position(route.endLocation)));

            PolylineOptions polylineOptions = new PolylineOptions()
                    .geodesic(true)
                    .color(getResources().getColor(R.color.colorPrimary))
                    .width(10);

            for (int i = 0; i < route.points.size(); i++) {
                polylineOptions.add(route.points.get(i));
            }

            polyLinePaths.add(map.addPolyline(polylineOptions));
        }
    }

    private void getDeviceLocation(final boolean MyLocation) {
        if (!MyLocation)

            if (checkPermission()) {
                if (map != null)
                    map.setMyLocationEnabled(true);

                final Task<Location> locationResult = fusedLocationProvider.getLastLocation();
                locationResult.addOnCompleteListener(this, task -> {
                    if (task.isSuccessful() && task.getResult() != null) {
                        // lastKnownLocation = task.getResult();
                    } else {
                        Log.w(TAG, "getLastLocation:exception", task.getException());

                        showSnackbar(R.string.no_location_detected, Snackbar.LENGTH_LONG, 0, null);
                    }
                });
            } else // !checkPermission()
                Log.d(TAG, "Current location is null. Permission Denied.");
    }

    @Override
    public void onMapClick(final LatLng point) {
        selectedMarker = null;

    }

    @Override
    public boolean onMarkerClick(Marker marker) {
        if (marker.equals(selectedMarker)) {
            selectedMarker = null;
            return true;
        }
        selectLatitud = marker.getPosition().latitude;
        selectLongitud = marker.getPosition().longitude;

        idAparcamientoSelected = marker.getSnippet();

        searchLocation = null;

        Toast.makeText(this, "Si desea navegar hacia esta ubicación pulse el botón rojo", Toast.LENGTH_SHORT).show();
        selectedMarker = marker;
        return false;
    }
    private void showAlertNavigation(){
        final AlertDialog.Builder builder = new AlertDialog.Builder(MapsActivity.this);
        builder.setCancelable(false);
        builder.setMessage("¿Desea navegar hacia esta ubicación?");

        builder.setPositiveButton("ACEPTAR", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                if(searchLocation != null) {
                    Uri gmmIntentUri = Uri.parse("google.navigation:q=" + searchLocation.latitude + "," + searchLocation.longitude);
                    Intent mapIntent = new Intent(Intent.ACTION_VIEW, gmmIntentUri);
                    mapIntent.setPackage("com.google.android.apps.maps");
                    startActivity(mapIntent);
                }else {
                    Uri gmmIntentUri = Uri.parse("google.navigation:q=" + selectLatitud + "," + selectLongitud);
                    Intent mapIntent = new Intent(Intent.ACTION_VIEW, gmmIntentUri);
                    mapIntent.setPackage("com.google.android.apps.maps");
                    startActivity(mapIntent);
                }
                dialog.dismiss();
            }
        });

        builder.setNegativeButton("APARCAR AQUI", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
                Intent goAparcamientoDetail = new Intent(MapsActivity.this, DetalleAparcamientoActivity.class);
                goAparcamientoDetail.putExtra("APARCAMIENTO_ID", idAparcamientoSelected);
                startActivity(goAparcamientoDetail);
            }
        });

        builder.create().show();

    }


    private void showAddress() {
        Intent intent = new Intent(this, FetchAddressIntentService.class);
        intent.putExtra(Constants.RECEIVER, resultReceiver);
        intent.putExtra(Constants.LOCATION_DATA_EXTRA, locationgps);
        startService(intent);
    }

    @Override
    protected void onStart() {
        super.onStart();
        if (Connections.checkConnection(this)) {
            new PermissionGPS(this);
        }
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        if (Connections.checkConnection(this)) {
            new PermissionGPS(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (Connections.checkConnection(this)) {
            if (checkPermission())
                fusedLocationProvider.requestLocationUpdates(locationRequest, locationCallback, Looper.myLooper());
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        Log.i(TAG, "onRequestPermissionResult");
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.length <= 0)
                Log.i(TAG, "User interaction was cancelled.");
            else // grantResults.length > 0
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED)
                    getDeviceLocation(false);
                else
                    showSnackbar(R.string.permission_rationale, Snackbar.LENGTH_INDEFINITE, android.R.string.ok,
                            view -> requestPermission());
        }
    }

    private void showSnackbar(int textStringId, int length, int actionStringId, View.OnClickListener listener) {
        Snackbar snackbar = Snackbar.make(findViewById(android.R.id.content), textStringId, length);
        if (listener != null)
            snackbar.setAction(actionStringId, listener);
        snackbar.show();
    }

    private void requestPermission() {
        ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, LOCATION_PERMISSION_REQUEST_CODE);

    }

    private boolean checkPermission() {
        return ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;
    }

    public static final int MY_PERMISSIONS_REQUEST_LOCATION = 99;

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
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.nav_menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {

        switch (item.getItemId()){
            case R.id.logout:
                GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                        .requestIdToken(getString(R.string.default_web_client_id))
                        .requestEmail()
                        .build();

                mGoogleSignInClient = GoogleSignIn.getClient(this, gso);
                mAuth = FirebaseAuth.getInstance();
                mAuth.signOut();
                mGoogleSignInClient.signOut();

                SharedPreferencesManager.setSomeStringValue("tokenId", null);
                Intent login = new Intent(this, LoginActivity.class);
                startActivity(login);
                break;
        }

        return super.onOptionsItemSelected(item);
    }
}
