package com.rndemo4;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.telecom.Call;
import android.text.TextUtils;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by zjl on 2016/8/25.
 */
public class IntentNativeModule extends ReactContextBaseJavaModule {

    public static final String EXTRA_DATA = "data";
    Context context;

    public IntentNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return "IntentNativeModule";
    }

    /**
     * 从JS页面跳转到原生activity   同时也可以从JS传递相关数据到原生
     *
     * @param name   需要打开的Activity的class
     * @param params
     */
    @ReactMethod
    public void startActivityFromJS(String name, String params) {
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {
                Class toActivity = Class.forName(name);
                Toast.makeText(context, toActivity.getName(), Toast.LENGTH_SHORT).show();

                Intent intent = new Intent(currentActivity,toActivity);
                intent.putExtra(EXTRA_DATA, params);
                currentActivity.startActivity(intent);
            }
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "不能打开Activity : " + e.getMessage());
        }
    }

    /***
     * RN跳到原生Activity，并接收Activity的返回数据
     * @param name
     * @param requestCode
     * @param successbBack
     * @param errorBack
     */
    @ReactMethod
    public void startActivityFromJSGetResult(String name, int requestCode,
                                             Callback successbBack, Callback errorBack) {
        try {
            Activity currentActivity = getCurrentActivity();
            if (currentActivity != null) {
                Class toActivity = Class.forName(name);

                Intent intent = new Intent(currentActivity,toActivity);
                currentActivity.startActivityForResult(intent, requestCode);
                //回调
                successbBack.invoke(MainActivity.mQueue.take());
            }
        } catch (Exception e) {
            errorBack.invoke(e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * 原生跳转到JS页面并传输数据回去
     * RN端调用返回数据的方法，原生这边通过回调返回数据
     * @param successBack
     * @param errorBack
     */
    @ReactMethod
    public void dataToJS(Callback successBack, Callback errorBack) {
        Activity currentActivity = getCurrentActivity();
        String result = currentActivity.getIntent().getStringExtra(EXTRA_DATA);
        if (TextUtils.isEmpty(result)) {
            result = "没有返回数据";
        }
        successBack.invoke(result);
    }
}
