<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterStyle;
use Illuminate\Support\Facades\Validator;

class MasterStyleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $masterStyle = MasterStyle::all();

        return response()->json([
            'success' => true,
            'totalDatas' => $masterStyle->count(),
            'data' => $masterStyle
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
                'name.required' => 'Style cannot be empty',
            ]
        );

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        } else {

            $masterStyle = MasterStyle::create([
                'name' => $request->input('name')
            ]);

            // Jika berhasil tampilkan keterangan berhasil
            if($masterStyle) {
                return response()->json([
                    'success' => true,
                    'message' => 'New Style is successfully saved',
                    'data' => $masterStyle
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'New Style failed to save'
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
        $masterStyle = MasterStyle::whereId($id)->first();
        if($masterStyle){
            return response()->json([
                'success' => true,
                'message' => 'Style detail info',
                'data' => $masterStyle
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Style data not found',
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
                'name.required' => 'Style cannot be empty',
            ]
        );

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'data' => $validator->errors()
            ]);
        } else {
            $masterStyle = MasterStyle::whereId($id)->update([
                'name' => $request->input('name')
            ]);

            if($masterStyle) {
                return response()->json([
                    'success' => true,
                    'message' => 'Style is successfully updated', 
                    'data' => $masterStyle
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Style failed to update'
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
        $masterStyle = MasterStyle::findOrFail($id);
        $masterStyle->delete();

        if($masterStyle){
            return response()->json([
                'success' => true,
                'message' => 'Style deleted', 
                'data' => $masterStyle
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Style failed to delete'
            ], 400);
        }
    }
}
