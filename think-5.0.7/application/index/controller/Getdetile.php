<?php
/**
 * Created by PhpStorm.
 * User: ZKLma
 * Date: 2020/5/23
 * Time: 16:05
 */

namespace app\index\controller;


class Getdetile
{
    public function getdetile($webhtm){
        preg_match_all("/\<li\>【.*?<\/li>/",$webhtm,$arr);

        return json($arr);
    }
}