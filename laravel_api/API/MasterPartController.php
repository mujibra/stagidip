<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterPart;
use App\Models\MasterMesin;
use App\Models\MasterCustomer;
use App\Models\Models;
use Validator;
use Illuminate\Support\Facades\DB;

class MasterPartController extends Controller
{
    public function index(){
        $masterPart = MasterPart::all();

        for ($i = 0; $i < count($masterPart); $i++){
             $getMesin = MasterMesin::where('id', $masterPart[$i]->id_mesin)->first();
             $masterPart[$i]["mesin"] = $getMesin;
        }

        return response()->json([
                'success' => true,
                'totalDatas' => $masterPart->count(),
                'data' => $masterPart
            ]);
    }

    public function indexPaging($rowPerPage)
    {
        $search = isset($_GET['search']) ? $_GET['search'] : '';
        $status = null;
        if (strlen($search) >= 3) {
            $status = stripos('Active', $search) !== false ? 1 : (stripos('Inactive', $search) !== false ? 0 : null);
        };

        $columns_mesin = ['id', 'type']; 
        $columns = ['part_no', 'part_desc', 'part_column', 'types', 'status', 'format']; 

        $query_mesin = MasterMesin::query();

        $query_mesin->where(function($query_mesin) use ($search, $columns_mesin) {
            foreach ($columns_mesin as $column) {
                $query_mesin->orWhere($column, 'LIKE', "%$search%");
            }
        });

        $id_searched = $query_mesin->pluck('id')->toArray();

        $query = MasterPart::query();
        
        // Check if there are searched IDs
        if (count($id_searched) !== 0) {
            $query->whereIn('id_mesin', $id_searched);
        } else {
            if ($status !== null) {
                $query->where('status', '=', $status);
            } else {
                // Iterate through each column and add a search condition
                $query->where(function($query) use ($search, $columns) {
                    foreach ($columns as $column) {
                        $query->orWhere($column, 'LIKE', "%$search%");
                    }
                });
            }
        }

        // Paginate the results
        $partNumber = $query->paginate($rowPerPage);

        foreach ($partNumber as $part) {
            // Retrieve related machine and model information
            $getMesin = MasterMesin::where('id', $part->id_mesin)->first();
            $part["mesin"] = $getMesin;
        
            $getModel = Models::where('id', $getMesin->model)->first();
            $part["mesin"]["model"]= $getModel;
        }

        return response()->json([
            'success' => true,
            'totalDatas' => $partNumber->count(),
            'data' => $partNumber,
            // 'data_filtered' => $status
        ]);
    }

    public function store(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'id_mesin' => 'required',
            // 'part_desc' => 'required',
            'status' => 'required',
            'types' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        if ($request->types == 'MESIN'){
            $checkModel = MasterMesin::join('models as m', 'm.id', '=', 'mst_mesin.model')
                        ->where('mst_mesin.id', '=', $request->id_mesin)
                        ->select('m.name', 'mst_mesin.type as type')
                        ->first();

            $column_name = '';

                if(in_array($checkModel['name'], ['ATM', 'ATMS', 'TTW'])){ $column_name = 'ATM_MESIN'; }
                elseif(in_array($checkModel['name'], ['CRM', 'CRMS'])){ $column_name = 'CRM_MESIN'; }
                elseif(in_array($checkModel['name'], ['TCR'])){ $column_name = 'TCR_MESIN'; }
                elseif(in_array($checkModel['name'], ['CS KIOS'])){ $column_name = 'CS_KIOS_MESIN'; }
                elseif(in_array($checkModel['name'], ['VBK'])){ $column_name = 'VBK_MESIN'; }
                else { $column_name = 'NEW_MESIN'; }

                $checkActiveMesin = MasterPart::where('id_mesin', $request->id_mesin)
                                          ->where('part_column', '=', $column_name)
                                          ->where('status', 1)
                                          ->exists();

                if($checkActiveMesin && $request->status == 1){
                    return response()->json([
                        "success" => false,
                        "message" => "PartNumber Mesin dengan Type ".$checkModel['type']." hanya boleh 1 yang aktif."
                    ],400);
                } else {
                    $input['part_column'] = $column_name;
                    $partNumber = MasterPart::create($input);

                    if ($partNumber){
                        return response()->json([
                            "success" => true,
                            "message" => "Part Number ".$partNumber['part_no']." - ".$partNumber['part_desc']." created successfully.",
                            "data" => $partNumber
                        ]);
                    }
                }
        } else {
            $rand_num = $this->generate_random_string(4);
            $partColumn = preg_replace('/[^a-zA-Z0-9_.]/', '_', $request->part_desc);
            $input['part_column'] = $partColumn;

            // dd($input['part_column']);
            $checkpartColumnExist = MasterPart::where('id_mesin', '=', $input['id_mesin'])
                                             ->where('part_column',  $input['part_column'])->exists();

            if ($checkpartColumnExist){
                $input['part_column'] = $partColumn.'_'.$rand_num;  //.chr(rand(100, 999)); //
            }
            $checkpartColumnExist2 = MasterPart::where('id_mesin', '=', $input['id_mesin'])
                                             ->where('part_column',  $input['part_column'])->exists();

            $rand_num2 = $this->generate_random_string(5);
            if ($checkpartColumnExist2){
                $input['part_column'] = $partColumn.'_'.$rand_num2;  //.chr(rand(100, 999)); //
            }

            try{
                $partNumber = MasterPart::create($input);
                if ($partNumber){
                    return response()->json([
                                "success" => true,
                                "message" => "Part Number ".$partNumber['part_no']." - ".$partNumber['part_desc']." created successfully.",
                                "data" => $partNumber
                    ]);
                } else {
                    return response()->json([
                                "success" => false,
                                "message" => "part Number Input Errors.",
                                "data" => $partNumber
                            ],400);
                }
            } catch(\Illuminate\Database\QueryException $ex) {
                 return response()->json(["errorMessage"=> $ex->getMessage()], 500);
            }

        }
    }

