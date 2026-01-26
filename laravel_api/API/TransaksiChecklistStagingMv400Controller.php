<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiChecklistStagingMv400;
use App\Models\MasterClassification;
use App\Models\MasterChecklistStagingMv400;
use App\Models\TransaksiChecklistStagApproval;
use Illuminate\Support\Facades\DB;

class TransaksiChecklistStagingMv400Controller extends Controller
{
    function store(Request $request) {

        $dataPayload = json_decode($request->getContent(), true);
        
        $data_checklist = $dataPayload[0]['dataArray'];
        $waktu_checklist_staging = $dataPayload[0]['time_todo'];

        $dataInserted= [];

        for ($a=0; $a<count($data_checklist); $a++){
            $datas = $data_checklist[$a];

            if($a==0){
                $dataApproval = [
                    'id_po' => $data_checklist[0]['id_po'], 
                    'no_mesin' => $data_checklist[0]['no_mesin'], 
                    'sn_mesin' =>  $data_checklist[0]['sn_mesin']
                ];

                $checkData = TransaksiChecklistStagApproval::where('id_po', $data_checklist[0]['id_po'])
                                                    ->where('no_mesin', $data_checklist[0]['no_mesin'])
                                                    ->count();
                if ($checkData < 1){
                    TransaksiChecklistStagApproval::create($dataApproval);
                }
            }

            try {
                $dataInserted[$a] = TransaksiChecklistStagingMv400::create($datas);

                $get_id_po          = $data_checklist[0]['id_po'];
                $get_id_mesin       = $data_checklist[0]['no_mesin'];

                $sql = 'update crt_'.$get_id_po.' set TIME_CHECKLIST = "'.$waktu_checklist_staging.'" where id = '.$get_id_mesin;
                DB::statement($sql);

            } catch(\Illuminate\Database\QueryException $ex) {
                
                TransaksiChecklistStagingMv400::where('id_po', $datas[0]['id_po'])
                                        ->where('no_mesin', $datas[0]['no_mesin'])
                                        ->where('id_classification', $datas[0]['id_classification'])->delete();

                return response()->json(["errorMessage"=> $ex->getMessage()], 500);
            }
        }

        // dd(count($dataInserted));

        if (count($dataInserted) > 0) {
            return response()->json([
                'success' => true,
                'message' => 'Berhasil Insert data Checklist Staging Mv400', 
                'totalDatas' => count($dataInserted),  
                'data' => $dataInserted
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Gagal input data Checklist Staging Mv400', 
                'data' => []
            ], 400);
        }
    }

    function update($idPo, $idMesin, Request $request){
        $dataPayload = json_decode($request->getContent(), true);
        $dataUpdated= [];

        for ($a=0; $a< count($dataPayload); $a++) {

            try {
                $dataUpdated[$a] = TransaksiChecklistStagingMv400::where('id_po', $idPo)
                                                                ->where('no_mesin', $idMesin)
                                                                // ->where('id_classification', $idClassif)
                                                                ->where('id_checklist_staging', $dataPayload[$a]['id_checklist_staging'])
                                                                ->update($dataPayload[$a]);

            }catch(\Illuminate\Database\QueryException $ex) {
                return response()->json(["errorMessage"=> $ex->getMessage()], 500);
            }
        }

        if (count($dataUpdated) > 0){
            return response()->json([
                    'success' => true,
                    'message' => 'Berhasil Update data Checklist Staging Mv400', 
                    'totalDatas' => count($dataUpdated),  
                    'data' => $dataUpdated
                ], 200);
        } else {
            return response()->json([
                    'success' => false,
                    'message' => 'Gagal Update data Checklist Staging', 
                    'data' => []
                ], 400);
        }
    }

    function getDataChecklistStagingDetailsMv400($idPo, $idMesin, $idClassif){

        try {
            $get_classif = MasterClassification::where('id', $idClassif)->get();

            if ($get_classif){
                 $get_data_listStaging = MasterChecklistStagingMv400::where('id_classification', $idClassif)->get();
                 
                 $dataList = [];

                 for ($a =0; $a< count($get_data_listStaging); $a++){
                    $dataList[$a] = $get_data_listStaging[$a];
                    $dataDetail = [];
                    $getDataDetail = TransaksiChecklistStagingMv400::
                                                          where('id_po', $idPo)
                                                        ->where('no_mesin', $idMesin)
                                                        ->where('id_classification', $idClassif)
                                                        ->where('id_checklist_staging', $get_data_listStaging[$a]['id'])
                                                        ->first();

                    if ($getDataDetail){ 
                        $dataList[$a]['detail_staging'] = $getDataDetail; 
                    } else { 
                        $dataList[$a]['detail_staging'] = []; 
                    }
                 }

                 $get_classif[0]['checklistStaging'] = $dataList;
            }

            return response()->json([
                        'success' => true,
                        'data' => $get_classif
                    ]);

        } catch(\Illuminate\Database\QueryException $ex) {
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    function getDataChecklistStaingDetailMV400_AllData($idPo, $idMesin){

        try {

            $get_data_listStaging = MasterChecklistStagingMv400::get();
            $dataList = [];

            for ($a =0; $a< count($get_data_listStaging); $a++){
                $dataList[$a] = $get_data_listStaging[$a];
                $dataDetail = [];
                $getDataDetail = TransaksiChecklistStagingMv400::
                                                where('id_po', $idPo)
                                              ->where('no_mesin', $idMesin)
                                              ->where('id_checklist_staging', $get_data_listStaging[$a]['id'])
                                              ->first();

                if ($getDataDetail){ 
                    $dataList[$a] = $getDataDetail;
                } else {
                    $dataList[$a] = [];
                }
             }

             return response()->json([
                'success' => true,
                'data' => $dataList
             ]);

        } catch(\Illuminate\Database\QueryException $ex) {
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }
}
