<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\PathController;
use App\Project;

class ProjectController extends Controller
{
    public function checkValid($path)
    {
        $file = $path.'/datum.json';
        $exists = file_exists($file);
        return $exists;
    }

    public function getModel($path)
    {
        if ($this->checkValid($path)) {
            $file = $path.'/datum.json';
            $string = file_get_contents($file);
            $json_a = json_decode($string, true);
            if ($json_a != null) {
                $project = new Project($json_a);
                return $project;
            }
            else {
                echo 'Could not recognize datum.json file. Bad format.';
                return null;
            }
        }
        else {
            echo 'ERROR: Could not find datum.json file.';
            return null;
        }
    }

}
