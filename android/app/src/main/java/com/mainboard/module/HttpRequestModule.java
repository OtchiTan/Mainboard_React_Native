package com.mainboard.module;

import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class HttpRequestModule extends ReactContextBaseJavaModule {
    public HttpRequestModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "HttpRequestModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void get(String url, String authToken, Callback onResult, Callback onError) {
        RequestQueue requestQueue = Volley.newRequestQueue(getReactApplicationContext());
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
                response -> {
                    onResult.invoke(response.toString());
                },
                error -> {
                    error.printStackTrace();
                    if (error.networkResponse == null)
                        onError.invoke("TIMEDOUT");

                    else if (error.networkResponse.statusCode == 401)
                        onError.invoke("UNAUTHORIZED");
                }
        ) {
            @Override
            public Map<String, String> getHeaders() {
                HashMap headers = new HashMap();
                headers.put("platform", "MOBILE");
                headers.put("Authorization", "Bearer " + authToken);
                return headers;
            }
        };

        requestQueue.add(request);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void post(String url, String authToken,ReadableMap body,Callback onResult, Callback onError) {
        RequestQueue requestQueue = Volley.newRequestQueue(getReactApplicationContext());

        JSONObject jsonBody = new JSONObject();
        Iterator<Map.Entry<String, Object>> it = body.getEntryIterator();
        while (it.hasNext()) {
            Map.Entry<String, Object> keyValue = it.next();
            try {
                jsonBody.put(keyValue.getKey(),keyValue.getValue());
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url, jsonBody,
                response -> {
                    onResult.invoke(response.toString());
                },
                error -> {
                    error.printStackTrace();
                    if (error.networkResponse == null)
                        onError.invoke("TIMEDOUT");

                    else if (error.networkResponse.statusCode == 401)
                        onError.invoke("UNAUTHORIZED");
                }
        ) {
            @Override
            public Map<String, String> getHeaders() {
                HashMap headers = new HashMap();
                headers.put("platform", "MOBILE");
                headers.put("Authorization", "Bearer " + authToken);
                return headers;
            }
        };

        requestQueue.add(request);
    }
}
