<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\PurchaseOrder;
use App\Models\Models;
use App\Models\MasterMesin;
use App\Models\MasterGudang;
use App\Models\MasterCustomer;
use App\Models\DeliveryRequest;
use Carbon\Carbon;
use App\Models\User;
use App\Models\PicMarketing;

class DeliveryRequestController extends Controller
{
    function getListSN(){
        $datas = [];
        $dataPo = PurchaseOrder::select(['mdl.name', 'tbl_po.*'])
                        ->join('models as mdl', 'tbl_po.model', '=', 'mdl.id')
                        ->where('deleted_at', '=', NULL)
                        ->get();

        for ($a=0; $a< count($dataPo); $a++){
            $id_po          = $dataPo[$a]['id'];
            $no_po          = $dataPo[$a]['no_po'];
            $column_snMesin = '';
            $data_sn =[];

            switch ($dataPo[$a]['name']){
                case "ATM"      : $column_snMesin ='ATM_MESIN'; break;
                case "ATMS"     : $column_snMesin ='ATM_MESIN'; break;
                case "CRM"      : $column_snMesin ='CRM_MESIN'; break;
                case "TCR"      : $column_snMesin ='TCR_MESIN'; break;
                case "CS KIOS"  : $column_snMesin ='CS_KIOS_MESIN'; break;
                case "VBK"      : $column_snMesin ='VBK_MESIN'; break;
                case "TTW"      : $column_snMesin ='ATM_MESIN'; break;
                case "CRMS"     : $column_snMesin ='CRM_MESIN'; break;
                default : $column_snMesin ='NEW_MESIN';
            }

            $sql = 'select id, '.$column_snMesin.' from crt_'.$id_po.' where '.$column_snMesin.' is not null';
            $getSnMesin = DB::select($sql);

            if ( count($getSnMesin)> 0){
                foreach($getSnMesin as $key =>  $sn_mesin){
                    $data_sn = [
                        'id_po' => $id_po,
                        'no_po' => $no_po, 
                        'sn_mesin' => $sn_mesin->$column_snMesin, 
                        'no_mesin' => $sn_mesin->id
                    ];
                    array_push($datas, $data_sn);
                }
            }
        }
        return response()->json([
            "success" => true,
            "totalDatas" => count($datas),  
            "data" => $datas
        ]);
    }

