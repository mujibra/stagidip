<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PicTSS;
use Illuminate\Support\Facades\Validator;

class PicTssController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $picTss = PicTSS::all();

        return response()->json([
            'success' => true,
            'totalDatas' => $picTss->count(),
            'data' => $picTss
        ]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        // Validasi sebelum insert data ke database
        $validator = Validator::make($request->all(),[
            'name' => 'required'
        ],
            [
                'name.required' => 'PIC TSS cannot be empty',
            ]
        );

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        } else {

            $picTss = PicTSS::create([
                'name' => $request->input('name')
            ]);

            // Jika berhasil tampilkan keterangan berhasil
            if($picTss) {
                return response()->json([
                    'success' => true,
                    'message' => 'New PIC TSS is successfully saved',
                    'data' => $picTss
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'New PIC TSS failed to save'
                ], 401);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        // Menampilkan data berdasarkan id
        $picTss = PicTSS::whereId($id)->first();
        if($picTss){
            return response()->json([
                'success' => true,
                'message' => 'PIC TSS detail info',
                'data' => $picTss
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'PIC TSS data not found',
                'data' => ''
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $validator = Validator::make($request->all(),[
            'name' => 'required'
        ],
            [
                'name.required' => 'PIC TSS cannot be empty',
            ]
        );

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'data' => $validator->errors()
            ]);
        } else {
            $picTss = PicTSS::whereId($id)->update([
                'name' => $request->input('name')
            ]);

            if($picTss) {
                return response()->json([
                    'success' => true,
                    'message' => 'PIC TSS is successfully updated', 
                    'data' => $picTss
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'PIC TSS failed to update'
                ], 401);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        // Menghapus data menggunakan id
        $picTss = PicTSS::findOrFail($id);
        $picTss->delete();

        if($picTss){
            return response()->json([
                'success' => true,
                'message' => 'PIC TSS deleted', 
                'data' => $picTss
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'PIC TSS failed to delete'
            ], 400);
        }
    }
}
