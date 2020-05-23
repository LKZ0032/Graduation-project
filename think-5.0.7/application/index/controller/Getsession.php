<?php
/**
 * Created by PhpStorm.
 * User: ZKLma
 * Date: 2020/5/22
 * Time: 23:31
 */

namespace app\index\controller;

use app\index\model\User;
use think\Facade\Request;


class Getsession
{
    public function curl_get($url)
    {

        $info = curl_init();
        curl_setopt($info , CURLOPT_RETURNTRANSFER , true);
        curl_setopt($info , CURLOPT_HEADER , 0);
        curl_setopt($info , CURLOPT_NOBODY , 0);
        curl_setopt($info , CURLOPT_SSL_VERIFYPEER , false);
        curl_setopt($info , CURLOPT_SSL_VERIFYPEER , false);
        curl_setopt($info , CURLOPT_SSL_VERIFYHOST , false);
        curl_setopt($info , CURLOPT_URL , $url);
        $output = curl_exec($info);
        curl_close($info);
        return $output;
    }

    public function getcode($code)
    {
//        return "heh";
        $appid = 'wx6b1efe40c95c0671';
        $appsec = 'fd1668e84a957d7e6886dc0dc8680b80';
        $code = $code;
        $url = 'https://api.weixin.qq.com/sns/jscode2session?appid='
            . $appid . '&secret='
            . $appsec . '&js_code='
            . $code . '&grant_type=authorization_code';
        $result = $this->curl_get($url);
        $wxResult = json_decode($result , true);
        if (empty($wxResult)) {
            throw new Exception("获取session_key和open_id失败，微信内部错误");
        }
        //验证获取令牌是否成功
        if (array_key_exists('errcode' , $wxResult)) {
            return json([
                'errorCode' => $wxResult['errcode'] ,
                'msg' => $wxResult['errmsg'] ,
            ]);
        } else {
            $user = new User();
            // 查询单个数据
            $result = $user->where('openid' , $wxResult['openid'])
                ->find();
            if (!$result) {
//                $user->data([
                    $user->openid = $wxResult['openid'];
//                ]);
                $user->save();
                return json($user->Id);
            }else{
                return json($result->Id);
            }


        }


    }
}