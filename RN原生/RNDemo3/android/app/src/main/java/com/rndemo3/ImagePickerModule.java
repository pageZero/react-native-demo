package com.rndemo3;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by zjl on 2016/8/19.
 *
 * ActivityEventListener:
 * 如果原生中需要使用startActivityForResult启动Activity的时候，
 * 需要获取activity的回调信息，所以要实现ActivityEventListener监听Activity的变化。
 */
public class ImagePickerModule extends ReactContextBaseJavaModule implements ActivityEventListener{


    private static final int IMAGE_PICKER_REQUEST = 467081;
    private static final int PICKER_IMAGE = 467081;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
    private static final String E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER";
    private static final String E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND";
    private static final String E_PICKER_CANCElED = "E_PICKER_CANCElED";

    private Promise mPickerPromise;

    public ImagePickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        //添加监听器
        reactContext.addActivityEventListener(this);
    }

    //RN根据这个返回的字符串调用原生的方法
    @Override
    public String getName() {
        return "ImagePickerModule";
    }

    //获取返回的结果，存入promise
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == IMAGE_PICKER_REQUEST) {
            if (mPickerPromise != null) {
                if (resultCode == Activity.RESULT_CANCELED) {
                    mPickerPromise.reject(E_PICKER_CANCElED, "Image picker was canceled.");
                }else if (resultCode == Activity.RESULT_OK) {
                    Uri uri = data.getData();
                    if (uri == null) {
                        mPickerPromise.reject(E_NO_IMAGE_DATA_FOUND,"No image data found");
                    } else {
                        //选取了图片，返回图片地址
                        mPickerPromise.resolve(uri.toString());
                    }
                }
                mPickerPromise = null;
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @ReactMethod
    public void pickerImage(final Promise promise) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST,"Activity doesn't exist");
            return;
        }

        //当picker返回数据的时候，用promise保存
        mPickerPromise = promise;

        Intent gallertIntent = new Intent(Intent.ACTION_PICK);
        gallertIntent.setType("image/*");
        Intent chooseIntent = Intent.createChooser(gallertIntent, "Pick an image");
        currentActivity.startActivityForResult(chooseIntent, PICKER_IMAGE);
    }
}
