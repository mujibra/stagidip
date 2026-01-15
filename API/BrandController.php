<?php

namespace App\Http\Controllers\API;

use App\Models\Brand;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{

    public function index()
    {
        //
        $brand = Brand::latest()->get();

        return response()->json([
            'success' => true,
            'totalDatas' => $brand->count(),
            'data' => $brand
        ], 200);


    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        // validasi sebelum insert ke db

        $validator = Validator::make($request->all(),[
            'name' => 'required',
        ],
            [
                'name.required' => 'Brand tidak boleh kosong',
            ]
        );

        if($validator->fails()) {
             return response()->json($validator->errors(), 400);
        } else {
            $brand = Brand::create([
                'name' => $request->input('name'),
            ]);

            if($brand){
                return response()->json([
                    'success' => true,
                    'message' => 'Brand baru berhasil di tambahkan',
                    'data' => $brand
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Brand gagal ditambahkan',
                    'data' => ''
                ]);
            }
        }
    }

    public function show($id)
    {
        // menampilkan data berdasarkan id
        $brand = Brand::whereId($id)->first();

        if($brand){
            return response()->json([
                'success' => true,
                'message' => 'Detail data brand',
                'data' => $brand
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data brand tidak ditemukan',
                'data' => []
            ], 400);
        }
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        // validasi terlebih dahulu sebelum update
        $validator = Validator::make($request->all(),[
            'name' => 'required'
        ],
            [
                'name.required' => 'Brand tidak boleh kosong'
            ]
        );

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else {
            $brand = Brand::whereId($id)->update([
                'name' => $request->input('name'),
            ]);

            if($brand) {
                return response()->json([
                    'success' => true,
                    'message' => 'Data brand berhasil diupdate',
                    'data' => $brand
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data brand gagal diupdate',
                    'data' => [],
                ], 401);
            }
        }
    }


    public function destroy($id)
    {
        // menghapus data menggunakan api

        $brand = Brand::findOrFail($id);
        $brand->delete();

        if($brand){
            return response()->json([
                'success' => true,
                'message' => 'Data brand berhasil di hapus',
                'data' => $brand
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data brand gagal dihapus',
                'data' => []
            ], 400);
        }
    }
}
