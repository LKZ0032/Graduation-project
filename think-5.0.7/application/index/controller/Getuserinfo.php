<?php
/**
 * Created by PhpStorm.
 * User: ZKLma
 * Date: 2020/5/23
 * Time: 21:12
 */

namespace app\index\controller;


use app\index\model\User;

class Getuserinfo
{
    public function getuserinfo($user_id){
        $user = new User();
        $result = $user->where('Id' , $user_id)
            ->find();
        return json($result);
//        return "aa";
    }
}