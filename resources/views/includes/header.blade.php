<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    @yield('styles')
</head>

<body class="{{ Route::current()->uri }}">

    <header class="header">
        <div class="container header-container">
            <a href="{{ route('home') }}" class="logo">
                <img src="{{ mix('img/acorn.png') }}" alt="" width="50">
            </a>

            <div class="dropdown">
                @auth
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                        viewBox="0 0 16 16">
                        <path
                            d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path
                            d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                    </svg>
                @else
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                        viewBox="0 0 16 16">
                        <path
                            d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path
                            d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                    </svg>
                @endauth

                <ul class="dropdown-menu">
                    @auth
                        {{-- <li><a class="dropdown-item" href="{{ route('projects') }}">Projects</a></li> --}}
                        {{-- <li><a class="dropdown-item" href="javascript:void(0)">New project</a></li> --}}
                        <li><a class="dropdown-item" href="{{ route('logout') }}">Sign out</a></li>
                        <li><a class="dropdown-item" href="{{ route('tradingView') }}">TradingView</a></li>
                        <li><a class="dropdown-item" href="{{ route('airdrop') }}">Airdrop's</a></li>
                    @else
                        <li><a class="dropdown-item" href="{{ route('register') }}">Register</a></li>
                    @endauth
                </ul>
            </div>
        </div>
    </header>

    <div class="wrapper">

        <div class="container-fluid">
