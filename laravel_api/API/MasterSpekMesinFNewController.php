<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterSpekMesinFNew;
use App\Models\MasterTypeSpekMesin;
use App\Models\TransaksiSpesifikasiMesinDetailNew;
use Illuminate\Support\Facades\Validator;

class MasterSpekMesinFNewController extends Controller
{
    //
    function indexPaging($rowPerPage){
        
        $getDatas = MasterSpekMesinFNew::paginate($rowPerPage);

        for ($i=0; $i< count($getDatas); $i++)
        {
            $getDatas[$i]['type'] = MasterTypeSpekMesin::whereId($getDatas[$i]['item_id'])->first();
        }

        return response()->json([
            'success' => true,
            'totalDatas' => count($getDatas), 
            'data' => $getDatas
        ]);
    }

    function getDetailListItems($idParent)
    {
        $datas = MasterSpekMesinFNew::where('item_id', $idParent)->get();

        return response()->json([
            'success' => true,
            'totalDatas' => count($datas), 
            'data' => $datas
        ]);
    }

    function store(Request $request)
    {
        $data = $request->all();

        $check_exist_item = MasterTypeSpekMesin::where('id', $data['item_id'])->where('val', $data['item_code'])->exists();

        if (!$check_exist_item){
            return response()->json([
                "success" => false, 
                "message" => "Child Item was Not Found.", 
                "data" => []
            ], 400);
        }

        $validator = Validator::make($data, [
            'item_id' => 'required', 
            'item_code' => 'required',
            'description' => 'required' 
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        
        try {
            $inserted = MasterSpekMesinFNew::create($data);

            if ($inserted){
                return response()->json([
                    "success" => true, 
                    "message" => "List of Machine Specification inserted successfully.", 
                    "data" => $inserted
                ], 200);
            } else {
                return response()->json([
                    "success" => false, 
                    "message" => "List of Machine Specification Inserted Error.", 
                    "data" => []
                ], 400);
            }

        } catch(\Illuminate\Database\QueryException $ex) {
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        } 

    }

    function update($idListItem, Request $request)
    {
        $check_exists = MasterSpekMesinFNew::where('id', $idListItem)->exists();
        $data = $request->all();

        if ($check_exists){
           $update = MasterSpekMesinFNew::where('id', $idListItem)->update($data);
           $select_item = MasterSpekMesinFNew::where('id', $idListItem)->first();
           if ($update){
                return response()->json([
                    'success' => true,
                    'message' => "Item List was Updated.", 
                    'data' => $select_item
                ]);
           }
        }
    }

    function destroy($idListItem)
    {
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

        if ( in_array($idListItem, $all_ids)){

            $select_list_item =  MasterSpekMesinFNew::where('id', $idListItem)->first();
            return response()->json([
                "success" => false, 
                "message" => "Remove Item List [".$select_list_item->item_code." - ".$select_list_item->description."] was Error, Because is using in the Specification Transactions !!"
            ], 400);
        } else {
            $remove_list_item = MasterSpekMesinFNew::findOrFail($idListItem);
            $remove_list_item->delete();

            if ($remove_list_item){
                return response()->json([
                    "success" => true,
                    "message" => "Remove Item List [".$remove_list_item->item_code." - ".$remove_list_item->description."] has been deleted.",
                    "data" => $remove_list_item
                ]);
            }
        }
    }
}
