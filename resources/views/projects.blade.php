@section('title', 'Transactions')

@php
    use Carbon\Carbon;

    $width_col = 100 / count($projects);
@endphp

@section('title', 'Home')

@include('includes/header')

{{-- {{dd($projects)}} --}}

{{-- https://docs.ethers.org/v5 --}}
<script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js" type="application/javascript"></script>

<table class="table">
    <thead>
        <tr>
            <th width='50'></th>
            @foreach ($projects as $project)
                <th title='{{ $project->name }}' width="{{ $width_col }}%" data-id_project='{{ $project->id }}'>
                    <a href="{{ $project->link }}" target="_blank">
                        <img src='{{ url("img/projects/$project->name.png") }}' alt="" class="project-image">
                        <div class="project_gwei"></div>
                    </a>
                </th>
            @endforeach
            <th>Σ</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($wallets as $wallet)
            @if ($wallet->id == 11)
                <tr>
                    <td colspan=100% style='height: 10px; background-color: rgba(255,255,255,0.3)'></td>
                </tr>
            @endif

            <tr data-wallet="{{ $wallet->address }}">
                <td class="td_first">{{ $wallet->name }}<br>
                    <small>({{ Carbon::parse($wallet->date_create)->diffInDays(Carbon::now()) }} d)</small>
                </td>
                @foreach ($projects as $project)
                    <td onclick="app.showLeftSidebar('{{ $project->name }}', '{{ $wallet->id }}', '{{ $wallet->address }}', '{{ $project->apikey }}')"
                        data-id-project="{{ $project->id }}" data-project="{{ $project->name }}"
                        data-api="{{ $project->apikey }}"></td>
                @endforeach
                <td>
                    <div class="summ_result" style="font-size:12px; white-space:nowrap"></div>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>

<aside class="sidebar">
    <div class="sidebar__head">
        <button type="button" class="sidebar__close" onclick="app.hideLeftSidebar()">
            <svg role="graphics-symbol" viewBox="0 0 16 16"
                style="width: 16px; height: 16px; display: block; fill: rgba(255, 255, 255, 0.445); flex-shrink: 0;"
                class="doubleChevronRight">
                <path
                    d="M2.25781 14.1211C2.47656 14.1211 2.66797 14.0391 2.81836 13.8887L8.14355 8.67969C8.32812 8.49512 8.41699 8.29688 8.41699 8.06445C8.41699 7.8252 8.32812 7.62012 8.14355 7.44922L2.81836 2.24023C2.66797 2.08984 2.4834 2.00781 2.25781 2.00781C1.81348 2.00781 1.46484 2.35645 1.46484 2.80078C1.46484 3.0127 1.55371 3.21777 1.7041 3.375L6.50977 8.05762L1.7041 12.7539C1.55371 12.9043 1.46484 13.1094 1.46484 13.3281C1.46484 13.7725 1.81348 14.1211 2.25781 14.1211ZM8.36914 14.1211C8.58789 14.1211 8.77246 14.0391 8.92285 13.8887L14.2549 8.67969C14.4395 8.49512 14.5283 8.29688 14.5283 8.06445C14.5283 7.8252 14.4326 7.62012 14.2549 7.44922L8.92285 2.24023C8.77246 2.08984 8.58789 2.00781 8.36914 2.00781C7.9248 2.00781 7.56934 2.35645 7.56934 2.80078C7.56934 3.0127 7.66504 3.21777 7.81543 3.375L12.6211 8.05762L7.81543 12.7539C7.66504 12.9043 7.56934 13.1094 7.56934 13.3281C7.56934 13.7725 7.9248 14.1211 8.36914 14.1211Z">
                </path>
            </svg>
        </button>
        <button type="button" class="sidebar__fullscreen"
            onclick="document.querySelector('.sidebar').requestFullscreen();">
            <svg role="graphics-symbol" viewBox="0 0 16 16"
                style="width: 16px; height: 16px; display: block; fill: rgba(255, 255, 255, 0.445); flex-shrink: 0;"
                class="openAsPageThick">
                <path
                    d="M2.16895 7.19629C2.59277 7.19629 2.90723 6.88867 2.90723 6.45801V5.96582L2.75684 3.81934L4.35645 5.50098L6.3252 7.4834C6.46875 7.63379 6.65332 7.70215 6.85156 7.70215C7.30957 7.70215 7.6377 7.39453 7.6377 6.93652C7.6377 6.72461 7.55566 6.54004 7.41211 6.39648L5.43652 4.4209L3.74805 2.82129L5.91504 2.96484H6.44141C6.86523 2.96484 7.18652 2.65723 7.18652 2.22656C7.18652 1.7959 6.87207 1.48145 6.44141 1.48145L2.64746 1.48145C1.86816 1.48145 1.41699 1.93262 1.41699 2.71875L1.41699 6.45801C1.41699 6.88184 1.73828 7.19629 2.16895 7.19629ZM9.55176 14.6543H13.3389C14.125 14.6543 14.5762 14.2031 14.5762 13.417V9.67773C14.5762 9.25391 14.2549 8.93945 13.8242 8.93945C13.4004 8.93945 13.0859 9.24707 13.0859 9.67773V10.1699L13.2295 12.3164L11.6299 10.6348L9.66113 8.65234C9.52441 8.50195 9.33984 8.43359 9.1416 8.43359C8.68359 8.43359 8.35547 8.74121 8.35547 9.19922C8.35547 9.41113 8.43066 9.5957 8.57422 9.73926L10.5566 11.7148L12.2383 13.3145L10.0781 13.1709H9.55176C9.12793 13.1709 8.80664 13.4785 8.80664 13.9092C8.80664 14.3398 9.12109 14.6543 9.55176 14.6543Z">
                </path>
            </svg>
        </button>
    </div>
    <div class="sidebar-content">
        <h1 class="sidebar-content__title"></h1>
        <div class="sidebar-content__activities">
            <table class="activities-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>date & tx</th>
                        <th>type</th>
                        <th>description</th>
                        <th>value</th>
                        <th>
                            <div style="display:flex;justify-content:space-between">fee <span>gwei</span></div>
                        </th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>

        </div>
    </div>
    <div class="resizer" id="resizer" onmousedown="app.resizeSidebar(); app.isResizing = true"></div>
</aside>

@include('includes/footer')
