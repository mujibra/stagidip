<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterPo;
use App\Models\MasterCustomer;
use App\Models\PurchaseOrder;
use Validator;

class MasterPoController extends Controller
{
    //
    public function index(){
        $masterPo = MasterPo::where('deleted_at', '=', NULL)->orderBy('id', 'desc')->get();  //MasterPo::all();

        for ( $i = 0; $i < count($masterPo); $i++){
            $getCustomer = MasterCustomer::where('id', $masterPo[$i]->id_customer)->first();
            $masterPo[$i]['customer'] = $getCustomer;
        }

        return response()->json([
                'success' => true,
                'totalDatas' => $masterPo->count(),
                'data' => $masterPo  
            ]);
    }

    public function store(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, 
            ['no_po_master' => 'required'], 
            ['no_po_master.required' => 'No Po tidak boleh Kosong']);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        try{
            $mstPo = MasterPo::create($input);

            return response()->json([
                "success" => true,
                "message" => "PO Master created successfully.",
                "data" => $mstPo
            ]);
        } catch(\Illuminate\Database\QueryException $ex) {
             if ($ex->errorInfo[0] == '23000'){
                return response()->json(["errorMessage"=> "PO Number was Exist"], 400);
             }
             return response()->json(["errorMessage"=> $ex->getMessage()], 400);
        }
    }

    public function getDataById($idPoMaster){
        $masterPo = MasterPo::where('id', $idPoMaster)->get();

        for ( $i = 0; $i < count($masterPo); $i++){
            $getCustomer = MasterCustomer::where('id', $masterPo[$i]->id_customer)->first();
            $masterPo[$i]['customer'] = $getCustomer;
        }

        if ($masterPo->count() > 0){
            return response()->json([
                'success' => true,
                'totalDatas' => $masterPo->count(),
                'data' => $masterPo
            ]);
        } else {
             return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                    'data' => []
                ]);

        } 
    }

    public function update($idPo, Request $request){

        $checkTransaksiPo = PurchaseOrder::select('*')->where('id_po_master',$idPo)->exists();
        $masterPo = MasterPo::whereId($idPo)->first();

        if ($checkTransaksiPo && $masterPo->no_po_master != $request->no_po_master ){
            
            return response()->json([
                   'success' => false,
                   'message' => 'PO '.$masterPo->no_po_master.' Gagal di Edit, karena sudah terpakai di Transaksi Staging Registration',
               ], 400);
        } 

        $validator = Validator::make($request->all(),[
                'no_po_master' => 'required', 
                'id_customer' => 'required'],
                [
                'no_po_master.required' => 'Nomor PO tidak boleh kosong', 
                'id_customer.required' => 'Customer wajib dipilih'
                ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try {
            
            $data[] = $request->all();
            $updatePOMaster = MasterPo::where('id', $idPo)->update($data[0]);
            //$masterPo = MasterPo::where('id', $idPo)->get();

            if ($updatePOMaster){
                return response()->json([
                    "success" => true,
                    "message" => "PO Master was Updated.",
                    "data" => $masterPo
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'PO Master Error Update',
                ], 400);
            }

        } catch(\Exception $e) {

            if ($e->errorInfo[0] == '23000') {
                return response()->json([
                    'success' => false,
                    'message' => 'No PO Sudah ada, harap mengisi dengan No PO yang lain',
                ], 400);
            }

            return response()->json([
                'success' => false,
                'data' => $e
            ], 400);
        }
    }


    public function destroy($idPo){
         $checkTransaksiPo = PurchaseOrder::select('*')->where('id_po_master',$idPo)->exists();

         if ($checkTransaksiPo){
             $masterPo = MasterPo::whereId($idPo)->first();
             return response()->json([
                    'success' => true,
                    'message' => 'PO '.$masterPo->no_po_master.' Gagal di hapus, karena sudah terpakai di Transaksi PO Registration',
                ], 400);
         } 

         $poMaster = MasterPo::findOrFail($idPo);
         $poMaster->delete();

         if($poMaster){
            return response()->json([
                "success" => true,
                "message" => "PO Master ".$poMaster->no_po_master." has been deleted.",
                "data" => $poMaster
            ]);
         } else {
            return response()->json([
                    'success' => false,
                    'message' => 'PO Master Gagal di hapus',
                ], 400);
         }
    }
}
