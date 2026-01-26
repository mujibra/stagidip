<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PurchaseOrder;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Models\MasterMesin;
use App\Models\MasterGudang;
use App\Models\MasterCustomer;
use App\Models\Models;
use App\Models\PicMitra;
use App\Models\MasterPart;
use App\Models\Bacth;
use App\Models\MasterPo;
use App\Models\WarehouseTransfer;
use App\Models\TransaksiInspeksi;
use App\Models\MasterDivisi;
use App\Models\MasterChecklistStaging;
use App\Models\TransaksiChecklistStaging;
use App\Models\TransaksiInspeksiApproval;
use App\Models\MasterSettingPreStaging;
use App\Models\MasterWSInfo;
use App\Models\MasterPicMover;
use Carbon\Carbon;
use PDF;
use Excel;
use App\Exports\PurchaseOrderExport;
use App\Models\TransaksiStatusDelivery;
use App\Models\TransaksiStatusDeliveryDetail;
use App\Models\User;
use App\Models\MasterClassification;
use App\Models\MasterChecklistStagingMv400;
use App\Models\TransaksiChecklistStagingMv400;


class PurchaseOrderController extends Controller
{
    public function index($user_login){
        $user_info = User::where('id', $user_login)->first();
        $po = [];

        if ($user_info){
            if ($user_info['roles'] == 'GUEST_BANK'){
                $customer_id = $user_info['id_customer'];
                $this->po = PurchaseOrder::where('deleted_at', '=', NULL)->where('customer', $customer_id)->orderBy('id', 'desc')->get();
            } else {
                $this->po = PurchaseOrder::where('deleted_at', '=', NULL)->orderBy('id', 'desc')->get();
            }
        }
        
        for ( $i = 0; $i < count($this->po); $i++){
            $getMesin = MasterMesin::where('id', $this->po[$i]->id_type_mesin)->first();
            $getGudang = MasterGudang::where('id', $this->po[$i]->nama_gudang)->first();
            $getCustomer = MasterCustomer::where('id', $this->po[$i]->customer)->first();
            $getModel = Models::where('id', $this->po[$i]->model)->first();
            $getPic = PicMitra::where('id', $this->po[$i]->pic_staging)->first();
            $getBatch = Bacth::where('id', $this->po[$i]->batch)->first();
            $getPoMaster = MasterPo::where('id', $this->po[$i]->id_po_master)->first();

            $getWarehouseTf = WarehouseTransfer::where('id_po', '=', $this->po[$i]->id)->get();
            if (count($getWarehouseTf) >0){
                $getCountJumlahTf = WarehouseTransfer::where('id_po', '=', $this->po[$i]->id)->sum('jumlah');
                $this->po[$i]['total_transfer'] = (int) $getCountJumlahTf; 
            } else {
                $this->po[$i]['total_transfer'] = 0; 
            }

            $this->po[$i]['mesin'] = $getMesin;
            $this->po[$i]['gudang'] = $getGudang;
            $this->po[$i]['customer'] = $getCustomer;
            $this->po[$i]['model'] = $getModel;
            $this->po[$i]['pic_staging'] = $getPic;
            $this->po[$i]['batch'] = $getBatch;
            $this->po[$i]['po_master'] = $getPoMaster;
        }

        return response()->json([
            'success' => true,
            'totalDatas' => $this->po->count(),
            'data' => $this->po
        ]);
    }

    public function indexFromTo($dateFrom , $dateTo){

        $from = date($dateFrom);
        $to = date($dateTo);

        if ($from !== NULL && $to !== NULL){
            $getData = PurchaseOrder::whereBetween('tgl_po', [$from, $to])->get();
        } else if ($dateFrom !== NULL && $dateTo === NULL){
            $query = 'select * from tbl_po where date(tgl_po) > '.$dateFrom;
            $getData = DB::statement($query);
        } else if ($dateFrom === NULL && $dateTo !== NULL){
            $query = 'select * from tbl_po where date(tgl_po) < '.$dateTo;
            $getData = DB::statement($query);
        }

        for($j = 0; $j < count($getData); $j++){
            $getWarehouseTf = WarehouseTransfer::where('id_po', '=', $getData[$j]->id)->get();
            if (count($getWarehouseTf) >0){
                $getCountJumlahTf = WarehouseTransfer::where('id_po', '=', $getData[$j]->id)->sum('jumlah');
                $getData[$j]['total_transfer'] = (int) $getCountJumlahTf; 
            } else {
                $getData[$j]['total_transfer'] = 0; 
            }

            $getMesin = MasterMesin::where('id', $getData[$j]->id_type_mesin)->first();
            $getGudang = MasterGudang::where('id', $getData[$j]->nama_gudang)->first();
            $getCustomer = MasterCustomer::where('id', $getData[$j]->customer)->first();
            $getModel = Models::where('id', $getData[$j]->model)->first();
            $getPic = PicMitra::where('id', $getData[$j]->pic_staging)->first();
            $getBatch = Bacth::where('id', $getData[$j]->batch)->first();

            $getData[$j]['mesin'] = $getMesin;
            $getData[$j]['gudang'] = $getGudang;
            $getData[$j]['customer'] = $getCustomer;
            $getData[$j]['model'] = $getModel;
            $getData[$j]['pic_staging'] = $getPic;
            $getData[$j]['batch'] = $getBatch;
        }

        if ($getData){
            return response()->json([
                'success' => true,
                'totalDatas' => count($getData),
                'data' => $getData
            ]);

        }
    }


    public function getAllDataStaggingBasedOnType($type){
        $po= [];
        if ( $type == 'newMachine'){
            $this->po = PurchaseOrder::where('deleted_at', '=', NULL)
                                     ->where('status_mesin', '=', 'New Machine')
                                     ->orderBy('id', 'desc')
                                     ->get();
        } else {
            $this->po = PurchaseOrder::where('deleted_at', '=', NULL)
                                     ->where('status_mesin', '=', 'Old Machine')
                                     ->orderBy('id', 'desc')
                                     ->get();
        }

        for ($i = 0; $i < count($this->po); $i++){
            $getMesin = MasterMesin::where('id', $this->po[$i]->id_type_mesin)->first();
            $getGudang = MasterGudang::where('id', $this->po[$i]->nama_gudang)->first();
            $getCustomer = MasterCustomer::where('id', $this->po[$i]->customer)->first();
            $getModel = Models::where('id', $this->po[$i]->model)->first();
            $getPic = PicMitra::where('id', $this->po[$i]->pic_staging)->first();
            $getBatch = Bacth::where('id', $this->po[$i]->batch)->first();

            $this->po[$i]['mesin'] = $getMesin;
            $this->po[$i]['gudang'] = $getGudang;
            $this->po[$i]['customer'] = $getCustomer;
            $this->po[$i]['model'] = $getModel;
            $this->po[$i]['pic_staging'] = $getPic;
            $this->po[$i]['batch'] = $getBatch;
        }

        return response()->json([
                    'success' => true,
                    'totalDatas' => count($this->po),
                    'data' => $this->po
                ]);
    }

