<?php
/**
 * Created by PhpStorm.
 * User: ZKLma
 * Date: 2020/5/23
 * Time: 19:00
 */

namespace app\index\controller;


use app\index\model\Scanned;

class Checkscanned
{
    public function checkscanned($user_id){
        $user = new Scanned();
        $result = $user->where('user_id' , $user_id)
            ->find();
        if($result){
            return json($result->user_id);
        }
        return json("false");
    }
}