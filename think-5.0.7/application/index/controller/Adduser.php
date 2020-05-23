<?php
/**
 * Created by PhpStorm.
 * User: ZKLma
 * Date: 2020/5/23
 * Time: 13:23
 */

namespace app\index\controller;


use app\index\model\User;

class Adduser
{
    public function adduser($name , $age , $sex , $openid)//$name , $age , $sex , $openid
    {
        $user = new User();
        // 查询单个数据
        $result = $user->where('openid' , $openid)
            ->find();
        if (!$result) {
            $user->data([
                'name' => $name ,
                'age' => $age ,
                'sex' => $sex ,
                'openid' => $openid
            ]);
            $user->save();
        }else{
            $user->save([
                'name' => $name ,
                'age' => $age ,
                'sex' => $sex
            ],['openid' => $openid]);
        }

        return json("ok");
    }
}