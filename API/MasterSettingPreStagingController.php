<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterSettingPreStaging;
use Illuminate\Support\Facades\Validator;

class MasterSettingPreStagingController extends Controller
{

    function indexPaging($rowPerPage){
        $datas = MasterSettingPreStaging::paginate($rowPerPage);

        return response()->json([
            'success' => true,
            'totalDatas' => count($datas), 
            'data' => $datas
        ]);
    }

    function indexByTypesPaging($types, $rowPerPage){
        $datas = MasterSettingPreStaging::where('types', $types)->paginate($rowPerPage);

        return response()->json([
            'success' => true,
            'totalDatas' => count($datas), 
            'data' => $datas
        ]);
    }

    function getDataBasedOnTypes($types){
         if ($types){
             $get_list = MasterSettingPreStaging::where('types',  $types )->get();

                 return response()->json([
                    'success' => true,
                    'totalDatas' => count($get_list), 
                    'data' => $get_list
                ]);

         } else {
            return response()->json([
                'success' => false,
                'message' => 'get data list types not found', 
                'data' => []
            ], 400);
         }
    }

    function store(Request $request){
        $data = $request->all();
        $validator = Validator::make($data, [
            'types' => 'required',
            'description' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try{
            $add_setting = MasterSettingPreStaging::create($data);

            return response()->json([
                "success" => true,
                "message" => "Setting PreStaging created successfully.",
                "data" => $add_setting
            ]);
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    function update(Request $request, $id){
        $data = $request->all();
        $validator = Validator::make($data, [
            'types' => 'required',
            'description' => 'required'
        ]);
        if ($validator->fails()){
            return response()->json($validator->errors());
        }

        try{
            $updated = MasterSettingPreStaging::where('id', $id)->update($data);
            $datas2 = MasterSettingPreStaging::where('id', $id)->first();

            return response()->json([
                "success" => true,
                "message" => "Setting Pre Staging updated successfully.",
                "data" => $datas2
            ]);
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    function destroy($id){
        $settingPreStag = MasterSettingPreStaging::findOrFail($id);
        $settingPreStag->delete();

        if ($settingPreStag){
            return response()->json([
                'success' => true,
                'message' => "Data ".$settingPreStag['types']."-".$settingPreStag['description']." berhasil dihapus", 
                'data' => $settingPreStag
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data PIC Mover gagal dihapus'
            ], 400);
        }
    }
}
