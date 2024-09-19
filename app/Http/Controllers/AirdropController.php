<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Airdrop;
use Illuminate\Support\Facades\DB;

use App\Models\Wallet;

class AirdropController extends Controller
{
    public function index()
    {
        return view('airdrop');
    }

    public function merkly()
    {
        $wallets = Wallet::all();

        return view('airdrop/merkly', ['wallets' => $wallets]);
    }

    public function carv()
    {
        $wallets = Wallet::all();
        $api_linea = DB::table('project')->select('apikey')->where('name', 'Linea')->first();

        return view('airdrop/carv', ['wallets' => $wallets, 'api_linea' => $api_linea]);
    }
}