    function getDetailPOBySNMesinIdPo($snMesin, $idPo){
        $detailPo = PurchaseOrder::select(['mdl.name', 'tbl_po.*'])
                        ->join('models as mdl', 'tbl_po.model', '=', 'mdl.id')
                        ->where('tbl_po.id', $idPo)
                        ->first();

        if ($detailPo){
            $column_snMesin = '';
            switch ($detailPo->name){
                case "ATM"      : $column_snMesin ='ATM_MESIN'; break;
                case "ATMS"     : $column_snMesin ='ATM_MESIN'; break;
                case "CRM"      : $column_snMesin ='CRM_MESIN'; break;
                case "TCR"      : $column_snMesin ='TCR_MESIN'; break;
                case "CS KIOS"  : $column_snMesin ='CS_KIOS_MESIN'; break;
                case "VBK"      : $column_snMesin ='VBK_MESIN'; break;
                case "TTW"      : $column_snMesin ='ATM_MESIN'; break;
                case "CRMS"     : $column_snMesin ='CRM_MESIN'; break;
                default : $column_snMesin ='NEW_MESIN';
            }
            
            $sql = 'select count(*) as is_exists from crt_'.$idPo.' where '.$column_snMesin.' =\''.$snMesin.'\'';
            $check = DB::select($sql)[0]->is_exists;

            if ($check == 1){
                $detailPo['customer']   = MasterCustomer::where('id', $detailPo->customer)->first();
                $detailPo['type']       = Models::where('id', $detailPo->model)->first();
                $detailPo['mesin']      = MasterMesin::where('id', $detailPo->id_type_mesin)->first();
                $detailPo['gudang']     = MasterGudang::where('id', $detailPo->nama_gudang)->first();
            } else {
                return response()->json([
                    'success' => true,
                    'snMesin' => $snMesin, 
                    'data' => [], 
                    'message' => "Data with Serial Number Machine ".$snMesin." is Not Found in PO ".$detailPo->no_po
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'snMesin' => $snMesin, 
            'data' => $detailPo
        ]);
    }

    function store(Request $request){
        $input = $request->all();
        $input['tanggal_request'] = Carbon::now();
        $input['delivery_request_no'] = DeliveryRequest::max('delivery_request_no')+1;

        $check_exist = DeliveryRequest::where('id_po', $request->id_po)
                                        ->where('no_mesin', $request->no_mesin)
                                        ->where('task', '=', 'DELIVERY')
                                        ->exists();
        if ($check_exist){
            return response()->json([
                "success" => false, 
                "message" => "Delivery Request with SN Number ".$request->sn_mesin." is rejected, Please do withdrawal to do next transaction"
            ], 400);
        }

        $validator = Validator::make($input, [
            'no_mesin' => 'required', 
            'sn_mesin' => 'required', 
            'id_po' => 'required', 
            'request_by' => 'required', 
            'category' => 'required', 
            'task' => 'required' 
        ]);

        if ($validator->fails()){
            return response()->json([
                "success" => false, 
                "data_error" => $validator->errors(), 
                "message" => "Insert Delivery Request was Error !!"
            ], 400);
        }

        try {
            $delivery_req = DeliveryRequest::create($input);

            return response()->json([
                "success" => true,
                "message" => "Delivery Request created successfully.",
                "data" => $delivery_req
            ]);


        } catch(\Illuminate\Database\QueryException $ex) {
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
       }

    }

    function getAllDeliveryRequest()
    {
        $data_sn = json_decode(json_encode($this->getListSN(), true));
        $data_mesin = $data_sn->original->data;
        $datas = DeliveryRequest::orderBy('id', 'DESC')->get();

        for ( $a=0; $a<count($datas); $a++ ){

            $detail_sn = [];
            for ($x=0; $x< count($data_mesin); $x++) {
                if (
                    $data_mesin[$x]->id_po == $datas[$a]['id_po'] && 
                    $data_mesin[$x]->no_mesin == $datas[$a]['no_mesin'] && 
                    $data_mesin[$x]->sn_mesin == $datas[$a]['sn_mesin'] ) {
                        array_push($detail_sn, $data_mesin[$x]);
                }
            }

            $get_request_by     = PicMarketing::whereId($datas[$a]['request_by'])->first(); //User::where('id', $datas[$a]['request_by'])->first();
            $get_approved_by    = User::where('id', $datas[$a]['approve_by'])->first();
            $datas[$a]['request_by']        = $get_request_by;
            $datas[$a]['approve_by']        = $get_approved_by;
            $datas[$a]['detail_sn_mesin']   = $detail_sn[0];

            $get_detail_po                              = PurchaseOrder::where('id', $datas[$a]['id_po'])->first();
            $datas[$a]['detail_po']                     = $get_detail_po;
            $datas[$a]['detail_po']['customer']         = MasterCustomer::where('id', $get_detail_po->customer)->first();
            $datas[$a]['detail_po']['gudang']           = MasterGudang::where('id', $get_detail_po->nama_gudang)->first(); 
            $datas[$a]['detail_po']['mesin']            = MasterMesin::where('id', $get_detail_po->id_type_mesin)->first();
            $datas[$a]['detail_po']['type']             = Models::where('id', $get_detail_po->model)->first();
            unset($datas[$a]['id_po']);
        }

        return response()->json([
            "success" => true,
            "totalDatas" => count($datas), 
            "data" => $datas
        ]);
    }

    function update($idDeliveryReq, Request $request)
    {
        $data = $request->all();
        $updateDeliveryReq = DeliveryRequest::where('id', $idDeliveryReq)->update($data);

        if ($updateDeliveryReq){
            return response()->json([
                "success" => true,
                "message" => "Delivery Request updated successfully.",
                "data" => $updateDeliveryReq
            ]);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Delivery Request updated Errors."
            ], 400);
        }
    }

    function destroy($idDeliveryReq){
        $deliveryReq = DeliveryRequest::findOrFail($idDeliveryReq);
        $deliveryReq->delete();

        if ($deliveryReq) {
            return response()->json([
                'success' => true,
                'message' => "Delivery Request  ".$deliveryReq['delivery_request_no'].", with SN Number = ".$deliveryReq['sn_mesin']." was deleted", 
                'data' => $deliveryReq
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Delivery Request gagal dihapus'
            ], 400);
        }
        
    }

    function updateApproval($id, Request $request){

        $datas = $request->all();
        $check_exists = DeliveryRequest::where('id', $id)->exists();

        if ($check_exists){

            $update = DeliveryRequest::where('id', $id)->update($datas);

            return response()->json([
                'success' => true,
                'message' => "Delivery Request Approval was updated Successfully", 
                'data' => $update
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Delivery Request Updated Errors'
            ], 400);
        }
    }

    function getListApprovalBy($user_login){

        $check_user = User::select('roles')->where('id', $user_login)->first();

        if (!$check_user){
            return response()->json([
                'success' => false,
                'message' => 'User with id '.$user_login.' Not Found', 
                'data' => []
            ], 200);
        }
        if ($check_user['roles'] == 'SUPER_ADMIN' OR $check_user['roles'] == 'ADMIN')
        {
            $get_users = User::whereIn('roles',  ['SUPERVISOR', 'SUPER_ADMIN', 'ADMIN'])->get();
            return response()->json([
                'success' => true,
                'totalDatas' => count($get_users),
                'data' => $get_users
            ], 200);
        } else if ($check_user['roles'] == 'SUPERVISOR' ) {
            $get_users = User::where('roles', '=', 'SUPERVISOR')->where('id', $user_login)->get();
            return response()->json([
                'success' => true,
                'data' => $get_users
            ], 200);

        } else {
            return response()->json([
                'success' => false,
                'message' => 'User with id '.$user_login.' Not Found', 
                'data' => []
            ], 200);
        }
    }
}
