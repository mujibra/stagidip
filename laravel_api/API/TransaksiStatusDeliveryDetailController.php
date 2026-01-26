<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiStatusDeliveryDetail;
use Illuminate\Support\Facades\Validator;

class TransaksiStatusDeliveryDetailController extends Controller
{
    function index($idHeader){
        $getDatas = TransaksiStatusDeliveryDetail::where('id_header', $idHeader)->get();

        if ($getDatas){
            return response()->json([
                    "success" => true, 
                    "totalDatas" => count($getDatas),
                    "data" => $getDatas
                ], 200);
        }else {
            return response()->json([
                    "success" => false, 
                    "totalDatas" => null,
                    "data" => []
                ], 400);
        }

    }

    function store (Request $request){

        $data = $request->all();
        $validator = Validator::make($data, [
            'id_header' => 'required', 
            'status' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $check = TransaksiStatusDeliveryDetail::where('id_header', $request->id_header)->where('status', $request->status)->count();

        if ($check >0){
            return response()->json([
                    "success" => false, 
                    "message" => "Tambah Status Delivery Errors.", 
                    "data" => []
            ], 400);
        }

        try{
            $inserted = TransaksiStatusDeliveryDetail::create($data);
            
            if ($inserted){
                return response()->json([
                    "success" => true, 
                    "message" => "Status Delivery Detail created successfully.", 
                    "data" => $inserted
                ], 200);
            } else {
                return response()->json([
                    "success" => false, 
                    "message" => "Status Delivery Detail Inserted Error.", 
                    "data" => []
                ], 400);
            }
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }


    function update(Request $request, $id){
        // $data = $request->all();
        $data =$request->except(['created_at', 'updated_at']);
        $validator = Validator::make($data, [
            'id_header' => 'required', 
            'status' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try{
            $updated = TransaksiStatusDeliveryDetail::where('id', $id)->update($data);
            $statusDetail = TransaksiStatusDeliveryDetail::where('id', $id)->first();

            return response()->json([
                "success" => true,
                "message" => "Status Delivery updated successfully.",
                "data" => $statusDetail
            ]);
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }
}
