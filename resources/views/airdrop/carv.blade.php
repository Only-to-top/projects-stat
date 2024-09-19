@section('title', 'Carv')

@include('includes/header')

{{-- {{ dd($api_linea) }} --}}

<h1>Carv:</h1>
<br>

{{-- ronin soul:    0xc39a2430b0b6f1edad1681672b47c857c1be0998 --}}
{{-- opBnb soul:    0xc32338e7f84f4c01864c1d5b2b0c0c7c697c25dc --}}

{{-- zkSync soul:   0x5155704bb41fde152ad3e1ae402e8e8b9ba335d3 --}}

{{-- linea soul: 0xc5cb997016c9a3ac91cbe306e59b048a812c056f --}}
<h2>Linea</h2>

<table>
    <thead>
        <td>id</td>
        <td>wallet</td>
        <td>token count</td>
    </thead>

    @php
        $summ = 0;
    @endphp

    @foreach ($wallets as $wallet)
        <tr>
            @php
                $ch = curl_init(
                    "https://api.lineascan.build/api?module=account&action=tokenbalance&contractaddress=0xc5cb997016c9a3ac91cbe306e59b048a812c056f&address=$wallet->address&tag=latest&apikey=$api_linea->apikey",
                );

                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_HEADER, false);

                $response = curl_exec($ch);
                $response = json_decode($response, true);

                curl_close($ch);

                if ($response['message'] == 'OK') {
                    $token_count = $response['result'];
                    $summ += $token_count;
                } else {
                    $token_count = '';
                }

                echo "<td>$wallet->id</td>";
                echo "<td>$wallet->address</td>";
                echo '<td>' . number_format($token_count, 0, '.', ' ') . '</td>';

            @endphp
        </tr>
    @endforeach

    <tr><td colspan=3>&nbsp;</td></tr>

    <tr>
        <td></td>
        <td>SOUL</td>
        <td>{{ number_format($summ, 0, '.', ' ') }}</td>
    </tr>

</table>

@include('includes/footer')
