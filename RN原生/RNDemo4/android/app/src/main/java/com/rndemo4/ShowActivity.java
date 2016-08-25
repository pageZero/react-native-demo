package com.rndemo4;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

/**
 * Created by zjl on 2016/8/25.
 */
public class ShowActivity extends Activity {

    private Context mContext;

    private Button mButton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_show);

        mContext = this;
        Intent intent = getIntent();
        if (intent != null) {
            String data = intent.getStringExtra(IntentNativeModule.EXTRA_DATA);
            Toast.makeText(ShowActivity.this, "JS传过来的数据："+data, Toast.LENGTH_SHORT).show();
        }
        mButton = (Button) findViewById(R.id.btn_to_js);
        //点击返回数据给JS
        mButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent mIntent=new Intent(mContext,MainActivity.class);
                mIntent.putExtra("data","传入JS中的数据...123");
                mContext.startActivity(mIntent);
                finish();
            }
        });

    }
}
