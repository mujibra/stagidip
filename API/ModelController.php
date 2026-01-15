<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\PurchaseOrder;
use App\Models\MasterMesin;

class ModelController extends Controller
{

    public function index()
    {
        // menampilkan kesuluruhan data
        $models = Models::whereNotIn('id', [1, 3])->get();
        return response()->json([
            'success' => true,
            'totalDatas' => $models->count(),
            'data' => $models
        ]);
    }

    function index_newType(){
        $datas = Models::where('status', 'NEW_TYPE')->get();
        return response()->json([
            'success' => true,
            'totalDatas' => $datas->count(),
            'data' => $datas
        ]);

    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $input = $request->all();
        //$input['status'] = 'NEW_TYPE';

        // validasi sebelum  insert ke db
        $validator = Validator::make($input ,[
            'name' => 'required'
        ],
            [
                'name.required' => 'Nama Model tidak boleh kosong'
            ]
        );

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        } else {
            // $model = Models::create([
            //     'name' => $request->input('name'),
            // ]);
            try {
                $model = Models::create($input);

                if($model){
                    return response()->json([
                        'success' => true,
                        'message' => 'Model baru berhasil ditambahkan',
                        'data' => $model
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Model baru gagal ditambahkan',
                        'data' => ''
                    ],401);
                }

            } catch(\Illuminate\Database\QueryException $ex) {
                if ($ex->errorInfo[0] == '23000'){
                    return response()->json([
                            "errorCode" => $ex->errorInfo[0], 
                            "message"=> "SN Mesin ".$request->input('name')." sudah ada, Harap Isi Nama Type dengan nama lain"
                        ], 400);
                }
                return response()->json(["errorMessage"=> $ex->getMessage()], 500);
            }
            
        }
    }


    public function show($id)
    {
         // menampilkan data berdasarkan id
         $models = Models::whereId($id)->first();

         if($models) {
             return response()->json([
                 'success' => true,
                 'message' => 'Detail data model',
                 'data' => $models
             ], 200);
         } else {
             return response()->json([
                 'success' => false,
                 'message' => 'Detail data model tidak ditemukan',
                 'data' => ''
             ], 401);
         }
    }

    public function update($id, Request $request)
    {
        $models = Models::whereId($id)->first();

        // validasi sebelum update data
        $validator = Validator::make($request->all(),[
            'name' => 'required'
        ],
            [
                'name.required' => 'Model tidak boleh kosong'
            ]
        );

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Model tidak boleh kosong',
                'data' => $validator->errors()
            ], 400);
        } else {

            $checkTransaksiPo = PurchaseOrder::select('*')->where('model',$id)->exists();
           
            if ($checkTransaksiPo){   
                return response()->json([
                    'success' => false,
                    'message' => 'Type '.$models->name.' Gagal di update, Type ini sedang dipakai di Transaksi Staging Registration',
                ], 400);
            }

            $models = Models::whereId($request->input('id'))->update([
                'name' => $request->input('name'),
            ]);

            if($models){
                return response()->json([
                    'success' => true,
                    'message' => 'Data model berhasil diupdate',
                    'data' => $models
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data model gagal diupadate',
                    'data' => '',
                ], 401);
            }
        }
    }


    public function destroy($id)
    {
        $models = Models::whereId($id)->first();

        if ($models){

            $checkTransaksiPo = PurchaseOrder::select('*')->where('model',$id)->exists();

            if ($checkTransaksiPo){   
                return response()->json([
                        'success' => false,
                        'message' => 'Type '.$models->name.' Gagal di hapus, Type ini masih terpakai di Transaksi Staging Registration',
                    ], 400);
            }

            $check_use_in_models = MasterMesin::where('model', $id)->exists();
            if ($check_use_in_models){
                return response()->json([
                    'success' => false,
                    'message' => $models->name.' Gagal di hapus, Type ini masih terpilih di Model Mesin',
                ], 400);
            }

            // menghapus data berdasarkan id
            $models = Models::findOrFail($id);
            $models->delete();

            if($models) {
                return response()->json([
                    'success' => true,
                    'message' => 'Data model berhasil dihapus',
                    'data' => $models
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data model gagal dihapus',
                    'data' => ''
                ], 400);
            }
        } else {

            return response()->json([
                'success' => false,
                'message' => 'Data not found',
            ], 400);

        }

        
    }
}
