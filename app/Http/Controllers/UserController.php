<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function showRegisterForm()
    {
        return view("register");
    }

    protected function register(Request $request)
    {
        $request->validate([
            'email' => 'required|unique:users|max:255',
            'password' => 'required',
        ]);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => bcrypt($request->password),
        ]);

        // return response()->json($user);

        return redirect('/')->with('success', '');
    }

    public function showLoginForm()
    {
        return view("login");
    }

    protected function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            // Auth::login($user, true);

            return redirect()->intended('/');
        }

        return back()->withErrors([
            'email' => 'Пользователь не найден',
        ]);
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
