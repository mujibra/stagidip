<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterTypeSpekMesin;
use App\Models\MasterParentTypeSpekMesin;
use Illuminate\Support\Facades\Validator;
use App\Models\TransaksiSpesifikasiMesinDetailNew;
use App\Models\MasterSpekMesinFNew;

class MasterTypeSpekMesinController extends Controller
{
    //

    function getAllTypes()
    {
        $all_datas = MasterTypeSpekMesin::all();
        
        return response()->json([
            'success' => true, 
            'totalDatas' => count($all_datas), 
            'datas' => $all_datas
        ]);
    }

    function store($idParent, Request $request)
    {
        $input = $request->all();
        $input['id_parent'] = $idParent;
        $check_exists = MasterParentTypeSpekMesin::where('id', $idParent)->exists();

        if ($check_exists)
        {
            $validator = Validator::make($input, [
                'val' => 'required', 
                'label' => 'required'
            ]);

            if ($validator->fails()){
                return response()->json([
                    "success" => false, 
                    "data_error" => $validator->errors(), 
                    "message" => "Insert Child Type Specification Machine was Error !!"
                ], 400);
            }

            try {
                $child_type = MasterTypeSpekMesin::create($input);

                return response()->json([
                    "success" => true,
                    "message" => "Insert Child Type Specification Machine created successfully.",
                    "data" => $child_type
                ]);

            } catch(\Illuminate\Database\QueryException $ex) {
                return response()->json(["errorMessage"=> $ex->getMessage()], 500);
            }

        } else {
            return response()->json([
                "success" => false, 
                "message" => "Insert Child Type Specification Machine was Error !!"
            ], 400);
        }
    }

    function update($idType, Request $request){
        $check_exists = MasterTypeSpekMesin::where('id', $idType)->exists();
        $data = $request->all();

        if ($check_exists){
           $update = MasterTypeSpekMesin::where('id', $idType)->update($data);
           $select_item = MasterTypeSpekMesin::where('id', $idType)->first();
           if ($update){
                return response()->json([
                    'success' => true,
                    'message' => "Item Type was Updated.", 
                    'data' => $select_item
                ]);
           }
        }
    }

    function destroy($idType){
        $data_array = [];  // check apakah data yang akan di hapus sudah ada dalam transaksi spesifikasi detail 
        $all_ids = [];

        $get_all_ids = TransaksiSpesifikasiMesinDetailNew::select('fill_description')->get();

        for ($a=0; $a<count($get_all_ids); $a++){
            array_push($data_array, $get_all_ids[$a]);
        }


        for ( $b=0; $b<count($data_array); $b++ ){
            $check_is_array = is_array(json_decode($data_array[$b]['fill_description'], true));
            if ($check_is_array){
                $datas = json_decode($data_array[$b]['fill_description'], true);

                for ($c=0; $c<count($datas); $c++){
                    if ( $datas[$c] != null){
                        array_push($all_ids, $datas[$c]);
                    }
                }
            } else {
                if ($data_array[$b]['fill_description'] != null){
                    array_push($all_ids, (int) $data_array[$b]['fill_description'] );
                }
            }
        }

        $data_unique = array_unique($all_ids);
        $format_data_unique = [];

        foreach ($data_unique as $key => $value){
            array_push($format_data_unique, $value);
        }

        // dd($format_data_unique);

        $data_items_chosen = [];
        $data_item_code = [];

        for ($d=0; $d<count($format_data_unique); $d++){
            $data_items_chosen[$d] = MasterSpekMesinFNew::select(['id', 'item_id', 'item_code', 'description'])->where('id', $format_data_unique[$d])->first();
            // dd( $data_items_chosen[$d] );
            // if (isset($data_items_chosen[$d]['item_code'])){
            //     // dd($data_items_chosen);
            // }
            array_push($data_item_code, $data_items_chosen[$d]['item_code']);
        }

        $select_child = MasterTypeSpekMesin::select('val')->where('id', $idType)->first()['val'];

        if ( in_array($select_child, $data_item_code)){
            // dd($idType." ada di dalam Array");
            return response()->json([
                "success" => false, 
                "message" => "Remove Child [".$select_child."] Type Specification Machine was Error !!"
            ], 400);
        } else {
            // dd($idType." Tidak ada di dalam Array");
            $remove_item_child = MasterTypeSpekMesin::findOrFail($idType);
            $remove_item_child->delete();

            if ($remove_item_child){
                return response()->json([
                    "success" => true,
                    "message" => "Remove Field Item [".$remove_item_child->val." - ".$remove_item_child->label."] has been deleted.",
                    "data" => $remove_item_child
                ]);
            }
        }
    }


    function destroyV2($idType){
        $data_exists = MasterTypeSpekMesin::whereId($idType)->exists();

        if ($data_exists){
            $get_datas = MasterTypeSpekMesin::whereId($idType)->first();
            $check_list_items = MasterSpekMesinFNew::where('item_code', $get_datas->val)->exists();

            if ($check_list_items){
                return response()->json([
                    "success" => false, 
                    //"message" => "Remove Child [".$get_datas->val." - ".$get_datas->label."] Type Specification Machine was Error !!"
                    "message" => "Gagal Menghapus ".$get_datas->val." - ".$get_datas->label.", Silahkan pilih Action Detail , Kemudian Hapus Semua Detail List nya"
                ], 400);
            }

            $remove_item_child = MasterTypeSpekMesin::findOrFail($idType);
            $remove_item_child->delete();

            if ($remove_item_child){
                return response()->json([
                    "success" => true,
                    "message" => "Remove Field Item [".$remove_item_child->val." - ".$remove_item_child->label."] has been deleted.",
                    "data" => $remove_item_child
                ]);
            }

        }
    }
}
