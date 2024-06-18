<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\TradingController;
use App\Http\Controllers\AirdropController;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

/**
 * Маршруты регистрации и авторизации
 */

Route::controller(UserController::class)->group(function () {
    Route::get('/register', 'showRegisterForm');
    Route::post('/register', 'register')->name('register');

    Route::get('/login', 'showLoginForm');
    Route::post('/login', 'login')->name('login');

    Route::get('/logout', 'logout')->name('logout');
});

// Только аутентифицированные пользователи могут получить доступ к этим маршрутам
Route::group(['middleware' => 'auth'], function () {

    /*Route::controller(WalletController::class)->group(function () {
        Route::get('/', 'index')->name('home');
    });*/

    Route::controller(ProjectController::class)->group(function () {
        Route::post('/projects/single', 'get');
        Route::post('/projects/list', 'getAllExcludeCurrent');
        Route::post('/projects/to_wallet', 'create');

        Route::get('/', 'index')->name('home');
        // Route::get('/projects', 'index')->name('projects');
    });

    Route::controller(TradingController::class)->group(function () {
        Route::get('/trading/list', 'index')->name('tradingView');
    });

    // Меркли аирдроп
    Route::controller(AirdropController::class)->group(function () {
        Route::get('/airdrop', 'index')->name('airdrop');
        Route::get('/airdrop/merkly', 'merkly')->name('merkly');
    });
});
