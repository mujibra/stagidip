<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PicMitra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\PurchaseOrder;

class PicMitraController extends Controller
{

    public function index()
    {
        // menampilkan data lewat database
        $picmitra = PicMitra::all();

        return response()->json([
            'success' => true,
            'totalDatas' => $picmitra->count(),
            'data' => $picmitra
        ]);
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        // dd($request);
        // validasi sebelum insert data ke database
        $validator = Validator::make($request->all(),[
            'name' => 'required'
        ],
            [
                'name.required' => 'Pic mitra tidak boleh kosong',
            ]
        );

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        } else {

            $picmitra = PicMitra::create([
                'name' => $request->input('name')
            ]);

            // jika berhasil tampilkan keterangan berhasil
            if($picmitra) {
                return response()->json([
                    'success' => true,
                    'message' => 'Pic mitra baru berhasil ditambahkan',
                    'data' => $picmitra
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Pic mitra baru gagal disimpan'
                ], 401);
            }
        }
    }


    public function show($id)
    {
        // menampilkan data berdasarkan id
        $picmitra = PicMitra::whereId($id)->first();
        if($picmitra){
            return response()->json([
                'success' => true,
                'message' => 'Detail data picmitra',
                'data' => $picmitra
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data picmitra tidak ditemukan',
                'data' => ''
            ], 400);
        }
    }


    public function edit($id)
    {
        //
    }


    public function update( Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required'
        ],
            [
                'name.required' => 'Pic mitra tidak boleh kosong',
            ]
        );

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'data' => $validator->errors()
            ]);
        } else {
            $picmitra = PicMitra::whereId($id)->update([
                'name' => $request->input('name')
            ]);

            if($picmitra) {
                return response()->json([
                    'success' => true,
                    'message' => 'Data pic mitra berhasil diupdate', 
                    'data' => $picmitra
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data pic mitra gagal diupdate'
                ], 401);
            }
        }
    }


    public function destroy($id)
    {

        $checkTransaksiPo = PurchaseOrder::select('*')->where('pic_staging',$id)->exists();
        if ($checkTransaksiPo){
             $picStaging = PicMitra::whereId($id)->first();
              return response()->json([
                    'success' => false,
                    'message' => 'PIC '.$picStaging->name.' Gagal di hapus',
                ], 400);
        }

        // menghapus data menggunakan id
        $picmitra = PicMitra::findOrFail($id);
        $picmitra->delete();

        if($picmitra){
            return response()->json([
                'success' => true,
                'message' => 'Data pic mitra berhasil dihapus', 
                'data' => $picmitra
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data pic mitra gagal dihapus'
            ], 400);
        }
    }
}
