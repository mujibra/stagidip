<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterWSInfo;
use Illuminate\Support\Facades\Validator;

class MasterWSInfoController extends Controller
{

    function store(Request $request){
        $data = $request->all();
        
        $validator = Validator::make($data,[
            'ws_id' => 'required', 
            'ws_name' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors());
        }

        try{
            $checkExists = MasterWSInfo::where('serial_number', $request->serial_number)->count();
            if ($checkExists >0){
                return response()->json([
                    "success" => false, 
                    "message" => "WS Information with SerialNumber = ".$request->serial_number." was exists.",
                ], 200);
            } else {

                $inserted = MasterWSInfo::create($data);
                if ($inserted){
                    return response()->json([
                        "success" => true, 
                        "message" => "Information WS inserted successfully.",
                    ], 200);
                } else {
                    return response()->json([
                        "success" => false, 
                        "message" => "Information WS inserted Error.", 
                    ], 400);
                }
            }
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }


    function storeParam(Request $request, $snNumber, $model){
        $data = [
            'serial_number' => $snNumber, 
            'model' => $model, 
            'ws_id' => $request->ws_id, 
            'ws_name' => $request->ws_name, 
        ];

        $validator = Validator::make($data,[
            'ws_id' => 'required', 
            'ws_name' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors());
        }

        try{
            $checkExists = MasterWSInfo::where('serial_number', $snNumber)->count();
            if ($checkExists >0){
                return response()->json([
                    "success" => false, 
                    "message" => "WS Information with SerialNumber = ".$snNumber." was exists.",
                ], 200);
            } else {

                $inserted = MasterWSInfo::create($data);
                if ($inserted){
                    return response()->json([
                        "success" => true, 
                        "message" => "Information WS inserted successfully.",
                    ], 200);
                } else {
                    return response()->json([
                        "success" => false, 
                        "message" => "Information WS inserted Error.", 
                    ], 400);
                }
            }
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }
}
