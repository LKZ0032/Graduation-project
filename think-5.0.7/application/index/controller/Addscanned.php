<?php
/**
 * Created by PhpStorm.
 * User: ZKLma
 * Date: 2020/5/23
 * Time: 18:26
 */

namespace app\index\controller;


use app\index\model\Scanned;

class Addscanned
{
    public function addscanned($user_id,$med_id){
//        $user = new Scanned();
        // 查询单个数据
        $result = Scanned::get([
            'user_id' => $user_id,
            'med_id' => $med_id
        ]);
//        $result = $user->where('openid' , $openid)
//            ->find();
        if (!$result) {
            Scanned::create([
                'user_id' => $user_id,
                'med_id' => $med_id
            ]);
//            $user->save();
        }

        return json("ok");
    }
}