@section('styles')
    <link rel="stylesheet" href="{{ mix('css/auth.css') }}">
@stop

@include('includes/header')

<form method="POST" action="{{ Route::current()->uri }}" class="auth-container">
    @csrf

    <img src="{{ mix('img/acorn.png') }}" alt="" width="250" class="logo-auth">

    <input name="email" type="email" placeholder="email" value="{{ old('email') }}" class="form-element">
    @error('email')
        <div class="alert alert-danger">{{ $message }}</div>
    @enderror

    <input name="password" type="password" placeholder="password" value="{{ old('password') }}" class="form-element">
    @error('password')
        <div class="alert alert-danger">{{ $message }}</div>
    @enderror

    @if (Route::current()->uri == 'login')
        <button type="submit" class="button">Войти</button>
    @else
        <button type="submit" class="button">Создать</button>
    @endif

</form>

@include('includes/footer')
