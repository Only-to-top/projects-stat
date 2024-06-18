<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\DB;

use App\Models\Wallet;

class ProjectController extends Controller
{
    public function index()
    {
        $wallets = Wallet::all();
        $projects = DB::table('project')->select('id', 'name', 'link', 'apikey')->where('active', 1)->orderBy('sort', 'asc')->get();

        return view('projects', ['wallets' => $wallets, 'projects' => $projects]);
    }

    public function get(Request $request)
    {
        $id_project = $request->id_project;
        $id_wallet = $request->id_wallet;

        $data['project'] = DB::table('project')->where('id', $id_project)->first();

        $data['activities'] = DB::table('activity')
            ->where('activity.id_wallet', $id_wallet)
            ->where('activity.id_project', $id_project)
            ->orderBy('date_create', 'ASC')
            ->get();

        return $data;
    }

    public function getAllExcludeCurrent(Request $request)
    {
        $ids = $request->projects_exclude;
        $excludes_array = explode(',', $ids);

        return DB::table('project')
            ->whereNotIn('id', $excludes_array)
            ->orderBy('name', 'ASC')
            ->get();
    }

    public function create(Request $request)
    {
        $data = $request->all();

        return DB::insert('insert into project_to_wallet (id_wallet, id_project) values (?, ?)', [$data['wallet_id'], $data['project_id']]);
    }
}
