<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionsController extends Controller
{
    public function list(Request $request)
    {
        return view('transactions', ['output' => 'loermru20']);
    }
}
