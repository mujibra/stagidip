<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterPicMover;
use Illuminate\Support\Facades\Validator;

class MasterPicMoverController extends Controller
{
    //
    function indexPaging($rowPerPage){
        $picMover = MasterPicMover::paginate($rowPerPage);

        return response()->json([
            'success' => true,
            'totalDatas' => count($picMover), 
            'data' => $picMover
        ]);
    }

    function indexByIdGudang($gudang){
        $picMover = MasterPicMover::where('gudang', $gudang)->get();

        return response()->json([
            'success' => true,
            'totalDatas' => count($picMover), 
            'data' => $picMover
        ]);

    }

    function store(Request $request){
        $data = $request->all();
        $validator = Validator::make($data, [
            'gudang' => 'required',
            'pic_mover' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try{
            $pic_mover = MasterPicMover::create($data);

            return response()->json([
                "success" => true,
                "message" => "PIC Mover created successfully.",
                "data" => $pic_mover
            ]);
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }

    }
    
    function update(Request $request, $id){
        $data = $request->all();
        $validator = Validator::make($data, [
            'gudang' => 'required',
            'pic_mover' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors());
        }

        try{
            $pic_mover = MasterPicMover::where('id', $id)->update($data);
            $PicMover = MasterPicMover::where('id', $id)->first();

            return response()->json([
                "success" => true,
                "message" => "PIC Mover updated successfully.",
                "data" => $PicMover
            ]);
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    function destroy($id){
        $pic_mover = MasterPicMover::findOrFail($id);
        $pic_mover->delete();

        if($pic_mover) {
            return response()->json([
                'success' => true,
                'message' => "Data PIC Mover ".$pic_mover['gudang']."-".$pic_mover['pic_mover']." berhasil dihapus", 
                'data' => $pic_mover
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data PIC Mover gagal dihapus'
            ], 400);
        }
    }
}
