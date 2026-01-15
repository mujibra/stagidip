<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\TransaksiSpesifikasiMesin;
use App\Models\Models;
use App\Models\MasterMesin;
use App\Models\MasterCustomer;
use App\Models\PicMitra;
use App\Models\PurchaseOrder;
use App\Models\TransaksiSpesifikasiMesinDetail as TransaksiSpekDetail;
use App\Models\User;

class TransaksiSpesifikasiMesinController extends Controller
{
    function store(Request $request){
        $data = $request->all();
        $check_exists = TransaksiSpesifikasiMesin::where('id_po', $request->id_po)->exists();

        if ($check_exists){
            $po = PurchaseOrder::where('id', $request->id_po)->first();
            return response()->json([
                "success" => false,
                "message" => "Insert Data Spesification Error, No.PO ".$po->no_po." was Exists."
            ], 400);
        }

        $validator = Validator::make($data, [
            'id_po' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try {
            $inserted = TransaksiSpesifikasiMesin::create($data);

            return response()->json([
                "success" => true, 
                "message" => "Transaction of Machine Spesification created successfully.", 
                "data" => $inserted
            ]);


        }catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    function update($id, Request $request){
        $data = $request->all();
        $validator = Validator::make($data, [
            'id_po' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try {

            $updated = TransaksiSpesifikasiMesin::where('id', $id)->update($data);

            return response()->json([
                "success" => true, 
                "message" => "Transaction of Machine Spesification updated successfully.", 
                "data" => $updated
            ]);

        }catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }

    }

    public function index($user_login){

        $user_info = User::where('id', $user_login)->first();
        if ($user_info['roles'] == 'GUEST_BANK'){
            $getTransaksi = TransaksiSpesifikasiMesin::where('customer', $user_info['id_customer'])->orderBy('id', 'DESC')->get();
        } else {
            $getTransaksi = TransaksiSpesifikasiMesin::orderBy('id', 'DESC')->get();
        }

        for( $i=0; $i< count($getTransaksi); $i++ ){

            $getDetailPo = PurchaseOrder::where('id', $getTransaksi[$i]->id_po)->first();
            $getTransaksi[$i]['sn_mesins'] = $getTransaksi[$i]['sn_mesins'] ? json_decode($getTransaksi[$i]['sn_mesins'], true) : [];

            $getModel = Models::where('id', $getTransaksi[$i]->model)->first();
            $getMesin = MasterMesin::where('id', $getTransaksi[$i]->id_type_mesin)->first();
            $getCustomer = MasterCustomer::where('id', $getTransaksi[$i]->customer)->first();

            $getPicStaging = User::where('id', $getTransaksi[$i]->approval_staging)->first();
            $getPicTSS = User::where('id', $getTransaksi[$i]->approval_tss)->first();

            $getTransaksi[$i]['detail_po'] = $getDetailPo;
            $getTransaksi[$i]['model'] = $getModel;
            $getTransaksi[$i]['mesin'] = $getMesin;
            $getTransaksi[$i]['customer'] = $getCustomer;
            $getTransaksi[$i]['approval_staging'] = $getPicStaging;
            $getTransaksi[$i]['approval_tss'] = $getPicTSS;

            unset($getTransaksi[$i]['id_type_mesin']);
            unset($getTransaksi[$i]['id_po']);
        }

        // dd($getTransaksi);

        return response()->json([
                'success' => true,
                'totalDatas' => count($getTransaksi),
                'data' => $getTransaksi
            ]);
    }

    function destroy($id){
        $trans_spekMesin = TransaksiSpesifikasiMesin::findOrFail($id);
        $trans_spekMesin->delete();

        if ($trans_spekMesin){
            $check_detail = TransaksiSpekDetail::where('id_spek_mesin_hdr', $trans_spekMesin['id'])->delete();

            if ($check_detail){
                return response()->json([
                    'success' => true,
                    'message' => "Delete Spesifikasi Mesin Berhasil",
                    'data' => $trans_spekMesin
                ]);

            }
        }
    }

    function updateApprovalSpekMesin($type, $id, Request $request){
        if ($type == 'STAGING'){

            $updated = TransaksiSpesifikasiMesin::where('id', $id)
                                                    ->update(['approval_staging' => $request->approval_by]);
            if($updated){
                 return response()->json([
                        'success' => true,
                        'message' => 'Update Approval Staging was successfully'
                    ], 200);
            } else {
                return response()->json([
                        "success" => false,
                        "message" => "Update Approval by Staging Errors."
                    ], 400);
            }


        } else if ($type == 'TSS'){

            $updated = TransaksiSpesifikasiMesin::where('id', $id)
                                                    ->update(['approval_tss' => $request->approval_by]);

            if($updated){
                 return response()->json([
                        'success' => true,
                        'message' => 'Update Approval TSS was successfully'
                    ], 200);
            } else {
                return response()->json([
                        "success" => false,
                        "message" => "Update Approval by TSS Errors."
                    ], 400);
            }
        }
    }

    function getApprovalSpekMesin($type, $id){
        $getData = TransaksiSpesifikasiMesin::where('id', $id)->first();
        if (!$getData){
            return response()->json([
                        'success' => false,
                        'data' => $getData
                    ], 200); 
        }

        if ($type === 'STAGING'){
            if ($getData){
                $getPicStaging = User::where('id', $getData['approval_staging'])->get();

                if ( count($getPicStaging)> 0){
                    unset($getPicStaging[0]['reset_code'], 
                      $getPicStaging[0]['email_verified_at'], 
                      $getPicStaging[0]['reset_code_expired_at'], 
                      $getPicStaging[0]['created_at'], 
                      $getPicStaging[0]['updated_at']
                    );
                }

                return response()->json([
                        'success' => true,
                        'data' => $getPicStaging
                    ], 200); 
            }
        } else {
            if ($getData){
                $getPicTss = User::where('id', $getData['approval_tss'])->get();

                if ( count($getPicTss)>0 ){
                    unset($getPicTss[0]['reset_code'], 
                      $getPicTss[0]['email_verified_at'], 
                      $getPicTss[0]['reset_code_expired_at'], 
                      $getPicTss[0]['created_at'], 
                      $getPicTss[0]['updated_at']
                    );
                }

                return response()->json([
                        'success' => true,
                        'data' => $getPicTss
                    ], 200); 
            }
        }
    }
}
