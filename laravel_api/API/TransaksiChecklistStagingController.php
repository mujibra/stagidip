<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiChecklistStaging;
use App\Models\TransaksiChecklistStagApproval;
use App\Models\TransaksiChecklistStagingMv400;
use App\Models\PurchaseOrder;
use Illuminate\Support\Facades\DB;
use App\Models\MasterChecklistStaging;

class TransaksiChecklistStagingController extends Controller
{
    function store(Request $request){
        $dataPayload = json_decode($request->getContent(), true);

        $data_checklist = $dataPayload[0]['dataArray'];
        $waktu_checklist_staging = $dataPayload[0]['time_todo'];

        $dataInserted= [];
        for ($a=0; $a<count($data_checklist); $a++){

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

            $check_type_items = MasterChecklistStaging::select(['mtvc.*'])
                                    ->join('mst_type_value_checklist as mtvc', 'mtvc.id', '=', 'mst_checklist_staging.id_type_values')
                                    ->where('mst_checklist_staging.id', $data_checklist[$a]['id_checklist_staging'])
                                    ->first();

            if ($data_checklist[$a]['result_details'] === 'VDisplay' 
                OR str_contains($data_checklist[$a]['result_details'], 'Dev. 1,2,3,4') 
                OR str_contains($data_checklist[$a]['result_details'], '1.Booting time: Min. Sec.')
                OR str_contains($data_checklist[$a]['result_details'], 'No problem the display status')
                OR (  in_array( $check_type_items['types'] , ['TEXT_INPUT', 'COMBO_BOX']) )
            ) {
                $data_checklist[$a]['fill_columns'] = json_encode($data_checklist[$a]['fill_columns'], true);
            } else {
                $data_checklist[$a]['fill_columns'] = $data_checklist[$a]['fill_columns'];
            }

            $datas= $data_checklist[$a]; 
            
            try {
                
                $dataInserted[$a] = TransaksiChecklistStaging::create($datas);

                $get_id_po          = $data_checklist[0]['id_po'];
                $get_id_mesin       = $data_checklist[0]['no_mesin'];

                $sql = 'update crt_'.$get_id_po.' set TIME_CHECKLIST = "'.$waktu_checklist_staging.'" where id = '.$get_id_mesin;
                DB::statement($sql);

            } catch(\Illuminate\Database\QueryException $ex) {
                TransaksiChecklistStaging::where('id_po', $datas[0]['id_po'])
                                        ->where('no_mesin', $datas[0]['no_mesin'])
                                        ->where('id_divisi', $datas[0]['id_divisi'])->delete();

                return response()->json(["errorMessage"=> $ex->getMessage()], 500);
            }
        
        }

        if (count($dataInserted) > 0) {
            return response()->json([
                    'success' => true,
                    'message' => 'Berhasil Insert data Checklist Staging', 
                    'totalDatas' => count($dataInserted),  
                    'data' => $dataInserted
                ], 200);
        } else {
            return response()->json([
                    'success' => false,
                    'message' => 'Gagal input data Checklist Staging', 
                    'data' => []
                ], 400);
        }
    }

