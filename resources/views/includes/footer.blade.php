</div>
</div>

{{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/web3/4.3.1-dev.fa4c72b.0/web3.min.js"></script> --}}

<script src="{{ mix('js/app.js') }}"></script>
<script src="{{ mix('js/api.js') }}"></script>
<script src="{{ mix('js/trading.js') }}"></script>

@yield('scripts')

<meta name="csrf-token" content="{{ csrf_token() }}">

</body>

</html>
