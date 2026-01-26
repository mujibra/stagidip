<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterStatusPo;
use Illuminate\Support\Facades\Validator;
use App\Models\PurchaseOrder;

class MasterStatusPoController extends Controller
{
    //

    function index(){
        $datas = MasterStatusPo::all();

        return response()->json([
            'success' => true,
            'totalDatas' => $datas->count(),
            'data' => $datas
        ]);
    }

    function store(Request $request)
    {
        $input = $request->all();
        
        $validator = Validator::make($input, [
            'status_desc' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try{
            $status_po = MasterStatusPo::create($input);

            return response()->json([
                "success" => true,
                "message" => "Master Status PO created successfully.",
                "data" => $status_po
            ]);
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }

    }

    function update($idStatusPo, Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'status_desc' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        if ( in_array($idStatusPo, [1,2]) ){

            $select_status = MasterStatusPo::whereId($idStatusPo)->first();

            return response()->json([
                "success" => false,
                "message" => "Status PO [".$select_status->status_desc."] Tidak dapat diubah !",
            ], 400);
        }

        try{
            $status_po = MasterStatusPo::whereId($idStatusPo)->update($input);

            return response()->json([
                "success" => true,
                "message" => "Status PO was updated successfully.",
                "data" => $status_po
            ]);
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }


    function destroy($idStatusPo)
    {
        $select_status = MasterStatusPo::whereId($idStatusPo)->first();

        if ( in_array($idStatusPo, [1,2]) ){
            return response()->json([
                "success" => false,
                "message" => "Status PO [".$select_status->status_desc."] Tidak dapat dihapus !",
            ], 400);
        }

        $use_in_transaksi = PurchaseOrder::where('id_status_po', $idStatusPo)->exists();
        if ($use_in_transaksi){
            return response()->json([
                "success" => false,
                "message" => "Status PO [".$select_status->status_desc."] masih di gunakan di Transaksi Staging Registration!",
            ], 400);
        }
        
        // menghapus data berdasarkan id
        $statusPo = MasterStatusPo::findOrFail($idStatusPo);
        $statusPo->delete();

        if($statusPo) {
            return response()->json([
                'success' => true,
                'message' => 'Status PO ['.$select_status->status_desc.'] berhasil dihapus',
                'data' => $statusPo
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Status PO ['.$select_status->status_desc.'] berhasil dihapus',
                'data' => ''
            ], 400);
        }


    }
}
