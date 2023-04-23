package com.mainboard.module;

import android.util.Log;

import androidx.annotation.RequiresPermission;

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
    public void request(String url, int method, ReadableMap options, ReadableMap body, Callback onResult, Callback onError) {
        RequestQueue requestQueue = Volley.newRequestQueue(getReactApplicationContext());

        JSONObject jsonBody = new JSONObject();
        if (body != null) {
            Iterator<Map.Entry<String, Object>> it = body.getEntryIterator();
            while (it.hasNext()) {
                Map.Entry<String, Object> keyValue = it.next();
                try {
                    jsonBody.put(keyValue.getKey(), keyValue.getValue());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
        else {
            jsonBody = null;
        }

        JsonObjectRequest request = new JsonObjectRequest(method, url, jsonBody,
                response -> {
                    onResult.invoke(response.toString());
                },
                error -> {
                    error.printStackTrace();
                    if (error.networkResponse == null)
                        onError.invoke("TIMEDOUT");

                    else if (error.networkResponse.statusCode == 401)
                        onError.invoke("UNAUTHORIZED");

                    else
                        onError.invoke(error);
                }
        ) {
            @Override
            public Map<String, String> getHeaders() {
                HashMap<String, String> headers = new HashMap<>();

                Iterator<Map.Entry<String, Object>> it = options.getMap("headers").getEntryIterator();
                while (it.hasNext()) {
                    Map.Entry<String, Object> keyValue = it.next();
                    headers.put(keyValue.getKey(),keyValue.getValue().toString());
                }

                return headers;
            }
        };

        requestQueue.add(request);
    }
}
