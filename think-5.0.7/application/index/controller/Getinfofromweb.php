<?php
/**
 * Created by PhpStorm.
 * User: ZKLma
 * Date: 2020/5/23
 * Time: 15:14
 */

namespace app\index\controller;


class Getinfofromweb
{
    public function Getinfofromweb($webhtm){
        preg_match_all("/[a-zA-z]\-[a-zA-z]+\/[a-zA-Z0-9]*[^\"]*/",$webhtm,$arr);

        return json($arr);
    }
}