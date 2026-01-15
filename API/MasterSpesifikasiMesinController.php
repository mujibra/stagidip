<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterSpesifikasiMesin;
use Illuminate\Support\Facades\Validator;

class MasterSpesifikasiMesinController extends Controller
{
    //
    function indexPaging($rowPerPage){

        $getDatas = MasterSpesifikasiMesin::paginate($rowPerPage);

         return response()->json([
            'success' => true,
            'totalDatas' => count($getDatas), 
            'data' => $getDatas
        ]);
    }

    function store(Request $request){
        $data = $request->all();
        $validator = Validator::make($data, [
            // 'id_spek' => 'required', 
            'item' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try{
            $inserted = MasterSpesifikasiMesin::create($data);
            
            if ($inserted){
                return response()->json([
                    "success" => true, 
                    "message" => "Spesifikasi Mesin inserted successfully.", 
                    "data" => $inserted
                ], 200);
            } else {
                return response()->json([
                    "success" => false, 
                    "message" => "Spesifikasi Mesin Inserted Error.", 
                    "data" => []
                ], 400);
            }
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    function update(Request $request, $id){
        $data = $request->except(['created_at', 'updated_at']);
        
        $validator = Validator::make($data, [
            'item' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors());
        } else {

            $spekMesin = MasterSpesifikasiMesin::where('id', $id)->update($data);

            if($spekMesin){
                return response()->json([
                    'success' => true,
                    'message' => 'Data Spesifikasi Mesin berhasil diupdate',
                    'data' => $spekMesin
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data Spesifikasi Mesin gagal diupdate',
                    'data' => ''
                ], 400);
            }
        }
    }

    function destroy($id){

        $masterSpek = MasterSpesifikasiMesin::findOrFail($id);
        $masterSpek->delete();

        if($masterSpek) {
            return response()->json([
                'success' => true,
                'message' => "Data Spesifikasi Mesin  ".$masterSpek['item']."-".$masterSpek['description']." berhasil dihapus", 
                'data' => $masterSpek
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data Spesifikasi Mesin gagal dihapus'
            ], 400);
        }

    }

    function getDataByItem($item){

        $datas = MasterSpesifikasiMesin::where('item', $item)->get();

        if ($datas){
            return response()->json([
                'success' => true,
                'totalDatas' => count($datas), 
                'data' => $datas
            ]);
        }
    }

    function getDataAllSpek(){

        $datas = DB::table('mst_spesifikasi_mesin')->select('item')->distinct('item')->get(); //MasterSpesifikasiMesin::get();
        for($aa=0; $aa< count($datas); $aa++){

            $item_list = [];
            $get_data_list = MasterSpesifikasiMesin::where('item', $datas[$aa]->item)->get();

            for ($cc=0; $cc< count($get_data_list); $cc++){
                array_push($item_list , $get_data_list[$cc]);
            }

            $datas[$aa]->items_data = $item_list;
        }
        
        return response()->json([
                'success' => true,
                'totalDatas' => count($datas), 
                'data' => $datas
            ]);
    }
}
