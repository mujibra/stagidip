<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterChecklistStaging;
use App\Models\MasterDivisi;
use App\Models\MasterMesin;
use App\Models\Models;
use App\Models\MasterTypeValuesChecklist;
use Illuminate\Support\Facades\Validator;

class MasterDivisiController extends Controller
{

    public function getAllMasterDivisi(){

        $datas = MasterDivisi::all();

        for ($x=0; $x<count($datas); $x++){

            $get_mesin = MasterMesin::whereId($datas[$x]['id_mesin'])->first();
            $datas[$x]['mesin'] = $get_mesin;
        }

        return response()->json([
            'success' => true,
            'totalDatas' => count($datas), 
            'data' => $datas  
        ]);
    }

    public function getDataChecklistStaging($idMesin){
        $getDataDivisi = MasterDivisi::where('id_mesin', $idMesin)->get();

        for ($a = 0; $a< count($getDataDivisi); $a++){
            $getDataListStaging = MasterChecklistStaging::where('id_divisi', $getDataDivisi[$a]->id)->get();
            $dataList = [];
            for ($b=0; $b< count( $getDataListStaging); $b++){
                $dataList[$b] = $getDataListStaging[$b];

                $detail_item_values = MasterTypeValuesChecklist::where('id', $getDataListStaging[$b]['id_type_values'])->first();
                $getDataListStaging[$b]['item_type_values'] = $detail_item_values;

                if ( isset ($detail_item_values->types) ){
                     if ($detail_item_values->types == "COMBO_BOX" OR $detail_item_values->types == "TEXT_INPUT" ){
                         $dtArrayLabel =  json_decode($detail_item_values['labels'], true);
                         $getDataListStaging[$b]['item_type_values']['labels'] = $dtArrayLabel;
                     } else {
                         $getDataListStaging[$b]['item_type_values']['labels'] = $detail_item_values->labels;
                     }
                }
            }
            $getDataDivisi[$a]['checklistStaging'] = $dataList;
        }

        return response()->json([
                'success' => true,
                'data' => $getDataDivisi  
            ]);
    }

    function getDataChecklistById($idMesin, $idDivisi){
        $getDataDivisi = MasterDivisi::where('id', $idDivisi)->where('id_mesin', $idMesin)->first();

        if ($getDataDivisi){
            $getDataListStaging = MasterChecklistStaging::where('id_divisi', $getDataDivisi['id'])->get();

            $get_mesin = MasterMesin::whereId($getDataDivisi['id_mesin'])->first();
            $getDataDivisi['mesin'] = $get_mesin;
        
            $dataList = [];
            for ($b=0; $b< count( $getDataListStaging); $b++){
                $dataList[$b] = $getDataListStaging[$b];

                $detail_item_values = MasterTypeValuesChecklist::where('id', $getDataListStaging[$b]['id_type_values'])->first();
                $getDataListStaging[$b]['item_type_values'] = $detail_item_values;

                if ( isset ($detail_item_values->types) ){
                     if ($detail_item_values->types == "COMBO_BOX" OR $detail_item_values->types == "TEXT_INPUT" ){
                         $dtArrayLabel =  json_decode($detail_item_values['labels'], true);
                         $getDataListStaging[$b]['item_type_values']['labels'] = $dtArrayLabel;
                     } else {
                         $getDataListStaging[$b]['item_type_values']['labels'] = $detail_item_values->labels;
                     }
                }

            }
            $getDataDivisi['checklistStaging'] = $dataList;

            return response()->json([
                'success' => true,
                'data' => $getDataDivisi  
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data Not Found', 
                'data' => []
            ], 400);

        }
    }


    function store($idMesin, Request $request)
    {
        $input = $request->all();
        $input['id_mesin'] = $idMesin;

        $validator = Validator::make($input, 
            ['name' => 'required'], 
            ['name.required' => 'Nama Divisi tidak boleh kosong.'], 
            ['id_mesin' => 'required'], 
            ['id_mesin.required' => 'Model Wajib dipilih.']
        );

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $exists_new_model = MasterMesin::whereId($idMesin)->exists(); //->where('status', 'NEW_MODEL')

        if (!$exists_new_model){
            return response()->json([
                'success' => false,
                'message' => 'Division was created Errors. the model is Not Found'
            ], 400);
        }

        try {

            $new_division = MasterDivisi::create($input);

            return response()->json([
                "success" => true,
                "message" => "Division was created successfully.",
                "data" => $new_division
            ]);

        }catch(Exception $ex){
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }

    }

    function getMasterDivisiByIdMesin($idMesin){
        $datas = MasterDivisi::select(['msn.id as id_mesin', 'mst_divisi.*'])
                            ->join('mst_mesin as msn', 'msn.id', '=', 'mst_divisi.id_mesin')
                            //->where('msn.status', 'NEW_MODEL')
                            ->where('msn.id', '=', $idMesin)
                            ->get();

        for ($x=0; $x<count($datas); $x++){
            $datas[$x]['models'] = MasterMesin::whereId($datas[$x]['id_mesin'])->first();
            $datas[$x]['models']['types'] = Models::whereId($datas[$x]['models']['model'])->first();
        }
        
        return response()->json([
            'success' => true,
            'totalDatas' => count($datas), 
            'data' => $datas  
        ]);

    }

    // 
}
