<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activity;

class ActivityController extends Controller
{
    public function get(Request $request)
    {
        $id = $request->id_project;

        return $id;
    }

    public function create(Request $request)
    {
        $data = $request->all();

        return Activity::insert($data); # insert all array
    }
}
