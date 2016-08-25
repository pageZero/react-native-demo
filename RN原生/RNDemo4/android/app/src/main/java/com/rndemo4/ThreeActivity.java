package com.rndemo4;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

/**
 * Created by zjl on 2016/8/25.
 */
public class ThreeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_three);
        Button btn=(Button)this.findViewById(R.id.btn_return);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent mIntent=new Intent();
                mIntent.putExtra("three_result","From Activity的数据回调过来啦~");
                ThreeActivity.this.setResult(Activity.RESULT_OK,mIntent);
                ThreeActivity.this.finish();
            }
        });
    }
}
