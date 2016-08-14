package com.rndemo2;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by zjl on 2016/8/14.
 *
 * 3.在Android原生这边创建一个类，实现ReactPackage包管理器，并把第二步创建的类添加到原生模块(NativeModule)列表中。
 */
public class MyReactPackage implements ReactPackage  {

    //创建原生模块
    //将之前创建的原生模块添加到原生模块列表中，返回
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new MyReactModule(reactContext));
        return modules;
    }

    //返回空列表
    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
