<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiInspeksi;
use App\Models\MasterInspeksi;
use App\Models\Models;
use App\Models\TransaksiInspeksiApproval;
use App\Models\PurchaseOrder;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class TransaksiInspeksiController extends Controller
{
    function store(Request $request){
        $dataPayload = json_decode($request->getContent(), true);

        $data_inspeksi= $dataPayload[0]['dataArray'];
        $waktu_preload_inspeksi = $dataPayload[0]['time_todo'];

        $dataInserted= [];
        for ($a=0; $a<count($data_inspeksi); $a++){

            if ($data_inspeksi[$a]['id_inspeksi'] == ""){ $data_inspeksi[$a]['id_inspeksi'] = NULL; }
            if ($data_inspeksi[$a]['position'] == ""){ $data_inspeksi[$a]['position'] = NULL; }
            if ($data_inspeksi[$a]['quantity'] == ""){ $data_inspeksi[$a]['quantity'] = NULL; }
            if ($data_inspeksi[$a]['status'] == ""){ $data_inspeksi[$a]['status'] = NULL; }
            if ($data_inspeksi[$a]['keterangan'] == ""){ $data_inspeksi[$a]['keterangan'] = NULL; }

            $datas= $data_inspeksi[$a];
            $dataInserted[$a] = TransaksiInspeksi::create($datas);
        }

        if (count($dataInserted) > 0) {
            $dataApproval = [
                'id_po' => $data_inspeksi[0]['id_po'],
                'no_mesin' => $data_inspeksi[0]['no_mesin'],
                'sn_mesin' => $data_inspeksi[0]['sn_mesin']
            ];

            TransaksiInspeksiApproval::create($dataApproval);

            // update time-preloading
            $get_id_po = $data_inspeksi[0]['id_po'];
            $get_id_mesin = $data_inspeksi[0]['no_mesin'];

            $sql = 'update crt_'.$get_id_po.' set TIME_PRELOADING = "'.$waktu_preload_inspeksi.'" where id = '.$get_id_mesin;
            DB::statement($sql);

            return response()->json([
                    'success' => true,
                    'message' => 'Berhasil Insert data Inspeksi Testing',
                    'totalDatas' => count($dataInserted),
                    'data' => $dataInserted
                ], 200);
        } else {
            return response()->json([
                    'success' => false,
                    'message' => 'Gagal input data Transaksi Inspeksi',
                    'data' => []
                ], 400);
        }
    }

    function update(Request $request, $idPo, $idMesin){
        $dataPayload = json_decode($request->getContent(), true);
        $dataUpdated= [];

        for ($a=0; $a<count($dataPayload); $a++){


            $check_exists = TransaksiInspeksi::where('id_po', $idPo)
                                        ->where('no_mesin', $idMesin)
                                        ->where('id_inspeksi', $dataPayload[$a]['id_inspeksi'])
                                        ->exists();

            try {

                if ($check_exists ){

                    if ($dataPayload[$a]['id_inspeksi'] == ""){ $dataPayload[$a]['id_inspeksi'] = NULL; }
                    if ($dataPayload[$a]['position'] == ""){ $dataPayload[$a]['position'] = NULL; }
                    if ($dataPayload[$a]['quantity'] == ""){ $dataPayload[$a]['quantity'] = NULL; }
                    if ($dataPayload[$a]['status'] == ""){ $dataPayload[$a]['status'] = NULL; }
                    if ($dataPayload[$a]['keterangan'] == ""){ $dataPayload[$a]['keterangan'] = NULL; }
    
                    $dataUpdated[$a] = TransaksiInspeksi::where('id_po', $dataPayload[$a]['id_po'])
                                                         ->where('no_mesin', $dataPayload[$a]['no_mesin'])
                                                         ->where('id_inspeksi', $dataPayload[$a]['id_inspeksi'])
                                                         ->update($dataPayload[$a]);
    
                } else {
                    TransaksiInspeksi::create($dataPayload[$a]);
                }

            } catch (\Exception $e){
                return response()->json([
                    'success' => false,
                    'message' => "Harap untuk Melakukan Update Mesin, dengan Men-submit Ulang Preloading Inspeksi di Mesin 1", 
                    //"Please check the first machine template and submit the first machine form", 
                ], 400);
            }
        }

        if (count($dataUpdated) > 0) {
            return response()->json([
                    'success' => true,
                    'message' => 'Berhasil Update data Inspeksi Testing',
                    'totalDatas' => count($dataUpdated),
                    'data' => $dataUpdated
                ], 200);
        } else {
            return response()->json([
                    'success' => false,
                    'message' => 'Gagal input data Transaksi Inspeksi',
                    'data' => []
                ], 400);
        }
    }

    function getByIdPoAndIdMesin($idPo, $idMesin){

        $sql = 'select TIME_PRELOADING from crt_'.$idPo.' where id = '.$idMesin;
        $get_time_preloading = DB::select($sql)[0]->TIME_PRELOADING;


        $check_po = PurchaseOrder::join('mst_mesin as msn' , 'msn.id', '=', 'tbl_po.id_type_mesin')
                                ->join('models as mdl', 'mdl.id', '=', 'tbl_po.model')
                                ->where('tbl_po.id', $idPo)->first();

        if ($check_po['name'] == 'ATM'){
            $getDataInspeksi = MasterInspeksi::where('type_atm', 'like', '%' . $check_po['name']. '%')->orderBy('orderby_atms')->get();
        } else if  ($check_po['name'] == 'CRM'){
            $getDataInspeksi = MasterInspeksi::where('type_atm', 'like', '%' . $check_po['name']. '%')->orderBy('orderby_crms')->get();
        } else if  ($check_po['name'] == 'CS KIOS'){
            $getDataInspeksi = MasterInspeksi::where('type_atm', 'like', '%' . $check_po['name']. '%')->orderBy('orderby_cskios')->get();
        } else {
            //$getDataInspeksi = MasterInspeksi::where('type_atm', 'like', '%CRM%')->orderBy('orderby_crms')->get();
            $getDataInspeksi = MasterInspeksi::where('type_atm', 'like', '%' . $check_po['name']. '%')->orderBy('orderby_atms')->get();
        }

        for ($a=0; $a<count($getDataInspeksi); $a++){
            $getInspeksi = TransaksiInspeksi::where('id_po', $idPo)
                                            ->where('no_mesin', $idMesin)
                                            ->where('id_inspeksi', $getDataInspeksi[$a]['id'])
                                            ->first();

            $getStatus = TransaksiInspeksi::where('id_po', $idPo)->where('no_mesin', $idMesin)->count();
            $getDataInspeksi[$a]['detail_inspeksi'] = $getInspeksi;

            unset ($getDataInspeksi[$a]['model_mesin']);

            if ($getStatus>0){ $getDataInspeksi[$a]['testing_inspection'] = true; }
            else { $getDataInspeksi[$a]['testing_inspection'] = false; }

            //in out info decode
            $getDataInspeksi[$a]['in_out_info'] = json_decode($getDataInspeksi[$a]['in_out_info']);
        }

        return response()->json([
                'success'           => true,
                'totalDatas'        => count($getDataInspeksi),
                'data'              => $getDataInspeksi,
                'time_preloading'   => $get_time_preloading
            ], 200);
    }

    function storeMstInspeksi(Request $request){
        try {
            // Validasi data input
            $request->validate([
                'general_desc' => 'required|string',
                'type_atm' => 'required'
            ]);

            // Simpan data user baru
            $MasterInspeksi = new MasterInspeksi;
            $MasterInspeksi->general_desc = $request->input('general_desc');
            $MasterInspeksi->orderby_atms = NULL;
            $MasterInspeksi->orderby_crms = NULL;
            $MasterInspeksi->orderby_cskios = NULL;
            $MasterInspeksi->model_mesin = NULL;
            $MasterInspeksi->type_atm = $request->input('type_atm');
            $MasterInspeksi->in_out_info = NULL;
            $MasterInspeksi->save();
            $MasterInspeksiId = $MasterInspeksi->id;
            $MasterInspeksi->orderby_atms = $MasterInspeksiId;
            $MasterInspeksi->orderby_crms = $MasterInspeksiId;
            $MasterInspeksi->orderby_cskios = $MasterInspeksiId;
            $MasterInspeksi->save();

            return response()->json([
                'success'           => true,
                'message' => 'Mst Inspeksi added successfully.'
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'success'           => false,
                'message' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success'           => false,
                'message' => 'Failed to add data Mst Inspeksi.'
            ], 500);
        }
    }

    function getMstInspeksi(){
        try {
            $dataType = Models::whereNotIn('id', [1, 3])->get();
            $MasterInspeksi = MasterInspeksi::all();
            foreach($MasterInspeksi as $dataMstInspeksi){
                $id_type = [];
                $array_type = explode(',', $dataMstInspeksi['type_atm']);
                foreach($array_type as $data_array_type){
                    foreach($dataType as $data){
                        if($data['name'] == $data_array_type){
                            $id_type[] = $data['id'];
                        }
                    }
                }
                $dataMstInspeksi['in_out_info'] = json_decode($dataMstInspeksi['in_out_info']);
                $resultArray_type = [];
                foreach ($id_type as $index => $id) {
                    $resultArray_type[] = ['id' => $id, 'type_atm' => $array_type[$index]];
                }
                $jsonResult_type = json_encode($resultArray_type);
                $dataMstInspeksi['type_atm'] = json_decode($jsonResult_type);
            }

            return response()->json([
                'success' => true,
                'message' => 'Success to show data inspeksi',
                'data' => $MasterInspeksi
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success'           => false,
                'message' => 'Failed to show data inspeksi.'
            ], 500);
        }
    }

    function getIdMstInspeksi($id){
        try {

            $dataType = Models::whereNotIn('id', [1, 3])->get();
            $MasterInspeksi = MasterInspeksi::find($id);
            $id_type = [];
            $array_type = explode(',', $MasterInspeksi['type_atm']);
            foreach($array_type as $data_array_type){
                foreach($dataType as $data){
                    if($data['name'] == $data_array_type){
                        $id_type[] = $data['id'];
                    }
                }
            }
            $resultArray_type = [];
            foreach ($id_type as $index => $id) {
                $resultArray_type[] = ['id' => $id, 'type_atm' => $array_type[$index]];
            }
            $jsonResult_type = json_encode($resultArray_type);

            $MasterInspeksi['in_out_info'] = json_decode($MasterInspeksi['in_out_info']);
            $MasterInspeksi['type_atm'] = json_decode($jsonResult_type);


            return response()->json([
                'success' => true,
                'message' => 'Success to show data inspeksi',
                'data' => $MasterInspeksi
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success'           => false,
                'message' => 'Failed to show data inspeksi.'
            ], 500);
        }
    }

    function updateMstInspeksi(Request $request, $id) {
        try {
            // Validasi data input
            $request->validate([
                'general_desc' => 'required|string',
                'type_atm' => 'required',
                'in_out_info' => 'required',
            ]);

            // Temukan data Mst Inspeksi berdasarkan ID
            $MasterInspeksi = MasterInspeksi::find($id);

            if (!$MasterInspeksi) {
                return response()->json([
                    'success' => false,
                    'message' => 'Mst Inspeksi not found.'
                ], 404);
            }

            // Perbarui data Mst Inspeksi
            $MasterInspeksi->general_desc = $request->input('general_desc');
            $MasterInspeksi->orderby_atms = $id;
            $MasterInspeksi->orderby_crms = $id;
            $MasterInspeksi->orderby_cskios = $id;
            $MasterInspeksi->model_mesin = NULL;
            $MasterInspeksi->type_atm = $request->input('type_atm');
            $MasterInspeksi->in_out_info = $request->input('in_out_info');
            $MasterInspeksi->save();

            return response()->json([
                'success' => true,
                'message' => 'Mst Inspeksi updated successfully.'
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update data Mst Inspeksi.'
            ], 500);
        }
    }

    function updateInfoMstInspeksi(Request $request, $id){
        try {
            // Validasi data input
            $request->validate([
                'in_out_info' => 'required',
            ]);

            // Temukan data Mst Inspeksi berdasarkan ID
            $MasterInspeksi = MasterInspeksi::find($id);

            if (!$MasterInspeksi) {
                return response()->json([
                    'success' => false,
                    'message' => 'Mst Inspeksi not found.'
                ], 404);
            }

            // Perbarui data Mst Inspeksi
            $MasterInspeksi->in_out_info = $request->input('in_out_info');
            $MasterInspeksi->save();

            return response()->json([
                'success' => true,
                'message' => 'Mst Inspeksi updated successfully.'
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update data Mst Inspeksi.'
            ], 500);
        }
    }

    function getInfoIdMstInspeksi($id){
        try {

            $dataType = Models::whereNotIn('id', [1, 3])->get();
            $MasterInspeksi = MasterInspeksi::find($id);
            $id_type = [];
            $array_type = explode(',', $MasterInspeksi['type_atm']);
            foreach($array_type as $data_array_type){
                foreach($dataType as $data){
                    if($data['name'] == $data_array_type){
                        $id_type[] = $data['id'];
                    }
                }
            }
            $resultArray_type = [];
            foreach ($id_type as $index => $id) {
                $resultArray_type[] = ['id' => $id, 'type_atm' => $array_type[$index]];
            }
            $jsonResult_type = json_encode($resultArray_type);

            $MasterInspeksi['in_out_info'] = json_decode($MasterInspeksi['in_out_info']);
            $MasterInspeksi['type_atm'] = json_decode($jsonResult_type);


            return response()->json([
                'success' => true,
                'message' => 'Success to show data inspeksi',
                'data' => $MasterInspeksi['in_out_info']
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success'           => false,
                'message' => 'Failed to show data inspeksi.'
            ], 500);
        }
    }

    function deleteInfoMstInspeksi(Request $request, $id){
        try {

            // Temukan data Mst Inspeksi berdasarkan ID
            $MasterInspeksi = MasterInspeksi::find($id);

            if (!$MasterInspeksi) {
                return response()->json([
                    'success' => false,
                    'message' => 'Mst Inspeksi not found.'
                ], 404);
            }

            // Perbarui data Mst Inspeksi
            $MasterInspeksi->in_out_info = json_decode(json_encode('{"label" : "","option": []}'));
            $MasterInspeksi->save();

            return response()->json([
                'success' => true,
                'message' => 'Mst Inspeksi delete successfully.'
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update data Mst Inspeksi.'
            ], 500);
        }
    }

    function deleteMstInspeksi($id) {
        try {
            // Temukan data Mst Inspeksi berdasarkan ID
            $MasterInspeksi = MasterInspeksi::find($id);

            if (!$MasterInspeksi) {
                return response()->json([
                    'success' => false,
                    'message' => 'Mst Inspeksi not found.'
                ], 404);
            }

            // Hapus data Mst Inspeksi
            $MasterInspeksi->delete();

            return response()->json([
                'success' => true,
                'message' => 'Mst Inspeksi deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete data Mst Inspeksi.'
            ], 500);
        }
    }

}
