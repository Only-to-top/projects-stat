<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

use App\Models\Wallet;
use App\Models\Project;
use App\Models\Activity;

use Illuminate\Support\Facades\Auth;

class WalletController extends Controller
{
    public function index()
    {
        // if (!Auth::check()) {
        //     return redirect('/login');
        // }

        $wallets = Wallet::all();
        $projects = DB::table('project')->select('id', 'name', 'link')->where('active', 1)->orderBy('sort', 'asc')->get();

        foreach ($wallets as $key_wallet => $wallet) {
            $wallets[$key_wallet]->projects = DB::table('project')->select('*')->where('active', 1)->orderBy('sort', 'asc')->get();

            foreach ($wallets[$key_wallet]->projects as $key_project => $project) {
                // дата последней активности
                $last_activity = DB::table('activity')->where('id_project', $project->id)->where('id_wallet', $wallet->id)->max('date_create');
                $wallets[$key_wallet]->projects[$key_project]->last_activity = $last_activity;

                // кол-во дней с первой транзакции
                $first_activity = DB::table('activity')->where('id_project', $project->id)->where('id_wallet', $wallet->id)->min('date_create');
                $wallets[$key_wallet]->projects[$key_project]->count_days_start = Carbon::parse($first_activity)->diffInDays(Carbon::now());

                // кол-во транзакций
                $count_tx = DB::table('activity')->select('id')->where('id_project', $project->id)->where('id_wallet', $wallet->id)->count();
                $wallets[$key_wallet]->projects[$key_project]->count_tx = $count_tx;
            }
        }

        return view('home', ['wallets' => $wallets, 'projects' => $projects]);
    }
}
