<?php
/**
 * Created by PhpStorm.
 * User: ZKLma
 * Date: 2020/5/23
 * Time: 19:14
 */

namespace app\index\controller;

use think\Db;


class Getscanned
{
    public function getscanned($user_id)
    {
        Db::connect('mysql://root:root@127.0.0.1:3306/bishe#utf8');
        return json(
//            Db::query()
            Db::query(
                'SELECT medicine.name,medicine.component,medicine.effect,medicine.count,medicine.ADRs FROM medicine LEFT JOIN scanned ON scanned.med_id=medicine.Id where scanned.user_id=?;' , [$user_id])
        );
    }
//}$user->name = $name;
//$user->component = $component;
//$user->effect = $effect;
//$user->count = $count;
//$user->ADRs = $ADRs;
}