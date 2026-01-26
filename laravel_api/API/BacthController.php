<?php

namespace App\Http\Controllers\API;

use App\Models\Bacth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\PurchaseOrder;

class BacthController extends Controller
{

    public function index()
    {
        // menampilkan data menggunakan api

        $bacth = Bacth::all();

        return response()->json([
            'success' => true,
            'message' => 'Data semua bacth',
            'data' => $bacth,
        ]);
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        // // insert data
        $validator = validator::make($request->all(),[
            'name' => 'required',
        ],
            [
                'name.required' => 'Batch tidak boleh kosong',
            ]
        );

        if($validator->fails()) {
             return response()->json($validator->errors(), 400);
        } else {

            try {

                $bacth = Bacth::create([
                    'name' => $request->input('name'),
                ]);

                // jika berhasil, tampilkan keterangan berhasil
                if($bacth) {
                    return response()->json([
                        'success' => true,
                        'message' => 'Bacth baru berhasil ditambahkan',
                        'data' => $bacth
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Bacth baru gagal ditambahkan',
                        'data' => ''
                    ], 401);
                }

            } catch(\Illuminate\Database\QueryException $ex) {
                if ($ex->getCode() == "23000"){
                    return response()->json([
                        'success' => false,
                        'message' => 'Nama Batch sudah ada, harap masukkan Nama Batch lain',
                        'data' => ''
                    ], 400);
                }
                return response()->json(["errorMessage"=> $ex->getMessage()], 400);
            }
        }
    }
    public function show($id)
    {
        // menampilkan data berdasarkan id
        $batch = Bacth::whereId($id)->first();

        if($batch){
            return response()->json([
                'success' => true,
                'message' => 'Detail data batch',
                'data' => $batch
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data batch tidak ditemukan',
                'data' => ''
            ], 400);
        }
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $validator = validator::make($request->all(),['name' => 'required'],['name.required' => 'Batch tidak boleh kosong']);

        if($validator ->fails()) {
            return response()->json($validator->errors(), 400);
        } else {

            try {
                $bacth = Bacth::whereId($id)->update(['name' => $request->input('name')]);

                if($bacth) {
                    $getbatch = Bacth::whereId($id)->first();
                    return response()->json([
                        'success' => true,
                        'message' => 'Bacth berhasil di update',
                        'data' => $getbatch
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Bacth gagal di update',
                        'data' => ''
                    ], 400);
                }

            } catch(\Illuminate\Database\QueryException $ex) {
                if ($ex->getCode() == "23000"){
                    return response()->json([
                        'success' => false,
                        'message' => 'Nama Batch sudah ada, harap masukkan Nama Batch lain',
                        'data' => ''
                    ], 400);
                }
                return response()->json(["errorMessage"=> $ex->getMessage()], 400);
            }
        }
    }


    public function destroy($id)
    {

        $checkTransaksiPo = PurchaseOrder::select('*')->where('batch',$id)->exists();
        if ($checkTransaksiPo){
            $batch = Bacth::whereId($id)->first();
            return response()->json([
                'success' => false,
                'message' => $batch->name.' Gagal di hapus',
            ], 400);
        }

        // menghapus data berdasarkan id
        $bacth = Bacth::findOrFail($id);
        $bacth->delete();

        if($bacth){
            return response()->json([
                'success' => true,
                'message' => 'Data berhasil di hapus',
                'data' => $bacth
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' =>  'Data gagal di hapus',
            ], 400);
        }
    }
}
