<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ProjectController;

class PathController extends Controller
{
    public function getPath()
    {
        $value = env('PROJECT_PATH');
        if ($value != '' && $value != null) {
            return $value;
        }
        else {
            return 'Nenhum projeto definido.';
        }
    }

    public function setPath($path)
    {
        $this->setEnvironmentValue('PROJECT_PATH',$path);
    }

    public function setEnvironmentValue($envKey, $envValue)
    {
        $envFile = app()->environmentFilePath();
        $str = file_get_contents($envFile);

        $oldValue = env($envKey);

        $str = str_replace("{$envKey}={$oldValue}", "{$envKey}={$envValue}\n", $str);

        $fp = fopen($envFile, 'w');
        fwrite($fp, $str);
        fclose($fp);
    }

}
