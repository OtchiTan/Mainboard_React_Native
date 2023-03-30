package com.mainboard;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.mainboard.module.HttpRequestModule;
import com.mainboard.module.WakeOnLanModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MyAppPackage implements ReactPackage {

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new HttpRequestModule(reactApplicationContext));
        modules.add(new WakeOnLanModule(reactApplicationContext));

        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
        return Collections.emptyList();
    }
}
