<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiChecklistStagApproval;
// use App\Models\PicMitra;
use App\Models\User;

class TransaksiChecklistApprovalController extends Controller
{
 

    function updateApprovalChecklist($type, $idPo, $idMesin, Request $request){
        if ($type === 'STAGING'){

            $updated = TransaksiChecklistStagApproval::where('id_po', $idPo)
                                                    ->where('no_mesin', $idMesin)
                                                    ->update(['approval_staging' => $request->approval_by]);
            if($updated){
                 return response()->json([
                        'success' => true,
                        'message' => 'Update Approval Staging was successfully'
                    ], 200);
            } else {
                return response()->json([
                        "success" => false,
                        "message" => "Update Approval by Mover Errors."
                    ], 400);
            }
        } else {
            $updated = TransaksiChecklistStagApproval::where('id_po', $idPo)
                                                    ->where('no_mesin', $idMesin)
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

    function getApprovalChecklist($type, $idPo, $idMesin){
        $getData = TransaksiChecklistStagApproval::where('id_po', $idPo)->where('no_mesin', $idMesin)->first();
        if (!$getData){
            return response()->json([
                        'success' => false,
                        'data' => $getData
                    ], 200); 
        }

        if ($type === 'STAGING'){
            if ($getData){
                $getPicStaging = User::where('id', $getData['approval_staging'])->get();

                if ( count($getPicStaging)>0 ){
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
