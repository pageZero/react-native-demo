package com.rndemo2;

import android.content.Context;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by zjl on 2016/8/14.
 * RN和原生混合
 * 1.创建一个RN项目，用AS打开。
 * 2.创建一个类，实现ReactContextBaseJavaModule，在类中放需要被rn调用的方法，
 *   封装成一个原生模块.
 * 3.在Android原生这边创建一个类，实现ReactPackage包管理器，并把第二步创建的类添加到原生模块(NativeModule)列表中。
 * 4.将上一步创建的包管理器添加到ReactPackage列表里（getPackages()方法)
 * 5.在React native中调用原生模块，添加NativeModules通过react-native.
 *
 */
public class MyReactModule extends ReactContextBaseJavaModule{

    private Context mContext;
    public MyReactModule(ReactApplicationContext reactContext) {
        super(reactContext);

        mContext = reactContext;
    }

    //在RN中会通过这个名字访问类里面的方法
    @Override
    public String getName() {
        return "MyReactModule";
    }

    //RN中调用的方法
    //这个方法不能有返回值，因为rn调用原生的代码是异步的，原生代码执行结束之后，只能调用回调函数，或者发送消息给rn那边
    // 
    @ReactMethod
    public void rnCallNative(String msg) {
        Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();
    }
}
