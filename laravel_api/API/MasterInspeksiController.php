<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterInspeksi;


class MasterInspeksiController extends Controller
{
    //

    function index(){

      $datas = MasterInspeksi::all();
      return response()->json([
            'success' => true,
            'totalDatas' => $datas->count(),
            'data' => $datas
        ]);
    }

    function store(Request $request){
        // dd($request->al());
        // MasterInspeksi::
    }
    
}
