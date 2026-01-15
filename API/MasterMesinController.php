<?php

namespace App\Http\Controllers\API;

use App\Models\MasterMesin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Models;
use App\Models\PurchaseOrder;
use App\Models\MasterDivisi;
use App\Models\MasterChecklistStaging;

class MasterMesinController extends Controller
{
    public function index(){
        $masterMesin = MasterMesin::all();
        for ( $i = 0; $i < count($masterMesin); $i++){
            $getModel = Models::where('id', $masterMesin[$i]->model)->first();
            $masterMesin[$i]['model'] = $getModel;
        }

        return response()->json([
                'success' => true,
                'totalDatas' => $masterMesin->count(),
                'data' => $masterMesin
            ]);
    }

    public function getDataById($id){
        $masterMesin = MasterMesin::whereId($id)->first();

        if ($masterMesin){

            $getModel = Models::where('id', $masterMesin->model)->first();
            $masterMesin['model'] = $getModel;

            return response()->json([
                'success' => true,
                'data' => $masterMesin
            ]);

        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan',
                'data' => []
            ]);
        }
    }

    public function getTypeMesinBasedModel($namaModel){
        $masterMesin = MasterMesin::where('model', '=', $namaModel)->get();

        if($masterMesin){
             return response()->json([
                    'success' => true,
                    'totalDatas' => $masterMesin->count(),
                    'data' => $masterMesin
                ], 200);

         } else {
            return response()->json([
                        'success' => false,
                        'message' => 'Data tidak ditemukan',
                        'data' => []
                    ]);
         }

    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'merek' => 'required',
            'model' => 'required',
            'type' => 'required',
        ],[
            'merek.required' => 'Merek tidak boleh kosong !',
            'model.required' => 'Model tidak boleh kosong !',
            'type.required' => 'Type tidak boleh kosong',
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else {

            try {

                $masterMesin = MasterMesin::whereId($id)
                                ->update(['merek' => $request->input('merek'),
                                          'model' => $request->input('model'),
                                          'type' => $request->input('type')]
                                );

                $getMasterMesin = MasterMesin::whereId($id)->first();

                if($masterMesin) {
                    return response()->json([
                        'success' => true,
                        'message' => 'Data berhasil diupdate',
                        'data' =>  $getMasterMesin
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Data Mesin Not Found'
                    ], 400);
                }

            } catch(\Illuminate\Database\QueryException $ex) {
                // return response()->json(["errorMessage"=> $ex->getMessage()], 500);
                if ($ex->errorInfo[0] == '23000'){
                   return response()->json(["errorMessage"=> "Model Mesin ".$request->type." sudah ada, Harap Isi Nama Model dengan nama lain"], 400);
                }
                return response()->json(["errorMessage"=> $ex->getMessage()], 400);
           }

        }
    }

    public function store(Request $request){
        $input = $request->all();
        $input['status'] = 'NEW_MODEL';

        $validator = Validator::make($input, [
            'merek' => 'required',
            'model' => 'required',
            'type' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try{
            $mesin = MasterMesin::create($input);

            return response()->json([
                "success" => true,
                "message" => "Mesin created successfully.",
                "data" => $mesin
            ]);
        } catch(\Illuminate\Database\QueryException $ex) {
             // return response()->json(["errorMessage"=> $ex->getMessage()], 500);
             if ($ex->errorInfo[0] == '23000'){
                return response()->json(["errorMessage"=> "Model Mesin ".$input['type']." sudah ada, Harap Isi Nama Model dengan nama lain"], 400);
             }
             return response()->json(["errorMessage"=> $ex->getMessage()], 400);
        }
    }

    public function destroy($id) {

        $checkTransaksiPo = PurchaseOrder::select('*')->where('id_type_mesin',$id)->exists();
        if ($checkTransaksiPo){
             $getGudang = MasterMesin::whereId($id)->first();
              return response()->json([
                    'success' => false,
                    'message' => 'Type Mesin '.$getGudang->type.' Gagal di hapus, karena sudah terpakai di Transaksi Staging Registration',
                ], 400);
        }

        $master_mesin = MasterMesin::findOrFail($id);
        $master_mesin->delete();

        if($master_mesin) {
            
            MasterDivisi::where('id_mesin', $id)->delete();
            MasterChecklistStaging::where('id_mesin', $id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil dihapus', 
                'data' => $master_mesin
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data gagal dihapus'
            ], 400);
        }
    }

    // new format models 
    function getAllNewModels($idType){
        $datas = MasterMesin::where('model', $idType)->where('status', 'NEW_MODEL')->get();
        
        return response()->json([
            'success' => true,
            'totalDatas' => count($datas),
            'data' => $datas
        ]);
    }

    // proses penambahan mesin Baru 
    function getByIdNewMesin($idMesin)
    {
        $get_mesin = MasterMesin::whereId($idMesin)->first();           
        $get_type = Models::where('id', $get_mesin['model'])->first();
        $get_mesin['model'] = $get_type;
        
        $get_list_copy_from = MasterMesin::where('model', $get_mesin['model']['id'])->where('status_template_prestaging', 1)->get();

        return response()->json([
            'success' => true,
            'data' => $get_mesin, 
            'list_copy_from' => $get_list_copy_from
        ]);
    }

    // fungsi copy mst_divisi dari data copy template yang ada 
    function copyTemplatePreStaging( $idMesin, Request $request){
        $mesin_exists = MasterMesin::whereId($idMesin)->exists();
        $data = $request->all();

        $array_id_divisi_lama = [];
        $array_id_divisi_baru = [];
        $array_divisi = [];

        if ($mesin_exists){
 
            $select_format_divisi = MasterDivisi::where('id_mesin', $request->copy_from_model)->get();
            $data_insert_divisi_baru = [];

            for ($x=0; $x<count($select_format_divisi); $x++){
                $data_insert_divisi_baru[$x] = [
                    'name' => $select_format_divisi[$x]['name'], 
                    'id_mesin' => $idMesin
                ];

                array_push($array_id_divisi_lama, $select_format_divisi[$x]['id']);
            }

            $insert_divisi_baru = MasterDivisi::insert($data_insert_divisi_baru);
            $select_divisi_baru = MasterDivisi::where('id_mesin', $idMesin)->get();

            $array_id_divisi_lama_uniq = array_unique($array_id_divisi_lama);
            $id_divisi_baru = [];
            
            for ($y=0; $y<count($select_divisi_baru); $y++){
                array_push($array_id_divisi_baru, $select_divisi_baru[$y]['id']);
            }
            $array_id_divisi_baru_uniq = array_unique($array_id_divisi_baru);

            for ( $z=0; $z<count($array_id_divisi_lama_uniq); $z++ ){
                $divisi_from_to = [
                    'id_divisi_from' => $array_id_divisi_lama_uniq[$z], 
                    'id_divisi_to' => $array_id_divisi_baru_uniq[$z]
                ];
                array_push($array_divisi, $divisi_from_to);
            }

            // copy mst_checklist_staging dari model mesin lama ke yg baru 
            $data_items = [];
            $select_mst_spek_lama = MasterChecklistStaging::where('id_mesin', $request->copy_from_model)->get();
            for ($a=0; $a<count($select_mst_spek_lama); $a++){
                $set_id_divisi_to = $this->search_to_divisi($select_mst_spek_lama[$a]['id_divisi'], $array_divisi);
                $details = [
                    'test_desc'      => $select_mst_spek_lama[$a]['test_desc'], 
                    'result_detail'  => $select_mst_spek_lama[$a]['result_detail'], 
                    'id_divisi'      => $set_id_divisi_to, 
                    'id_mesin'       => $idMesin, 
                    'id_type_values' => $select_mst_spek_lama[$a]['id_type_values']
                ];
                array_push($data_items, $details);
            }

            if ( count($data_items)> 0){
                $insert_mst_checklist_staging = MasterChecklistStaging::insert($data_items);
                MasterMesin::where('id', $idMesin)->update(['status_template_prestaging' => 1, 'copy_from_model' => $request->copy_from_model]);
            }

            return response()->json([
                'success' => true,
                'message' => "Copy Template Prestaging berhasil"
            ]);
        }
    }

    // Reff : https://stackoverflow.com/questions/43173255/php-search-multidimensional-array-for-value-get-corresponding-element-value
    function search_to_divisi($id_divisi_lama, $dataArray){
        $data_arr = $dataArray;
        foreach($data_arr as $element){
            if ($element['id_divisi_from'] == $id_divisi_lama){
                return $element['id_divisi_to']; 
            }
        }
        return null;
    }

}
