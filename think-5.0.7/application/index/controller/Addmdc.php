<?php
/**
 * Created by PhpStorm.
 * User: ZKLma
 * Date: 2020/5/22
 * Time: 15:51
 */

namespace app\index\controller;


use app\index\model\Medicine;

class Addmdc
{
    public function addmdc($mdcarr)//$mdcarr
    {
        $user = new Medicine();
        foreach ($mdcarr as $value) {
            $arr = explode("@" , $value);
            if ($arr[0] != "") {
                $result = $user->where('name' , $arr[0])
                    ->find();
                if (!$result) {
                    $user->data([
                        'name' => $arr[0] ,
                        'component' => $arr[3] ,
                        'effect' => $arr[1] ,
                        'count' => $arr[2] ,
                        'ADRs' => $arr[4]
                    ]);
                    $user->save();
                }
            }
        }


        return "ok";
    }

    public function addmdcmore($name , $component , $effect , $count , $ADRs)//$mdcarr
    {
        $user = new Medicine();
        $result = $user->where('name' , $name)
            ->find();
        if (!$result) {

            $user->name = $name;
            $user->component = $component;
            $user->effect = $effect;
            $user->count = $count;
            $user->ADRs = $ADRs;

            $user->save();
            return $user->Id;
        }


        return json($result->Id);
    }
}