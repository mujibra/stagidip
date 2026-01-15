<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterGudang;
use Illuminate\Support\Facades\Validator;
use App\Models\PurchaseOrder;


class MasterGudangController extends Controller
{
    public function index(){
        $masterGudang = MasterGudang::all();

        return response()->json([
                'success' => true,
                'totalDatas' => $masterGudang->count(),
                'data' => $masterGudang  
            ]);
    }

    public function getDataById($idGudang){
        $getGudang = MasterGudang::where('id', $idGudang)->first();
        if ($getGudang){
            return response()->json([
                    'success' => true,
                    'data' => $getGudang
                ]);
        } else {
            return response()->json([
                    'success' => true,
                    'data' => []
                ]);
        }
    }


    public function store(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'gudang_desc' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try{

            $gudang = MasterGudang::create($input);

            return response()->json([
                "success" => true,
                "message" => "Gudang created successfully.",
                "data" => $gudang
            ]);
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }


     public function update(Request $request, $id) {
        $validator = Validator::make($request->all(),[
            'gudang_desc'=> 'required',],
            ['gudang_desc.required' => 'Gudang tidak boleh kosong']
        );

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        } else {
            $gudang = MasterGudang::whereId($id)->update([
                'gudang_desc' => $request->input('gudang_desc'), 
                'alamat' => $request->input('alamat')
            ]);

            $selectGudang = MasterGudang::whereId($id)->first();        

            if($gudang){
                return response()->json([
                    'success' => true,
                    'message' => 'Data Gudang berhasil di update',
                    'data' => $selectGudang
                ],200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data Gudang gagal diupdate',
                    'data' => []
                ], 400);
            }
        }
    }

    public function destroy($id)
    {
        $checkTransaksiPo = PurchaseOrder::select('*')->where('nama_gudang',$id)->exists();
        if ($checkTransaksiPo){
             $getGudang = MasterGudang::whereId($id)->first();
              return response()->json([
                    'success' => false,
                    'message' => 'Gudang '.$getGudang->gudang_desc.' Gagal di hapus',
                ], 400);
        }

        $gudang = MasterGudang::findOrFail($id);
        $gudang->delete();

        if($gudang) {
            return response()->json([
                'success' => true,
                'message' => 'Data Gudang berhasil dihapus',
                'data' => $gudang
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Gudang gagal dihapus',
                'data' => []
            ], 400);
        }
    }
}