    //https://www.vivekmoyal.in/generating-random-alphanumeric-numeric-values-in-php/
    function generate_random_string($length = 10) {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[mt_rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function update(Request $request, $id){
        $data[] = $request->except(['mesin']);
        $validator = Validator::make($request->all(), [
                'id_mesin' => 'required',
                'part_desc' => 'required',
                'status' => 'required',
            ],[
                'id_mesin.required' => 'Type Mesin Wajib dipilih !',
                'part_desc.required' => 'Part Description Wajib diisi !',
                'status.required' => 'Status Wajib dipilih',
            ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else {
            if ($request->types == 'MESIN'){
                // check apakah PartNumberMesin dengan type tertentu ada yg status nya aktif

                if ($request->status == 1){
                    $check = MasterPart::where('id_mesin', $request->id_mesin)
                                   ->where('status', $request->status)
                                   ->where('types', '=', 'MESIN')->exists();

                    if ($check){
                        $master_mesin = MasterMesin::where('id', $request->id_mesin)->first();
                        return response()->json([
                            "success" => false,
                            "message" => "PartNumber Mesin dengan Type ".$master_mesin['type']." hanya boleh 1 yang aktif"
                        ], 400);
                    }
                } else {
                    $update = DB::table('mst_part_number')->where('id', $id)->update($data[0]);
                    $selectPart = MasterPart::where('id', $id)->first();

                    return response()->json([
                        "success" => true,
                        "message" => "PartNumber ".$selectPart['part_no']." - ".$selectPart['part_desc']." updated successfully.",
                        "data" => $selectPart
                    ]);
                }

            }

            $update = DB::table('mst_part_number')->where('id', $id)->update($data[0]);
            if ($update){
                $selectPart = MasterPart::where('id', $id)->first();

                return response()->json([
                    "success" => true,
                    "message" => "PartNumber ".$selectPart['part_no']." - ".$selectPart['part_desc']." updated successfully.",
                    "data" => $selectPart
                ]);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "PartNumber updated Errors."
                ], 400);
            }

        }
    }

    public function getDataById($mesinId){
        $masterPart = MasterPart::where('id_mesin', $mesinId)->get();

        for ($i = 0; $i < count($masterPart); $i++){
             $getMesin = MasterMesin::where('id', $masterPart[$i]->id_mesin)->first();
             $masterPart[$i]["mesin"] = $getMesin;

             $getModel = Models::where('id', $getMesin->model)->first();
             $masterPart[$i]["mesin"]["model"]= $getModel;
        }

        if ($masterPart->count() > 0){
            return response()->json([
                'success' => true,
                'totalDatas' => $masterPart->count(),
                'data' => $masterPart
            ]);
        } else {
             return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                    'data' => []
                ]);
        }
    }

