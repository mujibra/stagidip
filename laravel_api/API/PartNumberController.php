<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PartNumber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PartNumberController extends Controller
{

    public function index()
    {
        // menampilkan keseluruhan data
        $partNumber = PartNumber::all();

        return response()->json([
            'success' => true,
            'message' => 'List semua data part number',
            'data' => $partNumber
        ]);
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        // validasi sebelum insert ke db
        $validator = Validator::make($request->all(),[
            'name'=> 'required',
        ],
            [
                'name.required' => 'Part Number tidak boleh kosong'
            ]
        );

        if($validator->fails()){

            return response()->json([
                'success' => false,
                'message' => 'Part Number tidak boleh kosong',
                'data' => $validator->errors()
            ], 400);
        } else {
            $partNumber = PartNumber::create([
                'name' => $request->input('name'),
            ]);

            if($partNumber){
                return response()->json([
                    'success' => true,
                    'message' => 'Part Number baru berhasil ditambahkan',
                    'data' => $partNumber
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Part number baru gagal ditambahkan',
                    'data' => ''
                ], 400);
            }
        }
    }


    public function show($id)
    {
        // menampilkan data berdasarkan id
        $partNumber = PartNumber::whereId($id)->first();

        if($partNumber) {
            return response()->json([
                'success' => true,
                'message' => 'Detail data Part number',
                'data' => $partNumber
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Detail data Part Number tidak ada',
                'data' => ''
            ], 400);
        }
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request)
    {
        $validator = Validator::make($request->all(),['name'=> 'required'],
            ['name.required' => 'Part Number tidak boleh kosong']
        );

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        } else {
            $partNumber = PartNumber::whereId($request->input('id'))->update([
                'name' => $request->input('name'),
            ]);

            if($partNumber){
                return response()->json([
                    'success' => true,
                    'message' => 'Data Part number berhasil diupdate',
                    'data' => $partNumber
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data part number gagal diupdate',
                    'data' => ''
                ], 400);
            }
        }

    }


    public function destroy($id)
    {
        // menghapus data berdasarkan id
        $partNumber = PartNumber::findOrFail($id);
        $partNumber->delete();

        if($partNumber) {
            return response()->json([
                'success' => true,
                'message' => 'Data part number berhasil dihapus',
                'data' => $partNumber
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data part number gagal dihapus',
                'data' => ''
            ], 400);
        }

    }
}
