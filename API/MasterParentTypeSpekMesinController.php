<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterParentTypeSpekMesin;
use App\Models\MasterTypeSpekMesin;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class MasterParentTypeSpekMesinController extends Controller
{
    //
    public function index()
    {
        $datas = MasterParentTypeSpekMesin::all();

        for ($x=0; $x< count($datas); $x++){
            if ($datas[$x]['type_atm'] != null){
                $type_atm = json_decode($datas[$x]['type_atm']);

                for ($y=0; $y<count($type_atm); $y++){
                    $type_atm[$y]->name = $type_atm[$y]->type;
                    unset ($type_atm[$y]->type);
                }
                $datas[$x]['data_type'] = $type_atm;
                unset ($datas[$x]['type_atm'] );
            }
        }

        return response()->json([
            'success' => true,
            'totalDatas' => $datas->count(),
            'data' => $datas
        ]);
    }

    function getTypeSpekMesin($idParent)
    {
        $datas = MasterTypeSpekMesin::where('id_parent', $idParent)->get();

        return response()->json([
            'success' => true,
            'totalDatas' => $datas->count(),
            'data' => $datas
        ]);
    }

    function store(Request $request){
        $input = $request->all();
        $input['type_atm'] = json_encode($request->type_atm, true);

        $validator = Validator::make($input, [
            'parent' => 'required', 
            'type_atm' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json([
                "success" => false, 
                "data_error" => $validator->errors(), 
                "message" => "Insert Parent Type Specification Machine was Error !!"
            ], 400);
        }        

        try {
            $parent_type = MasterParentTypeSpekMesin::create($input);

            return response()->json([
                "success" => true,
                "message" => "Insert Parent Type Specification Machine created successfully.",
                "data" => $parent_type
            ]);

        } catch(\Illuminate\Database\QueryException $ex) {
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
       }
    }

    function update($idParent, Request $request){

        $check_exists = MasterParentTypeSpekMesin::where('id', $idParent)->exists();
        $data = $request->except(['parent']);

        if ($check_exists){
            $update_parent_type = DB::table('mst_parent_type_spesifikasi_msn')->where('id', $idParent)->update($data);

            if ($update_parent_type){
                $selectTransfer =  MasterParentTypeSpekMesin::where('id', $idParent)->first();
               return response()->json([
                   "success" => true,
                   "message" => "Parent Type updated successfully.",
                   "data" => $selectTransfer
               ]);
           } else {
               return response()->json([
                   "success" => false,
                   "message" => "Parent Type updated Errors."
               ], 400);
           }
        }
    }

    function destroy($idParent)
    {
        $check_exists = MasterParentTypeSpekMesin::where('id', $idParent)->exists();
        $select_item =  MasterParentTypeSpekMesin::where('id', $idParent)->first();
        if ($check_exists){

            $check_have_child = MasterTypeSpekMesin::where('id_parent', $idParent)->exists();

            if ($check_have_child){
                
                return response()->json([
                    "success" => false, 
                    //"message" => "Remove Item Parent [".$select_item->parent."] was Error, Please Remove All Child in the Menu Edit"
                    "message" => "Gagal Menghapus ".$select_item->parent.", Silahkan untuk Pilih Action 'Edit Data' -> Kemudian Hapus Semua Data Item nya"
                ], 400);
            } else {

                $deleted_item = MasterParentTypeSpekMesin::findOrFail($idParent);
                $deleted_item->delete();

                if ($deleted_item){
                    return response()->json([
                        "success" => true,
                        "message" => "Remove Item List [".$deleted_item->parent."] has been deleted.",
                        "data" => $deleted_item
                    ]);
                }
            }

        } else {
            return response()->json([
                "success" => false, 
                "message" => "Remove Item Parent was Error, Data Not Found"
            ], 400);

        }
    }
}
