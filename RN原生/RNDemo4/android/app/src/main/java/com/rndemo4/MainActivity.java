package com.rndemo4;

import android.content.Intent;

import com.facebook.react.ReactActivity;

import java.util.concurrent.ArrayBlockingQueue;

public class MainActivity extends ReactActivity {

    //创建一个阻塞的单一数据队列，一旦有原生回调消息，就加入队列中，然后通过回调方法传入RN界面中
    public static ArrayBlockingQueue<String> mQueue = new ArrayBlockingQueue<String>(1);

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "RNDemo4";
    }

    /**
     * 接收Activity的返回数据
     * @param requestCode
     * @param resultCode
     * @param data
     */
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK && requestCode == 200) {
            String result = data.getStringExtra("three_result");
            if (result != null && !result.equals("")) {
                mQueue.add(result);
            } else
                mQueue.add("没有返回数据了");
        } else
            mQueue.add("没有回调");

    }
}