    public function getDataByIdPaging($mesinId, $rowPerPage){
        $masterPart = MasterPart::where('id_mesin', $mesinId)
                        ->orderBy('id_mesin', 'ASC')
                        ->orderBy('format', 'DESC')
                        ->orderBy('position', 'ASC')
                        ->paginate($rowPerPage);

        for ($i = 0; $i < count($masterPart); $i++){
             $getMesin = MasterMesin::where('id', $masterPart[$i]->id_mesin)->first();
             $masterPart[$i]["mesin"] = $getMesin;

             $getModel = Models::where('id', $getMesin->model)->first();
             $masterPart[$i]["mesin"]["model"]= $getModel;
        }

        if ($masterPart->count() > 0){
            return response()->json([
                'success' => true,
                'totalDatas' => $masterPart->count(),
                'data' => $masterPart
            ]);
        } else {
             return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                    'data' => []
                ]);
        }
    }

    public function getDataByIdStatusPaging($mesinId, $rowPerPage, $status){
        $masterPart = MasterPart::where('id_mesin', $mesinId)
                            ->where('status', $status == 'ACTIVE' ?1:0)
                            ->orderBy('id_mesin', 'ASC')
                            ->orderBy('format', 'DESC')
                            ->orderBy('position', 'ASC')
                            ->paginate($rowPerPage);//->get();

        for ($i = 0; $i < count($masterPart); $i++){
             $getMesin = MasterMesin::where('id', $masterPart[$i]->id_mesin)->first();
             $masterPart[$i]["mesin"] = $getMesin;

             $getModel = Models::where('id', $getMesin->model)->first();
             $masterPart[$i]["mesin"]["model"]= $getModel;
        }

        if ($masterPart->count() > 0){
            return response()->json([
                'success' => true,
                'totalDatas' => $masterPart->count(),
                'data' => $masterPart
            ]);
        } else {
             return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                    'data' => []
                ]);
        }
    }

    function getDataByIdType($mesinId, $rowPerPage, $type){
        if ($type == "MESIN"){
            $masterPart = MasterPart::where('id_mesin', $mesinId)
                            ->where('types', 'MESIN')
                            ->orderBy('id_mesin', 'ASC')
                            ->orderBy('format', 'DESC')
                            ->orderBy('position', 'ASC')
                            ->paginate($rowPerPage);
        } else {
            $masterPart = MasterPart::where('id_mesin', $mesinId)
                            ->where('types', 'PART_MESIN')
                            ->orderBy('id_mesin', 'ASC')
                            ->orderBy('format', 'DESC')
                            ->orderBy('position', 'ASC')
                            ->paginate($rowPerPage);
        }

        for ($i = 0; $i < count($masterPart); $i++){
             $getMesin = MasterMesin::where('id', $masterPart[$i]->id_mesin)->first();
             $masterPart[$i]["mesin"] = $getMesin;

             $getModel = Models::where('id', $getMesin->model)->first();
             $masterPart[$i]["mesin"]["model"]= $getModel;
        }

        return response()->json([
            'success' => true,
            'totalDatas' => $masterPart->count(),
            'data' => $masterPart
        ]);
    }

    public function getDataBasedOnType( $rowPerPage, $type){
        // dd($rowPerPage, $type);

        if ($type == "MESIN"){
            $masterPart = MasterPart::where('types', 'MESIN')->paginate($rowPerPage);
        } else {
            $masterPart = MasterPart::where('types', 'PART_MESIN')->paginate($rowPerPage);
        }

        for ($i = 0; $i < count($masterPart); $i++){
             $getMesin = MasterMesin::where('id', $masterPart[$i]->id_mesin)->first();
             $masterPart[$i]["mesin"] = $getMesin;

             $getModel = Models::where('id', $getMesin->model)->first();
             $masterPart[$i]["mesin"]["model"]= $getModel;
        }

        return response()->json([
            'success' => true,
            'totalDatas' => $masterPart->count(),
            'data' => $masterPart
        ]);
    }

    public function getDataByIdStatusTypePaging($mesinId, $rowPerPage, $status, $type){
        if ($type == "MESIN"){
            $masterPart = MasterPart::where('id_mesin', $mesinId)
                            ->where('status', $status == 'ACTIVE' ?1:0)
                            ->where('types', 'MESIN')
                            ->paginate($rowPerPage);
        } else {
            $masterPart = MasterPart::where('id_mesin', $mesinId)
                            ->where('status', $status == 'ACTIVE' ?1:0)
                            ->where('types', 'PART_MESIN')
                            ->paginate($rowPerPage);
        }

        for ($i = 0; $i < count($masterPart); $i++){
             $getMesin = MasterMesin::where('id', $masterPart[$i]->id_mesin)->first();
             $masterPart[$i]["mesin"] = $getMesin;

             $getModel = Models::where('id', $getMesin->model)->first();
             $masterPart[$i]["mesin"]["model"]= $getModel;
        }
        if ($masterPart->count() > 0){
            return response()->json([
                'success' => true,
                'totalDatas' => $masterPart->count(),
                'data' => $masterPart
            ]);
        } else {
             return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                    'data' => []
                ]);
        }
    }

    public function getDataByIdStatusTypePartdescPaging($mesinId, $rowPerPage, $status, $type, $searchPart){
        if ($type == "MESIN"){
            $masterPart = MasterPart::where('id_mesin', $mesinId)
                            ->where('status', $status == 'ACTIVE' ?1:0)
                            ->where('types', 'MESIN')
                            ->where('part_desc', 'LIKE', '%' . $searchPart . '%')
                            ->paginate($rowPerPage);
        } else {
            $masterPart = MasterPart::where('id_mesin', $mesinId)
                            ->where('status', $status == 'ACTIVE' ?1:0)
                            ->where('types', 'PART_MESIN')
                            ->where('part_desc', 'LIKE', '%' . $searchPart . '%')
                            ->paginate($rowPerPage);
        }

        for ($i = 0; $i < count($masterPart); $i++){
             $getMesin = MasterMesin::where('id', $masterPart[$i]->id_mesin)->first();
             $masterPart[$i]["mesin"] = $getMesin;

             $getModel = Models::where('id', $getMesin->model)->first();
             $masterPart[$i]["mesin"]["model"]= $getModel;
        }
        if ($masterPart->count() > 0){
            return response()->json([
                'success' => true,
                'totalDatas' => $masterPart->count(),
                'data' => $masterPart
            ]);
        } else {
             return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                    'data' => []
                ]);
        }
    }

    function getByIdTipeMesinAndPartColumn($mesinId, $rowPerPage, $partColumn){
        $masterPart = MasterPart::where('id_mesin', $mesinId)
                                ->where('part_desc', 'like', '%'.$partColumn.'%')
                                ->paginate($rowPerPage);

        if($masterPart ){

            for ($i = 0; $i < count($masterPart); $i++){
                $getMesin = MasterMesin::where('id', $masterPart[$i]->id_mesin)->first();
                $masterPart[$i]["mesin"] = $getMesin;

                $getModel = Models::where('id', $getMesin->model)->first();
                $masterPart[$i]["mesin"]["model"]= $getModel;
            }

            return response()->json([
                'success' => true,
                'totalDatas' => $masterPart->count(),
                'data' => $masterPart
            ]);
        }  else {
            return response()->json([
                'success' => true,
                'totalDatas' => 0,
                'data' => []
            ]);

        }

    }

    public function getDataStaging($mesinId, $customerId){
         $masterPart = MasterPart::where('id_mesin', $mesinId)->get();
         $getmesinType = MasterMesin::where('id', $mesinId)->first();
         $getCustomer = MasterCustomer::where('id', $customerId)->first();

         for ($i = 0; $i < count($masterPart); $i++){
            $masterPart[$i]['mesin_type']   = $getmesinType->type;
            $masterPart[$i]["bank_desc"]    = $getCustomer->bank_desc;
            $masterPart[$i]["scan_barcode"] = '';
         }

         if ($masterPart->count() > 0){
            return response()->json([
                'success' => true,
                'totalDatas' => $masterPart->count(),
                'data' => $masterPart
            ]);
        } else {
             return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan',
                    'data' => []
                ], 400);
        }
    }

    public function destroy($id){

        $masterPart = MasterPart::findOrFail($id);
        $masterPart->delete();

        if($masterPart) {
            return response()->json([
                'success' => true,
                'message' => "Data PartNumber  ".$masterPart['part_no']."-".$masterPart['part_desc']." berhasil dihapus",
                'data' => $masterPart
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data PartNumber gagal dihapus'
            ], 400);
        }
    }

    function check_partNumber_in_use($idMesin){
    }

    // get List PartNumber By IdMesin-PartDescription
    function getListPartNumber($idMesin, $partDesc){
        $part_desc = '';

        switch ($partDesc){
            case "CDU10_FM B_D" : $part_desc ='CDU10_FM B/D'; break;
            case "P_S" : $part_desc ='P/S'; break;
            case "BRM20 MAIN B_D" : $part_desc = 'BRM20 MAIN B/D'; break;
            case "BRM20 RBU B_D" : $part_desc = 'BRM20 RBU B/D'; break;
            case "BRM50_RBU IO B_D" : $part_desc = 'BRM50_RBU IO B/D'; break;
            default : $part_desc = $partDesc;
        }

        $listPartNumber = MasterPart::select('id', 'part_no', 'part_desc')->where('id_mesin', $idMesin)->where('part_desc', $part_desc)->get();

        return response()->json([
                'success' => true,
                'totalDatas' => count($listPartNumber),
                'data' => $listPartNumber
            ]);

    }
}