    function update($idPo, $idMesin, $idDivisi, Request $request){
        $dataPayload = json_decode($request->getContent(), true);

        $dataUpdated= [];
        for ($a=0; $a< count($dataPayload); $a++){

            if ($dataPayload[$a]['result_details'] === 'VDisplay' 
                OR str_contains($dataPayload[$a]['result_details'], 'Dev. 1,2,3,4') 
                OR str_contains($dataPayload[$a]['result_details'], '1.Booting time: Min. Sec.')
                OR str_contains($dataPayload[$a]['result_details'], 'No problem the display status')
            ) {

                $dataPayload[$a]['fill_columns'] = json_encode($dataPayload[$a]['fill_columns'], true);
            } else {
                $dataPayload[$a]['fill_columns'] = $dataPayload[$a]['fill_columns'];
            }

            $datas= $dataPayload[$a];

            try {

                if ($idDivisi == 'null'){
                    
                    $check_data_exist = TransaksiChecklistStaging::where('id_po', $idPo)
                                               ->where('no_mesin', $idMesin)
                                               ->where('id_checklist_staging', $dataPayload[$a]['id_checklist_staging'])
                                               ->exists();

                    if (!$check_data_exist){
                        TransaksiChecklistStaging::where('id_po', $idPo)
                                               ->where('no_mesin', $idMesin)
                                               ->where('id_checklist_staging', $dataPayload[$a]['id_checklist_staging'])
                                               ->create($dataPayload[$a]);
                    } else {
                        $dataUpdated[$a] = TransaksiChecklistStaging::where('id_po', $idPo)
                                               ->where('no_mesin', $idMesin)
                                               ->where('id_checklist_staging', $dataPayload[$a]['id_checklist_staging'])
                                               ->update($dataPayload[$a]);
                    }
                } else {
                     $dataUpdated[$a] = TransaksiChecklistStaging::where('id_po', $idPo)
                                               ->where('no_mesin', $idMesin)
                                               ->where('id_divisi', $idDivisi)
                                               ->where('id_checklist_staging', $dataPayload[$a]['id_checklist_staging'])
                                               ->update($dataPayload[$a]);
                }

            }catch(\Illuminate\Database\QueryException $ex) {
                return response()->json(["errorMessage"=> $ex->getMessage()], 500);
            }
        }

        if (count($dataUpdated) > 0) {
             return response()->json([
                    'success' => true,
                    'message' => 'Berhasil Update data Checklist Staging', 
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


    function updateAll($idPo, $idMesin, Request $request){
         $dataPayload = json_decode($request->getContent(), true);
         $dataUpdated= [];
         for ($a=0; $a< count($dataPayload); $a++){

            $check_type_items = MasterChecklistStaging::select(['mtvc.*'])
                ->join('mst_type_value_checklist as mtvc', 'mtvc.id', '=', 'mst_checklist_staging.id_type_values')
                ->where('mst_checklist_staging.id', $dataPayload[$a]['id_checklist_staging'])
                ->first();

             if ($dataPayload[$a]['result_details'] == 'VDisplay' 
                    OR str_contains($dataPayload[$a]['result_details'], 'Dev. 1,2,3,4') 
                    OR str_contains($dataPayload[$a]['result_details'], '1.Booting time: Min. Sec.')
                    OR str_contains($dataPayload[$a]['result_details'], 'No problem the display status')
                    OR (  in_array( $check_type_items['types'] , ['TEXT_INPUT', 'COMBO_BOX']) )
                ) {

                    $dataPayload[$a]['fill_columns'] = json_encode($dataPayload[$a]['fill_columns'], true);
             
             } else {
                    $dataPayload[$a]['fill_columns'] = $dataPayload[$a]['fill_columns'];
             }

             try {

                 $dataUpdated[$a] = TransaksiChecklistStaging::where('id_po', $idPo)
                                               ->where('no_mesin', $idMesin)
                                               ->where('id_checklist_staging', $dataPayload[$a]['id_checklist_staging'])
                                               ->update($dataPayload[$a]);

              }catch(\Illuminate\Database\QueryException $ex) {
                 return response()->json(["errorMessage"=> $ex->getMessage()], 500);
              }
         }

         if (count($dataUpdated) > 0) {
                 return response()->json([
                        'success' => true,
                        'message' => 'Berhasil Update data Checklist Staging', 
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

    function getDataByIdPoIdMesin($idPo, $idMesin, $idDivisi){
        $getData = TransaksiChecklistStaging::where('id_po', $idPo)->where('no_mesin', $idMesin)->where('id_divisi', $idDivisi)->get();
        if ($getData){
            return response()->json([
                    'success' => true,
                    'totalDatas' => count($getData),  
                    'data' => $getData
                ], 200);
        }
    }

    function getCountDataResults($type, $idPo, $idMesin){
        $datas = TransaksiChecklistStaging::where('id_po', $idPo)
                                               ->where('no_mesin', $idMesin)
                                               ->where('results', $type)
                                               ->count();
        if ($datas> 0){
            return response()->json([
                    'success' => true,
                    'totalDatas' => $datas,  
                    'status' => $type
                ], 200);
        } else {
            return response()->json([
                    'success' => true,
                    'totalDatas' => $datas,  
                    'status' => $type
                ], 200);
        }
    }


    function getCountDataResultAll($idPo, $idMesin){
        $check_po = PurchaseOrder::select(['msn.type'])
                            ->join('mst_mesin as msn', 'msn.id', '=', 'tbl_po.id_type_mesin')
                            ->where('tbl_po.id', '=', $idPo)->first();

        $datas = [];
        if ($check_po['type'] == 'MV-400'){

            $count_ok = TransaksiChecklistStagingMv400::
                                where('id_po', $idPo)
                              ->where('no_mesin', $idMesin)
                              ->where('results', 'OK')
                              ->count();

            $count_ng = TransaksiChecklistStagingMv400::
                            where('id_po', $idPo)
                          ->where('no_mesin', $idMesin)
                          ->where('results', 'NG')
                          ->count();

             $count_na = TransaksiChecklistStagingMv400::
                            where('id_po', $idPo)
                          ->where('no_mesin', $idMesin)
                          ->where('results', 'NA')
                          ->count();
             $datas = [
                'data_ok' => $count_ok, 
                'data_ng' => $count_ng, 
                'data_na' => $count_na
             ];
        } else {

            $count_ok = TransaksiChecklistStaging::
                            where('id_po', $idPo)
                          ->where('no_mesin', $idMesin)
                          ->where('results', 'OK')
                          ->count();

            $count_ng = TransaksiChecklistStaging::
                                where('id_po', $idPo)
                              ->where('no_mesin', $idMesin)
                              ->where('results', 'NG')
                              ->count();

            $count_na = TransaksiChecklistStaging::
                                where('id_po', $idPo)
                              ->where('no_mesin', $idMesin)
                              ->where('results', 'NA')
                              ->count();

            $datas = [
                'data_ok' => $count_ok, 
                'data_ng' => $count_ng, 
                'data_na' => $count_na
            ];
        }

         return response()->json([
                    'success' => true,
                    'data_status' => $datas
                ], 200);
    }
}