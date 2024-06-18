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
}
