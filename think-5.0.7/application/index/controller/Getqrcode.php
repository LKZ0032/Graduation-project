<?php
/**
 * Created by PhpStorm.
 * User: ZKLma
 * Date: 2020/5/23
 * Time: 22:51
 */

namespace app\index\controller;

use app\index\model\User;
use think\Db;

class Getqrcode
{
    public function getqrcode($user_id)
    {

        $re="";
        $user = new User();
//            Db::query()
        $result_med = Db::query(
            'SELECT medicine.name,medicine.component,medicine.effect,medicine.count,medicine.ADRs FROM medicine LEFT JOIN scanned ON scanned.med_id=medicine.Id where scanned.user_id=?;' , [$user_id]);
        foreach ($result_med as $value1) {
            foreach ($value1 as $value2){
                $re=$re.$value2.'@';
            }
            substr($re, 0, -1);
            $re=$re.'*';
        }
        $result_user =  $user->where('Id' , $user_id)
            ->find();
        $re = $re.'%'.$result_user->sex.'@'.$result_user->name.'@'.$result_user->age.'@'.$result_user->openid;
        return json($re);
    }
}