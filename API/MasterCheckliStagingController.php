<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterChecklistStaging;
use App\Models\MasterDivisi;
use App\Models\MasterMesin;
use App\Models\MasterTypeValuesChecklist;
use App\Models\TransaksiChecklistStaging;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MasterCheckliStagingController extends Controller
{
    public function index(){

        $sql = 'select * from mst_checklist_staging';
        $getMasterChecklistStaging =  DB::select($sql);

        if ($getMasterChecklistStaging){

            for ($a=0; $a<count($getMasterChecklistStaging); $a++ ){

                $getDivisi = MasterDivisi::where('id', $getMasterChecklistStaging[$a]->id_divisi)->first();
                $getMasterChecklistStaging[$a]->divisi = $getDivisi;

                $getMesin = MasterMesin::whereId($getMasterChecklistStaging[$a]->id_mesin)->first();
                $getMasterChecklistStaging[$a]->model = $getMesin;


                $detail_item_values = MasterTypeValuesChecklist::where('id', $getMasterChecklistStaging[$a]->id_type_values)->first();
                $getMasterChecklistStaging[$a]->item_type_values = $detail_item_values;

                if ( isset ($detail_item_values->types) ){
                     if ($detail_item_values->types == "COMBO_BOX" OR $detail_item_values->types == "TEXT_INPUT" ){
                         $dtArrayLabel =  json_decode($detail_item_values->labels, true);
                         $getMasterChecklistStaging[$a]->item_type_values->labels = $dtArrayLabel;
                     } else {
                         $getMasterChecklistStaging[$a]->item_type_values->labels = $detail_item_values->labels;
                     }
                }
            }
        }

        return response()->json([
                'success' => true,
                'totalDatas' => count($getMasterChecklistStaging), 
                'data' => $getMasterChecklistStaging  
            ]);
    }

    function getListTypeValues(){
        $datas = MasterTypeValuesChecklist::all();
        
        for ($a=0; $a<count($datas); $a++ ){
            if ( isset ($datas[$a]['types']) ){
                if ($datas[$a]['types'] == "COMBO_BOX" OR $datas[$a]['types'] == "TEXT_INPUT" ){
                    $dtArrayLabel =  json_decode($datas[$a]['labels'], true);
                    $datas[$a]['labels'] = $dtArrayLabel;
                } else {
                    $datas[$a]['labels'] = $datas[$a]['labels'];
                }
           }
        }

        return response()->json([
            'success' => true,
            'data' => $datas  
        ]);

    }

    function update($idMaster, Request $request ) {

        $check_exists = MasterChecklistStaging::whereId($idMaster)->exists();

        if (!$check_exists){
            return response()->json([
                'success' => true,
                'message' => 'Data Not Found', 
                'data' => []
            ], 400);
        }

        $validator = Validator::make($request->all(), [
            'test_desc' => 'required',
            'result_detail' => 'required',
            'id_divisi' => 'required',
            'id_mesin' => 'required',
            'id_type_values' => 'required'
        ],[
            'test_desc.required' => 'Deskripsi Test tidak boleh kosong !',
            'result_detail.required' => 'Result Details tidak boleh kosong !',
            'id_divisi.required' => 'Divisi Wajib Dipilih',
            'id_mesin.required' => 'Model Mesin Wajib Dipilih',
            'id_type_values.required' => 'Type Item Wajib Dipilih'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else {

            try {

                $update_master = MasterChecklistStaging::whereId($idMaster)->update([
                    'test_desc'         => $request->test_desc,
                    'result_detail'     => $request->result_detail, 
                    'id_divisi'         => $request->id_divisi,
                    'id_mesin'          => $request->id_mesin,
                    'id_type_values'    => $request->id_type_values
                ]);
    
                if ($update_master){

                    $select_row = MasterChecklistStaging::whereId($idMaster)->first();
                    
                    return response()->json([
                        'success' => true,
                        'message' => 'Data Master Checklist Staging berhasil diupdate',
                        'data' => $select_row
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Data Master Checklist Staging gagal diupdate',
                        'data' => ''
                    ], 400);
                }

            }catch (\Exception $e){
                return response()->json([
                    'success' => false,
                    'data' => $e
                ], 400);
            }
        }
    }

    function store ($idDivisi, Request $request) {
        $input = $request->all();
        $model_exists =  MasterMesin::whereId($request->id_mesin)->first();

        if (!$model_exists){
            return response()->json([
                'success' => false,
                'message' => 'Model Not Found'
            ], 400);
        }

        $check_mesin_and_divisi_exists = MasterDivisi::where('id', $request->id_divisi)->where('id_mesin', $request->id_mesin)->exists();

        if (!$check_mesin_and_divisi_exists){
            return response()->json([
                'success' => false,
                'message' => 'Combination of Model and Division is Not Found'
            ], 400);
        }

        $validator = Validator::make($input, [
            'test_desc' => 'required',
            'result_detail' => 'required',
            'id_divisi' => 'required',
            'id_mesin' => 'required',
            'id_type_values' => 'required'
        ],[
            'test_desc.required' => 'Deskripsi Test tidak boleh kosong !',
            'result_detail.required' => 'Result Details tidak boleh kosong !',
            'id_divisi.required' => 'Divisi Wajib Dipilih',
            'id_mesin.required' => 'Model Mesin Wajib Dipilih',
            'id_type_values.required' => 'Type Item Wajib Dipilih'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else {

            try {

                $mst_checklist = MasterChecklistStaging::create($input);

                if ($mst_checklist) {
                    return response()->json([
                        "success" => true,
                        "message" => "Master Pre staging Checklist was created successfully.",
                        "data" => $mst_checklist
                    ]);
                }
            } catch (\Exception $e){
                return response()->json([
                    'success' => false,
                    'data' => $e
                ], 400);
            }
        }
    }

    function destroy($idMaster){
        $check_exists = MasterChecklistStaging::whereId($idMaster)->first();


        if ($check_exists){

            $checkTransaksiChecklistStaging = TransaksiChecklistStaging::select('*')->where('id_checklist_staging',$idMaster)->exists();

            if ($checkTransaksiChecklistStaging){   
                return response()->json([
                        'success' => false,
                        'message' => 'Item ( '.$check_exists->test_desc.' ) Gagal di hapus, Item ini sedang dipakai di Transaksi PreStaging Checklist',
                    ], 400);
            }

            $select_item = MasterChecklistStaging::findOrFail($idMaster);
            $select_item->delete();

            if($select_item) {
                return response()->json([
                    'success' => true,
                    'message' => 'Data Master Item Prestaging Checklist berhasil dihapus',
                    'data' => $select_item
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data Master Item Prestaging Checklist gagal dihapus',
                    'data' => ''
                ], 400);
            }

        } else {

            return response()->json([
                'success' => false,
                'message' => 'Data not found',
            ], 400);

        }


    }
}