    public function getDataById($idPo){
        $po = PurchaseOrder::where('id', $idPo)->first();
        if ($po){
            $po['model'] = Models::where('id', $po->model)->first();
            $po['gudang'] = MasterGudang::where('id', $po->nama_gudang)->first();
            $po['customer'] = MasterCustomer::where('id', $po->customer)->first();
            $po['pic_staging'] = PicMitra::where('id', $po->pic_staging)->first();
            $po['mesin'] = $getMesin = MasterMesin::where('id', $po->id_type_mesin)->first();

            return response()->json([
                    'success' => true,
                    'data' => $po
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
        $jmlMesin = $request->input('jumlah');

        $validator = Validator::make($input, ['jumlah' => 'required']);
        if ($validator->fails()){
            return response()->json($validator->errors());
        }
        
        try{
            $po = PurchaseOrder::create($input);
            $idMesin = $request->input('id_type_mesin');

            if ($po){
                $idStaging = $po->id;
                $getPartMesin = DB::select('select * from mst_part_number where id_mesin = :id_mesin and status=1', ['id_mesin' => $idMesin]);
                $dataArray=array();
                $sql= "";

                foreach($getPartMesin as $datas){
                    $column_name = $datas->part_column;
                    array_push($dataArray, $column_name);
                }

                $tableName = 'crt_'.$idStaging;
                $sql = " CREATE TABLE ".$tableName." ( ";

                $sql .= "id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, ";

                for ($i = 0; $i < count($dataArray); $i++) {
                     $sql .= $dataArray[$i]." varchar(50),"; //NOT NULL
                }
                $sql .= "NOTES varchar(250),";

                $sql = rtrim($sql, ",");
                $sql .= ")";
                DB::statement($sql);

                //add constraint to columns
                $add_constraint = "";
                $constraint_name = 'serial_unix_';

                for ($j = 0; $j < count($dataArray); $j++) {
                     $add_constraint = 'ALTER TABLE '.$tableName.' ADD CONSTRAINT '.$constraint_name.'_'.$j.' UNIQUE ('.$dataArray[$j].')';
                     DB::statement($add_constraint);
                }

                $q2 = "";
                for ($k = 0; $k < $jmlMesin; $k++) {
                    $q2 ='INSERT INTO '.$tableName.' (';

                    for ($m = 0; $m < count($dataArray); $m++) {
                         $q2 .= $dataArray[$m].",";
                    }
                    $q2 = rtrim($q2, ",");
                    $q2 .= ")";
                    $q2 .= ' VALUES (';
                    for ($p = 0; $p < count($dataArray); $p++) {
                        if ($p === count($dataArray)-1){
                          $q2 .= 'NULL';
                        } else {
                         $q2 .= 'NULL, ';
                        }
                    }

                    $q2 = rtrim($q2, ",");
                    $q2 .= ")";
                    DB::statement($q2);
                }
            }

            return response()->json([
                "success" => true,
                "message" => "PO created successfully.",
                "data" => $po
            ]);

        } catch(\Illuminate\Database\QueryException $ex) {
            if ($ex->errorInfo[0] == '42S01'){
                $deleted = DB::table('tbl_po')->where('id', DB::raw("(select max(`id`) from tbl_po)"))->delete();

                if ($deleted){
                    return response()->json([
                            "errorCode" => $ex->errorInfo[0], 
                            "errorMessage"=> "Gagal Menambahkan PO, Pilih Gudang Lain"
                        ], 400);
                }
            }
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    public function updatePO(Request $request, $idPo){
        $data = $request->all();
        
        // $updatePO = DB::table('tbl_po')->where('id', $idPo)->update($data[0]);
        $updatePO = PurchaseOrder::where('id', $idPo)->update($data);

        if ($updatePO){
            return response()->json([
                "success" => true,
                "message" => "PO updated successfully.",
                "data" => $updatePO
            ]);
        } else {
            return response()->json([
                "success" => false,
                "message" => "PO updated Errors."
            ], 400);
        }
    }

    public function updateRowStaging($idPo, $rowNum, Request $request){
        $data = json_decode($request->getContent(), true);
        $selectPo = PurchaseOrder::where('id', $idPo)->first();

        try {
            $sql ="update crt_".$selectPo->id. " set ";
            for ($i =0; $i<count($data['data']); $i++){
                if ($i ==count($data['data'])-1){
                    if ($data['data'][$i]['scan_barcode'] == ""){ 
                        $sql .=  $data['data'][$i]['part_column'].' = NULL';
                    } else { 
                        $sql .=  $data['data'][$i]['part_column'].' = \''.$data['data'][$i]['scan_barcode'].'\''; 
                    }
                } else {
                    if ($data['data'][$i]['scan_barcode'] == ""){
                        $sql .=  $data['data'][$i]['part_column'].' = NULL, ';
                    } else {
                        $sql .=  $data['data'][$i]['part_column'].' = \''.$data['data'][$i]['scan_barcode'].'\''.', ';
                    }
                }
            }
            $sql .= ' where id = '.$rowNum;
            $update = DB::statement($sql);

            if ($update){
                return response()->json([
                    "success" => true,
                    "message" => "Berhasil Ubah Barcode untuk Mesin ke-".$rowNum,
                    "data" => $selectPo
                ]);
            }
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    // update SN Mesin 
    public function updateSNMesin($idPo, $rowNum, Request $request){
         try {
                $selectPo = PurchaseOrder::where('id', $idPo)->first();
                $masterPart = MasterPart::where('id_mesin', $selectPo['id_type_mesin'])
                                    ->whereIn('part_column', ['ATM_MESIN','CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN'])->first();

                 $column_name = $masterPart['part_column'];
                 $q1 = 'update crt_'.$idPo.' set '.$column_name.' = \''.$request->input('sn_mesin').'\' where id ='.$rowNum;
                 $updateSNMesin = DB::statement($q1);

                 if ($updateSNMesin){

                    // $url_datindo = 'https://dev.datindoku.com/apis/staging';
                    $url_datindo = env('URL_DATINDO');

                    $data1 = [
                        'serial_no' => $request->sn_mesin,
                        'machine_model' => $selectPo['id_type_mesin']
                    ];

                    $registerMesinBaru = $this->callAPI('POST', $url_datindo, $data1); // hit Registrasi Mesin Baru ke datindo 
                    $response = json_decode($registerMesinBaru, true);

                    $data_resp = [];

                    $data_resp[0]= [
                        'success' => true,
                        'message' => 'Update SN Mesin Berhasil', 
                    ];
                    $data_resp[1] = $response;

                    return response()->json([
                            'success' => true,
                            'data_response' => $data_resp
                        ], 200);

                 } else {
                    return response()->json([
                            'success' => false,
                            'message' => 'Update SN Mesin Errors'
                        ], 400);
                }

        } catch(\Illuminate\Database\QueryException $ex) {
            if ($ex->errorInfo[0] == '23000'){
                return response()->json([
                        "errorCode" => $ex->errorInfo[0], 
                        "message"=> "SN Mesin ".$request->input('sn_mesin')." Sudah pernah di input sebelumnya"
                    ], 400);
            }
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    function callAPI($method, $url, $data){
        $curl= curl_init();

        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_TIMEOUT, 30);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        // OPTIONS:
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
          "Accept:application/json", 
          "key:RuuvwtcBFMaNMgkYJDSPmBdxYqXbNiBA"
        ));

        // Execute 
        $result = curl_exec($curl);

        if (!$result){die("Connection Failure");}
        curl_close($curl);

        return $result;
    }

    public function getSNMesin($idPo, $rowNum){
        try {
            $selectPo = PurchaseOrder::where('id', $idPo)->first();
            $masterPart = MasterPart::where('id_mesin', $selectPo['id_type_mesin'])
                                  ->whereIn('part_column', ['ATM_MESIN','CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN'])->first();
            
            $column_name = $masterPart['part_column'];
            $q1 = 'select '.$column_name.' from crt_'.$idPo.' where id ='.$rowNum;

            $getSNMesin = DB::select($q1);
            $getWSInfo = MasterWSInfo::where('serial_number', $getSNMesin[0]->$column_name)->first();

            if( $getSNMesin ){
                return response()->json([
                            'success' => true,
                            'sn_mesin' => $getSNMesin[0]->$column_name, 
                            'ws_id' => isset($getWSInfo) ? $getWSInfo['ws_id'] : null, 
                            'ws_name' => isset($getWSInfo) ? $getWSInfo['ws_name'] : null, 
                            'ticket' => isset($getWSInfo) ? $getWSInfo['ticket'] : null, 
                            'installation_date' => isset($getWSInfo) ? $getWSInfo['installation_date'] : null
                        ], 200);
            } else {
                return response()->json([
                            'success' => false,
                            'message' => 'data tidak ditemukan'
                ], 400);
            }
        } catch(\Illuminate\Database\QueryException $ex) {
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    // get data Order Based on idPO-rowMesin
    public function getDataStagingBasedOnRowMesin($idPo, $rowNum){
        try {
             $selectPo = PurchaseOrder::where('id', $idPo)->first();
             $getCustomer = MasterCustomer::where('id', $selectPo['customer'])->first();
             $getmesinType = MasterMesin::where('id', $selectPo['id_type_mesin'])->first();
             $tableColumns = Schema::getColumnListing('crt_'.$idPo);

             $hiddenColumns = ['id', 'ATM_MESIN', 'CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN', 'NOTES'];
             $columns = array_diff($tableColumns, $hiddenColumns);
             $dataColumn = array_values($columns);

             $array_column = array();
             $query1 = 'select * from mst_part_number where part_column IN (';
             for ($a =0; $a<count($dataColumn); $a++){
                if ($a === count($dataColumn)-1){
                    $query1 .= '\''.$dataColumn[$a].'\'';
                } else {
                    $query1 .= '\''.$dataColumn[$a].'\',';
                }
             }
             $query1 .=') and id_mesin ='.$selectPo->id_type_mesin.' order by position asc'; //' order by part_column asc';
             $datas = DB::select($query1);

             for ($i=0; $i<count($dataColumn); $i++){
                   $getBarcode = null;
                   $columnName = $datas[$i]->part_column;
                   
                   $getBarcode = $this->getDataBarcode($idPo, $rowNum, $columnName);

                   $datas[$i]->scan_barcode = $getBarcode;
                   $datas[$i]->mesin_type   = $getmesinType['type'];
                   $datas[$i]->bank_desc    = $getCustomer['bank_desc'];
             }

             return response()->json([
                'success' => true,
                'totalDatas' => count($datas),
                'data' => $datas
             ]);

        } catch(\Illuminate\Database\QueryException $ex) {
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    function getDataBarcode($idPo, $rowMesin, $columnName){
        $qr_code = ' select '.$columnName.' from crt_'.$idPo.' where id = '.$rowMesin;
        $scan_barcode = DB::select($qr_code)[0]->$columnName;
        return $scan_barcode;
    }

    public function getDataStagingBasedOnRowMesin_20230506($idPo, $rowNum){
        try {
             $selectPo = PurchaseOrder::where('id', $idPo)->first();
             $getCustomer = MasterCustomer::where('id', $selectPo['customer'])->first();
             $getmesinType = MasterMesin::where('id', $selectPo['id_type_mesin'])->first();
             $tableColumns = Schema::getColumnListing('crt_'.$idPo);

             $hiddenColumns = ['id', 'ATM_MESIN', 'CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN', 'NOTES'];
             $columns = array_diff($tableColumns, $hiddenColumns);
             $dataColumn = array_values($columns);

             $array_column = array();
             $query1 = 'select * from mst_part_number where part_column IN (';
             for ($a =0; $a<count($dataColumn); $a++){
                if ($a === count($dataColumn)-1){
                    $query1 .= '\''.$dataColumn[$a].'\'';
                } else {
                    $query1 .= '\''.$dataColumn[$a].'\',';
                }
             }
             $query1 .=') and id_mesin ='.$selectPo->id_type_mesin.' order by part_column asc';
             $datas = DB::select($query1);

             for ($i=0; $i<count($dataColumn); $i++){
                   $selectColumn = 'select '.$dataColumn[$i].' from crt_'.$idPo.' where id = '.$rowNum;

                   $columnName = (String)$dataColumn[$i];
                   $getBarcode = DB::select($selectColumn)[0]->$columnName;

                   $datas[$i]->scan_barcode = $getBarcode;
                   $datas[$i]->mesin_type   = $getmesinType['type'];
                   $datas[$i]->bank_desc    = $getCustomer['bank_desc'];

             }

             return response()->json([
                'success' => true,
                'totalDatas' => count($datas),
                'data' => $datas
             ]);

        } catch(\Illuminate\Database\QueryException $ex) {
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    public function destroy($idPo){
        try{
            $po = PurchaseOrder::where('id', $idPo)->first();
            $noPo = $po?->no_po;

            $checkTransfer = WarehouseTransfer::where('id_po',$idPo)->exists();
            $checkStatusDelivery = TransaksiStatusDelivery::where('id_po', $idPo)->exists();

            if ($checkTransfer){
                 return response()->json([
                        'success' => false,
                        'message' => 'PO '.$noPo.' masih berstatus warehouse transfer'
                    ], 400);
            } 
            else if ($checkStatusDelivery){
                return response()->json([
                        'success' => false,
                        'message' => 'PO '.$noPo.' masih berstatus delivery'
                    ], 400);
            }else {
                $query = 'drop table crt_'.$idPo;
                $dropTableStaging = DB::statement($query);

                if ($dropTableStaging){
                    $selectPo = PurchaseOrder::where('id', $idPo)->get();
                    $deletePo = PurchaseOrder::where('id', $idPo)->delete();

                    if ($deletePo){
                        // function for delete Transaction status delivery 
                        $getStatusDelivery = TransaksiStatusDelivery::where('id_po', $idPo)->get();
                        for( $i=0; $i< count($getStatusDelivery); $i++){
                            TransaksiStatusDeliveryDetail::where('id_header', $getStatusDelivery[$i]['id'])->delete();
                        }
                        TransaksiStatusDelivery::where('id_po', $idPo)->delete(); // delete Transaction of Status Delivery
                        WarehouseTransfer::where('id_po', $idPo)->delete(); // delete transaction of warehouse transfer 

                        return response()->json([
                                'success' => true,
                                'message' => 'PO '.$noPo. 'berhasil dihapus',
                                'data' => $selectPo
                            ], 200);

                    } else {
                        return response()->json([
                                'success' => false,
                                'message' => 'PO '.$noPo.' gagal dihapus'
                            ], 400);
                    }
                } else {
                    return response()->json([
                                'success' => false,
                                'message' => 'PO '.$noPo.' gagal dihapus'
                            ], 400);
                }
            }
         } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
         }
    }

    public function cancelPo($idPo){
        $selectPo = PurchaseOrder::where('id', $idPo)->first();
        $deletedPo = PurchaseOrder::where('id', '=', $idPo)->update(['status_po' => 'Cancel', 'deleted_at' => Carbon::now()]);

        if ($deletedPo){
            MasterPo::where('id', '=', $selectPo->id_po_master)->update(['deleted_at' => Carbon::now()]);
            
            $query = 'drop table crt_'.$idPo;
            $dropTableStaging = DB::statement($query);
             
             if ($dropTableStaging){
                return response()->json([
                            'success' => true,
                            'message' => 'PO '.$selectPo->no_po. ' berhasil di cancel',
                            'data' => $selectPo
                        ], 200);
             } else {
                 return response()->json([
                            'success' => false,
                            'message' => 'PO  '.$selectPo->no_po.' gagal di cancel'
                        ], 400);
             }
        }
    }

    // process Inspeksi Testing -----------------------------------------------------------------------

    function getDataInspectionByIdPO($idPo){
        $po = PurchaseOrder::where('id', $idPo)->first();
        if ($po){

            $po['model'] = Models::where('id', $po->model)->first();
            $po['customer'] = MasterCustomer::where('id', $po->customer)->first();
            $po['pic_staging'] = PicMitra::where('id', $po->pic_staging)->first();
            $po['mesin'] = MasterMesin::where('id', $po->id_type_mesin)->first();

            try {
                $query = 'SELECT * FROM crt_'.$po->id;
                $getDataStaging = DB::select($query);
                
                $data = DB::table($query);
                $columns = Schema::getColumnListing('crt_'.$po->id);
                $snMesin = [];

                for( $i = 0; $i < count($getDataStaging); $i++ ) {
                    if($po->model['name'] == 'ATM' OR $po->model['name'] == 'ATMS' OR $po->model['name'] == 'TTW'){
                        $snMesin[$i]['idMesin'] = $getDataStaging[$i]->id;   
                        $snMesin[$i]['snMesin'] = $getDataStaging[$i]->ATM_MESIN;
                    } elseif($po->model['name'] == 'CRM' OR $po->model['name'] == 'CRMS') {
                        $snMesin[$i]['idMesin'] = $getDataStaging[$i]->id;
                        $snMesin[$i]['snMesin'] = $getDataStaging[$i]->CRM_MESIN;
                    } elseif ($po->model['name'] == 'TCR'){
                        $snMesin[$i]['idMesin'] = $getDataStaging[$i]->id;
                        $snMesin[$i]['snMesin'] = $getDataStaging[$i]->TCR_MESIN;
                    } elseif ($po->model['name'] == 'CS KIOS'){
                        $snMesin[$i]['idMesin'] = $getDataStaging[$i]->id;
                        $snMesin[$i]['snMesin'] = $getDataStaging[$i]->CS_KIOS_MESIN;
                    } elseif ($po->model['name'] == 'VBK'){
                        $snMesin[$i]['idMesin'] = $getDataStaging[$i]->id;
                        $snMesin[$i]['snMesin'] = $getDataStaging[$i]->VBK_MESIN;
                    }

                    $getStatus = TransaksiInspeksi::where('id_po', $idPo)->where('no_mesin', $getDataStaging[$i]->id)->count();

                    if ($getStatus>0){ $snMesin[$i]['testing_inspection'] = true; }
                    else { $snMesin[$i]['testing_inspection'] = false; }

                    if ($po->mesin['type'] == 'MV400'){
                        $getStatusChecklist = TransaksiChecklistStagingMv400::where('id_po', $idPo)->where('no_mesin', $getDataStaging[$i]->id)->count();
                    } else {
                        $getStatusChecklist = TransaksiChecklistStaging::where('id_po', $idPo)->where('no_mesin', $getDataStaging[$i]->id)->count();
                    }

                    if ($getStatusChecklist>0) {
                        $snMesin[$i]['checklist_staging'] = true; 
                    } else {
                        $snMesin[$i]['checklist_staging'] = false; 
                    }
                }
                $po['dataMesin'] = $snMesin;

                return response()->json([
                        'success' => true,
                        'data' => $po
                    ], 200);

            } catch(\Illuminate\Database\QueryException $ex) {
                return response()->json(["errorMessage"=> $ex->getMessage()], 500);
            }
        }
    }

    function updateApprovalInspeksi($type, $idPo, $idMesin, Request $request){
        if ($type === 'MOVER'){
            $updated = TransaksiInspeksiApproval::where('id_po', $idPo)
                                     ->where('no_mesin', $idMesin)
                                     ->update(['approval_by_mover' => $request->approval_by]);

            if($updated){
                 return response()->json([
                        'success' => true,
                        'message' => 'Update Approval by Mover was successfully'
                    ], 200);
            }else {
                return response()->json([
                        "success" => false,
                        "message" => "Update Approval by Mover Errors."
                    ], 400);
            }
        } else if ($type === 'TSS'){
            $updated = TransaksiInspeksiApproval::where('id_po', $idPo)->where('no_mesin', $idMesin)->update(['approval_by_tss' => $request->approval_by]);

            if ($updated){
                return response()->json([
                        'success' => true,
                        'message' => 'Update Approval by TSS was successfully'
                    ], 200);
            } else {
                return response()->json([
                        "success" => false,
                        "message" => "Update Approval by TSS Errors."
                    ], 400);
            }
        } else {

            $updated = TransaksiInspeksiApproval::where('id_po', $idPo)
                                                ->where('no_mesin', $idMesin)
                                                ->update(['approval_by_datindo' => $request->approval_by]);

            if($updated){
                 return response()->json([
                        'success' => true,
                        'message' => 'Update Approval by Datindo was successfully'
                    ], 200);
            }else {
                return response()->json([
                        "success" => false,
                        "message" => "Update Approval by Datindo Errors."
                    ], 400);
            }
        }
    }


    function getApprovalInspeksi($type, $idPo, $idMesin){
        $getData = TransaksiInspeksiApproval::where('id_po', $idPo)->where('no_mesin', $idMesin)->first();

        if (!$getData){
            return response()->json([
                        'success' => false,
                        'data' => []
                    ], 400); 
        }

        if ($type === 'MOVER'){
            if ($getData){
                $getPicMover = MasterPicMover::where('id', $getData['approval_by_mover'])->get();

                return response()->json([
                        'success' => true,
                        'data' => $getPicMover
                    ], 200); 
            }
        } else if ($type === 'TSS'){
            if ($getData){
                $getPicMover = PicMitra::where('id', $getData['approval_by_tss'])->get();

                return response()->json([
                        'success' => true,
                        'data' => $getPicMover
                    ], 200); 
            }
        } else {
            if ($getData){
                $getPicMitra = PicMitra::where('id', $getData['approval_by_datindo'])->get();

                return response()->json([
                        'success' => true,
                        'data' => $getPicMitra
                    ], 200); 
            }
        }
    }

    //-----------------------------------------------------------------------

    public function getAllSNMesin($idPo){
        try {
            $selectPo = PurchaseOrder::where('id', $idPo)->first();
            $masterPart = MasterPart::where('id_mesin', $selectPo['id_type_mesin'])
                                  ->whereIn('part_column', ['ATM_MESIN','CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN'])->first();
            
            $column_name = $masterPart['part_column'];
            $q1 = 'select '.$column_name.' as sn_mesin,id from crt_'.$idPo;
            $getSNMesin = DB::select($q1);

            $datas = [];
            for ($i=1; $i <= $selectPo['jumlah'] ; $i++) { 
                $key = array_search($i, array_column($getSNMesin, 'id'));
                $sn_mesin = null;
                if(strlen($key)>0){
                    $sn_mesin = $getSNMesin[$key]->sn_mesin;
                }
                $data = [
                   'id' => $i,
                   'sn_mesin' => $sn_mesin
                ];
                $datas[] = $data;
            }

            return response()->json([
                'success' => true,
                'totalDatas' => count($datas),
                'data' => $datas
            ], 200);
        } catch(\Illuminate\Database\QueryException $ex) {
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    function getDataSNMesinByIdPO($idPo){
        $po = PurchaseOrder::where('id', $idPo)->first();

        if ($po){

            $po['model'] = Models::where('id', $po->model)->first();

            $query = 'SELECT * FROM crt_'.$idPo;
            $getDataSN = DB::select($query);

            $snMesin = [];

            for( $i = 0; $i < count($getDataSN); $i++ ) {
                if($po->model['name'] == 'ATM' OR $po->model['name'] == 'ATMS'){
                    $snMesin[$i]['idMesin'] = $getDataSN[$i]->id;   
                    $snMesin[$i]['snMesin'] = $getDataSN[$i]->ATM_MESIN;    
                } elseif($po->model['name'] == 'CRM' OR $po->model['name'] == 'CRMS') {
                    $snMesin[$i]['idMesin'] = $getDataSN[$i]->id;
                    $snMesin[$i]['snMesin'] = $getDataSN[$i]->CRM_MESIN;
                } elseif ($po->model['name'] == 'CS KIOS'){
                    $snMesin[$i]['idMesin'] = $getDataSN[$i]->id;
                    $snMesin[$i]['snMesin'] = $getDataSN[$i]->CS_KIOS_MESIN;
                } elseif ($po->model['name'] == 'TTW'){
                    $snMesin[$i]['idMesin'] = $getDataSN[$i]->id;
                    $snMesin[$i]['snMesin'] = $getDataSN[$i]->ATM_MESIN;
                } elseif ($po->model['name'] == 'VBK'){
                    $snMesin[$i]['idMesin'] = $getDataSN[$i]->id;
                    $snMesin[$i]['snMesin'] = $getDataSN[$i]->VBK_MESIN;
                }                
            }

            $getDataSN['dataMesin'] = $snMesin;

            $dataArray=array();
            for ($j=0; $j<count($snMesin); $j++){
                if ($snMesin[$j]['snMesin'] != null){
                    array_push($dataArray, $snMesin[$j]);
                }
            }

            if ($dataArray){
                return response()->json([
                    'success' => true,
                    'data' => $dataArray
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'data' => []
                ], 400);
            }
        } else {
            return response()->json([
                    'success' => false,
                    'data' => []
                ], 400);
        }
    }

    // -- process checkliist staging 
    function getDataChecklistStagingByIdPO($idPo, $idMesin){
        try {
            $selectPo = PurchaseOrder::where('id', $idPo)->first();
            $getDataDivisi = MasterDivisi::where('id_mesin', $selectPo['id_type_mesin'])->get();

            for ($a=0; $a< count($getDataDivisi); $a++){
                $getDataListStaging = MasterChecklistStaging::where('id_divisi', $getDataDivisi[$a]->id)->get();
                $dataList = [];

                for ($b=0; $b< count( $getDataListStaging); $b++){
                    $dataList[$b] = $getDataListStaging[$b];
                }
                $getDataDivisi[$a]['checklistStaging'] = $dataList;

                // check sudah insert/ belum 
                $check = TransaksiChecklistStaging::where('id_po', $idPo)->where('no_mesin', $idMesin)->where('id_divisi', $getDataDivisi[$a]->id)->count();

                if ($check>0){ $getDataDivisi[$a]['staging_checklist'] = true;}
                else { $getDataDivisi[$a]['staging_checklist'] = false;}
            }

             return response()->json([
                    'success' => true,
                    'data' => $getDataDivisi
                ]);

        } catch(\Illuminate\Database\QueryException $ex) {
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    // checklistStaging for mv400
    function getDataChecklistStagingMv400($idPo, $idMesin){

        try {
            $get_classif = MasterClassification::get();

            for ($a =0; $a< count($get_classif); $a++){
                $get_data_listStaging = MasterChecklistStagingMv400::where('id_classification', $get_classif[$a]->id)->get();

                $data_list = [];
                for ($b=0; $b< count($get_data_listStaging); $b++){
                    $data_list[$b] = $get_data_listStaging[$b];
                }

                $get_classif[$a]['checklist_staging'] = $data_list;

                $check = TransaksiChecklistStagingMv400::where('id_po', $idPo)->where('no_mesin', $idMesin)->where('id_classification',  $get_classif[$a]->id)->count();

                if ($check>0) { $get_classif[$a]['staging_checklist'] = true; }
                else { $get_classif[$a]['staging_checklist'] = false; }
            }

            return response()->json([
                        'success' => true,
                        'data' => $get_classif
                    ]);
        } catch(\Illuminate\Database\QueryException $ex) {
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    // get data checklist Staging , get by id Classification 
    function getDataChecklistStagingMv400Details($idPo, $idMesin, $idClassif){
        try {
            $get_classif = MasterClassification::where('id', $idClassif)->get();

            for ($a=0; $a<count($get_classif); $a++){
                $get_data_listStaging = MasterChecklistStagingMv400::where('id_classification', $get_classif[$a]->id)->get();
                $data_list = [];

                for ($b=0; $b< count($get_data_listStaging); $b++){
                    $data_list[$b] = $get_data_listStaging[$b];
                }
                $get_classif[$a]['checklist_staging'] = $data_list;
            }

            return response()->json([
                        'success' => true,
                        'data' => $get_classif
                    ]);

        } catch(\Illuminate\Database\QueryException $ex) {
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    // -- get data checklist staging, untuk edit data
    function getDataChecklistStagingDetails($idPo, $idMesin, $idDivisi){
        try {
            $selectPo = PurchaseOrder::where('id', $idPo)->first();
            $getDataDivisi = MasterDivisi::where('id_mesin', $selectPo['id_type_mesin'])
                                         ->where('id', $idDivisi)->get();

            for ($a=0; $a<count($getDataDivisi); $a++){
                $getDataListStaging = MasterChecklistStaging::where('id_mesin', $selectPo['id_type_mesin'])
                                                            ->where('id_divisi', $idDivisi)->get();

                $dataList = [];
                for($b=0; $b<count($getDataListStaging); $b++){
                    $dataList[$b] = $getDataListStaging[$b];
                    $dataDetail = [];
                    $getDataDetail = TransaksiChecklistStaging::where('id_po', $idPo)
                                                            ->where('no_mesin', $idMesin)
                                                            ->where('id_divisi', $idDivisi)
                                                            ->where('id_checklist_staging', $getDataListStaging[$b]['id'])
                                                            ->first();

                    if (isset($getDataDetail['fill_columns'])) {
                        if ( str_contains($getDataDetail['result_details'], 'Dev. 1,2,3,4,5') ) {
                                $dataArray = json_decode($getDataDetail['fill_columns'], true);
                                $datas= [];

                                if (count($dataArray)> 0){
                                    for ($xx=0; $xx<count($dataArray); $xx++){
                                        $get_desc = MasterSettingPreStaging::where('id', $dataArray[$xx])->first();
                                        array_push($datas, $get_desc );
                                    }
                                    $getDataDetail['fill_columns'] = $datas;
                                }
                        } 

                        if (str_contains($getDataDetail['result_details'], 'VDisplay') 
                           OR str_contains($getDataDetail['result_details'], '1.Booting time: Min. Sec.')
                           OR str_contains($getDataDetail['result_details'], 'No problem the display status')
                        ) {
                            $dataArray = json_decode($getDataDetail['fill_columns'], true);
                            $datas= [];
                            if (isset($dataArray)){
                                if (count($dataArray)> 0){
                                    for ($yy=0; $yy<count($dataArray); $yy++){
                                        array_push($datas, $dataArray[$yy] );
                                    }
                                    $getDataDetail['fill_columns'] = $datas;
                                }
                            }
                        }

                        if ( str_contains($getDataDetail['result_details'], 'BCU: BCU20') ) {
                            $get_desc = MasterSettingPreStaging::where('id', $getDataDetail['fill_columns'])->first();
                            $getDataDetail['fill_columns'] = $get_desc;
                        }
                    } else {
                        $getDataDetail['fill_columns'] = null;
                    }

                    $getDataDetail['action'] = isset($getDataDetail['action']) ? MasterSettingPreStaging::where('id', $getDataDetail['action'])->first() : null;
                    $getDataDetail['problem'] = isset($getDataDetail['problem']) ? MasterSettingPreStaging::where('id', $getDataDetail['problem'])->first() : null;
                    $getDataDetail['remark'] = isset($getDataDetail['remark']) ? MasterSettingPreStaging::where('id', $getDataDetail['remark'])->first() : null;

                    if ($getDataDetail){ 
                        $dataList[$b]['detail_staging'] = $getDataDetail; 
                    } else { 
                        $dataList[$b]['detail_staging'] = []; 
                    }
                }
                $getDataDivisi[$a]['checklistStaging'] = $dataList;
            }

            return response()->json([
                    'success' => true,
                    'data' => $getDataDivisi  
                ]);

        } catch(\Illuminate\Database\QueryException $ex) {
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    // function for export to excel / pdf data by idPo 
    function getDataChecklistStagingReport($idPo, $idMesin){

        try {
            $selectPo = PurchaseOrder::where('id', $idPo)->first();
            $getDataDivisi = MasterDivisi::where('id_mesin', $selectPo['id_type_mesin'])->get();

            for ($a=0; $a<count($getDataDivisi); $a++){

                $getDataListStaging = MasterChecklistStaging::where('id_mesin', $selectPo['id_type_mesin'])->
                                                              where('id_divisi', $getDataDivisi[$a]['id'])->get();

                $dataList = [];
                for ($b=0; $b<count($getDataListStaging); $b++){
                    $dataList[$b] = $getDataListStaging[$b];
                    $dataDetail = [];

                    $getDataDetail = TransaksiChecklistStaging::where('id_po', $idPo)->
                                                                where('no_mesin', $idMesin)->
                                                                where('id_checklist_staging', $dataList[$b]['id'])->first();

                    if (isset($getDataDetail['fill_columns'])){
                        if ( str_contains($getDataDetail['result_details'], 'Dev. 1,2,3,4,5') ){
                            $dataArray = json_decode($getDataDetail['fill_columns'], true);
                            $datas= [];

                            
                            if (count($dataArray)> 0){
                                for ($xx=0; $xx<count($dataArray); $xx++){
                                    $get_desc = MasterSettingPreStaging::where('id', $dataArray[$xx])->first();
                                    array_push($datas, $get_desc );
                                }
                                $getDataDetail['fill_columns'] = $datas;
                            }

                        }

                        if ( str_contains($getDataDetail['result_details'], 'VDisplay') 
                            OR str_contains($getDataDetail['result_details'], '1.Booting time: Min. Sec.') ) {
                                $dataArray = json_decode($getDataDetail['fill_columns'], true);
                                $datas= [];

                                if (isset($dataArray)){
                                    if (count($dataArray)> 0){
                                        for ($yy=0; $yy<count($dataArray); $yy++){
                                            array_push($datas, $dataArray[$yy] );
                                        }
                                        $getDataDetail['fill_columns'] = $datas;
                                    }
                                }
                        }

                         if ( str_contains($getDataDetail['result_details'], 'BCU: BCU20') ) {
                            $get_desc = MasterSettingPreStaging::where('id', $getDataDetail['fill_columns'])->first();
                            $getDataDetail['fill_columns'] = $get_desc;
                        }

                    } else {
                        $getDataDetail['fill_columns'] = null;
                    }

                    $getDataDetail['action'] = isset($getDataDetail['action']) ? MasterSettingPreStaging::where('id', $getDataDetail['action'])->first() : null;
                    $getDataDetail['problem'] = isset($getDataDetail['problem']) ? MasterSettingPreStaging::where('id', $getDataDetail['problem'])->first() : null;
                    $getDataDetail['remark'] = isset($getDataDetail['remark']) ? MasterSettingPreStaging::where('id', $getDataDetail['remark'])->first() : null;

                    if ($getDataDetail){ 
                        $dataList[$b]['detail_staging'] = $getDataDetail; 
                    } else { 
                        $dataList[$b]['detail_staging'] = []; 
                    }

                }
                $getDataDivisi[$a]['checklistStaging'] = $dataList;

                $getStatusChecklist = TransaksiChecklistStaging::where('id_po', $idPo)
                                                               ->where('no_mesin', $idMesin)
                                                               ->where('id_divisi', $getDataDivisi[$a]->id)
                                                               ->count();

                if ($getStatusChecklist>0) { $getDataDivisi[$a]['checklist_staging'] = true; } 
                else { $getDataDivisi[$a]['checklist_staging'] = false; }
            }

            $datas = [
                'detail_po' => $selectPo,
                'data_checklist' => $getDataDivisi
            ];

            return response()->json([
                        'success' => true,
                        'data' => $datas
                    ]);

        } catch(\Illuminate\Database\QueryException $ex) {
            return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }

    }


    //-----------------------------------------------------------------------
    // update notes sn number and po

    function updateNotesByIdPo($idPo, $idMesin, Request $request){
        $query = 'update crt_'.$idPo.' set NOTES = \''.$request->note_description.'\''.' where id = '.$idMesin;
        $updateNotesMesin = DB::statement($query);

        if ($updateNotesMesin){
            return response()->json([
                'success' => true,
                'message' => 'Update Notes SN Mesin was successfully'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Update Notes SN Mesin Errors.'
            ], 400); 
        }
    }

    function getNotesByIdPoIdMesin($idPo, $idMesin){
        $query = 'select NOTES from crt_'.$idPo.' where id ='.$idMesin;
        $exec = DB::select($query);

        if ($exec){
            return response()->json([
                'success' => true,
                'data' =>  $exec[0]->NOTES
            ], 200);
        }
    }

    //-----------------------------------------------------------------------

    // --- integration to My-Datindo 
    function getALSNMesinByModelAndType(){
        $po = PurchaseOrder::get();
        
        $data=[];
        for ($j=0; $j<count($po); $j++){
            
            $masterPart = MasterPart::where('id_mesin', $po[$j]['id_type_mesin'])
                                  ->whereIn('part_column', ['ATM_MESIN','CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN'])
                                  ->first();

            $column_name = $masterPart['part_column'];
            $q1 = 'select '.$column_name.' as sn_mesin, id from crt_'.$po[$j]['id'].' where '.$column_name.' is not null';
            $getSNMesin = DB::select($q1);

            if ($getSNMesin != []){
                array_push($data, $getSNMesin);
            }
        }

         return response()->json([
                    'success' => true,
                    'data' => $data
            ], 200);
    }

    private $export_headers = ['Po No','Po Date','Po Status','Customer','Total','Amount','Model','Type','Brand','Batch','Part Number System','Production Year','Warehouse','Entry Date','Staging Date','PIC Staging','Machine Status'];
    public function exportToPdf(){
        $po = PurchaseOrder::where('deleted_at', '=', NULL)->orderBy('id', 'desc')->get();
        foreach($po as $i => $v){
            $getMesin = MasterMesin::where('id', $po[$i]->id_type_mesin)->first();
            $getGudang = MasterGudang::where('id', $po[$i]->nama_gudang)->first();
            $getCustomer = MasterCustomer::where('id', $po[$i]->customer)->first();
            $getModel = Models::where('id', $po[$i]->model)->first();
            $getPic = PicMitra::where('id', $po[$i]->pic_staging)->first();
            $getBatch = Bacth::where('id', $po[$i]->batch)->first();

            $getWarehouseTf = WarehouseTransfer::where('id_po', '=', $po[$i]->id)->get();
            if (count($getWarehouseTf) >0){
                $getCountJumlahTf = WarehouseTransfer::where('id_po', '=', $po[$i]->id)->sum('jumlah');
                $po[$i]['total_transfer'] = (int) $getCountJumlahTf; 
            } else {
                $po[$i]['total_transfer'] = 0; 
            }

            $po[$i]['mesin'] = $getMesin;
            $po[$i]['gudang'] = $getGudang;
            $po[$i]['customer'] = $getCustomer;
            $po[$i]['model'] = $getModel;
            $po[$i]['pic_staging'] = $getPic;
            $po[$i]['batch'] = $getBatch;
            $po[$i]['tahun_produksi'] = Carbon::parse($v->tahun_produksi)->format('F-Y');
            $po[$i]['tgl_po'] = Carbon::parse($v->tgl_po)->format('d-F-Y');

            $tgl_staging = (bool) strtotime($v->tgl_staging);
            if($tgl_staging){
                $po[$i]['tgl_staging'] = Carbon::parse($v->tgl_staging)->format('d-F-Y');
            }

            $tgl_masuk = (bool) strtotime($v->tgl_masuk);
            if($tgl_masuk){
                $po[$i]['tgl_masuk'] = Carbon::parse($v->tgl_masuk)->format('d-F-Y');
            }
        }

        $date = Carbon::now()->format('d F Y');
        $pdf = PDF::loadView('pdf.purchase_order',compact('po','date'))->setPaper('a4', 'landscape');    
        return $pdf->download('purchase_order.pdf');
    }

    public function exportToExcel(){
        $po = PurchaseOrder::where('deleted_at', '=', NULL)->orderBy('id', 'desc')->get();
        $data = [];
        foreach($po as $i => $v){
            $data[$i] = [];

            $getMesin = MasterMesin::where('id', $po[$i]->id_type_mesin)->first();
            $getGudang = MasterGudang::where('id', $po[$i]->nama_gudang)->first();
            $getCustomer = MasterCustomer::where('id', $po[$i]->customer)->first();
            $getModel = Models::where('id', $po[$i]->model)->first();
            $getPic = PicMitra::where('id', $po[$i]->pic_staging)->first();
            $getBatch = Bacth::where('id', $po[$i]->batch)->first();

            $data[$i]['no_po'] = $v->no_po;
            $data[$i]['tgl_po'] = $v->tgl_po;
            $data[$i]['status_po'] = $v->status_po;
            $data[$i]['customer'] = $getCustomer ? $getCustomer->bank_desc : "";
            $data[$i]['total'] = $v->jumlah;
            $data[$i]['jumlah'] = $v->jumlah;
            $data[$i]['model'] = $getModel ? $getModel->name : "";
            $data[$i]['mesin'] = $getMesin ? $getMesin->type : "";
            $data[$i]['brand'] = $v->brand;
            $data[$i]['batch'] = $getBatch ? $getBatch->name : "";
            $data[$i]['part_number'] = $v->part_number;
            $data[$i]['tahun_produksi'] =  Carbon::parse($v->tahun_produksi)->format('F-Y');
            $data[$i]['gudang'] = $getGudang ? $getGudang->gudang_desc : "";

            $tgl_masuk = (bool) strtotime($v->tgl_masuk);
            $data[$i]['tgl_masuk'] = $v->tgl_masuk;
            if($tgl_masuk){
                $data[$i]['tgl_masuk'] = Carbon::parse($v->tgl_masuk)->format('d-F-Y');
            }

            $tgl_staging = (bool) strtotime($v->tgl_staging);
            $data[$i]['tgl_staging'] = $v->tgl_staging;
            if($tgl_staging){
                $data[$i]['tgl_staging'] = Carbon::parse($v->tgl_staging)->format('d-F-Y');
            }
            
            $data[$i]['pic'] = $getPic ? $getPic->name : "";
            $data[$i]['status_mesin'] = $v->status_mesin;
        }

        $date = Carbon::now()->format('d F Y');
        $export = new PurchaseOrderExport($data);
        $export->setHeaders($this->export_headers);

        return Excel::download($export, 'purchase_order.xlsx');
    }

    // ------------ filter for data summary -------------------------------------
    function getDataSummary($idPoMaster, $type){
        if ($type == 'OldMachine'){
            if ($idPoMaster !== 'null'){
                $getDatas = PurchaseOrder::where('id_po_master', $idPoMaster)->where('status_mesin', 'Old Machine')->get();
            } else {
                $getDatas = PurchaseOrder::where('status_mesin', 'Old Machine')->get();
            }
        } else if ($type == 'NewMachine'){

            if ($idPoMaster !== 'null'){
                $getDatas = PurchaseOrder::where('id_po_master', $idPoMaster)->where('status_mesin', 'New Machine')->get();
            } else {
                $getDatas = PurchaseOrder::where('status_mesin', 'New Machine')->get();
            }
        }

        for ($aa=0; $aa< count($getDatas); $aa++){
            $getCustomer = MasterCustomer::where('id', $getDatas[$aa]->customer)->first();
            $getMesin = MasterMesin::where('id', $getDatas[$aa]->id_type_mesin)->first();
            $getGudang = MasterGudang::where('id', $getDatas[$aa]->nama_gudang)->first();
            $getModel = Models::where('id', $getDatas[$aa]->model)->first();
            $getPic = PicMitra::where('id', $getDatas[$aa]->pic_staging)->first();
            $getBatch = Bacth::where('id', $getDatas[$aa]->batch)->first();
            $getPoMaster = MasterPo::where('id', $getDatas[$aa]->id_po_master)->first();

            $getDatas[$aa]['customer'] = $getCustomer;
            $getDatas[$aa]['mesin'] = $getMesin;
            $getDatas[$aa]['gudang'] = $getGudang;
            $getDatas[$aa]['model'] = $getModel;
            $getDatas[$aa]['pic_staging'] = $getPic;
            $getDatas[$aa]['batch'] = $getBatch;
            $getDatas[$aa]['po_master'] = $getPoMaster;

        }

        if ($getDatas){
            return response()->json([
                'success' => true,
                'totalDatas' => count($getDatas),
                'data' => $getDatas
            ]);
        }
    }


    function getDataSummaryPO($idCustomer, $idWarehouse, $idModel, $idPoMaster, $type){
        if ($idCustomer == 'null' && $idWarehouse == 'null' && $idModel == 'null' && $idPoMaster == 'null'){
            
            $getDatas = PurchaseOrder::where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')->get();
            
        } else if ($idCustomer != 'null' && $idWarehouse == 'null' && $idModel == 'null' && $idPoMaster == 'null'){
            
            $getDatas = PurchaseOrder::where('customer', $idCustomer)
                                        ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')->get();

        } else if ($idCustomer != 'null' && $idWarehouse != 'null' && $idModel == 'null' && $idPoMaster == 'null'){
            
            $getDatas = PurchaseOrder::where('customer', $idCustomer)
                                        ->where('nama_gudang', $idWarehouse)
                                        ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')->get();
        
        } else if ($idCustomer != 'null' && $idWarehouse != 'null' && $idModel != 'null' && $idPoMaster == 'null'){

            $getDatas = PurchaseOrder::where('customer', $idCustomer)
                                        ->where('nama_gudang', $idWarehouse)
                                        ->where('id_type_mesin', $idModel)
                                        ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')->get();

        } else if ($idCustomer != 'null' && $idWarehouse != 'null' && $idModel != 'null' && $idPoMaster != 'null'){
            
            $getDatas = PurchaseOrder::where('customer', $idCustomer)
                                        ->where('nama_gudang', $idWarehouse)
                                        ->where('id_type_mesin', $idModel)
                                        ->where('id_po_master', $idPoMaster)
                                        ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')->get();

        } else if ($idCustomer == 'null' && $idWarehouse == 'null' && $idModel == 'null' && $idPoMaster != 'null'){

            $getDatas = PurchaseOrder::where('id_po_master', $idPoMaster)
                                    ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')->get();

        } else if ($idCustomer == 'null' && $idWarehouse == 'null' && $idModel != 'null' && $idPoMaster == 'null'){ 

            $getDatas = PurchaseOrder::where('id_type_mesin', $idModel)
                                    ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')->get();

        } else if ($idCustomer == 'null' && $idWarehouse != 'null' && $idModel == 'null' && $idPoMaster == 'null'){ 

            $getDatas = PurchaseOrder::where('nama_gudang', $idWarehouse)
                                    ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')->get();

        } else if ($idCustomer == 'null' && $idWarehouse != 'null' && $idModel == 'null' && $idPoMaster != 'null'){ 

            $getDatas = PurchaseOrder::where('nama_gudang', $idWarehouse)
                                    ->where('id_po_master', $idPoMaster)
                                    ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')->get();

        } else if ($idCustomer != 'null' && $idWarehouse == 'null' && $idModel == 'null' && $idPoMaster != 'null'){

            $getDatas = PurchaseOrder::where('customer', $idCustomer)
                                    ->where('id_po_master', $idPoMaster)
                                    ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')->get();

        } else if ($idCustomer == 'null' && $idWarehouse == 'null' && $idModel != 'null' && $idPoMaster != 'null'){

            $getDatas = PurchaseOrder::where('id_type_mesin', $idModel)
                                    ->where('id_po_master', $idPoMaster)
                                    ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')->get();

        } else if ($idCustomer != 'null' && $idWarehouse == 'null' && $idModel != 'null' && $idPoMaster = 'null'){

            $getDatas = PurchaseOrder::where('customer', $idCustomer)
                                    ->where('id_type_mesin', $idModel)
                                    ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')->get();

        } else if ($idCustomer != 'null' && $idWarehouse != 'null' && $idModel == 'null' && $idPoMaster != 'null'){

            $getDatas = PurchaseOrder::where('customer', $idCustomer)
                                    ->where('nama_gudang', $idWarehouse)
                                    ->where('id_po_master', $idPoMaster)
                                    ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')->get();

        }

        for ($aa =0; $aa< count($getDatas); $aa++){
            $getCustomer = MasterCustomer::where('id', $getDatas[$aa]->customer)->first();
            $getDatas[$aa]['customer'] = $getCustomer;

            $getGudang = MasterGudang::where('id', $getDatas[$aa]->nama_gudang)->first();
            $getDatas[$aa]['gudang'] = $getGudang;

            $getModel = Models::where('id', $getDatas[$aa]->model)->first();
            $getDatas[$aa]['model'] = $getModel;

            $getPoMaster = MasterPo::where('id', $getDatas[$aa]->id_po_master)->first();
            $getDatas[$aa]['po_master'] = $getPoMaster;

            $getMesin = MasterMesin::where('id', $getDatas[$aa]->id_type_mesin)->first();
            $getDatas[$aa]['mesin'] = $getMesin;
        }

        if ($getDatas){
            return response()->json([
                'success' => true,
                'totalDatas' => count($getDatas),
                'data' => $getDatas
            ]);
        }

    }

    function getDataWarehouseByCustomer($idCustomer, $type){

        $selectPo = PurchaseOrder::select('nama_gudang')
                        ->where('customer', $idCustomer)
                        ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')
                        ->distinct()->get();

        if ($selectPo){
            $datas = [];

            for ($i=0; $i< count($selectPo); $i++){
                $getGudang = MasterGudang::where('id', $selectPo[$i]->nama_gudang)->first();
                $datas[$i] = $getGudang;
            }

            return response()->json([
                'success' => true,
                'totalDatas' => count($datas),
                'data' => $datas
            ]);
        }
    }

    function getDataModelByCustomerWarehouse($idCustomer, $idWarehouse, $type){
        $selectPo =  PurchaseOrder::select('id_type_mesin')
                            ->where('customer', $idCustomer)
                            ->where('nama_gudang', $idWarehouse)
                            ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')
                            ->distinct()->get();

        if ($selectPo){
            $datas = [];

            for ($i=0; $i< count($selectPo); $i++){
                $getModel = MasterMesin::where('id', $selectPo[$i]->id_type_mesin)->first();
                $datas[$i] = $getModel;
            }

            return response()->json([
                'success' => true,
                'totalDatas' => count($datas),
                'data' => $datas
            ]);
        }
    }

    function getDataPoByCustWarehouseModel($idCustomer, $idWarehouse, $idModel, $type){
        $selectPo = PurchaseOrder::select('id_po_master')
                            ->where('customer', $idCustomer)
                            ->where('nama_gudang', $idWarehouse)
                            ->where('id_type_mesin', $idModel)
                            ->where('status_mesin', $type == 'OldMachine' ? 'Old Machine' : 'New Machine')
                            ->get();

        if ($selectPo){
            $datas = [];

            for ($i=0; $i<count($selectPo); $i++){
                $getPoMaster = MasterPo::where('id', $selectPo[$i]->id_po_master)->first();
                $datas[$i] =$getPoMaster; 
            }

            return response()->json([
                'success' => true,
                'totalDatas' => count($datas),
                'data' => $datas
            ]);
        }
    }

    function getTemplateStagingFormat($idPo){
        $selectPo = PurchaseOrder::where('id', $idPo)->first();

        $tableColumns = Schema::getColumnListing('crt_'.$idPo);
        $hiddenColumns = ['id', 'ATM_MESIN', 'CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN', 'NOTES'];
        $columns = array_diff($tableColumns, $hiddenColumns);
        $dataColumn = array_values($columns);

        $array_column = array();
        $query1 = 'select * from mst_part_number where part_column IN (';
        for ($a =0; $a<count($dataColumn); $a++){
            if ($a === count($dataColumn)-1){
                $query1 .= '\''.$dataColumn[$a].'\'';
            } else {
                $query1 .= '\''.$dataColumn[$a].'\',';
            }
        }
        $query1 .=') and id_mesin ='.$selectPo->id_type_mesin.' order by position asc';
        $datas = DB::select($query1);

        $dataBarcode = [];

        for ($b=0; $b< $selectPo['jumlah']; $b++){ 
            $datax = [];
            for ($c=0; $c<count($dataColumn); $c++){
                $selectColumn = 'select '.$dataColumn[$c].' from crt_'.$idPo.' where id = '.($b+1);

                $columnName = (String)$dataColumn[$c];
                $getBarcode = DB::select($selectColumn)[0]->$columnName;

                $datax[$columnName] = $getBarcode;
            }
            $dataBarcode[$b] = $datax;
        } 

        return response()->json([
            'success' => true,
            'totalDatas' => count($dataBarcode),
            'data_columns' => $datas, 
            'data_barcode' => $dataBarcode
        ]);
    }
}