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
use App\Models\PicTSS;
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
use App\Models\TransaksiSpesifikasiMesin;
use App\Models\TransaksiChecklistStagApproval;
use App\Models\MasterStyle;
use App\Models\PurchaseOrderHistoryCopyFromDummy;
use App\Models\MasterStatusPo;
use App\Models\MasterTypeValuesChecklist;

class PurchaseOrderController extends Controller
{
    public function index($user_login)
    {
        // Get user information
        $user = User::where('id', $user_login)->first();
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }
        
        // Build base query
        $query = PurchaseOrder::where('deleted_at', null);
        
        // Apply customer filter for GUEST_BANK users
        if ($user->roles === 'GUEST_BANK') {
            $query->where('customer', $user->id_customer);
        }
        
        // Get purchase orders
        $purchaseOrders = $query->orderBy('id', 'desc')->get();
        
        // Initialize array to hold processed data
        $processedData = [];
        
        // Cache frequent queries to improve performance
        $cachedQueries = [
            'machines' => [],
            'warehouses' => [],
            'customers' => [],
            'models' => [],
            'pics' => [],
            'batches' => [],
            'poMasters' => [],
            'styles' => [],
            'statusPos' => []
        ];
        
        // Process each purchase order
        foreach ($purchaseOrders as $po) {

            // Get machine data with caching
            if (!isset($cachedQueries['machines'][$po->id_type_mesin])) {
                $cachedQueries['machines'][$po->id_type_mesin] = MasterMesin::where('id', $po->id_type_mesin)->first();
            }
            $getMesin = $cachedQueries['machines'][$po->id_type_mesin];
            
            // Get warehouse data with caching
            if (!isset($cachedQueries['warehouses'][$po->nama_gudang])) {
                $cachedQueries['warehouses'][$po->nama_gudang] = MasterGudang::where('id', $po->nama_gudang)->first();
            }
            $getGudang = $cachedQueries['warehouses'][$po->nama_gudang];
            
            // Get customer data with caching
            if (!isset($cachedQueries['customers'][$po->customer])) {
                $cachedQueries['customers'][$po->customer] = MasterCustomer::where('id', $po->customer)->first();
            }
            $getCustomer = $cachedQueries['customers'][$po->customer];
            
            // Get model data with caching
            if (!isset($cachedQueries['models'][$po->model])) {
                $cachedQueries['models'][$po->model] = Models::where('id', $po->model)->first();
            }
            $getModel = $cachedQueries['models'][$po->model];
            
            // Get pic data with caching
            if (!isset($cachedQueries['pics'][$po->pic_staging])) {
                $cachedQueries['pics'][$po->pic_staging] = PicMitra::where('id', $po->pic_staging)->first();
            }
            $getPic = $cachedQueries['pics'][$po->pic_staging];
            
            // Get batch data with caching
            if (!isset($cachedQueries['batches'][$po->batch])) {
                $cachedQueries['batches'][$po->batch] = Bacth::where('id', $po->batch)->first();
            }
            $getBatch = $cachedQueries['batches'][$po->batch];
            
            // Get PO master data with caching
            if (!isset($cachedQueries['poMasters'][$po->id_po_master])) {
                $cachedQueries['poMasters'][$po->id_po_master] = MasterPo::where('id', $po->id_po_master)->first();
            }
            $getPoMaster = $cachedQueries['poMasters'][$po->id_po_master];
            
            // Get style data with caching
            if (!isset($cachedQueries['styles'][$po->style])) {
                $cachedQueries['styles'][$po->style] = MasterStyle::where('id', $po->style)->first();
            }
            $getStyle = $cachedQueries['styles'][$po->style];
            
            // Get status PO data with caching
            if (!isset($cachedQueries['statusPos'][$po->id_status_po])) {
                $cachedQueries['statusPos'][$po->id_status_po] = MasterStatusPo::where('id', $po->id_status_po)->first();
            }
            $getStatusPo = $cachedQueries['statusPos'][$po->id_status_po];
            
            // Calculate warehouse transfer data
            $totalTransfer = 0;
            $getWarehouseTf = WarehouseTransfer::where('id_po', $po->id)->get();
            
            if (count($getWarehouseTf) > 0) {
                // Use query builder for more efficient SQL
                $latestTransfers = DB::table('warehouse_transfer as wt')
                    ->select(
                        DB::raw('sum(wt.jumlah) as jml_mesin_tf'),
                        'wt.to_warehouse'
                    )
                    ->where('wt.id_po', $po->id)
                    ->whereRaw('wt.created_at = (
                        SELECT MAX(created_at) 
                        FROM warehouse_transfer 
                        WHERE id_po = ?
                    )', [$po->id])
                    ->groupBy('wt.to_warehouse')
                    ->get();
                
                if ($latestTransfers->isNotEmpty()) {
                    $latestTransfer = $latestTransfers->first();
                    if ($po->nama_gudang == $latestTransfer->to_warehouse) {
                        $totalTransfer = 0;
                    } else {
                        $totalTransfer = $latestTransfer->jml_mesin_tf;
                    }
                }
            }
            
            // Get outgoing count for dummy POs
            $totalOutgoing = 0;
            if ($po->id_status_po == 1) {
                $totalOutgoing = PurchaseOrderHistoryCopyFromDummy::where('from_id_po', $po->id)->count();
            }
            
            // Process SN machine data
            $snMachines = isset($po->sn_mesins) ? json_decode($po->sn_mesins, true) : [];
            
            // Determine SN machine column based on model name
            $modelName = $getModel ? $getModel->name : '';

            $columnSnMesin = $this->getSnMesinColumnName($modelName);
            
            // Get staging count
            $stagingCount = $this->getCountDataMesinStagingNoMinus($po->id, $columnSnMesin);
            
            // Get checklist count based on machine type
            $machineType = $getMesin ? $getMesin->type : '';
            $checklistCount = $machineType == "MV-400"
                ? $this->getCountDataMesinChecklistMv400($po->id)
                : $this->getCountDataMesinChecklist($po->id);
            
            // Get preloading inspection count
            $preloadingCount = $this->getCountDataMesinPreLoadingInspeksi($po->id);
            
            // Get copy from PO data
            $copyFromPo = null;
            if ($po->copy_from_id_po) {
                $copyFromPo = PurchaseOrder::whereId($po->copy_from_id_po)->first();
                if ($copyFromPo) {
                    $copyFromPo->style = isset($cachedQueries['styles'][$copyFromPo->style])
                        ? $cachedQueries['styles'][$copyFromPo->style]
                        : MasterStyle::where('id', $copyFromPo->style)->first();
                    
                    $copyFromPo->model = isset($cachedQueries['machines'][$copyFromPo->id_type_mesin])
                        ? $cachedQueries['machines'][$copyFromPo->id_type_mesin]
                        : MasterMesin::where('id', $copyFromPo->id_type_mesin)->first();
                }
            }
            
            // Create processed data object
            $processedPo = $po->toArray();
            $processedPo['total_transfer'] = $totalTransfer;
            $processedPo['total_keluar'] = $totalOutgoing;
            $processedPo['mesin'] = $getMesin;
            $processedPo['gudang'] = $getGudang;
            $processedPo['customer'] = $getCustomer;
            $processedPo['model'] = $getModel;
            $processedPo['pic_staging'] = $getPic;
            $processedPo['batch'] = $getBatch;
            $processedPo['po_master'] = $getPoMaster;
            $processedPo['style'] = $getStyle;
            $processedPo['status_po_details'] = $getStatusPo;
            $processedPo['copy_from_po'] = $copyFromPo;
            $processedPo['sn_mesins'] = $snMachines;
            $processedPo['jml_mesin_staging'] = $stagingCount;
            $processedPo['jml_mesin_checklist'] = $checklistCount;
            $processedPo['jml_mesin_preloading'] = $preloadingCount;
            
            $processedData[] = $processedPo;
        }
        
        return response()->json([
            'success' => true,
            'totalDatas' => count($processedData),
            'data' => $processedData
        ]);
    }

    private function getSnMesinColumnName($modelName)
    {
        $columnMap = [
            'ATM' => 'ATM_MESIN',
            'ATMS' => 'ATM_MESIN',
            'CRM' => 'CRM_MESIN',
            'TCR' => 'TCR_MESIN',
            'CS KIOS' => 'CS_KIOS_MESIN',
            'VBK' => 'VBK_MESIN',
            'TTW' => 'ATM_MESIN',
            'CRMS' => 'CRM_MESIN'
        ];
        
        return $columnMap[$modelName] ?? 'NEW_MESIN';
    }

    function getCountDataMesinStagingNoMinus($idPo, $column_snMesin)
    {
        $qry1 = 'select count(*) as jml_mesin from crt_'.$idPo.' where '.$column_snMesin. ' IS NOT NULL';
        $get_jml_mesin = DB::select($qry1);

        return $get_jml_mesin[0]->jml_mesin;
    }

    function getCountDataMesinStaging($idPo, $column_snMesin)
    {
        $qry1 = 'select count(*) as jml_mesin from crt_'.$idPo.' where '.$column_snMesin. ' IS NOT NULL AND STATUS_MESIN IS NULL';
        $get_jml_mesin = DB::select($qry1);

        return $get_jml_mesin[0]->jml_mesin;
    }

    function getCountDataMesinChecklist($idPo)
    {
        $qry = 'select count( distinct (tcs.no_mesin)) as jml_mesin from transaksi_checklist_staging tcs where id_po = '.$idPo;
        $jml_mesin = DB::select($qry);
        return $jml_mesin[0]->jml_mesin;
    }

    function getCountDataMesinChecklistMv400($idPo)
    {
        $qry = 'select count( distinct (tcsm.no_mesin)) as jml_mesin from transaksi_checklist_stag_mv400 tcsm where id_po = '.$idPo;
        $jml_mesin = DB::select($qry);
        return $jml_mesin[0]->jml_mesin;
    }

    function getCountDataMesinPreLoadingInspeksi($idPo)
    {
        $qry = 'select count(distinct (ti.no_mesin)) as jml_mesin from transaksi_inspeksi ti where id_po ='.$idPo;
        $jml_mesin = DB::select($qry);
        return $jml_mesin[0]->jml_mesin;
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
            $query  = 'select * from tbl_po where date(tgl_po) < '.$dateTo;
            $getData = DB::statement($query);
        }

        for($j = 0; $j < count($getData); $j++){
            $getWarehouseTf = WarehouseTransfer::where('id_po', '=', $getData[$j]->id)->get();
            if (count($getWarehouseTf) >0){
                $getCountJumlahTf               = WarehouseTransfer::where('id_po', '=', $getData[$j]->id)->sum('jumlah');
                $getData[$j]['total_transfer']  = (int) $getCountJumlahTf; 
            } else {
                $getData[$j]['total_transfer'] = 0; 
            }

            $getMesin       = MasterMesin::where('id', $getData[$j]->id_type_mesin)->first();
            $getGudang      = MasterGudang::where('id', $getData[$j]->nama_gudang)->first();
            $getCustomer    = MasterCustomer::where('id', $getData[$j]->customer)->first();
            $getModel       = Models::where('id', $getData[$j]->model)->first();
            $getPic         = PicMitra::where('id', $getData[$j]->pic_staging)->first();
            $getBatch       = Bacth::where('id', $getData[$j]->batch)->first();

            $getData[$j]['mesin']       = $getMesin;
            $getData[$j]['gudang']      = $getGudang;
            $getData[$j]['customer']    = $getCustomer;
            $getData[$j]['model']       = $getModel;
            $getData[$j]['pic_staging'] = $getPic;
            $getData[$j]['batch']       = $getBatch;
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
            $getMesin       = MasterMesin::where('id', $this->po[$i]->id_type_mesin)->first();
            $getGudang      = MasterGudang::where('id', $this->po[$i]->nama_gudang)->first();
            $getCustomer    = MasterCustomer::where('id', $this->po[$i]->customer)->first();
            $getModel       = Models::where('id', $this->po[$i]->model)->first();
            $getPic         = PicMitra::where('id', $this->po[$i]->pic_staging)->first();
            $getBatch       = Bacth::where('id', $this->po[$i]->batch)->first();

            $this->po[$i]['mesin']          = $getMesin;
            $this->po[$i]['gudang']         = $getGudang;
            $this->po[$i]['customer']       = $getCustomer;
            $this->po[$i]['model']          = $getModel;
            $this->po[$i]['pic_staging']    = $getPic;
            $this->po[$i]['batch']          = $getBatch;
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
            $po['model']         = Models::where('id', $po->model)->first();
            $po['gudang']        = MasterGudang::where('id', $po->nama_gudang)->first();
            $po['customer']      = MasterCustomer::where('id', $po->customer)->first();
            $po['pic_staging']   = PicMitra::where('id', $po->pic_staging)->first();
            $po['mesin']         = MasterMesin::where('id', $po->id_type_mesin)->first();
            $po['batch']         = Bacth::where('id', $po->batch)->first();
            $po['style']         = MasterStyle::where('id', $po->style)->first();

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

        $from_id_po_dummy = $input['copy_from_id_po'] != "null" ? $input['copy_from_id_po'] : null;
        $get_snMesin_from_dummy = $input['sn_mesins'] ? json_decode($input['sn_mesins'], true) : null;
        // Proses copy SN part number ke PO Valid 

        $check_col_mesin    = MasterPart::where('id_mesin', $input['id_type_mesin'])->where('types', 'PART_MESIN')->exists();
        $check_col_part     = MasterPart::where('id_mesin', $input['id_type_mesin'])->where('types', 'MESIN')->exists();
        
        if (!$check_col_mesin OR !$check_col_part){
            $mst_mesin = MasterMesin::whereId($input['id_type_mesin'])->first();
            return response()->json([
                "success" => false,
                "message" => "Silahkan untuk melakukan Registrasi Part Number untuk mesin ".$mst_mesin->type 
            ], 400);
        }

        $check_type_model = '
            select x.* from (
                    select m.id as id_types, 
                        m.name as types, 
                        mm.id as id_model, 
                        mm.type as models
                        from models m, mst_mesin mm where mm.model = m.id 
                    ) x 
                    where x.id_types = '.$input['model'].' and x.id_model = '.$input['id_type_mesin'].'';
        
        $check_exists = DB::select($check_type_model);

        if (!$check_exists){
            return response()->json([
                "success" => false,
                "message" => "Staging Registration PO was Error !! Please check Types and Models.",
            ], 400);
        }
        
        $check_type = Models::select('name')->where('id', $input['model'])->first()['name'];
        $check_bca  = $input['customer']; // check id untuk Customer BCA adalah = 3

        $validator = Validator::make($input, ['jumlah' => 'required']);
        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        
        try{

            if ($input['sn_mesins'] == "[]"){
                $format_snMesin = NULL;
            } else {
                $format_snMesin =  str_replace("\\", "", $input['sn_mesins']);
            }
            $input['sn_mesins'] = $format_snMesin;

            $po = PurchaseOrder::create($input);
            $idMesin = $request->input('id_type_mesin');

            if ($po){
                $idStaging = $po->id;
                $getPartMesin = DB::select('select * from mst_part_number where id_mesin = :id_mesin and status=1 and deleted_at IS NULL', ['id_mesin' => $idMesin]);

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
                     if ( !in_array($dataArray[$i], ['ATM_MESIN','CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN', 'NEW_MESIN'])){
                        if (  ($check_type == 'ATM' OR $check_type == 'CRM') AND  $check_bca == 3 ){
                            $sql .= $dataArray[$i]." varchar(50), ".$dataArray[$i]."_PN varchar(50),".$dataArray[$i]."_PM varchar(100),".$dataArray[$i]."_PARTNAME varchar(100),";
                        } else {
                            $sql .= $dataArray[$i]." varchar(50), ".$dataArray[$i]."_PN varchar(50),".$dataArray[$i]."_PM varchar(100),";
                        }
                     } else {
                         $sql .= $dataArray[$i]." varchar(50), ";
                     }
                }
                $sql .= "NO_BARIS_MESIN int(5), NOTES varchar(250), TIME_STAGING varchar(25), TIME_PRELOADING varchar(25), TIME_CHECKLIST varchar(25), STATUS_MESIN varchar(25),";

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

                $get_max_id = PurchaseOrder::max('id');
                $this->process_update_stagging($get_max_id);
                $this->set_default_cassete_ups($get_max_id, $check_type);
                $this->set_default_bca_part_name($get_max_id, $check_bca, $check_type);

                // copy sn mesin dari po dummy ke po valid 
                if ($get_snMesin_from_dummy != null && $from_id_po_dummy != null)
                {
                    $this->copy_dataMesin_from_poDummy($get_max_id, $from_id_po_dummy, $get_snMesin_from_dummy);
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

    // function untuk copy data staging dari po dummy ke po valid 
    function copy_dataMesin_from_poDummy($idPoTujuan, $idPoDummy, $dataMesinPoDummy)
    {
        // $getPartNumberDummy = 
        $tableColumns 	= Schema::getColumnListing('crt_'.$idPoDummy);
        $format_tableColumn = [];
        for ($xx=0; $xx< count($tableColumns); $xx++){
            if (!str_contains( $tableColumns[$xx], '_PN') && !str_contains( $tableColumns[$xx], '_PM') && !str_contains( $tableColumns[$xx], '_PARTNAME')){
                array_push($format_tableColumn, $tableColumns[$xx]);
            }
        }

        $hiddenColumns = ['id', 'ATM_MESIN', 'CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'NEW_MESIN', 
                                'VBK_MESIN', 'NOTES', 'TIME_STAGING', 'TIME_PRELOADING', 'TIME_CHECKLIST', 'NO_BARIS_MESIN', 'STATUS_MESIN'];

        $columns = array_diff($format_tableColumn, $hiddenColumns);
        $dataColumn = array_values($columns);

        for ($a=0; $a< count($dataMesinPoDummy); $a++){

            $id_mesin = $dataMesinPoDummy[$a]['idMesin'];
            $sn_mesin = $dataMesinPoDummy[$a]['snMesin'];

            for ($b=0; $b< count($dataColumn); $b++){
                $sql = 'select '.$dataColumn[$b].' as sn_part from crt_'.$idPoDummy.' where id = '.$id_mesin;
                $get_sn_part = DB::select($sql)[0]->sn_part;

                if ($get_sn_part != '' && $get_sn_part != null){
                    $copy_to_po_valid = 'update crt_'.$idPoTujuan.' set '.$dataColumn[$b].' = \''.$get_sn_part.'\' where id ='.($a+1);   //$id_mesin;
                    $process_update_part_mesin = DB::statement($copy_to_po_valid);
                }
            }
        }

        // copy scan barcode sn Mesin dari po dummy ke po valid 
        $check_po = PurchaseOrder::select('mdl.name')
                    ->join('models as mdl', 'tbl_po.model', '=', 'mdl.id')
                    ->where('tbl_po.id', $idPoDummy)
                    ->first();
        
        $column_snMesin = '';
        switch ($check_po['name']){
            case "ATM"      : $column_snMesin ='ATM_MESIN'; break;
            case "ATMS"     : $column_snMesin ='ATM_MESIN'; break;
            case "CRM"      : $column_snMesin ='CRM_MESIN'; break;
            case "TCR"      : $column_snMesin ='TCR_MESIN'; break;
            case "CS KIOS"  : $column_snMesin ='CS_KIOS_MESIN'; break;
            case "VBK"      : $column_snMesin ='VBK_MESIN'; break;
            case "TTW"      : $column_snMesin ='ATM_MESIN'; break;
            case "CRMS"     : $column_snMesin ='CRM_MESIN'; break;
            default : $column_snMesin ='NEW_MESIN';
        }

        for ($x=0; $x<count($dataMesinPoDummy); $x++){
            $id_mesin2 = $dataMesinPoDummy[$x]['idMesin'];
            $sn_mesin2 = $dataMesinPoDummy[$x]['snMesin'];

            $copy_sn_to_po_valid = 'update crt_'.$idPoTujuan.' set '.$column_snMesin.' = \''.$sn_mesin2.'\' where id ='.($x+1);   //$id_mesin2;
            DB::statement($copy_sn_to_po_valid); // process_update_sn_Mesin 

            //update status mesin di po dummy bahwa mesin sudah keluar 
            $sql2 = 'update crt_'.$idPoDummy.' set STATUS_MESIN = \'KELUAR\' where id ='.$id_mesin2;
            DB::statement($sql2); 

            // insert ke table history po 
            $sql3 = 'insert into tbl_po_history_dummy_to_valid (from_id_po, no_mesin, sn_mesin, to_id_po) 
                        VALUES (\''.$idPoDummy.'\',\''.$id_mesin2.'\',\''.$sn_mesin2.'\',\''.$idPoTujuan.'\')';
             
            DB::statement($sql3); // insert into table po history
        }
    }

    // function untuk update row Part_Number (_PN) di table staging
    function process_update_stagging($idPo){
        $tableColumns = Schema::getColumnListing('crt_'.$idPo);
        $select_po = PurchaseOrder::where('id', $idPo)->first();

        $format_tableColumn = [];
        $format_tableColumn2 = [];

         for ($xx=0; $xx< count($tableColumns); $xx++){
            if (str_contains( $tableColumns[$xx], '_PN')){
                array_push($format_tableColumn, $tableColumns[$xx]);

                $get_column = substr($tableColumns[$xx], 0, -3);
                array_push($format_tableColumn2, $get_column);         
            }
         }

         for ($yy=0; $yy< count($format_tableColumn); $yy++){

            $select_column = $format_tableColumn[$yy];

            $query1 = 'select part_no from mst_part_number where part_column =\''
                            .$format_tableColumn2[$yy].'\' and id_mesin = \''
                            .$select_po['id_type_mesin'].'\'';

            $get_partNumber = DB::select($query1);

            $qry_update_col_stag = 'update crt_'.$idPo.' set '.$format_tableColumn[$yy].' = \''.$get_partNumber[0]->part_no.'\'';
            $update_part_number = DB::statement($qry_update_col_stag);

         }
    }

    function set_default_cassete_ups($idPo, $type){
        $tableColumns = Schema::getColumnListing('crt_'.$idPo);
        $select_po = PurchaseOrder::where('id', $idPo)->first();

        $sql = 'select mpn.part_column
                    from mst_part_number mpn
                        where ( mpn.part_desc IN (\'CST 10\', \'CDU30_CST\', \'BRM20 RC\', \'RC30\', \'RC20\', \'BRM20 RJC\', \'CDU10_CST\', \'RC60\', \'UPS\')
                                or part_desc like \'%RJRT%\'
                                or part_desc like \'%RJC%\'
                                or part_desc like \'%UTC%\'
                                or part_desc like \'%RC%\' )
                        and mpn.id_mesin = '.$select_po['id_type_mesin'].'
                        order by mpn.id';
        
        $get_columns = DB::select($sql);

        $data_column = [];
        for ($x=0; $x < count($get_columns); $x++ ){
            $data_column[$x] = $get_columns[$x]->part_column;
        }
        for ($y=0; $y< count($tableColumns); $y++){
            if (str_contains( $tableColumns[$y], '_PM')){
                
                $check_column = substr($tableColumns[$y], 0, -3);
                
                if ( in_array($check_column, $data_column) ) {
                    $qry = '';
                    if ( !str_contains ($check_column, 'UPS')){
                        $qry = 'update crt_'.$idPo.' set '.$tableColumns[$y].' = \'Cartridge '.$type.'\'';
                    } else {
                        $qry = "update crt_".$idPo." set ".$tableColumns[$y].' = \'Vektor\'';
                    }
                    DB::statement($qry);
                }
            }
        }
    }

    function set_default_bca_part_name($idPo, $cust, $type){
        $tableColumns = Schema::getColumnListing('crt_'.$idPo);
        $select_po = PurchaseOrder::where('id', $idPo)->first();

        if ($cust == "3" && in_array($type, ['ATM', 'CRM'])){

            $sql = 'select x.part_column from 
                    ( select mpn.id, mpn.id_mesin, 
                    ( select m.type from mst_mesin m where m.id = mpn.id_mesin ) as model,
                    ( select m2.name from models m2 , mst_mesin msn 
                      where msn.model = m2.id 
                      and msn.id = mpn.id_mesin
                    ) as types, 
                    mpn.part_desc, 
                    mpn.part_column
                    from mst_part_number mpn
                    where ( mpn.part_desc IN (\'CST 10\', \'CDU30_CST\', \'BRM20 RC\', \'RC30\', \'RC20\', \'BRM20 RJC\', \'CDU10_CST\', \'RC60\')
                        or part_desc like \'%RJRT%\'
                        or part_desc like \'%RJC%\' 
                        or part_desc like \'%UTC%\'
                        or part_desc like \'%RC%\' )
                    ) x
                    where x.types IN (\'ATM\', \'CRM\')
                    and x.id_mesin = '.$select_po['id_type_mesin'];

            $get_columns = DB::select($sql);
            
            $data_column = [];
            for ($x=0; $x < count($get_columns); $x++ ){
                $data_column[$x] = $get_columns[$x]->part_column;
            }
            for ($y=0; $y< count($tableColumns); $y++){
                if (str_contains( $tableColumns[$y], '_PARTNAME')){
                    
                    $check_column = substr($tableColumns[$y], 0, -9);

                    if ( in_array($check_column, $data_column) ) {
                        $qry="";

                        if ( str_contains($check_column, 'CST') 
                            OR str_contains($check_column, 'RC30')
                            OR str_contains($check_column, 'RC20')
                            OR str_contains($check_column, 'RC60')
                            OR str_contains($check_column, 'RC') ) {

                            $qry = 'update crt_'.$idPo.' set '.$tableColumns[$y].' = \''.$type.' CASSETTE\'';
                        } else if ( str_contains($check_column, 'RJRT') 
                                        OR str_contains($check_column, 'RJC') ){

                            $qry = 'update crt_'.$idPo.' set '.$tableColumns[$y].' = \''.$type.' REJECT\'';
                        } else if ( str_contains($check_column, 'UTC') ) {

                            $qry = 'update crt_'.$idPo.' set '.$tableColumns[$y].' = \''.$type.' RETRACT\'';
                        }

                        DB::statement($qry);
                    }
                }
            }
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
            // $sql1 => untuk update serial number part/ SN PART
            $sql ="update crt_".$selectPo->id. " set ";
            for ($i =0; $i<count($data['data']); $i++){
                if ($i ==count($data['data'])-1){
                    if ($data['data'][$i]['scan_barcode'] == "" OR $data['data'][$i]['scan_barcode'] == "-"){ 
                        $sql .=  $data['data'][$i]['part_column'].' = NULL';
                    } else { 
                        $sql .=  $data['data'][$i]['part_column'].' = \''.$data['data'][$i]['scan_barcode'].'\''; 
                    }
                } else {
                    if ($data['data'][$i]['scan_barcode'] == "" OR $data['data'][$i]['scan_barcode'] == "-"){
                        $sql .=  $data['data'][$i]['part_column'].' = NULL, ';
                    } else {
                        $sql .=  $data['data'][$i]['part_column'].' = \''.$data['data'][$i]['scan_barcode'].'\''.', ';
                    }
                }
            }
            $sql .= ", NOTES = '1' where id = ".$rowNum;
            $update = DB::statement($sql);

            for ( $j=0; $j< count($data['data']); $j++ ){
                // $sq2 => update ketika ada perubahan pada part number
                $sql2 = "update crt_".$idPo." set ";

                if (isset($data['data'][$j]['part_no_from_stag_change'])){
                    $change_part_numb_to = $data['data'][$j]['part_no_from_stag_change'];
                    if ( $change_part_numb_to != null){
                        $sql2 .= $data['data'][$j]['part_column'].'_PN = \''.$change_part_numb_to.'\''.' where id >='.$rowNum;
                        $update_pn = DB::statement($sql2);
                    }
                }

                // update part model 
                if (isset($data['data'][$j]['part_model'])){
                    $set_part_model = $data['data'][$j]['part_model'];
                    $sql3 = "update crt_".$idPo." set ";
                    if ($set_part_model != null){
                        $sql3 .= $data['data'][$j]['part_column'].'_PM = \''.$set_part_model.'\' where id = '.$rowNum;
                        DB::statement($sql3);
                    }
                }
            }

            if ($update){
                return response()->json([
                    "success" => true,
                    "message" => "Berhasil Ubah Barcode untuk Mesin ke-".$rowNum,
                    "data" => $selectPo
                ]);
            }
        } catch(\Illuminate\Database\QueryException $ex) {
             // return response()->json(["errorMessage"=> $ex->getMessage()], 500);
            return response()->json([
                "success" => false,
                "message" => "Update SN Part Number Errors.",
                "errorCode" => $ex->errorInfo[0],  
                "errorMessage"=> $ex->getMessage()
            ], 400);
        }
    }

    // update SN Mesin 
    public function updateSNMesin($idPo, $rowNum, Request $request){
         try {
                $selectPo = PurchaseOrder::where('id', $idPo)->first();
                $masterPart = MasterPart::where('id_mesin', $selectPo['id_type_mesin'])
                                    ->whereIn('part_column', ['ATM_MESIN','CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN', 'NEW_MESIN'])->first();

                 $column_name = $masterPart['part_column'];
                 $q1 = 'update crt_'.$idPo.' set '.$column_name.' = \''.$request->input('sn_mesin').'\' where id ='.$rowNum;
                 $updateSNMesin = DB::statement($q1);

                 $check = 'select TIME_STAGING from crt_'.$idPo.' where id = '.$rowNum;
                 $execute = DB::select($check)[0]->TIME_STAGING;

                 if ($execute == null){
                    $q2 = 'update crt_'.$idPo.' set TIME_STAGING ="'.$request->input('time_todo').'" where id ='.$rowNum;
                    $updateTimeStaging = DB::statement($q2);
                 }

                 if($request->input('row_mesin') != null){
                    $q3 = 'update crt_'.$idPo.' set NO_BARIS_MESIN = '.$request->input('row_mesin').' where id ='.$rowNum;
                     DB::statement($q3);
                 }

                 if ($updateSNMesin){

                    // $url_datindo = 'https://dev.datindoku.com/apis/staging';
                    $url_datindo = env('URL_DATINDO');

                    // Change ID Machine local to ID Machine MyDatindo
                    $id_machine_local = $selectPo['id_type_mesin'];
                    $id_machine_mydatindo = MasterMesin::whereId($id_machine_local)->first();
                    $id_machine_mydatindo = $id_machine_mydatindo['id_mydatindo'];

                    $data1 = [
                        'serial_no' => $request->sn_mesin,
                        //'machine_model' => $selectPo['id_type_mesin']
                        'machine_model' => $id_machine_mydatindo
                    ];

                    $registerMesinBaru = $this->callAPI('POST', $url_datindo, $data1); // hit Registrasi Mesin Baru ke datindo 
                    $response = json_decode($registerMesinBaru, true);

                    $data_resp = [];

                    $data_resp[0]= [
                        'success' => true,
                        'message' => 'Update SN Mesin Berhasil. SN:'.$request->sn_mesin.'. ID Machine :'.$id_machine_mydatindo, 
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
          "key:".env('HEADER_KEY_DATINDO')
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
                                  ->whereIn('part_column', ['ATM_MESIN','CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN', 'NEW_MESIN'])->first();
            
            $column_name = $masterPart['part_column'];
            $q1 = 'select '.$column_name.' from crt_'.$idPo.' where id ='.$rowNum;

            $getSNMesin = DB::select($q1);
            $getWSInfo = MasterWSInfo::where('serial_number', $getSNMesin[0]->$column_name)->where('serial_number', '<>', NULL)->first();

            $q2 = 'select TIME_STAGING, NO_BARIS_MESIN from crt_'.$idPo.' where id ='.$rowNum;
            $get_data_from_staging = DB::select($q2)[0];

            $getTimeStagingMesin = $get_data_from_staging->TIME_STAGING;
            $getNoBarisMesin = $get_data_from_staging->NO_BARIS_MESIN;

            if( $getSNMesin ){
                return response()->json([
                            'success'           => true,
                            'sn_mesin'          => $getSNMesin[0]->$column_name, 
                            'ws_id'             => isset($getWSInfo) ? $getWSInfo['ws_id'] : null, 
                            'ws_name'           => isset($getWSInfo) ? $getWSInfo['ws_name'] : null, 
                            'ticket'            => isset($getWSInfo) ? $getWSInfo['ticket'] : null, 
                            'installation_date' => isset($getWSInfo) ? $getWSInfo['installation_date'] : null, 
                            'time_staging'      => isset($getTimeStagingMesin) ? $getTimeStagingMesin : null, 
                            'no_baris_mesin'    => isset($getNoBarisMesin) ? $getNoBarisMesin : null

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
             $selectPo 		= PurchaseOrder::where('id', $idPo)->first();
             $getCustomer 	= MasterCustomer::where('id', $selectPo['customer'])->first();
             $getmesinType 	= MasterMesin::where('id', $selectPo['id_type_mesin'])->first();
             $check_type    = Models::select('name')->where('id', $selectPo['model'])->first()['name'];

             $tableColumns 	= Schema::getColumnListing('crt_'.$idPo);

             $format_tableColumn = [];
             for ($xx=0; $xx< count($tableColumns); $xx++){
                if (!str_contains( $tableColumns[$xx], '_PN') && !str_contains( $tableColumns[$xx], '_PM') && !str_contains( $tableColumns[$xx], '_PARTNAME')){
                    array_push($format_tableColumn, $tableColumns[$xx]);
                }
             }

             $hiddenColumns = ['id', 'ATM_MESIN', 'CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'NEW_MESIN',
                                'VBK_MESIN', 'NOTES', 'TIME_STAGING', 'TIME_PRELOADING', 'TIME_CHECKLIST', 'NO_BARIS_MESIN', 'STATUS_MESIN'];

             $columns = array_diff($format_tableColumn, $hiddenColumns);
             $dataColumn = array_values($columns);

             $array_column = array();
            //  $query1 = 'select * from mst_part_number where part_column IN (';
            //  for ($a =0; $a<count($dataColumn); $a++){
            //     if ($a === count($dataColumn)-1){
            //         $query1 .= '\''.$dataColumn[$a].'\'';
            //     } else {
            //         $query1 .= '\''.$dataColumn[$a].'\',';
            //     }
            //  }
            //  $query1 .=') and id_mesin ='.$selectPo->id_type_mesin.' order by position IS NULL, position ASC';

            $query1 = '
            select x.* from (
                select distinct 
                mpn.part_desc, 
                mpn.id_mesin, 
                mpn.types, 
                mpn.part_column, 
                (select min(position) from mst_part_number xx where xx.part_column = mpn.part_column and xx.id_mesin = '.$selectPo->id_type_mesin.') position
                from mst_part_number mpn
                where part_column IN (';
                
            for ($a =0; $a<count($dataColumn); $a++){
                if ($a === count($dataColumn)-1){
                    $query1 .= '\''.$dataColumn[$a].'\'';
                } else {
                    $query1 .= '\''.$dataColumn[$a].'\',';
                }
            }

            $query1 .=') and id_mesin ='.$selectPo->id_type_mesin.' ) x  order by x.position IS NULL, x.position ASC';
             
            //' order by position asc'; //' order by part_column asc';
            // dd($query1);

             $datas = DB::select($query1);

            //  dd($datas);

             for ($i=0; $i<count($dataColumn); $i++){
                   $getBarcode 		= null;
                   $columnName 		= $datas[$i]->part_column;
                   $column_name 	= $columnName.'_PN';
                   $column_name2 	= $columnName.'_PM';
                   $column_name3 	= $columnName.'_PARTNAME';

                   $getBarcode 		= $this->getDataBarcode($idPo, $rowNum, $columnName);
                   $getPartNumber 	= $this->getPartNumberStaging($idPo, $rowNum, $column_name);
                   $getNoBarisMesin = $this->getNoBarisMesin($idPo, $rowNum, $column_name2);

                   if ($selectPo['customer'] == 3 && in_array($check_type, ['ATM', 'CRM'])){
                        $getPartName = $this->getPartname($idPo, $rowNum, $column_name3);
                   } else {
                        $getPartName = null;
                   }
                
                   $datas[$i]->scan_barcode 		= $getBarcode;
                   $datas[$i]->mesin_type   		= $getmesinType['type'];
                   $datas[$i]->bank_desc    		= $getCustomer['bank_desc'];
                   $datas[$i]->part_no_from_stag 	= $getPartNumber[0]->$column_name;
                   $datas[$i]->part_no_from_stag_change = null;
                   $datas[$i]->part_model 			= $getNoBarisMesin;
                   $datas[$i]->part_name            = $getPartName;
             }

            //  dd($datas);

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

    function getPartNumberStaging($idPo, $rowMesin, $columnName){
        $part_number = 'select '.$columnName.' from crt_'.$idPo.' where id = '.$rowMesin;  
        $pn_part = DB::select($part_number);
        return $pn_part;
    }

    function getNoBarisMesin($idPo, $rowMesin, $columnName){
        $part_m = 'select  '.$columnName.' from crt_'.$idPo.' where id = '.$rowMesin;  
        $part_model = DB::select($part_m)[0]->$columnName;
        return $part_model;
    }

    function getPartname($idPo, $rowMesin, $columnName){
        $part_m = 'select  '.$columnName.' from crt_'.$idPo.' where id = '.$rowMesin;  
        $part_model = DB::select($part_m)[0]->$columnName;
        return $part_model;
    }

    public function getDataStagingBasedOnRowMesin_20230506($idPo, $rowNum){
        try {
             $selectPo 		= PurchaseOrder::where('id', $idPo)->first();
             $getCustomer 	= MasterCustomer::where('id', $selectPo['customer'])->first();
             $getmesinType 	= MasterMesin::where('id', $selectPo['id_type_mesin'])->first();
             $tableColumns 	= Schema::getColumnListing('crt_'.$idPo);

             $hiddenColumns = ['id', 'ATM_MESIN', 'CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN', 'NOTES', 'NEW_MESIN'];
             $columns 		= array_diff($tableColumns, $hiddenColumns);
             $dataColumn 	= array_values($columns);

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
            $checkTranskSpesifikasiMesin = TransaksiSpesifikasiMesin::where('id_po', $idPo)->exists();

            $data_sn = $po->sn_mesins;
            if ($po->sn_mesins != null){
                $data_sn =  json_decode($po->sn_mesins, true);
            } else {
                $data_sn = null;
            }

            if ($po->copy_from_id_po != null && $po->sn_mesins != null)
            {
                // $get_list_sn_mesin = PurchaseOrderHistoryCopyFromDummy::where('from_id_po', $po->copy_from_id_po)->get();
                // for ($x=0; $x<count($get_list_sn_mesin); $x++){
                //     $query = 'UPDATE crt_'.$po->copy_from_id_po.' SET STATUS_MESIN = NULL where id = '.$get_list_sn_mesin[$x]['no_mesin'];
                //     DB::statement($query);
                // }
                // PurchaseOrderHistoryCopyFromDummy::where('from_id_po', $po->copy_from_id_po)->where('no_mesin', $get_list_sn_mesin[$x]['no_mesin'])->delete();

                for ($x=0; $x< count($data_sn); $x++){
                    $query = 'UPDATE crt_'.$po->copy_from_id_po.' SET STATUS_MESIN = NULL where id = '.$data_sn[$x]['idMesin'];
                    DB::statement($query);

                    // drop history PO 
                    PurchaseOrderHistoryCopyFromDummy::where('from_id_po', $po->copy_from_id_po)
                                    ->where('no_mesin', $data_sn[$x]['idMesin'])
                                    ->where('sn_mesin', $data_sn[$x]['snMesin'])
                                    ->delete();
                }
            }

            if ($checkTransfer){
                 return response()->json([
                        'success' => false,
                        'message' => 'PO status'.$noPo.' is still in Warehouse Transfer'
                    ], 400);
            } 
            else if ($checkStatusDelivery){
                return response()->json([
                        'success' => false,
                        'message' => 'PO status '.$noPo.' is still in Delivery'
                    ], 400);
            } else if ($checkTranskSpesifikasiMesin){
                return response()->json([
                        'success' => false,
                        'message' => 'PO status'.$noPo.' is still in Specification'
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

                        $this->deleteHistory($idPo);

                        return response()->json([
                                'success' => true,
                                'message' => 'PO '.$noPo. 'is removed',
                                'data' => $selectPo
                            ], 200);

                    } else {
                        return response()->json([
                                'success' => false,
                                'message' => 'PO :'.$noPo.' remove failed'
                            ], 400);
                    }
                } else {
                    return response()->json([
                                'success' => false,
                                'message' => 'PO :'.$noPo.' remove failed'
                            ], 400);
                }
            }
         } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
         }
    }

    function deleteHistory( $id_po ){
        TransaksiStatusDelivery::where('id_po', $id_po)->delete(); // delete Transaction of Status Delivery
        WarehouseTransfer::where('id_po', $id_po)->delete(); // delete transaction of warehouse transfer 

        TransaksiSpesifikasiMesin::where('id_po', $id_po)->delete();
        TransaksiChecklistStaging::where('id_po', $id_po)->delete();
        
        TransaksiInspeksi::where('id_po', $id_po)->delete();
        TransaksiInspeksiApproval::where('id_po', $id_po)->delete();

        TransaksiChecklistStagApproval::where('id_po', $id_po)->delete();
    }

    public function cancelPo($idPo){
        $selectPo = PurchaseOrder::where('id', $idPo)->first();
        $deletedPo = PurchaseOrder::where('id', '=', $idPo)->update(['status_po' => 'Cancel', 'deleted_at' => Carbon::now()]);

        if ($deletedPo){
            // MasterPo::where('id', '=', $selectPo->id_po_master)->update(['deleted_at' => Carbon::now()]);

            $data_sn = $selectPo->sn_mesins;
            if ($selectPo->sn_mesins != null){
                $data_sn =  json_decode($selectPo->sn_mesins, true);
            } else {
                $data_sn = null;
            }
            
            if ($selectPo->copy_from_id_po != null && $selectPo->sn_mesins != null)
            {
                // $get_list_sn_mesin = PurchaseOrderHistoryCopyFromDummy::where('from_id_po', $selectPo->copy_from_id_po)->get();

                // for ($x=0; $x<count($get_list_sn_mesin); $x++){
                //     $query1 = 'UPDATE crt_'.$selectPo->copy_from_id_po.' SET STATUS_MESIN = NULL where id = '.$get_list_sn_mesin[$x]['no_mesin'];
                //     DB::statement($query1);
                // }
                // PurchaseOrderHistoryCopyFromDummy::where('from_id_po', $selectPo->copy_from_id_po)->delete();

                for ($x=0; $x< count($data_sn); $x++){
                    $query = 'UPDATE crt_'.$selectPo->copy_from_id_po.' SET STATUS_MESIN = NULL where id = '.$data_sn[$x]['idMesin'];
                    DB::statement($query);

                    // drop history PO 
                    PurchaseOrderHistoryCopyFromDummy::where('from_id_po', $selectPo->copy_from_id_po)
                                    ->where('no_mesin', $data_sn[$x]['idMesin'])
                                    ->where('sn_mesin', $data_sn[$x]['snMesin'])
                                    ->delete();
                }
            }

            $query2 = 'drop table crt_'.$idPo;
            $dropTableStaging = DB::statement($query2);
             
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

            $po['model'] 		= Models::where('id', $po->model)->first();
            $po['customer'] 	= MasterCustomer::where('id', $po->customer)->first();
            $po['pic_staging'] 	= PicMitra::where('id', $po->pic_staging)->first();
            $po['mesin'] 		= MasterMesin::where('id', $po->id_type_mesin)->first();

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
                    } else {
                        $snMesin[$i]['idMesin'] = $getDataStaging[$i]->id;
                        $snMesin[$i]['snMesin'] = $getDataStaging[$i]->NEW_MESIN;
                    }

                    $getStatus = TransaksiInspeksi::where('id_po', $idPo)->where('no_mesin', $getDataStaging[$i]->id)->count();

                    if ($getStatus>0){ $snMesin[$i]['testing_inspection'] = true; }
                    else { $snMesin[$i]['testing_inspection'] = false; }

                    if ($po->mesin['type'] == 'MV-400'){
                        $getStatusChecklist = TransaksiChecklistStagingMv400::where('id_po', $idPo)->where('no_mesin', $getDataStaging[$i]->id)->count();
                    } else {
                        $getStatusChecklist = TransaksiChecklistStaging::where('id_po', $idPo)->where('no_mesin', $getDataStaging[$i]->id)->count();
                    }

                    if ($getStatusChecklist>0) {
                        $snMesin[$i]['checklist_staging'] = true; 
                    } else {
                        $snMesin[$i]['checklist_staging'] = false; 
                    }

                    // get data approval preloading inspection 
                    $snMesin[$i]['data_approval_preloading'] = TransaksiInspeksiApproval::where('id_po', $idPo)->where('no_mesin', $getDataStaging[$i]->id)->first();
                    
                    if (isset($snMesin[$i]['data_approval_preloading']->approval_by_tss)){
                        $snMesin[$i]['data_approval_preloading']['approval_by_tss']     = User::where('id', $snMesin[$i]['data_approval_preloading']->approval_by_tss)->first();
                    }else {
                        $snMesin[$i]['data_approval_preloading']['approval_by_tss'] = null;
                    }

                    if (isset($snMesin[$i]['data_approval_preloading']->approval_by_datindo)){
                        $snMesin[$i]['data_approval_preloading']['approval_by_datindo'] = User::where('id', $snMesin[$i]['data_approval_preloading']->approval_by_datindo)->first(); 
                    }else {
                        $snMesin[$i]['data_approval_preloading']['approval_by_datindo'] = null;
                    }

                    if (isset($snMesin[$i]['data_approval_preloading']->approval_by_mover)){
                       $snMesin[$i]['data_approval_preloading']['approval_by_mover']   = User::where('id', $snMesin[$i]['data_approval_preloading']->approval_by_mover)->first();
                    } else {
                        $snMesin[$i]['data_approval_preloading']['approval_by_mover'] = null;
                    }

                    // get time preloading Inspection 
                    $query2 = 'select TIME_PRELOADING from crt_'.$idPo.' where id ='.$snMesin[$i]['idMesin'];
                    $getTimePreloading = DB::select($query2)[0]->TIME_PRELOADING;
                    $snMesin[$i]['time_preloading'] = $getTimePreloading;

                    // get data approval pre-staging-checklist
                    $snMesin[$i]['data_approval_checklist_staging'] =  TransaksiChecklistStagApproval::where('id_po', $idPo)->where('no_mesin', $getDataStaging[$i]->id)->first();

                    if (isset($snMesin[$i]['data_approval_checklist_staging']->approval_staging)){
                        $snMesin[$i]['data_approval_checklist_staging']['approval_by_staging'] = User::where('id', $snMesin[$i]['data_approval_checklist_staging']->approval_staging)->first(); 
                    } else {
                        $snMesin[$i]['data_approval_checklist_staging']['approval_by_staging'] = null;
                    }

                    if (isset($snMesin[$i]['data_approval_checklist_staging']->approval_tss)){
                        $snMesin[$i]['data_approval_checklist_staging']['approval_by_tss'] = User::where('id', $snMesin[$i]['data_approval_checklist_staging']->approval_tss)->first(); 
                    } else {
                        $snMesin[$i]['data_approval_checklist_staging']['approval_by_tss'] = null; 
                    }

                    // get time checklist Staging 
                    $query3 = 'select TIME_CHECKLIST from crt_'.$idPo.' where id ='.$snMesin[$i]['idMesin'];
                    $getTimeChecklist =DB::select($query3)[0]->TIME_CHECKLIST;
                    $snMesin[$i]['time_checklist'] = $getTimeChecklist;
                }
                $po['dataMesin'] = $snMesin;

                return response()->json([
                        'success' => true,
                        'data' => $po
                    ], 200);

            } catch(\Illuminate\Database\QueryException $ex) {
                return response()->json(["errorMessage"=> $ex->getMessage()], 500);
            }
        } else {

            return response()->json([
                'success' => true,
                'message' => 'Data Not Found', 
                'data' => []
            ], 200);

        }
    }

    // 2023-11-29
    function getFilterSNMesinByApprovalChecklist($idPo, $approved_by, $type){
        $po = PurchaseOrder::where('id', $idPo)->first();
        if ($po){
            $po['model'] = Models::where('id', $po->model)->first();
            $po['mesin'] = MasterMesin::where('id', $po->id_type_mesin)->first();

            try {

                $query = 'SELECT * FROM crt_'.$po->id;
                $getDataStaging = DB::select($query);
                
                $data = DB::table($query);
                $columns = Schema::getColumnListing('crt_'.$po->id);
                $snMesin = [];
                $dataArray = array();
                
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
                    } else {
                        $snMesin[$i]['idMesin'] = $getDataStaging[$i]->id;
                        $snMesin[$i]['snMesin'] = $getDataStaging[$i]->NEW_MESIN;
                    }

                    $getStatus = TransaksiInspeksi::where('id_po', $idPo)->where('no_mesin', $getDataStaging[$i]->id)->count();

                    if ($getStatus>0){ $snMesin[$i]['testing_inspection'] = true; }
                    else { $snMesin[$i]['testing_inspection'] = false; }

                    if ($po->mesin['type'] == 'MV-400'){
                        $getStatusChecklist = TransaksiChecklistStagingMv400::where('id_po', $idPo)->where('no_mesin', $getDataStaging[$i]->id)->count();
                    } else {
                        $getStatusChecklist = TransaksiChecklistStaging::where('id_po', $idPo)->where('no_mesin', $getDataStaging[$i]->id)->count();
                    }

                    if ($getStatusChecklist>0) {
                        $snMesin[$i]['checklist_staging'] = true; 
                    } else {
                        $snMesin[$i]['checklist_staging'] = false; 
                    }

                    // get time preloading Inspection 
                    $query2 = 'select TIME_PRELOADING from crt_'.$idPo.' where id ='.$snMesin[$i]['idMesin'];
                    $getTimePreloading = DB::select($query2)[0]->TIME_PRELOADING;
                    $snMesin[$i]['time_preloading'] = $getTimePreloading;

                    // get time checklist Staging 
                    $query3 = 'select TIME_CHECKLIST from crt_'.$idPo.' where id ='.$snMesin[$i]['idMesin'];
                    $getTimeChecklist =DB::select($query3)[0]->TIME_CHECKLIST;
                    $snMesin[$i]['time_checklist'] = $getTimeChecklist;

                    // get data approval pre-staging-checklist
                    if ($approved_by == "STAGING" && $type == "APPROVED") {
                        $data_approval = TransaksiChecklistStagApproval::where('id_po', $idPo)
                                                                        ->where('no_mesin', $getDataStaging[$i]->id)
                                                                        ->where('approval_staging', '<>', null)
                                                                        ->first();

                        if ($data_approval != null){
                            $snMesin[$i]['data_approval_checklist_staging'] = $data_approval; 

                            // get approved by staging
                            $get_approved_by = User::where('id', $snMesin[$i]['data_approval_checklist_staging']['approval_staging'])->first(); 
                            $snMesin[$i]['data_approval_checklist_staging']['approval_by_staging'] = $get_approved_by;

                             // get approved by tss
                             $get_approved_by2 = User::where('id', $snMesin[$i]['data_approval_checklist_staging']['approval_tss'])->first(); 
                             $snMesin[$i]['data_approval_checklist_staging']['approval_by_tss'] = $get_approved_by2;

                        } else {
                            $snMesin[$i]['data_approval_checklist_staging'] = [];
                        }
                        
                    } else if ($approved_by == "STAGING" && $type == "UNAPPROVED") {       
                        $data_approval =  TransaksiChecklistStagApproval::where('id_po', $idPo)
                                                                        ->where('no_mesin', $getDataStaging[$i]->id)
                                                                        ->where('approval_staging', '=', null)
                                                                        ->first();

                        if ($data_approval != null){
                            $snMesin[$i]['data_approval_checklist_staging'] = $data_approval; 

                            $snMesin[$i]['data_approval_checklist_staging']['approval_by_staging'] = null;

                            // get approved by tss
                            $get_approved_by = User::where('id', $snMesin[$i]['data_approval_checklist_staging']['approval_tss'])->first(); 
                            $snMesin[$i]['data_approval_checklist_staging']['approval_by_tss'] = $get_approved_by;
                        } else {
                            $snMesin[$i]['data_approval_checklist_staging'] = [];
                        }
                    } else if ( $approved_by == "TSS" && $type == "APPROVED" ){
                        $data_approval = TransaksiChecklistStagApproval::where('id_po', $idPo)
                                                            ->where('no_mesin', $getDataStaging[$i]->id)
                                                            ->where('approval_tss', '<>', null)
                                                            ->first();

                        if ($data_approval != null){
                            $snMesin[$i]['data_approval_checklist_staging'] = $data_approval; 

                            // get approved by tss
                            $get_approved_by = User::where('id', $snMesin[$i]['data_approval_checklist_staging']['approval_tss'])->first(); 
                            $snMesin[$i]['data_approval_checklist_staging']['approval_by_tss'] = $get_approved_by;
                            
                            // get approved by staging
                            $get_approved_by2 = User::where('id', $snMesin[$i]['data_approval_checklist_staging']['approval_staging'])->first(); 
                            $snMesin[$i]['data_approval_checklist_staging']['approval_by_staging'] = $get_approved_by2;

                        } else {
                            $snMesin[$i]['data_approval_checklist_staging'] = [];
                        }
                    } else if ( $approved_by == "TSS" && $type == "UNAPPROVED" ){
                        $data_approval = TransaksiChecklistStagApproval::where('id_po', $idPo)
                                                        ->where('no_mesin', $getDataStaging[$i]->id)
                                                        ->where('approval_tss', '=', null)
                                                        ->first();

                        if ($data_approval != null){
                            $snMesin[$i]['data_approval_checklist_staging'] = $data_approval; 

                            // $get_approved_by = User::where('id', $snMesin[$i]['data_approval_checklist_staging']['approval_tss'])->first(); 
                            $snMesin[$i]['data_approval_checklist_staging']['approval_by_tss'] = null;

                            $get_approved_by2 = User::where('id', $snMesin[$i]['data_approval_checklist_staging']['approval_staging'])->first(); 
                            $snMesin[$i]['data_approval_checklist_staging']['approval_by_staging'] = $get_approved_by2;

                        } else {
                            $snMesin[$i]['data_approval_checklist_staging'] = [];
                        }
                    } 
                    else if ( $approved_by == 'null' && $type == 'null'){
                        $data_approval = TransaksiChecklistStagApproval::where('id_po', $idPo)
                                                        ->where('no_mesin', $getDataStaging[$i]->id)
                                                        ->first();
                                                        
                        if ($data_approval != null){
                            $snMesin[$i]['data_approval_checklist_staging'] = $data_approval; 

                            // get approved by tss
                            $get_approved_by = User::where('id', $snMesin[$i]['data_approval_checklist_staging']['approval_tss'])->first(); 
                            $snMesin[$i]['data_approval_checklist_staging']['approval_by_tss'] = $get_approved_by;

                            $get_approved_by2 = User::where('id', $snMesin[$i]['data_approval_checklist_staging']['approval_staging'])->first(); 
                            $snMesin[$i]['data_approval_checklist_staging']['approval_by_staging'] = $get_approved_by2;

                        } 
                    } else {
                        unset( $snMesin[$i] );
                    }

                    if ( $approved_by != 'null' && $type != 'null'){
                        if ($snMesin[$i]['data_approval_checklist_staging'] == []){
                            unset( $snMesin[$i] );
                        }
                    }
                }
                
                $po['dataMesin']  = $snMesin;
                foreach($po['dataMesin'] as $key => $value) {
                    array_push($dataArray , $value );
                }
                $po['dataMesin'] = $dataArray;

                return response()->json([
                        'success' => true,
                        'data' => $po
                    ], 200);

            } catch (\Exception $e) {
                 return response()->json([
                    'success' => false,
                    'data' => $e
                ], 400);
            }

        }  else {
            return response()->json([
                'success' => true,
                'message' => 'Data Not Found', 
                'data' => []
            ], 200);
        }
    }


    // 2023-11-30
    function getFilterSNMesinByApprovalPreloading($idPo, $approved_by, $type){
        $po = PurchaseOrder::where('id', $idPo)->first();
        if ($po){

            $po['model'] = Models::where('id', $po->model)->first();
            $po['mesin'] = MasterMesin::where('id', $po->id_type_mesin)->first();

            try {

                $query = 'SELECT * FROM crt_'.$po->id;
                $getDataStaging = DB::select($query);
                
                $data = DB::table($query);
                $columns = Schema::getColumnListing('crt_'.$po->id);
                $snMesin = [];
                $dataArray = array();

                for ($i=0; $i< count($getDataStaging); $i++){
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
                    } else {
                        $snMesin[$i]['idMesin'] = $getDataStaging[$i]->id;
                        $snMesin[$i]['snMesin'] = $getDataStaging[$i]->NEW_MESIN;
                    }

                    $getStatus = TransaksiInspeksi::where('id_po', $idPo)->where('no_mesin', $getDataStaging[$i]->id)->count();
                    
                    if ($getStatus>0){ $snMesin[$i]['testing_inspection'] = true; }
                    else { $snMesin[$i]['testing_inspection'] = false; }

                    if ($po->mesin['type'] == 'MV-400'){
                        $getStatusChecklist = TransaksiChecklistStagingMv400::where('id_po', $idPo)->where('no_mesin', $getDataStaging[$i]->id)->count();
                    } else {
                        $getStatusChecklist = TransaksiChecklistStaging::where('id_po', $idPo)->where('no_mesin', $getDataStaging[$i]->id)->count();
                    }

                    if ($getStatusChecklist>0) {
                        $snMesin[$i]['checklist_staging'] = true; 
                    } else {
                        $snMesin[$i]['checklist_staging'] = false; 
                    }

                    // get time preloading Inspection 
                    $query2 = 'select TIME_PRELOADING from crt_'.$idPo.' where id ='.$snMesin[$i]['idMesin'];
                    $getTimePreloading = DB::select($query2)[0]->TIME_PRELOADING;
                    $snMesin[$i]['time_preloading'] = $getTimePreloading;

                    // get time checklist Staging 
                    $query3 = 'select TIME_CHECKLIST from crt_'.$idPo.' where id ='.$snMesin[$i]['idMesin'];
                    $getTimeChecklist =DB::select($query3)[0]->TIME_CHECKLIST;
                    $snMesin[$i]['time_checklist'] = $getTimeChecklist;


                    // filter dataMesin berdasarkan kondisi approved-by dan status approved/unapproved
                    // get data approval preloading-inspection 
                    if ( $approved_by == "MOVER" &&  $type == "APPROVED" ){
                        $data_approval = TransaksiInspeksiApproval::where('id_po', $idPo)
                                                                  ->where('no_mesin', $getDataStaging[$i]->id)
                                                                  ->where('approval_by_mover', '<>', null)
                                                                  ->first();
                        if ($data_approval != null){
                            $snMesin[$i]['data_approval_preloading'] = $data_approval;
                            $snMesin[$i]['data_approval_preloading']['approval_by_mover']   = User::where('id', $snMesin[$i]['data_approval_preloading']->approval_by_mover)->first();
                            
                            // get-data approval by tss
                            $get_approved_by = User::where('id', $snMesin[$i]['data_approval_preloading']['approval_by_tss'])->first(); 
                            $snMesin[$i]['data_approval_preloading']['approval_by_tss'] = $get_approved_by;

                            $get_approved_by2 = User::where('id', $snMesin[$i]['data_approval_preloading']['approval_by_datindo'])->first(); 
                            $snMesin[$i]['data_approval_preloading']['approval_by_datindo'] = $get_approved_by2;
                        
                        } else {
                            $snMesin[$i]['data_approval_preloading'] = [];
                        }
                    } else if ( $approved_by == "MOVER" &&  $type == "UNAPPROVED" ){
                        $data_approval = TransaksiInspeksiApproval::where('id_po', $idPo)
                                                                  ->where('no_mesin', $getDataStaging[$i]->id)
                                                                  ->where('approval_by_mover', '=', null)
                                                                  ->first();

                        if ($data_approval != null){
                            $snMesin[$i]['data_approval_preloading'] = $data_approval;
                            $snMesin[$i]['data_approval_preloading']['approval_by_mover']   = User::where('id', $snMesin[$i]['data_approval_preloading']->approval_by_mover)->first();

                            // get-data approval by tss
                            $get_approved_by = User::where('id', $snMesin[$i]['data_approval_preloading']['approval_by_tss'])->first(); 
                            $snMesin[$i]['data_approval_preloading']['approval_by_tss'] = $get_approved_by;

                            // get-data approval by datindo
                            $get_approved_by2 = User::where('id', $snMesin[$i]['data_approval_preloading']['approval_by_datindo'])->first(); 
                            $snMesin[$i]['data_approval_preloading']['approval_by_datindo'] = $get_approved_by2;    

                        } else {
                            $snMesin[$i]['data_approval_preloading'] = [];
                        }
                    } else if ( $approved_by == "DATINDO" &&  $type == "APPROVED" ){
                        $data_approval = TransaksiInspeksiApproval::where('id_po', $idPo)
                                                                  ->where('no_mesin', $getDataStaging[$i]->id)
                                                                  ->where('approval_by_datindo', '<>', null)
                                                                  ->first();
                        
                        if ($data_approval != null){
                            $snMesin[$i]['data_approval_preloading'] = $data_approval;
                            $snMesin[$i]['data_approval_preloading']['approval_by_datindo']   = User::where('id', $snMesin[$i]['data_approval_preloading']->approval_by_datindo)->first(); 
                            
                              // get-data approval by mover 
                              $get_approved_by = User::where('id', $snMesin[$i]['data_approval_preloading']['approval_by_mover'])->first(); 
                              $snMesin[$i]['data_approval_preloading']['approval_by_mover'] = $get_approved_by; 

                              // get-data approval by tss
                              $get_approved_by = User::where('id', $snMesin[$i]['data_approval_preloading']['approval_by_tss'])->first(); 
                              $snMesin[$i]['data_approval_preloading']['approval_by_tss'] = $get_approved_by;
                        } else {
                            $snMesin[$i]['data_approval_preloading'] = [];
                        }
                    } else if ( $approved_by == "DATINDO" &&  $type == "UNAPPROVED" ){
                        $data_approval = TransaksiInspeksiApproval::where('id_po', $idPo)
                                                                  ->where('no_mesin', $getDataStaging[$i]->id)
                                                                  ->where('approval_by_datindo', '=', null)
                                                                  ->first();

                        if ($data_approval != null){
                            $snMesin[$i]['data_approval_preloading'] = $data_approval;
                            $snMesin[$i]['data_approval_preloading']['approval_by_datindo']   = User::where('id', $snMesin[$i]['data_approval_preloading']->approval_by_datindo)->first();

                            // get-data approval by mover 
                            $get_approved_by = User::where('id', $snMesin[$i]['data_approval_preloading']['approval_by_mover'])->first(); 
                            $snMesin[$i]['data_approval_preloading']['approval_by_mover'] = $get_approved_by; 

                            // get-data approval by tss
                            $get_approved_by2 = User::where('id', $snMesin[$i]['data_approval_preloading']['approval_by_tss'])->first(); 
                            $snMesin[$i]['data_approval_preloading']['approval_by_tss'] = $get_approved_by2;
                        } else {
                            $snMesin[$i]['data_approval_preloading'] = [];
                        }
                    } else if ( $approved_by == "TSS" &&  $type == "APPROVED" ){
                        //echo "tess";
                        $data_approval = TransaksiInspeksiApproval::where('id_po', $idPo)
                                                                  ->where('no_mesin', $getDataStaging[$i]->id)
                                                                  ->where('approval_by_tss', '<>', null)
                                                                  ->first();
                        if ($data_approval != null){
                            $snMesin[$i]['data_approval_preloading'] = $data_approval;
                            $snMesin[$i]['data_approval_preloading']['approval_by_tss']   = User::where('id', $snMesin[$i]['data_approval_preloading']->approval_by_tss)->first();

                            // get-data approval by mover 
                            $get_approved_by = User::where('id', $snMesin[$i]['data_approval_preloading']['approval_by_mover'])->first(); 
                            $snMesin[$i]['data_approval_preloading']['approval_by_mover'] = $get_approved_by; 

                            // get-data approval by datindo
                            $get_approved_by2 = User::where('id', $snMesin[$i]['data_approval_preloading']['approval_by_datindo'])->first(); 
                            $snMesin[$i]['data_approval_preloading']['approval_by_datindo'] = $get_approved_by2; 
                        }else {
                            $snMesin[$i]['data_approval_preloading'] = [];
                        }
                    } else if ( $approved_by == "TSS" &&  $type == "UNAPPROVED" ){
                        $data_approval = TransaksiInspeksiApproval::where('id_po', $idPo)
                                                                  ->where('no_mesin', $getDataStaging[$i]->id)
                                                                  ->where('approval_by_tss', '=', null)
                                                                  ->first();

                        if ($data_approval != null){
                            $snMesin[$i]['data_approval_preloading'] = $data_approval;
                            $snMesin[$i]['data_approval_preloading']['approval_by_tss']   = User::where('id', $snMesin[$i]['data_approval_preloading']->approval_by_tss)->first();

                            // get-data approval by mover 
                            $get_approved_by = User::where('id', $snMesin[$i]['data_approval_preloading']['approval_by_mover'])->first(); 
                            $snMesin[$i]['data_approval_preloading']['approval_by_mover'] = $get_approved_by; 
 
                            // get-data approval by datindo
                            $get_approved_by2 = User::where('id', $snMesin[$i]['data_approval_preloading']['approval_by_datindo'])->first(); 
                            $snMesin[$i]['data_approval_preloading']['approval_by_datindo'] = $get_approved_by2; 
                        } else {
                            $snMesin[$i]['data_approval_preloading'] = [];
                        }
                    } else if ( $approved_by == "null" &&  $type == "null" ){
                        $data_approval = TransaksiInspeksiApproval::where('id_po', $idPo)
                                                                  ->where('no_mesin', $getDataStaging[$i]->id)
                                                                  ->first();
                        
                        if ($data_approval != null){
                            $snMesin[$i]['data_approval_preloading'] = $data_approval; 

                            $get_approved_by = User::where('id', $snMesin[$i]['data_approval_preloading']->approval_by_tss)->first(); 
                            $snMesin[$i]['data_approval_preloading']['approval_by_tss'] = $get_approved_by;

                            $get_approved_by2 = User::where('id', $snMesin[$i]['data_approval_preloading']->approval_by_datindo)->first(); 
                            $snMesin[$i]['data_approval_preloading']['approval_by_datindo'] = $get_approved_by2;

                            $get_approved_by3 = User::where('id', $snMesin[$i]['data_approval_preloading']->approval_by_mover)->first(); 
                            $snMesin[$i]['data_approval_preloading']['approval_by_mover'] = $get_approved_by3;
                        } 
                    }
                    else {
                        unset( $snMesin[$i] );
                    }

                    if ( $approved_by != 'null' && $type != 'null'){
                        if ($snMesin[$i]['data_approval_preloading'] == []){
                            unset( $snMesin[$i] );
                        }
                    }
                }

                $po['dataMesin']  = $snMesin;
                foreach($po['dataMesin'] as $key => $value) {
                    array_push($dataArray , $value );
                }
                $po['dataMesin'] = $dataArray;

                return response()->json([
                        'success' => true,
                        'data' => $po
                ], 200);

            }catch (\Exception $e) {
                return response()->json([
                   'success' => false,
                   'data' => $e
               ], 400);
           }

            return response()->json([
                'success' => true,
                'data' => $po
            ], 200);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'Data Not Found', 
                'data' => []
            ], 200);
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
                        'message' => 'Approval by Mover is successfully Updated'
                    ], 200);
            }else {
                return response()->json([
                        "success" => false,
                        "message" => "Approval by Mover is Failed"
                    ], 400);
            }
        } else if ($type === 'TSS'){
            $updated = TransaksiInspeksiApproval::where('id_po', $idPo)->where('no_mesin', $idMesin)->update(['approval_by_tss' => $request->approval_by]);

            if ($updated){
                return response()->json([
                        'success' => true,
                        'message' => 'Approval by TSS is successfully Updated'
                    ], 200);
            } else {
                return response()->json([
                        "success" => false,
                        "message" => "Approval by TSS is Failed"
                    ], 400);
            }
        } else {

            $updated = TransaksiInspeksiApproval::where('id_po', $idPo)
                                                ->where('no_mesin', $idMesin)
                                                ->update(['approval_by_datindo' => $request->approval_by]);

            if($updated){
                 return response()->json([
                        'success' => true,
                        'message' => 'Approval by Datindo is successfully Updated'
                    ], 200);
            }else {
                return response()->json([
                        "success" => false,
                        "message" => "Approval by Datindo is Failed"
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
                $getPicMover = User::where('id', $getData['approval_by_mover'])->get();

                return response()->json([
                        'success' => true,
                        'data' => $getPicMover
                    ], 200); 
            }
        } else if ($type === 'TSS'){
            if ($getData){
                $getPicMover = User::where('id', $getData['approval_by_tss'])->get();

                if( count($getPicMover) > 0 ){
                    unset($getPicMover[0]['reset_code'], 
                      $getPicMover[0]['email_verified_at'], 
                      $getPicMover[0]['reset_code_expired_at'], 
                      $getPicMover[0]['created_at'], 
                      $getPicMover[0]['updated_at']
                    );
                }

                return response()->json([
                        'success' => true,
                        'data' => $getPicMover
                    ], 200); 
            }
        } else {
            if ($getData){
                $getPicMitra = User::where('id', $getData['approval_by_datindo'])->get();

                if ( count($getPicMitra) >0 ){
                    unset($getPicMitra[0]['reset_code'], 
                      $getPicMitra[0]['email_verified_at'], 
                      $getPicMitra[0]['reset_code_expired_at'], 
                      $getPicMitra[0]['created_at'], 
                      $getPicMitra[0]['updated_at']
                    );
                }

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
                                  ->whereIn('part_column', ['ATM_MESIN','CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN', 'NEW_MESIN'])->first();
            
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
                } else {
                    $snMesin[$i]['idMesin'] = $getDataSN[$i]->id;
                    $snMesin[$i]['snMesin'] = $getDataSN[$i]->NEW_MESIN;
                }
            }

            $getDataSN['dataMesin'] = $snMesin;

            $dataArray=array();
            for ($j=0; $j<count($snMesin); $j++){
                if ($snMesin[$j]['snMesin'] != null){
                    array_push($dataArray, $snMesin[$j]);
                }
            }

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

    function getDataChecklistStagingMv400V2($idPo, $idMesin){
        try {

            $sql = 'select TIME_CHECKLIST from crt_'.$idPo.' where id = '.$idMesin;
            $get_time_checklist = DB::select($sql)[0]->TIME_CHECKLIST;  

            $get_data_listStaging = MasterChecklistStagingMv400::select(['cla.name', 'mst_checklist_stag_mv400.*'])
                                        ->join('mst_classification as cla', 'cla.id', '=', 
                                             'mst_checklist_stag_mv400.id_classification')
                                        ->get();

            $status_staging =false;
            $dataList = [];
            for ($a=0; $a< count($get_data_listStaging); $a++){

                 $dataList[$a] = $get_data_listStaging[$a];
                 $dataDetail = [];

                 $get_data_transaksi = TransaksiChecklistStagingMv400::
                                                where('id_po', $idPo)
                                              ->where('no_mesin', $idMesin)
                                              ->where('id_checklist_staging', $get_data_listStaging[$a]['id'])
                                              ->first();

                if ($get_data_transaksi){ 
                    $dataList[$a]['detail_checklist'] = $get_data_transaksi;
                    $status_staging = true;
                } else {
                    $dataList[$a]['detail_checklist'] = [
                        'sn_part' => null, 
                        'results' => null, 
                        'inspector_sign' => null, 
                        'fix_description' => null
                    ];
                    $status_staging = false;
                }
            }

             return response()->json([
                'success' => true,
                'totalDatas' => count($dataList), 
                'data' => $dataList, 
                'status_checklist' => $status_staging, 
                'time_checklist'   => $get_time_checklist
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
                           OR str_contains($getDataDetail['result_details'], 'No problem on the display status')
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

                    $set_id_divisi = $getDataListStaging[$b]['id_divisi'];
                    $dataList[$b] = $getDataListStaging[$b];
                    $dataDetail = [];

                    $dataList[$b]['id_div'] = $set_id_divisi; 
                    $getDataDetail = TransaksiChecklistStaging::select(['mcs.test_desc', 'transaksi_checklist_staging.*'])
                                            ->join('mst_checklist_staging as mcs', 'mcs.id', '=', 'transaksi_checklist_staging.id_checklist_staging')
                                            ->where('id_po', $idPo)
                                            ->where('no_mesin', $idMesin)
                                            ->where('id_checklist_staging', $dataList[$b]['id'])->first();

                    if (isset($getDataDetail['fill_columns'])){
                        if ( str_contains($getDataDetail['result_details'], 'Dev. 1,2,3,4,5') ){
                            $dataArray = json_decode($getDataDetail['fill_columns'], true);
                            $datas= [];
                            
                            if (isset($dataArray)){
                                if (count($dataArray)> 0){
                                    for ($xx=0; $xx<count($dataArray); $xx++){
                                        $get_desc = MasterSettingPreStaging::where('id', $dataArray[$xx])->first();
                                        array_push($datas, $get_desc );
                                    }
                                    $getDataDetail['fill_columns'] = $datas;
                                }
                            }
                        }

                        if ( str_contains($getDataDetail['result_details'], 'VDisplay') 
                            OR str_contains($getDataDetail['result_details'], '1.Booting time: Min. Sec.') 
                            OR (str_contains($getDataDetail['result_details'], 'No problem the display status'))
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

                        if (str_contains($getDataDetail['result_details'], 'attach here')) {
                          $getDataDetail['fill_columns'] = $getDataDetail['fill_columns'];
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

    // v2 get All data Divisi 
    function getDataChecklistStagingReportV2($idPo, $idMesin){

        try {
            $sql = 'select TIME_CHECKLIST from crt_'.$idPo.' where id = '.$idMesin;
            $get_time_checklist = DB::select($sql)[0]->TIME_CHECKLIST;  

             $selectPo = PurchaseOrder::where('id', $idPo)->first();
             $getDataListStaging = MasterChecklistStaging::select(['md.name','mst_checklist_staging.*'])
                                    ->join('mst_divisi as md', 'md.id', '=', 'mst_checklist_staging.id_divisi')
                                    ->where('mst_checklist_staging.id_mesin', $selectPo['id_type_mesin'])
                                    ->orderBy('mst_checklist_staging.id_divisi', 'asc')
                                    ->orderBy('mst_checklist_staging.id', 'asc')
                                    ->get();

            $data_list = [];
            $status_checklist_staging = false;
            for ($a=0; $a< count($getDataListStaging); $a++){

                $getDataDetail = TransaksiChecklistStaging::
                                where('id_po', $idPo)->
                                where('no_mesin', $idMesin)->
                                where('id_checklist_staging', $getDataListStaging[$a]['id'])->first();

               // dd($getDataDetail);

               if($getDataDetail) {

                    if (isset($getDataDetail['fill_columns'])){
                        // if ( str_contains($getDataDetail['result_details'], 'Dev. 1,2,3,4,5') ){
                        //     $dataArray = json_decode($getDataDetail['fill_columns'], true);
                        //     $datas= [];
                            
                        //     if (isset($dataArray)){
                        //         if (count($dataArray)> 0){
                        //             for ($xx=0; $xx<count($dataArray); $xx++){
                        //                 $get_desc = MasterSettingPreStaging::where('id', $dataArray[$xx])->first();
                        //                 array_push($datas, $get_desc );
                        //             }
                        //             $dataList['fill_columns'] = $datas;
                        //         } 
                        //     }
                        // } 

                        // if ( str_contains($getDataDetail['result_details'], 'VDisplay') 
                        //     OR str_contains($getDataDetail['result_details'], '1.Booting time: Min. Sec.')
                        // ) {
                        //         $dataArray = json_decode($getDataDetail['fill_columns'], true);
                        //         $datas= [];

                        //         if (isset($dataArray)){
                        //             if (count($dataArray)> 0){
                        //                 for ($yy=0; $yy<count($dataArray); $yy++){
                        //                     array_push($datas, $dataArray[$yy] );
                        //                 }
                        //                 $dataList['fill_columns'] = $datas;
                        //             }
                        //         }
                        // } 

                        // if ( str_contains($getDataDetail['result_details'], 'BCU: BCU20') ) {
                        //   $get_desc = MasterSettingPreStaging::where('id', $getDataDetail['fill_columns'])->first();
                        //   $dataList['fill_columns'] = $get_desc;
                        // } 

                        // add kondisi new type by ardie 2024-02-12 //////////////////////////////// 
                        $check_type_items = MasterChecklistStaging::select(['mtvc.*'])
                            ->join('mst_type_value_checklist as mtvc', 'mtvc.id', '=', 'mst_checklist_staging.id_type_values')
                            ->where('mst_checklist_staging.id', $getDataDetail['id_checklist_staging'])
                            ->first();

                        if ( isset($check_type_items['types']) ){
                            if (in_array( $check_type_items['types'] , ['TEXT_INPUT', 'COMBO_BOX']) ){
                                // dd($check_type_items['data_from'] )
                                if ( $check_type_items['data_from'] != null ){
                                    $dataArray = json_decode($getDataDetail['fill_columns'], true);

                                    // dd($dataArray);
                                    // $dataList['fill_columns'] = $dataArray;
                                    // $get_list = MasterSettingPreStaging::where('types', '=' , $check_type_items['data_from'])->get();
                                    $dataxx = [];
                                    if ( isset( $dataArray)  && $check_type_items['count_data'] > 1 ){
                                        if (count($dataArray)> 0){
                                            for ($b=0; $b < count($dataArray); $b++){
                                                $get_desc = MasterSettingPreStaging::where('id', $dataArray[$b])->first();
                                                array_push($dataxx, $get_desc );
                                            }
                                        }
                                        $dataList['fill_columns'] = $dataxx;
                                    } else {
                                        // dd($dataArray);
                                        $get_desc = MasterSettingPreStaging::where('id', $dataArray)->first();
                                        $dataList['fill_columns'] = $get_desc;
                                    }
                                    
                                } else {
                                    //$dataArray = json_decode($getDataDetail['fill_columns'], true);
                                    // dd($dataArray, $check_type_items['count_data'], isset($dataArray));

                                    $dataArray = json_decode($getDataDetail['fill_columns'], true);
                                    $dataList['fill_columns'] = $dataArray;
                                    // $datas2= [];
                                    // if (isset($dataArray) && $check_type_items['count_data'] > 1 ){
                                    //     if (count($dataArray)> 0){
                                    //         for ($zz=0; $zz<count($dataArray); $zz++){
                                    //             $get_desc = MasterSettingPreStaging::where('id', $dataArray[$zz])->first();
                                    //             array_push($datas2, $get_desc );
                                    //         }
                                    //         $dataList['fill_columns'] = $datas2;
                                    //     }
                                    // }
                                }
                            } else if ($check_type_items['types'] == 'FILE_UPLOAD'){
                                $dataList['fill_columns'] = $getDataDetail['fill_columns'];
                            }
                        }
                        // //////////////////////////////// ////////////////////////////////

                        // if (str_contains($getDataDetail['result_details'], 'attach here')
                        //      OR str_contains($getDataDetail['result_details'], 'M/B Bios Version=')
                        //      OR str_contains($getDataDetail['result_details'], 'No problem the display status')
                        //      OR in_array( $check_type_items['types'] , ['FILE_UPLOAD'])
                        // ) {
                        //   $dataList['fill_columns'] = $getDataDetail['fill_columns'];
                        // }

                   } else {
                        $dataList['fill_columns'] = null; //$getDataDetail['fill_columns'];
                   }

                   $dataList['results'] = $getDataDetail['results'];
                   $dataList['action'] = isset($getDataDetail['action']) ? MasterSettingPreStaging::where('id', $getDataDetail['action'])->first() : null;
                   $dataList['problem']  = isset($getDataDetail['problem']) ? MasterSettingPreStaging::where('id', $getDataDetail['problem'])->first() : null;
                   $dataList['remark'] = isset($getDataDetail['remark']) ? MasterSettingPreStaging::where('id', $getDataDetail['remark'])->first() : null;

                   $getDataListStaging[$a]['detail_staging'] = $dataList; 

               } else {
                    $getDataListStaging[$a]['detail_staging'] = [
                        'action' => null, 
                        'fill_columns' => null, 
                        'problem' => null, 
                        'remark' => null, 
                        'results' => null
                    ]; 
               }

               $detail_item_values = MasterTypeValuesChecklist::where('id', $getDataListStaging[$a]['id_type_values'])->first();
               $getDataListStaging[$a]['item_type_values'] = $detail_item_values;
               unset ($getDataListStaging[$a]['id_type_values']);

               if ( isset ($detail_item_values->types) ){
                    if ($detail_item_values->types == "COMBO_BOX" OR $detail_item_values->types == "TEXT_INPUT" ){
                        $dtArrayLabel =  json_decode($detail_item_values->labels, true);
                        $getDataListStaging[$a]['item_type_values']['labels'] = $dtArrayLabel;
                    } else {
                        $getDataListStaging[$a]['item_type_values']['labels'] = $detail_item_values->labels;
                    }
               }

               $getStatusChecklist = TransaksiChecklistStaging::where('id_po', $idPo)
                                                               ->where('no_mesin', $idMesin)
                                                               ->count();

                if ($getStatusChecklist>0) { $status_checklist_staging = true; } 
                else { $status_checklist_staging = false; }
            }

            return response()->json([
                'success'                   => true,
                'data'                      => $getDataListStaging, 
                'status_checklist_staging'  => $status_checklist_staging, 
                'time_checklist'              => $get_time_checklist
            ]);

        }catch(\Illuminate\Database\QueryException $ex) {
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
                'message' => 'Notes machine SN is successfully updated'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Notes  machine SN is failed.'
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
                                  ->whereIn('part_column', ['ATM_MESIN','CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN', 'NEW_MESIN'])
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
            $getMesin 		= MasterMesin::where('id', $po[$i]->id_type_mesin)->first();
            $getGudang 		= MasterGudang::where('id', $po[$i]->nama_gudang)->first();
            $getCustomer 	= MasterCustomer::where('id', $po[$i]->customer)->first();
            $getModel 		= Models::where('id', $po[$i]->model)->first();
            $getPic 		= PicMitra::where('id', $po[$i]->pic_staging)->first();
            $getBatch 		= Bacth::where('id', $po[$i]->batch)->first();

            $getWarehouseTf = WarehouseTransfer::where('id_po', '=', $po[$i]->id)->get();
            if (count($getWarehouseTf) >0){
                $getCountJumlahTf = WarehouseTransfer::where('id_po', '=', $po[$i]->id)->sum('jumlah');
                $po[$i]['total_transfer'] = (int) $getCountJumlahTf; 
            } else {
                $po[$i]['total_transfer'] = 0; 
            }

            $po[$i]['mesin'] 			= $getMesin;
            $po[$i]['gudang'] 			= $getGudang;
            $po[$i]['customer'] 		= $getCustomer;
            $po[$i]['model'] 			= $getModel;
            $po[$i]['pic_staging'] 		= $getPic;
            $po[$i]['batch'] 			= $getBatch;
            $po[$i]['tahun_produksi'] 	= Carbon::parse($v->tahun_produksi)->format('F-Y');
            $po[$i]['tgl_po'] 			= Carbon::parse($v->tgl_po)->format('d-F-Y');

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

            $getMesin 		= MasterMesin::where('id', $po[$i]->id_type_mesin)->first();
            $getGudang 		= MasterGudang::where('id', $po[$i]->nama_gudang)->first();
            $getCustomer 	= MasterCustomer::where('id', $po[$i]->customer)->first();
            $getModel 		= Models::where('id', $po[$i]->model)->first();
            $getPic 		= PicMitra::where('id', $po[$i]->pic_staging)->first();
            $getBatch 		= Bacth::where('id', $po[$i]->batch)->first();

            $data[$i]['no_po'] 			= $v->no_po;
            $data[$i]['tgl_po'] 		= $v->tgl_po;
            $data[$i]['status_po'] 		= $v->status_po;
            $data[$i]['customer'] 		= $getCustomer ? $getCustomer->bank_desc : "";
            $data[$i]['total'] 			= $v->jumlah;
            $data[$i]['jumlah'] 		= $v->jumlah;
            $data[$i]['model'] 			= $getModel ? $getModel->name : "";
            $data[$i]['mesin'] 			= $getMesin ? $getMesin->type : "";
            $data[$i]['brand'] 			= $v->brand;
            $data[$i]['batch'] 			= $getBatch ? $getBatch->name : "";
            $data[$i]['part_number'] 	= $v->part_number;
            $data[$i]['tahun_produksi'] = Carbon::parse($v->tahun_produksi)->format('F-Y');
            $data[$i]['gudang'] 		= $getGudang ? $getGudang->gudang_desc : "";

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
            $getCustomer 	= MasterCustomer::where('id', $getDatas[$aa]->customer)->first();
            $getMesin 		= MasterMesin::where('id', $getDatas[$aa]->id_type_mesin)->first();
            $getGudang 		= MasterGudang::where('id', $getDatas[$aa]->nama_gudang)->first();
            $getModel 		= Models::where('id', $getDatas[$aa]->model)->first();
            $getPic 		= PicMitra::where('id', $getDatas[$aa]->pic_staging)->first();
            $getBatch 		= Bacth::where('id', $getDatas[$aa]->batch)->first();
            $getPoMaster 	= MasterPo::where('id', $getDatas[$aa]->id_po_master)->first();

            $getDatas[$aa]['customer'] 	= $getCustomer;
            $getDatas[$aa]['mesin'] 	= $getMesin;
            $getDatas[$aa]['gudang'] 	= $getGudang;
            $getDatas[$aa]['model'] 	= $getModel;
            $getDatas[$aa]['pic_staging'] = $getPic;
            $getDatas[$aa]['batch'] 	= $getBatch;
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

    function getDataImplementSummary($idPoMaster, $idCustomer, $idGudang, $dateFrom, $dateTo){

        $query = 'select 
                    tp.id id_po, 
                    tp.no_po, 
                    tp.customer id_customer, 
                    (select bank_desc from mst_customer cust where cust.id = tp.customer ) as customer_name, 
                    concat(mdl.name, "-", mesin.type) as type_mesin, 
                    tp.jumlah as quantity, 
                    tot_kirim.jml as total_kirim, 
                    round((tot_kirim.jml * 100) / tp.jumlah, 0) persen_kirim, 
                    date_format(substr(tp.tgl_masuk, 1, 10), \'%Y-%m-%d\') as tgl_masuk
                    from tbl_po tp 
                    left outer join (
                        select tsd.id_po, count(*) as jml from transaksi_status_delivery tsd 
                            where exists(
                                select 1 from transaksi_status_deliv_detail tsdd 
                                    where tsd.id = tsdd.id_header 
                                    and tsdd.status = "TIBA"
                        ) group by tsd.id_po
                    ) tot_kirim on tp.id = tot_kirim.id_po,
                    (select id, name from models ) mdl, 
                    (select id, type from mst_mesin ) mesin
                    where mdl.id = tp.model
                    and mesin.id = tp.id_type_mesin
                    and exists ( select 1 from transaksi_inspeksi ti where ti.id_po = tp.id)';

        if ($idPoMaster != 'null'){
            $query .= ' and tp.id_po_master = '.$idPoMaster; 
        }

        if ($idCustomer != 'null'){
            $query .= ' and tp.customer = '.$idCustomer; 
        }

        if ($idGudang != 'null'){
            $query .= ' and tp.nama_gudang = '.$idGudang; 
        }

        if ($dateFrom != 'null' && $dateTo != 'null'){
            $query .= ' and date_format(substr(tp.tgl_masuk, 1, 10), \'%Y-%m-%d\') between \''.$dateFrom.'\' and \''.$dateTo.'\'';
            
            
        }

        if ($dateFrom != 'null' && $dateTo == 'null'){
            $query .= ' and date_format(substr(tp.tgl_masuk, 1, 10), \'%Y-%m-%d\')  >= \''.$dateFrom.'\'';
        }

        if ($dateFrom == 'null' && $dateTo != 'null'){
            $query .= ' and date_format(substr(tp.tgl_masuk, 1, 10), \'%Y-%m-%d\')  <= \''.$dateTo.'\'';
        }
        
        $get_data_summ = DB::select($query);

        for ($xx=0; $xx < count($get_data_summ); $xx++ )
        {
            $check_po = PurchaseOrder::select('mdl.name')
                    ->join('models as mdl', 'tbl_po.model', '=', 'mdl.id')
                    ->where('tbl_po.id', $get_data_summ[$xx]->id_po)
                    ->first();

            $column_snMesin = '';
            $jml_mesin_activated = 0;
            switch ($check_po['name']){
                case "ATM"      : $column_snMesin ='ATM_MESIN'; break;
                case "ATMS"     : $column_snMesin ='ATM_MESIN'; break;
                case "CRM"      : $column_snMesin ='CRM_MESIN'; break;
                case "TCR"      : $column_snMesin ='TCR_MESIN'; break;
                case "CS KIOS"  : $column_snMesin ='CS_KIOS_MESIN'; break;
                case "VBK"      : $column_snMesin ='VBK_MESIN'; break;
                case "TTW"      : $column_snMesin ='ATM_MESIN'; break;
                case "CRMS"     : $column_snMesin ='CRM_MESIN'; break;
                default : $column_snMesin ='NEW_MESIN';
            }

            $qry1 = 'select '.$column_snMesin.' from crt_'.$get_data_summ[$xx]->id_po;
            $getSnMesin = DB::select($qry1);

            for( $yy=0; $yy< count($getSnMesin); $yy++ ){
                $get_data_aktivasi =  MasterWSInfo::
                                        where('serial_number', $getSnMesin[$yy]->$column_snMesin)->
                                        where('installation_date', '<>', null)->
                                        first();

                if ($get_data_aktivasi != null){
                    $jml_mesin_activated ++;
                }
            }

            $get_data_summ[$xx]->total_activated = $jml_mesin_activated;
            $get_data_summ[$xx]->total_ba = $jml_mesin_activated;   
            $get_data_summ[$xx]->persen_ba = $jml_mesin_activated ? ($jml_mesin_activated * 100) / $jml_mesin_activated : 0;
        }

        return response()->json([
                'success' => true,
                'totalDatas' => count($get_data_summ), 
                'data' => $get_data_summ
        ], 200);
    }

    function getDataImplementSummaryV2($idPoMaster, $idCustomer, $dateFrom, $dateTo) {
        try {
            // Increase execution time limit if possible
            set_time_limit(300); // Set to 5 minutes
            
            // Build where conditions
            $whereConditions = [];
            $bindings = [];
            
            if ($idPoMaster !== 'null') {
                $whereConditions[] = 'pm.id_po_master = ?';
                $bindings[] = $idPoMaster;
            }

            $idCustomer = 6;
            
            if ($idCustomer !== 'null') {
                $whereConditions[] = 'pm.customer = ?';
                $bindings[] = $idCustomer;
            }
            
            $whereClause = $whereConditions ? ' AND ' . implode(' AND ', $whereConditions) : '';
            
            // Get base data with pagination
            $query = "
                WITH delivery_summary AS (
                    SELECT 
                        tsd.id_po,
                        COUNT(*) as delivery_count
                    FROM transaksi_status_delivery tsd 
                    WHERE EXISTS (
                        SELECT 1 
                        FROM transaksi_status_deliv_detail tsdd 
                        WHERE tsd.id = tsdd.id_header 
                        AND tsdd.status = 'TIBA'
                    )
                    AND tsd.obsolete IS NULL 
                    GROUP BY tsd.id_po
                )
                SELECT 
                    pm.id_po_master,
                    CASE 
                        WHEN pm.no_po LIKE 'No%' THEN TRIM(SUBSTRING(pm.no_po, 4))
                        ELSE pm.no_po
                    END as no_po,
                    pm.customer as id_customer,
                    mc.bank_desc as customer_name,
                    pm.model as id_type,
                    pm.id_type_mesin as id_model,
                    CONCAT(mdl.name, '-', mm.type) as type_mesin,
                    mdl.name as model_name,
                    SUM(pm.jumlah) as quantity,
                    COALESCE(SUM(ds.delivery_count), 0) as total_kirim,
                    ROUND(COALESCE(SUM(ds.delivery_count), 0) * 100.0 / NULLIF(SUM(pm.jumlah), 0), 0) as persen_kirim
                FROM tbl_po pm
                LEFT JOIN delivery_summary ds ON pm.id = ds.id_po
                JOIN mst_customer mc ON mc.id = pm.customer
                JOIN models mdl ON mdl.id = pm.model
                JOIN mst_mesin mm ON mm.id = pm.id_type_mesin
                WHERE pm.id_status_po != 1
                AND EXISTS (SELECT 1 FROM transaksi_inspeksi ti WHERE ti.id_po = pm.id)
                AND pm.deleted_at IS NULL
                {$whereClause}
                GROUP BY 
                    pm.id_po_master,
                    pm.no_po,
                    pm.customer,
                    mc.bank_desc,
                    pm.model,
                    pm.id_type_mesin,
                    mdl.name,
                    mm.type
                ORDER BY pm.id_po_master";

            $summaryData = DB::select($query, $bindings);
            
            // Process in chunks to avoid timeout
            $chunkSize = 10; // Adjust based on your needs
            $chunks = array_chunk($summaryData, $chunkSize);
            
            foreach ($chunks as $chunk) {
                foreach ($chunk as $data) {
                    $activatedCount = $this->getActivatedMachineCountOptimized(
                        $data->id_po_master,
                        $data->id_model,
                        $data->model_name,
                        $dateFrom,
                        $dateTo
                    );
                    
                    $data->total_activated = $activatedCount;
                    $data->total_ba = $activatedCount;
                    $data->persen_ba = $activatedCount > 0 ? 
                        round(($activatedCount * 100) / $activatedCount, 0) : 0;
                }
                
                // Give the server a brief rest between chunks
                usleep(100000); // 0.1 second pause
            }
            
            return response()->json([
                'success' => true,
                'totalDatas' => count($summaryData),
                'data' => $summaryData
            ], 200);
            
        } catch (\Exception $e) {
            \Log::error('Data Summary Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Optimized helper function
    private function getActivatedMachineCountOptimized($idPoMaster, $idModel, $modelName, $dateFrom, $dateTo) {
        try {
            $modelTypes = [
                'ATM' => 'ATM_MESIN',
                'ATMS' => 'ATM_MESIN',
                'CRM' => 'CRM_MESIN',
                'TCR' => 'TCR_MESIN',
                'CS KIOS' => 'CS_KIOS_MESIN',
                'VBK' => 'VBK_MESIN',
                'TTW' => 'ATM_MESIN',
                'CRMS' => 'CRM_MESIN'
            ];
            
            // Get all relevant purchase orders in one query
            $purchaseOrders = PurchaseOrder::select('id')
                ->where('id_po_master', $idPoMaster)
                ->where('id_type_mesin', $idModel)
                ->whereNull('deleted_at')
                ->get();
                
            $columnName = $modelTypes[$modelName] ?? 'NEW_MESIN';
            $activatedCount = 0;
            
            foreach ($purchaseOrders as $po) {
                // Get serial numbers in chunks
                $query = "SELECT {$columnName} FROM crt_{$po->id}";
                $serialNumbers = collect(DB::select($query))->pluck($columnName)->filter();
                
                if ($serialNumbers->isEmpty()) {
                    continue;
                }
                
                // Build efficient query for activation check
                $query = MasterWSInfo::whereIn('serial_number', $serialNumbers);
                
                if ($dateFrom !== 'null') {
                    $query->where('installation_date', '>=', $dateFrom);
                }
                if ($dateTo !== 'null') {
                    $query->where('installation_date', '<=', $dateTo);
                }
                if ($dateFrom === 'null' && $dateTo === 'null') {
                    $query->whereNotNull('installation_date');
                }
                
                $activatedCount += $query->count();
            }
            
            return $activatedCount;
            
        } catch (\Exception $e) {
            \Log::error('Activation Count Error: ' . $e->getMessage());
            return 0;
        }
    }

    function getMachineActivationByCustomer(){
        $month = $_GET['month'] ? $_GET['month'] : '';
        $year = $_GET['year'] ? $_GET['year'] : '';
        
        $dataCustomer = PurchaseOrder::select(['tbl_po.customer', 'mc.bank_desc'])
            ->join('mst_customer as mc', 'tbl_po.customer', '=', 'mc.id')
            ->whereNull('tbl_po.deleted_at');

        if ($month && $year) {
            // Filter by month and year
            $dataCustomer->whereMonth('tbl_po.tgl_po', $month)
                        ->whereYear('tbl_po.tgl_po', $year);
        } elseif ($month) {
            // Filter only by month
            $dataCustomer->whereMonth('tbl_po.tgl_po', $month);
        } elseif ($year) {
            // Filter only by year
            $dataCustomer->whereYear('tbl_po.tgl_po', $year);
        }

        $dataCustomer = $dataCustomer->distinct()
            ->orderBy('tbl_po.customer', 'asc')
            ->get();

        for ($a=0; $a< count($dataCustomer); $a++){

            $get_po = PurchaseOrder::select(['mdl.name', 'tbl_po.*'])
                       ->join('models as mdl', 'tbl_po.model', '=', 'mdl.id')
                       ->where('customer', $dataCustomer[$a]['customer'])
                       ->where('tbl_po.deleted_at', '=', NULL)
                       ->get();

            $jml_mesin_activated = 0;
            for ($b=0; $b<count($get_po);  $b++){
                $id_po           = $get_po[$b]['id'];
                $column_snMesin  = '';

                switch ($get_po[$b]['name']){
                    case "ATM"      : $column_snMesin ='ATM_MESIN'; break;
                    case "ATMS"     : $column_snMesin ='ATM_MESIN'; break;
                    case "CRM"      : $column_snMesin ='CRM_MESIN'; break;
                    case "TCR"      : $column_snMesin ='TCR_MESIN'; break;
                    case "CS KIOS"  : $column_snMesin ='CS_KIOS_MESIN'; break;
                    case "VBK"      : $column_snMesin ='VBK_MESIN'; break;
                    case "TTW"      : $column_snMesin ='ATM_MESIN'; break;
                    case "CRMS"     : $column_snMesin ='CRM_MESIN'; break;
                    default : $column_snMesin ='NEW_MESIN';
                }

                $qry1 = 'select '.$column_snMesin.' from crt_'.$id_po.' where '.$column_snMesin.' is not null';
                $getSnMesin = DB::select($qry1);
    
                for ($c=0; $c<count($getSnMesin); $c++){
                    $get_data_aktivasi = MasterWSInfo::
                                            where('serial_number', $getSnMesin[$c]->$column_snMesin)->
                                            where('installation_date', '<>', null)->
                                            first();

                    if ($get_data_aktivasi != null){
                        $jml_mesin_activated ++;
                    }
                }
            }
            $dataCustomer[$a]['total_activated'] = $jml_mesin_activated;
        }

        return response()->json([
                'success' => true,
                'totalDatas' => count($dataCustomer), 
                'data' => $dataCustomer
        ], 200);
    }


    function getPreStaggingSummary($idCustomer, $idModel, $idPoMaster){

        $query =   'select 
                      po.id as id_po
                    , po.id_po_master
                    , po.no_po
                    , po.part_number as pn_system
                    , po.model as id_type
                    , (select name from models mdl where mdl.id = po.model) as types
                    , po.id_type_mesin as id_model
                    , (select msn.type from mst_mesin msn where msn.id = po.id_type_mesin) as model
                    , po.customer id_cust
                    , (select cust.bank_desc from mst_customer cust where cust.id = po.customer) as customer
                    , po.jumlah as total
                    , ifnull(qty_passed.qty, 0) as qty_passed
                    , ifnull(qty_not_passed.qty, 0) as qty_not_passed
                    , ifnull(qty_passed.qty, 0) - ifnull(qty_not_passed.qty, 0) as balance
                   from 
                    tbl_po po
                    left outer join (
                        select tcs.id_po, count(*) as qty
                        from transaksi_checklist_staging tcs 
                        where results = "OK"
                        group by tcs.id_po
                    ) qty_passed on qty_passed.id_po = po.id
                    left outer join (
                        select tcs.id_po, count(*) as qty
                        from transaksi_checklist_staging tcs 
                        where results = "NG"
                        group by tcs.id_po
                    ) qty_not_passed on qty_not_passed.id_po = po.id
                    where 1=1';

        if ($idCustomer != 'null'){
            $query .= ' and po.customer = '.$idCustomer; 
        }

        if ($idModel != 'null'){
            $query .= ' and po.id_type_mesin = '.$idModel;
        }

        if ($idPoMaster != 'null'){
            $query .= ' and po.id_po_master = '.$idPoMaster;
        }

        $get_prestaging_summ = DB::select($query);

        return response()->json([
                'success' => true,
                'totalDatas' => count($get_prestaging_summ), 
                'data' => $get_prestaging_summ
        ], 200);
    }

    function getWarehouseSummary($idWarehouse, $idCustomer, $idModel, $idStyle, $statusMesin, $process, $dateFrom, $dateTo){
          /*$query = 'SELECT xx.*
                     FROM
                      (-- query untuk proccess staging
                      SELECT tp.id AS id_po,
                         tp.no_po,
                        "Staging" AS process,
                          tp.nama_gudang as id_warehouse,
                         (SELECT gdg.gudang_desc FROM mst_gudang gdg WHERE gdg.id = tp.nama_gudang )AS warehouse,
                         tp.customer as id_customer, 
                         (SELECT cust.bank_desc FROM mst_customer cust WHERE cust.id = tp.customer) AS customer,
                         tp.model as id_types,
                         (SELECT name FROM models mdl WHERE mdl.id = tp.model ) AS types,
                         tp.id_type_mesin as id_models,
                         (SELECT msn.type FROM mst_mesin msn WHERE msn.id = tp.id_type_mesin ) AS models,
                          tp.status_mesin,
                          tp.style as id_style, 
                         (SELECT sty.name FROM mst_style sty WHERE sty.id = tp.style) AS styles,
                          NULL AS qty_before_delivery,
                          (
                           select count(*) from transaksi_status_delivery tsd
                              where exists (
                                select 1 from transaksi_status_deliv_detail tsdd 
                                    where tsdd.id_header = tsd.id 
                                    and tsdd.status = "TIBA"
                              )
                             and tsd.id_po = tp.id
                          ) qty_delivery,
                          NULL balance, 
                          date_format(substr(tp.tgl_masuk, 1, 10), \'%Y-%m-%d\')  as tgl_masuk
                       FROM tbl_po tp
                       where tp.deleted_at IS NULL
                       UNION -- query untuk process warehouse Transfer
                    SELECT wt.id_po,
                         (SELECT po.no_po FROM tbl_po po WHERE po.id = wt.id_po) AS no_po,
                         "Warehouse Transfer" AS process,
                         wt.to_warehouse as id_warehouse, 
                         (SELECT gdg.gudang_desc FROM mst_gudang gdg WHERE gdg.id = wt.to_warehouse )AS warehouse,
                         wt.id_customer, 
                         (SELECT cust.bank_desc FROM mst_customer cust WHERE cust.id = wt.id_customer) AS customer, 
                        get_model.id_types, 
                        get_model.types,
                        get_model.id_model as id_models,
                        get_model.type AS models,
                        get_model.status_mesin,
                        get_model.id_style, 
                        get_model.styles,
                        wt.jumlah qty_before_delivery,
                        0 qty_delivery,
                        null balance, 
                        date_format(substr(wt.tgl_masuk, 1, 10), \'%Y-%m-%d\') as tgl_masuk
                       FROM warehouse_transfer wt,
                         (SELECT pos.id AS id_pos, msn.id as id_model, msn.type, styles.id as id_style, pos.model as id_types, 
                            styles.name AS styles, pos.status_mesin,
                            (SELECT name FROM models WHERE id = pos.model) AS types
                          FROM tbl_po pos
                          LEFT OUTER JOIN
                            (SELECT id, name FROM mst_style ms) styles ON styles.id = pos.style,
                          mst_mesin msn
                          WHERE msn.id = pos.id_type_mesin ) get_model
                       WHERE wt.id_po = get_model.id_pos ) xx
                    WHERE 1=1'; */

        // $query = ' SELECT xx.id_po, 
		// 			xx.no_po, 
		// 			xx.process, 
		// 			xx.id_status_po, 
		// 			xx.id_warehouse, 
		// 			xx.warehouse, 
		// 			xx.id_customer, 
		// 			xx.customer, 
		// 			xx.id_types, 
		// 			xx.types, 
		// 			xx.id_models, 
		// 			xx.models, 
		// 			xx.status_mesin,
		// 			xx.id_style, 
		// 			xx.styles, 
		// 			xx.qty_before_delivery, 
		// 			xx.qty_delivery + xx.qty_withdrawal as qty_delivery, 
		// 			xx.balance, 
		// 			xx.tgl_masuk
        //              FROM
        //               (-- query untuk proccess staging
        //                 SELECT tp.id AS id_po,
        //                  tp.no_po,
        //                 "Staging" AS process,
        //                  tp.id_status_po, 
        //                   tp.nama_gudang as id_warehouse,
        //                  (SELECT gdg.gudang_desc FROM mst_gudang gdg WHERE gdg.id = tp.nama_gudang )AS warehouse,
        //                  tp.customer as id_customer, 
        //                  (SELECT cust.bank_desc FROM mst_customer cust WHERE cust.id = tp.customer) AS customer,
        //                  tp.model as id_types,
        //                  (SELECT name FROM models mdl WHERE mdl.id = tp.model ) AS types,
        //                  tp.id_type_mesin as id_models,
        //                  (SELECT msn.type FROM mst_mesin msn WHERE msn.id = tp.id_type_mesin ) AS models,
        //                   tp.status_mesin,
        //                   tp.style as id_style, 
        //                  (SELECT sty.name FROM mst_style sty WHERE sty.id = tp.style) AS styles,
        //                   NULL AS qty_before_delivery,
        //                   (
        //                    select count(*) from transaksi_status_delivery tsd
        //                       where exists (
        //                         select 1 from transaksi_status_deliv_detail tsdd 
        //                             where tsdd.id_header = tsd.id 
        //                             and tsdd.status = "TIBA"
        //                       )
        //                      and tsd.id_po = tp.id
        //                   ) qty_delivery,
        //                   (case when ( tp.id_status_po = 1 ) then
	    //                     (select 
		// 						count(*) 
		// 						from delivery_request dr 
		// 						where 
		// 						dr.id_po = tp.id 
		// 						and dr.task = \'WITHDRAWAL\'
		// 						and (dr.status_approval NOT IN (0, 2) or  dr.status_approval IS NULL)
		// 				    )
		// 				    else 
		// 				    	0
        //                   end) as qty_withdrawal, 
        //                   NULL balance, 
        //                   date_format(substr(tp.tgl_masuk, 1, 10), \'%Y-%m-%d\')  as tgl_masuk
        //                FROM tbl_po tp
        //                where tp.deleted_at IS NULL 
        //                and tp.id IN (64, 47)
        //                UNION -- query untuk process warehouse Transfer
        //             SELECT wt.id_po,
        //                  (SELECT po.no_po FROM tbl_po po WHERE po.id = wt.id_po) AS no_po,
        //                  "Warehouse Transfer" AS process,
        //                  NULL id_status_po, 
        //                  wt.to_warehouse as id_warehouse, 
        //                  (SELECT gdg.gudang_desc FROM mst_gudang gdg WHERE gdg.id = wt.to_warehouse )AS warehouse,
        //                  wt.id_customer, 
        //                  (SELECT cust.bank_desc FROM mst_customer cust WHERE cust.id = wt.id_customer) AS customer, 
        //                 get_model.id_types, 
        //                 get_model.types,
        //                 get_model.id_model as id_models,
        //                 get_model.type AS models,
        //                 get_model.status_mesin,
        //                 get_model.id_style, 
        //                 get_model.styles,
        //                 wt.jumlah qty_before_delivery,
        //                 0 qty_delivery,
        //                 0 as qty_withdrawal, 
        //                 null balance, 
        //                 date_format(substr(wt.tgl_masuk, 1, 10), \'%Y-%m-%d\') as tgl_masuk
        //                FROM warehouse_transfer wt,
        //                  (SELECT pos.id AS id_pos, msn.id as id_model, msn.type, styles.id as id_style, pos.model as id_types, 
        //                     styles.name AS styles, pos.status_mesin,
        //                     (SELECT name FROM models WHERE id = pos.model) AS types
        //                   FROM tbl_po pos
        //                   LEFT OUTER JOIN
        //                     (SELECT id, name FROM mst_style ms) styles ON styles.id = pos.style,
        //                   mst_mesin msn
        //                   WHERE msn.id = pos.id_type_mesin ) get_model
        //                WHERE wt.id_po = get_model.id_pos ) xx
        //             WHERE 1=1';

        $query = 'SELECT xx.id_po, 
                    xx.no_po, 
                    xx.process, 
                    xx.id_status_po, 
                    xx.id_warehouse, 
                    xx.warehouse, 
                    xx.id_customer, 
                    xx.customer, 
                    xx.id_types, 
                    xx.types, 
                    xx.id_models, 
                    xx.models, 
                    xx.status_mesin,
                    xx.id_style, 
                    xx.styles, 
                    case when xx.process = "Warehouse Transfer" then 
                    	xx.qty_before_delivery - xx.jml_mesin_to_po_valid
                    else 
                    	xx.qty_before_delivery
                    end as qty_before_delivery,
                    case 
	                    when xx.qty_delivery  = 0 and xx.qty_withdrawal > 0 and xx.qty_request_delivery = 0 then 
                    		xx.qty_withdrawal - xx.qty_withdrawal
                    	when xx.qty_withdrawal > 0 and xx.qty_request_delivery > 0 then
                    	   xx.qty_request_delivery
                    	when xx.qty_delivery > 0 and xx.qty_withdrawal > 0 then 
                    	   (xx.qty_delivery + xx.qty_withdrawal) - xx.qty_withdrawal
                    	else 
                      	    xx.qty_delivery + (xx.qty_withdrawal + xx.qty_request_delivery )
                    end as qty_delivery, 
                    -- case 
                    --     when xx.qty_withdrawal = 0 then 
                    --         xx.qty_delivery + xx.qty_withdrawal
                    --     when xx.qty_withdrawal > 0 then 
                    --         0
                    -- end qty_delivery, 
                    xx.qty_request_delivery, 
                    xx.balance, 
                    xx.tgl_masuk, 
                    xx.jml_mesin_tf, 
                    xx.status_po, 
                    xx.jml_mesin 
                    FROM
                    (-- query untuk proccess staging
                        SELECT tp.id AS id_po,
                        tp.no_po,
                        "Staging" AS process,
                        tp.id_status_po, 
                        tp.nama_gudang as id_warehouse,
                        (SELECT gdg.gudang_desc FROM mst_gudang gdg WHERE gdg.id = tp.nama_gudang )AS warehouse,
                        tp.customer as id_customer, 
                        (SELECT cust.bank_desc FROM mst_customer cust WHERE cust.id = tp.customer) AS customer,
                        tp.model as id_types,
                        (SELECT name FROM models mdl WHERE mdl.id = tp.model ) AS types,
                        tp.id_type_mesin as id_models,
                        (SELECT msn.type FROM mst_mesin msn WHERE msn.id = tp.id_type_mesin ) AS models,
                        tp.status_mesin,
                        tp.style as id_style, 
                        (SELECT sty.name FROM mst_style sty WHERE sty.id = tp.style) AS styles,
                        NULL AS qty_before_delivery,
                        (
                        select count(*) from transaksi_status_delivery tsd
                            where exists (
                                select 1 from transaksi_status_deliv_detail tsdd 
                                    where tsdd.id_header = tsd.id 
                                    and tsdd.status = "TIBA"
                            )
                            and tsd.id_po = tp.id
                            and tsd.obsolete is null 
                        ) qty_delivery,
                        -- (case when ( tp.id_status_po = 1 ) then
                            (select 
                                -- count(*) 
                                count(distinct dr.id_po, dr.sn_mesin)
                                from delivery_request dr 
                                where 
                                dr.id_po = tp.id 
                                and dr.task = \'WITHDRAWAL\'
                                -- and (dr.status_approval NOT IN (0, 2) or  dr.status_approval IS NULL)
                                and (dr.status_approval IS NOT NULL)
                            )
                        --    else 
                        --       0
                        -- end) 
                        as qty_withdrawal, 
                        -- (case when ( tp.id_status_po = 1 ) then
                            (select 
                                -- count(*)
                                count(distinct dr.id_po, dr.sn_mesin)  
                                from delivery_request dr 
                                where 
                                dr.id_po = tp.id 
                                and dr.task = \'DELIVERY\'
                                -- and (dr.status_approval NOT IN (0, 2) or  dr.status_approval IS NULL)
                                and (dr.status_approval IS NOT NULL)
                            )
                        --    else 
                        --        0
                        -- end) 
                        as qty_request_delivery,
                        NULL balance, 
                        date_format(substr(tp.tgl_masuk, 1, 10), \'%Y-%m-%d\')  as tgl_masuk, 
                        -- (select IFNULL(sum(xx.jumlah), 0) as jml_mesin_tf from warehouse_transfer xx where xx.id_po = tp.id ) as jml_mesin_tf,
                        (select IFNULL(count( distinct xx.sn_mesins ), 0) as jml_mesin_tf from warehouse_transfer xx where xx.id_po = tp.id ) as jml_mesin_tf,  
                        tp.status_po, 
                        tp.jumlah as jml_mesin, 
                        0 jml_mesin_to_po_valid
                    FROM tbl_po tp
                    where tp.deleted_at IS NULL 
                    -- and tp.id  = 50 -- IN (93, 50)
                    -- and tp.id IN (64, 47)
                    UNION -- query untuk process warehouse Transfer
                    SELECT wt.id_po,
                        (SELECT po.no_po FROM tbl_po po WHERE po.id = wt.id_po) AS no_po,
                        "Warehouse Transfer" AS process,
                        NULL id_status_po, 
                        wt.to_warehouse as id_warehouse, 
                        (SELECT gdg.gudang_desc FROM mst_gudang gdg WHERE gdg.id = wt.to_warehouse )AS warehouse,
                        wt.id_customer, 
                        (SELECT cust.bank_desc FROM mst_customer cust WHERE cust.id = wt.id_customer) AS customer, 
                        get_model.id_types, 
                        get_model.types,
                        get_model.id_model as id_models,
                        get_model.type AS models,
                        get_model.status_mesin,
                        get_model.id_style, 
                        get_model.styles,
                        wt.jumlah qty_before_delivery,
                        0 qty_delivery,
                        0 as qty_withdrawal, 
                        null qty_request_delivery, 
                        null balance, 
                        date_format(substr(wt.tgl_masuk, 1, 10), \'%Y-%m-%d\') as tgl_masuk, 
                        0 jml_mesin_tf, 
                        NULL status_po, 
                        NULL as jml_mesin, 
                        (select count(*) from tbl_po yy where yy.deleted_at is null and yy.copy_from_id_po = wt.id_po and yy.sn_mesins = wt.sn_mesins) as jml_mesin_to_po_valid
                    FROM warehouse_transfer wt,
                        (SELECT pos.id AS id_pos, msn.id as id_model, msn.type, styles.id as id_style, pos.model as id_types, 
                            styles.name AS styles, pos.status_mesin,
                            (SELECT name FROM models WHERE id = pos.model) AS types
                        FROM tbl_po pos
                        LEFT OUTER JOIN
                            (SELECT id, name FROM mst_style ms) styles ON styles.id = pos.style,
                        mst_mesin msn
                        WHERE msn.id = pos.id_type_mesin ) get_model
                    WHERE wt.id_po = get_model.id_pos 
                     and wt.created_at = (
                    	select max(xx.created_at) from warehouse_transfer xx 
                        where xx.id_po = wt.id_po
                    	and xx.sn_mesins = wt.sn_mesins
                     )
                    ) xx
                WHERE 1=1';

        if ($idWarehouse != 'null'){
            $query .= ' and xx.id_warehouse = '.$idWarehouse; 
        }

        if ($idCustomer != 'null'){
            $query .= ' and xx.id_customer = '.$idCustomer; 
        }

        if ($idModel != 'null'){
            $query .= ' and xx.id_models = '.$idModel;
        }

        if ($idStyle != 'null'){
            $query .= ' and xx.id_style = '.$idStyle;
        }

        if ($statusMesin != 'null'){
            $query .= ' and xx.status_mesin = "'.$statusMesin.'"';
        }

        if ($process != 'null'){
            $query .= ' and xx.process = "'.$process.'"';
        }

        if ($dateFrom != 'null' && $dateTo != 'null'){
            $query .= ' and date_format(xx.tgl_masuk, \'%Y-%m-%d\') between \''.$dateFrom.'\' and \''.$dateTo.'\''; 
        }

        if ($dateFrom != 'null' && $dateTo == 'null'){
            $query .= ' and date_format(xx.tgl_masuk, \'%Y-%m-%d\') >= \''.$dateFrom.'\'';
        }

        if ($dateFrom == 'null' && $dateTo != 'null'){
            $query .= ' and date_format(xx.tgl_masuk, \'%Y-%m-%d\') <= \''.$dateTo.'\'';
        }

        $get_warehouse_summ = DB::select($query);

        for ($xx=0; $xx< count($get_warehouse_summ); $xx++){
            if ($get_warehouse_summ[$xx]->process == 'Staging'){
                $column_snMesin = '';
                switch ($get_warehouse_summ[$xx]->types){
                    case "ATM"      : $column_snMesin ='ATM_MESIN'; break;
                    case "ATMS"     : $column_snMesin ='ATM_MESIN'; break;
                    case "CRM"      : $column_snMesin ='CRM_MESIN'; break;
                    case "TCR"      : $column_snMesin ='TCR_MESIN'; break;
                    case "CS KIOS"  : $column_snMesin ='CS_KIOS_MESIN'; break;
                    case "VBK"      : $column_snMesin ='VBK_MESIN'; break;
                    case "TTW"      : $column_snMesin ='ATM_MESIN'; break;
                    case "CRMS"     : $column_snMesin ='CRM_MESIN'; break;
                    default : $column_snMesin ='NEW_MESIN';
                }

                // jumlah mesin yg sudah di staging
                $get_jml_mesin = $this->getCountDataMesinStaging($get_warehouse_summ[$xx]->id_po, $column_snMesin);
                $get_warehouse_summ[$xx]->qty_before_delivery = $get_jml_mesin - $get_warehouse_summ[$xx]->jml_mesin_tf; 

                if ( $get_warehouse_summ[$xx]->status_po  == 'Dummy'){
                    // tambah kondisi untuk po dummy jika mesih dibuat jadi po valid 
                    // akan mengurangi qty delivery di po dummy  
                    $idPo = $get_warehouse_summ[$xx]->id_po;
                    $get_jml_mesin_keluar = 'select count(*) as jml_mesin_keluar from crt_'.$idPo.' where '.$column_snMesin. ' IS NOT NULL AND STATUS_MESIN = "KELUAR"';
                    $get_mesin_out = DB::select($get_jml_mesin_keluar)[0]->jml_mesin_keluar;

                    //dd($get_mesin_out, $get_warehouse_summ[$xx]);
                    if ($get_mesin_out == $get_warehouse_summ[$xx]->jml_mesin){
                        $get_warehouse_summ[$xx]->qty_delivery = 0; 
                    }
                }
                // $get_warehouse_summ[$xx]->qty_delivery = 0;
                $get_warehouse_summ[$xx]->balance = $get_jml_mesin - $get_warehouse_summ[$xx]->qty_delivery;
            } else {
                // get data untuk Warehouse Transfer 
                $id_po = $get_warehouse_summ[$xx]->id_po;
                $sql = 'select sn_mesins from warehouse_transfer wt where wt.id_po = '.$id_po;
                $get_data = json_decode(DB::select($sql)[0]->sn_mesins, true);

                $jml_mesin_delivered = 0;
                for ($i=0; $i< count($get_data); $i++){
                    // ngitung jumlah mesin warehouse transfer yg sudah di delivery 
                    $sql2 = 'select count(*) as recount_mesin from transaksi_status_delivery tsd 
                                where exists ( 
                                    select 1 from transaksi_status_deliv_detail tsdd 
                                    where tsdd.id_header = tsd.id 
                                    and tsdd.status = "TIBA"
                                ) 
                                and tsd.id_po = '.$id_po.'
                                and tsd.id_mesin = '.$get_data[$i]['idMesin'].'
                                and tsd.sn_mesin = "'.$get_data[$i]['snMesin'].'"';

                    $get_count_mesin = DB::select($sql2 )[0]->recount_mesin;
                    $jml_mesin_delivered +=$get_count_mesin;
                }
                $get_warehouse_summ[$xx]->qty_delivery = $jml_mesin_delivered;
                $get_warehouse_summ[$xx]->balance = $get_warehouse_summ[$xx]->qty_before_delivery - $jml_mesin_delivered;
            }
        }

        return response()->json([
                'success' => true,
                'totalDatas' => count($get_warehouse_summ), 
                'data' => $get_warehouse_summ
        ], 200);
    }

    function getMachineSummary($idPoMaster, $idBatch) {
            $sql = 'select 
                    (
                    case when xx.customer = \'Bank Central Asia\' then case when (xx.models) LIKE \'MX%\' then concat(
                        \'MONIMAX\', 
                        substr(xx.models, 3)
                    ) else xx.models end else xx.models end
                    ) as model_by_customer, 
                    xx.* 
                from 
                    (
                    select 
                        po.id, 
                        po.no_po, 
                        po.id_po_master, 
                        po.model as id_type, 
                        (
                            select (case when m.name IN (\'ATM\', \'ATMS\') then 
                                            \'ATM\' 
                                        when m.name IN (\'CRM\', \'CRMS\') then 
                                            \'CRM\' 
                                    else 
                                        m.name 
                                    end) 
                            from models m 
                            where m.id = po.model
                        ) as types, 
                        po.id_type_mesin as id_model, 
                        (
                            select msn.type 
                            from mst_mesin msn 
                            where msn.id = po.id_type_mesin
                        ) as models, 
                        po.brand, 
                        po.customer as id_customer, 
                        (
                            select mc.bank_desc from mst_customer mc 
                            where mc.id = po.customer
                        ) as customer, 
                        po.nama_gudang as id_gudang, 
                        (
                            select mg.gudang_desc from mst_gudang mg 
                            where mg.id = po.nama_gudang
                        ) as gudang, 
                        date_format(substr(po.tgl_masuk, 1, 10), \'%Y-%m-%d\') as tanggal_masuk, 
                        po.batch, 
                        (
                            select bp.name from bacth_po bp 
                            where bp.id = po.batch
                        ) as batch_name 
                    from 
                        tbl_po po
                        where po.deleted_at IS NULL
                    ) xx 
                where 
                    1 = 1';

        if ($idPoMaster != 'null'){
            $sql .= ' and xx.id_po_master = '.$idPoMaster;
        }

        if ($idBatch != 'null'){
            $sql .= ' and xx.batch = '.$idBatch;
        }

        $get_all_data = DB::select($sql);
        $get_all_machine = [];
        
        for ($xx=0; $xx< count($get_all_data); $xx++){

            $column_snMesin = '';
            switch ($get_all_data[$xx]->types){
                case "ATM"      : $column_snMesin ='ATM_MESIN'; break;
                case "ATMS"     : $column_snMesin ='ATM_MESIN'; break;
                case "CRM"      : $column_snMesin ='CRM_MESIN'; break;
                case "TCR"      : $column_snMesin ='TCR_MESIN'; break;
                case "CS KIOS"  : $column_snMesin ='CS_KIOS_MESIN'; break;
                case "VBK"      : $column_snMesin ='VBK_MESIN'; break;
                case "TTW"      : $column_snMesin ='ATM_MESIN'; break;
                case "CRMS"     : $column_snMesin ='CRM_MESIN'; break;
                default : $column_snMesin ='NEW_MESIN';
            }

            $sql2 = 'select '.$column_snMesin.', NO_BARIS_MESIN from crt_'.$get_all_data[$xx]->id.' where '.$column_snMesin.' is not null';
            $getsnMesin_per_po = DB::select($sql2);

            for ($yy=0; $yy<count($getsnMesin_per_po); $yy++){

                $datas = [
                    'id_po'             => $get_all_data[$xx]->id, 
                    'no_po'             => $get_all_data[$xx]->no_po, 
                    'sn_mesin'          => $getsnMesin_per_po[$yy]->$column_snMesin, 
                    'no_baris_mesin'    => $getsnMesin_per_po[$yy]->NO_BARIS_MESIN, 
                    'models'            => $get_all_data[$xx]->models, 
                    'model_by_customer' => $get_all_data[$xx]->model_by_customer, 
                    'customer'          => $get_all_data[$xx]->customer,
                    'types'             => $get_all_data[$xx]->types, 
                    'no_po'             => $get_all_data[$xx]->no_po, 
                    'brand'             => $get_all_data[$xx]->brand, 
                    'gudang'            => $get_all_data[$xx]->gudang
                ];

                array_push($get_all_machine, $datas);
            }
        }

        if ($idPoMaster != 'null' && $idBatch != 'null' ) {
            $select_po = PurchaseOrder::where('id_po_master', $idPoMaster)->where('batch', $idBatch)->where('deleted_at', '=', NULL)->first();

            $getCustomer = MasterCustomer::where('id', $select_po->customer)->first();
            $getModel = Models::where('id', $select_po->model)->first();
            $getMesin = MasterMesin::where('id', $select_po->id_type_mesin)->first();
            $getBatch = Bacth::where('id', $select_po->batch)->first();

            // Kondisi untuk id=> 3 = BCA
            if ($getCustomer->id == 3){
                if (str_contains($getMesin->type, 'MX-')){
                    $select_po['model_bca'] = 'MONIMAX-'.substr($getMesin->type, 3);
                } else {
                    $select_po['model_bca'] = $getMesin->type;
                }
            }
            
            $select_po['customer'] = $getCustomer;
            $select_po['type'] = $getModel;
            $select_po['model'] = $getMesin;
            $select_po['batch'] = $getBatch;
        }

        return response()->json([
                'success' => true,
                'totalDatas' => count($get_all_machine), 
                'data' => $get_all_machine, 
                'detail_po' => isset($select_po ) ? $select_po : []
        ], 200);
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
        $hiddenColumns = ['id', 'ATM_MESIN', 'CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'NEW_MESIN', 
                          'VBK_MESIN', 'NOTES', 'TIME_STAGING', 'TIME_PRELOADING', 'TIME_CHECKLIST', 'STATUS_MESIN'];
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


    // get batch on Po Master 
    function getDataBatchOnPoMaster($idPoMaster){
        $po = PurchaseOrder::select('batch')->where('id_po_master', $idPoMaster)->get();
        $get_batch =  Bacth::whereIn('id', $po)->get();

        return response()->json([
            'success' => true,
            'data' => $get_batch
        ]);
    }

    // get data for summary Machine 
    function getAccessoriesSummary($idPoMaster, $idBatch){

        $get_po = PurchaseOrder::where('id_po_master', $idPoMaster)->where('batch', $idBatch)->first();
        $datas = [];
        if ($get_po){
            $datas['detail_po'] = $get_po;
            $id_po = $datas['detail_po']['id'];
            
            $get_customer   = MasterCustomer::where('id', $get_po['customer'])->first();
            $get_batch      = Bacth::where('id', $get_po['batch'])->first();
            $get_model      = Models::where('id', $get_po['model'])->first();
            $get_mesin      = MasterMesin::where('id', $get_po['id_type_mesin'])->first();
            $getGudang      = MasterGudang::where('id', $get_po['nama_gudang'])->first();

            // dd();
            // Kondisi untuk id=> 3 = BCA
            if ($get_customer->id == 3){
                if (str_contains($get_mesin->type, 'MX-')){
                    $datas['detail_po']['model_bca'] = 'MONIMAX-'.substr($get_mesin->type, 3);
                } else {
                    $datas['detail_po']['model_bca'] = $get_mesin->type;
                }
            }

            $datas['detail_po']['customer']     = $get_customer;
            $datas['detail_po']['batch']        = $get_batch;
            $datas['detail_po']['type']         = $get_model;
            $datas['detail_po']['model']        = $get_mesin; 
            $datas['detail_po']['gudang']       = $getGudang;

            $column_snMesin = '';
            switch ($datas['detail_po']['type']['name']){
                case "ATM"      : $column_snMesin ='ATM_MESIN'; break;
                case "ATMS"     : $column_snMesin ='ATM_MESIN'; break;
                case "CRM"      : $column_snMesin ='CRM_MESIN'; break;
                case "TCR"      : $column_snMesin ='TCR_MESIN'; break;
                case "CS KIOS"  : $column_snMesin ='CS_KIOS_MESIN'; break;
                case "VBK"      : $column_snMesin ='VBK_MESIN'; break;
                case "TTW"      : $column_snMesin ='ATM_MESIN'; break;
                case "CRMS"     : $column_snMesin ='CRM_MESIN'; break;
                default : $column_snMesin ='NEW_MESIN';
            }

            $tableColumns = Schema::getColumnListing('crt_'.$get_po['id']);
            $format_tableColumn = [];

            for ($xx=0; $xx< count($tableColumns); $xx++){
               if (!str_contains( $tableColumns[$xx], '_PN') && !str_contains( $tableColumns[$xx], '_PM') && !str_contains( $tableColumns[$xx], '_PARTNAME')){
                   array_push($format_tableColumn, $tableColumns[$xx]);
               }
            }

            $hiddenColumns = ['id', 'ATM_MESIN', 'CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'NEW_MESIN',
                                'VBK_MESIN', 'NOTES', 'TIME_STAGING', 'TIME_PRELOADING', 'TIME_CHECKLIST', 'NO_BARIS_MESIN', 'STATUS_MESIN'];

            $columns = array_diff($format_tableColumn, $hiddenColumns);
            $dataColumn = array_values($columns);
            
            $sql = 'select * from crt_'.$get_po['id'].' where '.$column_snMesin.' is not null';
            $dt = DB::select($sql);
            
            $data_sn_part = [];
            for ($xx=0; $xx<count($dt); $xx++){
                $data       = $dt[$xx];
                $sn_mesin   = $dt[$xx]->$column_snMesin;
                $model      = str_contains($get_mesin->type, 'MX') ? substr($get_mesin->type, 3) : $get_mesin->type;
                
                for ($yy=0; $yy< count($dataColumn); $yy++){
                    $data_sn        = [];
                    $coll_name      = (String)$dataColumn[$yy];
                    $coll_name2     = (String)$dataColumn[$yy].'_PM';
                    $sn_part        = $data->$coll_name;
                    $part_model     = $data->$coll_name2;

                    $get_description = 'select part_desc from mst_part_number where part_column=\''.$coll_name.'\' and id_mesin ='.$get_po['id_type_mesin'];
                    $get_desc        = DB::select($get_description)[0]->part_desc;

                    if ($get_customer->id == 3 && in_array($get_model['name'], ['ATM', 'CRM'])){
                        $get_part_name = 'select '.$coll_name.'_PARTNAME as PARTNAME from crt_'.$id_po;
                        $get_partName = DB::select($get_part_name)[0]->PARTNAME;

                        $get_partName = isset($get_partName) ? $get_partName : $datas['detail_po']['type']['name'].' '.$get_desc ;
                        $concat_jenis_accesoris = isset($part_model) ? $part_model : $datas['detail_po']['type']['name'];
                    } else {
                        $get_partName = $get_desc;
                        $concat_jenis_accesoris = $part_model.' '.$datas['detail_po']['type']['name'];
                    }

                    $data_sn = [
                        'part_sn'                   => $sn_part, 
                        'merk_aksesoris'            => $get_po['brand'], 
                        'part_desc'                 => $get_partName, 
                        'concat_tipe_aksesoris'     => $get_partName.' '.$get_po['brand'].' '.$model, 
                        'type'                      => $datas['detail_po']['type']['name'],
                        'part_model'                => $part_model,
                        'concat_jenis_aksesoris'    => $concat_jenis_accesoris,
                        'sn_paketmesin'             => $sn_mesin, 
                        'no_baris_mesin'            => $data->NO_BARIS_MESIN, 
                        'nama_gudang'               => $getGudang['gudang_desc']
                    ];
                    array_push($data_sn_part, $data_sn);
                }
            }
            $datas['list_items'] = [
                'count_data' => count($data_sn_part), 
                'items' => $data_sn_part
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $datas
        ]);
    }

    function getAccessoriesSummaryV2($idPoMaster, $idBatch){

        $get_po = PurchaseOrder::where('id_po_master', $idPoMaster)->where('batch', $idBatch)->where('deleted_at', NULL)->get();
        $datas = [];
        if ($get_po){
            $data_sn_part = [];
            for($x=0; $x< count($get_po); $x++){
                $datas['data_po'][$x] = $get_po[$x];
                $id_po = $datas['data_po'][$x]['id'];
                
                $get_customer   = MasterCustomer::where('id', $datas['data_po'][$x]['customer'])->first();
                $get_model      = Models::where('id', $datas['data_po'][$x]['model'])->first();
                $get_mesin      = MasterMesin::where('id', $datas['data_po'][$x]['id_type_mesin'])->first();
                $getGudang      = MasterGudang::where('id', $datas['data_po'][$x]['nama_gudang'])->first();
                $getBatch       = Bacth::where('id', $datas['data_po'][$x]['batch'])->first();

                if ($get_customer->id == 3){
                    if (str_contains($get_mesin->type, 'MX-')){
                        $datas['data_po'][$x]['model_bca'] = 'MONIMAX-'.substr($get_mesin->type, 3);
                    } else {
                        $datas['data_po'][$x]['model_bca'] = $get_mesin->type;
                    }
                }

                $datas['data_po'][$x]['customer']     = $get_customer;
                $datas['data_po'][$x]['type']         = $get_model;
                $datas['data_po'][$x]['model']        = $get_mesin; 
                $datas['data_po'][$x]['gudang']       = $getGudang;
                $datas['data_po'][$x]['batch']       = $getBatch;

                $column_snMesin = '';
                switch ($datas['data_po'][$x]['type']['name']){
                    case "ATM"      : $column_snMesin ='ATM_MESIN'; break;
                    case "ATMS"     : $column_snMesin ='ATM_MESIN'; break;
                    case "CRM"      : $column_snMesin ='CRM_MESIN'; break;
                    case "TCR"      : $column_snMesin ='TCR_MESIN'; break;
                    case "CS KIOS"  : $column_snMesin ='CS_KIOS_MESIN'; break;
                    case "VBK"      : $column_snMesin ='VBK_MESIN'; break;
                    case "TTW"      : $column_snMesin ='ATM_MESIN'; break;
                    case "CRMS"     : $column_snMesin ='CRM_MESIN'; break;
                    default : $column_snMesin ='NEW_MESIN';
                }

                $tableColumns = Schema::getColumnListing('crt_'.$id_po);
                $format_tableColumn = [];

                for ($xx=0; $xx< count($tableColumns); $xx++){
                    if (!str_contains( $tableColumns[$xx], '_PN') && !str_contains( $tableColumns[$xx], '_PM') && !str_contains( $tableColumns[$xx], '_PARTNAME')){
                        array_push($format_tableColumn, $tableColumns[$xx]);
                    }
                }

                $hiddenColumns = ['id', 'ATM_MESIN', 'CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'NEW_MESIN',
                'VBK_MESIN', 'NOTES', 'TIME_STAGING', 'TIME_PRELOADING', 'TIME_CHECKLIST', 'NO_BARIS_MESIN', 'STATUS_MESIN'];

                $columns = array_diff($format_tableColumn, $hiddenColumns);
                $dataColumn = array_values($columns);

                $sql = 'select * from crt_'.$id_po.' where '.$column_snMesin.' is not null';
                $dt = DB::select($sql);

                for ($yy=0; $yy<count($dt); $yy++){
                    $data       = $dt[$yy];
                    $sn_mesin   = $dt[$yy]->$column_snMesin;
                    $model      = str_contains($get_mesin->type, 'MX') ? substr($get_mesin->type, 3) : $get_mesin->type;

                    for ($zz=0; $zz< count($dataColumn); $zz++){
                        $data_sn = [];
                        $coll_name      = (String)$dataColumn[$zz];
                        $coll_name2     = (String)$dataColumn[$zz].'_PM';
                        $sn_part        = $data->$coll_name;
                        $part_model     = $data->$coll_name2;

                        $get_description = 'select part_desc from mst_part_number where part_column=\''.$coll_name.'\' and id_mesin ='.$datas['data_po'][$x]['id_type_mesin'];
                        $get_desc        = DB::select($get_description)[0]->part_desc;

                        if ($get_customer->id == 3 && in_array($get_model->name, ['ATM', 'CRM'])){
                            $get_part_name = 'select '.$coll_name.'_PARTNAME as PARTNAME from crt_'.$id_po;
                            $get_partName = DB::select($get_part_name)[0]->PARTNAME;
    
                            $get_partName = isset($get_partName) ? $get_partName : $datas['data_po'][$x]['type']['name'].' '.$get_desc ;
                            $concat_jenis_accesoris = isset($part_model) ? $part_model : $datas['data_po'][$x]['type']['name'];
                        } else {
                            $get_partName = $get_desc;
                            $concat_jenis_accesoris = $part_model; //.' '.$datas[$x]['type']['name'];
                        }

                        $data_sn = [
                            'part_sn'                   => $sn_part, 
                            'merk_aksesoris'            => $datas['data_po'][$x]['brand'], 
                            'part_desc'                 => $get_partName, 
                            'concat_tipe_aksesoris'     => $get_partName.' '.$datas['data_po'][$x]['brand'].' '.$model, 
                            'type'                      => $datas['data_po'][$x]['type']['name'],
                            'part_model'                => $part_model,
                            'concat_jenis_aksesoris'    => $concat_jenis_accesoris,
                            'sn_paketmesin'             => $sn_mesin, 
                            'no_baris_mesin'            => $data->NO_BARIS_MESIN, 
                            'nama_gudang'               => $getGudang['gudang_desc']
                        ];
                        array_push($data_sn_part, $data_sn);
                    }
                }
            }

            $datas['list_items'] = [
                'count_data' => count($data_sn_part), 
                'items' => $data_sn_part
            ];

        }

        return response()->json([
            'success' => true,
            'data' => $datas
        ]);
       
    }

    // report summary for fase 2 ---------------------------------------------------------
    // query Machine Delivery By Type 
    function getMachineDeliveryByType(){
        $month = $_GET['month'] ? $_GET['month'] : '';
        $year = $_GET['year'] ? $_GET['year'] : '';
        
        $query = '
            SELECT
                -- m.id as id_type, 
                -- ms.id as id_model, 
                concat(m.name, \'-\', ms.type) as type_model,
                IFNULL(total_deliv.total, 0) AS total_mesin_delivered
            from mst_mesin ms
                left outer join
                (
                    SELECT sum(get_total_deliv.total_mesin_delivered) as total,
                        tp.id_type_mesin,
                        (
                            select mm.type from mst_mesin mm where mm.id = tp.id_type_mesin
                        ) as models
                    from tbl_po tp,
                    (
                        select tsd.id_po,
                            count(*) as total_mesin_delivered
                        from transaksi_status_delivery tsd
                        where exists
                        (
                            select *
                            from transaksi_status_deliv_detail tsdd
                            where tsdd.id_header = tsd.id
                                and tsdd.status = \'TIBA\'
                        )
                        GROUP BY tsd.id_po
                    ) get_total_deliv
                    where get_total_deliv.id_po = tp.id';

            if ($month && $year) {
                // Filter by both month and year
                $query .= " and YEAR(tp.tgl_po) = $year and MONTH(tp.tgl_po) = $month";
            } elseif ($month) {
                // Filter only by month
                $query .= " and MONTH(tp.tgl_po) = $month";
            } elseif ($year) {
                // Filter only by year
                $query .= " and YEAR(tp.tgl_po) = $year";
            }

            $query .= ' GROUP BY tp.id_type_mesin
                ) total_deliv
                    on total_deliv.id_type_mesin = ms.id,
                models m
            where ms.model = m.id
            and total_deliv.total <> 0
            order by total_deliv.total desc';
        
            $getDatas = DB::select($query);

            return response()->json([
                'success' => true,
                'data' => $getDatas
            ]);
    }

    // function for get UPS Summary 
    function getUPSSummary($idPoMaster, $idBatch){

        $query_po = 'select tbl_po.id as id_po, mdl.name, tbl_po.* from tbl_po , models as mdl where mdl.id = tbl_po.model and tbl_po.deleted_at is NULL ';

        if ($idPoMaster != 'null'){
            $query_po .= ' and tbl_po.id_po_master = '.$idPoMaster;
        }

        if ($idBatch != 'null'){
            $query_po .= ' and tbl_po.batch = '.$idBatch;
        }

        $get_all_po = DB::select($query_po);
        $resultArray = json_decode(json_encode($get_all_po), true);

        $get_all_ups= [];
        for ($a=0; $a< count($resultArray); $a++){
            $id_po              = $resultArray[$a]['id'];
            $id_po_master       = $resultArray[$a]['id_po_master'];
            $no_po              = $resultArray[$a]['no_po'];
            $id_type_mesin      = $resultArray[$a]['id_type_mesin'];

            $sql = 'select part_column, part_desc from mst_part_number mst where part_column like  \'%UPS%\' and id_mesin = '.$id_type_mesin;
            $column_name = DB::select($sql)[0]->part_column;
            $part_desc = DB::select($sql)[0]->part_desc;
            $get_gudang =  MasterGudang::select('gudang_desc')->where('id', $resultArray[$a]['nama_gudang'])->first();

            $sql2 = 'select 
                     (select description from mst_spesifikasi_mesin msm 
                      where msm.id = tsmd.fill_description) as kva_desc
                        from transaksi_spesifikasi_mesin tsm, 
                        transaksi_spesifikasi_mesin_dtl tsmd 
                        where tsm.id = tsmd.id_spek_mesin_hdr 
                        and tsmd.item_desc = \'KVA\'
                        and tsm.id_po = '.$id_po;
                        
            $get_kva_spek = DB::select($sql2);
            $kva_spek = "";
            if ($get_kva_spek){
                $kva_spek = $get_kva_spek[0]->kva_desc; 
            }
            
            $column_snMesin = '';
            switch ($resultArray[$a]['name']){
                case "ATM"      : $column_snMesin ='ATM_MESIN'; break;
                case "ATMS"     : $column_snMesin ='ATM_MESIN'; break;
                case "CRM"      : $column_snMesin ='CRM_MESIN'; break;
                case "TCR"      : $column_snMesin ='TCR_MESIN'; break;
                case "CS KIOS"  : $column_snMesin ='CS_KIOS_MESIN'; break;
                case "VBK"      : $column_snMesin ='VBK_MESIN'; break;
                case "TTW"      : $column_snMesin ='ATM_MESIN'; break;
                case "CRMS"     : $column_snMesin ='CRM_MESIN'; break;
                default : $column_snMesin ='NEW_MESIN';
            }

            $sql2 = 'select id as ID_MESIN, '.$column_name.' as SN_UPS,'
                                             .$column_name.'_PM as UPS_MODEL, NO_BARIS_MESIN, '
                                             .$column_snMesin.' as SN_MESIN from crt_'
                                             .$id_po.' where '
                                             .$column_snMesin.' is not null';

            $get_sn_ups = DB::select($sql2);
            for ($b=0; $b< count($get_sn_ups); $b++){

                $data_ups = [
                    'serial_number_ups' => $get_sn_ups[$b]->SN_UPS, 
                    'merk_aksesoris'    => $get_sn_ups[$b]->UPS_MODEL, 
                    'tipe_aksesoris'    => $part_desc.' '.$kva_spek, 
                    'jenis_aksesoris'   => $part_desc, 
                    'id_mesin'          => $get_sn_ups[$b]->ID_MESIN, 
                    'sn_mesin'          => $get_sn_ups[$b]->SN_MESIN, 
                    'no_baris_mesin'    => $get_sn_ups[$b]->NO_BARIS_MESIN,
                    'warehouse'         => $get_gudang['gudang_desc'], 
                    'id_po'             => $id_po, 
                    'no_po'             => $no_po, 
                    'id_po_master'      => $id_po_master
                ];

                array_push($get_all_ups, $data_ups);
            }
        }

        if ($idPoMaster != 'null' && $idBatch != 'null' ) {
            $select_po = PurchaseOrder::where('id_po_master', $idPoMaster)->where('batch', $idBatch)->first();

            $getCustomer    = MasterCustomer::where('id', $select_po->customer)->first();
            $getModel       = Models::where('id', $select_po->model)->first();
            $getMesin       = MasterMesin::where('id', $select_po->id_type_mesin)->first();
            $getBatch       = Bacth::where('id', $select_po->batch)->first();

            // Kondisi untuk id=> 3 = BCA
            if ($getCustomer->id == 3){
                if (str_contains($getMesin->type, 'MX-')){
                    $select_po['model_bca'] = 'MONIMAX-'.substr($getMesin->type, 3);
                } else {
                    $select_po['model_bca'] = $getMesin->type;
                }
            } 
            
            $select_po['customer']  = $getCustomer;
            $select_po['type']      = $getModel;
            $select_po['model']     = $getMesin;
            $select_po['batch']     = $getBatch;
        }

        return response()->json([
            'success'       => true,
            'totalDatas'    => count($get_all_ups),
            'data'          => $get_all_ups,
            'detail_po'     => isset($select_po ) ? $select_po : []
        ]);
    }

    // get Total Machine Received, 
    // get From ==> Implementation Table/Customer,  ==> Link to Implementation Table/Quantity
    function getMachineReceivedByCustomer(){
        $month = $_GET['month'] ? $_GET['month'] : '';
        $year = $_GET['year'] ? $_GET['year'] : '';

        $query = 'select 
                    tp.customer id_customer,
                    (select bank_desc from mst_customer cust where cust.id = tp.customer ) as customer_name,
                    sum(tp.jumlah) as quantity
                    from tbl_po tp,
                    (select id, name from models) mdl ,
                    (select id, type from mst_mesin) mesin
                    where mdl.id = tp.model
                    and mesin.id = tp.id_type_mesin';
        
        if ($month && $year) {
            // Filter by both month and year
            $query .= " and YEAR(tp.tgl_po) = $year and MONTH(tp.tgl_po) = $month";
        } elseif ($month) {
            // Filter only by month
            $query .= " and MONTH(tp.tgl_po) = $month";
        } elseif ($year) {
            // Filter only by year
            $query .= " and YEAR(tp.tgl_po) = $year";
        }
        
        $query .= ' group by tp.customer
                    order by tp.customer';

        $get_datas = DB::select($query);

        return response()->json([
            'success'       => true,
            'totalDatas'    => count($get_datas),
            'data'          => $get_datas,
        ]);
    }

    function getPoBySpekDateFromTo($date_from, $date_to){

        $where = "";
        if ($date_from != 'null' and $date_to == 'null'){
            $where .= ' and date_format(tsm.created_at,  \'%Y-%m-%d\') >  \''.$date_from.'\'';
        } 

        if ($date_from == 'null' and $date_to != 'null'){
            $where .= ' and date_format(tsm.created_at,  \'%Y-%m-%d\') < \''.$date_to.'\'';
        }

        if ($date_from != 'null' and $date_to != 'null'){
            $where .= ' and date_format(tsm.created_at,  \'%Y-%m-%d\') between \''.$date_from.'\' and \''.$date_to.'\'';
        }

        $sql = ' select tp.id as id_po, 
                    tp.no_po
                    from tbl_po tp
                    where exists( 
                        select 1 from transaksi_spesifikasi_mesin tsm
                        where tsm.id_po = tp.id
                        '.$where.'
                    )
                ';
        
        $datas = DB::select($sql);
        
        return response()->json([
            'success' => true, 
            'totalDatas' => count($datas), 
            'datas' => $datas
        ]);
    }

    function getTimeDurationSummary( $date_from, $date_to, $idPo )
    {
        $datas =[];
        $where = "";
        if ($date_from != 'null' and $date_to == 'null'){
            $where .= ' and date_format(tsm.created_at,  \'%Y-%m-%d\') >  \''.$date_from.'\'';
        } 

        if ($date_from == 'null' and $date_to != 'null'){
            $where .= ' and date_format(tsm.created_at,  \'%Y-%m-%d\') < \''.$date_to.'\'';
        }

        if ($date_from != 'null' and $date_to != 'null'){
            $where .= ' and date_format(tsm.created_at,  \'%Y-%m-%d\') between \''.$date_to.'\' and \''.$date_to.'\'';
        }

        if ($idPo != 'null'){
            $where .= ' and tsm.id_po = '.$idPo;
        }

        $sql = ' select tp.id as id_po, 
                    tp.no_po, 
                    tp.part_number as pn_system, 
                    tp.sn_batch as sn_batch, 
                    (select bp.name from bacth_po bp where bp.id = tp.batch) as batch, 
                    (select mdl.name from models mdl where mdl.id = tp.model) as types, 
                    (select mm.type from mst_mesin mm where mm.id = tp.id_type_mesin) as models, 
                    (select time_todo from transaksi_spesifikasi_mesin tsm where tsm.id_po = tp.id) as spesification_duration
                    from tbl_po tp
                    where 
                    deleted_at is null 
                    and exists( 
                        select 1 from transaksi_spesifikasi_mesin tsm
                        where tsm.id_po = tp.id
                        '.$where.'
                    )
                ';

        $detail_po = DB::select($sql);
        for ($x=0; $x< count($detail_po); $x++){
            $id_po  = $detail_po[$x]->id_po;
            $no_po  = $detail_po[$x]->no_po;

            $column_snMesin = '';
            switch ($detail_po[$x]->types){
                case "ATM"      : $column_snMesin ='ATM_MESIN'; break;
                case "ATMS"     : $column_snMesin ='ATM_MESIN'; break;
                case "CRM"      : $column_snMesin ='CRM_MESIN'; break;
                case "TCR"      : $column_snMesin ='TCR_MESIN'; break;
                case "CS KIOS"  : $column_snMesin ='CS_KIOS_MESIN'; break;
                case "VBK"      : $column_snMesin ='VBK_MESIN'; break;
                case "TTW"      : $column_snMesin ='ATM_MESIN'; break;
                case "CRMS"     : $column_snMesin ='CRM_MESIN'; break;
                default : $column_snMesin ='NEW_MESIN';
            }
            
            $sql2 = 'select id, '.$column_snMesin.',  
                 TIME_STAGING, 
                 TIME_PRELOADING, 
                 TIME_CHECKLIST
                 from crt_'.$id_po.' where  '.$column_snMesin.' is not null';

            $getSnMesin = DB::select($sql2);
            $data_sn = [];
            for ( $a=0; $a< count($getSnMesin); $a++ ){
                $get_total_duration = $this->getTotalDuration($getSnMesin[$a]->TIME_STAGING, 
                                                              $getSnMesin[$a]->TIME_PRELOADING, 
                                                              $getSnMesin[$a]->TIME_CHECKLIST,
                                                              $detail_po[$x]->spesification_duration);
                $data_sn = [
                    'id_po'                 => $id_po, 
                    'no_po'                 => $no_po, 
                    'pn_system'             => $detail_po[$x]->pn_system, 
                    'no_mesin'              => $getSnMesin[$a]->id, 
                    'sn_mesin'              => $getSnMesin[$a]->$column_snMesin, 
                    'sn_batch'              => $detail_po[$x]->sn_batch,
                    'batch'                 => $detail_po[$x]->batch,
                    'type'                  => $detail_po[$x]->types,
                    'model'                 => $detail_po[$x]->models,
                    'time_staging'          => $getSnMesin[$a]->TIME_STAGING, 
                    'time_preloading'       => $getSnMesin[$a]->TIME_PRELOADING, 
                    'time_prestaging'       => $getSnMesin[$a]->TIME_CHECKLIST, 
                    'time_specification'    => $detail_po[$x]->spesification_duration, 
                    'total_duration'        => $get_total_duration
                ];        
                array_push($datas, $data_sn);
            }
        }

        return response()->json([
            'success' => true, 
            'totalDatas' => count($datas), 
            'datas' => $datas
        ]);
    }

    function getTotalDuration($time_staging, $time_preloading, $time_prestaging, $time_specification)
    {
        $data_time = [];

        if ( $time_staging != null ){
            array_push($data_time, $time_staging);
        }

        if ( $time_preloading != null ){
            array_push($data_time, $time_preloading);
        }

        if ( $time_prestaging != null ){
            array_push($data_time, $time_prestaging);
        }

        if ( $time_specification != null ){
            array_push($data_time, $time_specification);
        }

        // reff : https://www.geeksforgeeks.org/how-to-calculate-total-time-of-an-array-in-php/
        $sum = strtotime('00:00:00');
        $totaltime = 0;

        foreach( $data_time as $element ) {
            $timeinsec = strtotime($element) - $sum;   // Converting the time into seconds
            $totaltime = $totaltime + $timeinsec;   // Sum the time with previous value
        }

        $h = intval($totaltime / 3600);
        $h = $h < 10 ? '0'.$h : $h;
        
        $totaltime = $totaltime - ($h * 3600);

        $m = intval($totaltime / 60);
        $m = $m < 10 ? '0'.$m : $m;

        $s = $totaltime - ($m * 60);
        $s = $s < 10 ? '0'.$s : $s;

        $total_time = "$h:$m:$s";
        return $total_time;
    }

    function getStaginDurationReport(){
        $datas =[];
        $query = 'select 
                    mc.id as id_customer,
                    mc.bank_desc as customer_name
                    from mst_customer mc 
                    where exists ( 
                        select 1 from tbl_po tp 
                        where tp.customer = mc.id
                        and exists(
                            select 1 from transaksi_spesifikasi_mesin tsm
                            where tsm.id_po = tp.id
                        )
                        -- and tp.customer = 7
                    )';
        
        $get_customer = DB::select($query);

        for ($a=0; $a< count($get_customer); $a++){
            $id_customer    = $get_customer[$a]->id_customer;
            $customer       = $get_customer[$a]->customer_name;

            $qry1 = 'select 
                        distinct
                        tp.customer as id_customer, 
                        (select mc.bank_desc from mst_customer mc where mc.id = tp.customer) as customer_name, 
                        tp.model as id_types, 
                        (select m.name from models m where m.id = tp.model) as types,
                        tp.id_type_mesin as id_model, 
                        (select mm.type from mst_mesin mm where mm.id = tp.id_type_mesin) as model
                        from tbl_po tp 
                        where exists( 
                            select 1 from transaksi_spesifikasi_mesin tsm
                            where tsm.id_po = tp.id
                        )
                        and tp.customer = '.$id_customer;

            $check_model_per_cust = DB::select($qry1);
            $detail_po = [];

            for ($b=0; $b< count($check_model_per_cust); $b++){
                $id_type    = $check_model_per_cust[$b]->id_types;
                $id_model   = $check_model_per_cust[$b]->id_model;
                $types      = $check_model_per_cust[$b]->types;
                $models     = $check_model_per_cust[$b]->model;

                $qry2 = 'select 
                         tp.id as id_po, 
                         tp.jumlah as jml_mesin,
                         (select tsm.time_todo from transaksi_spesifikasi_mesin tsm where tsm.id_po = tp.id) as time_specification
                         from tbl_po tp 
                         where exists( 
                            select 1 from transaksi_spesifikasi_mesin tsm
                            where tsm.id_po = tp.id
                         )
                         and tp.customer = '.$id_customer.' and tp.model = '.$id_type.' and tp.id_type_mesin = '.$id_model;
                
                $get_data_po = DB::select($qry2);

                $details = [];
                for ($c=0; $c< count($get_data_po); $c++){

                    $qry3 = 'select id, TIME_STAGING, TIME_PRELOADING, TIME_CHECKLIST from crt_'.$get_data_po[$c]->id_po;
                    $get_time_duration = DB::select($qry3);

                    $sub_total_time_staging     = [];
                    $sub_total_time_preload     = [];
                    $sub_total_time_checklist   = [];

                    for ($d=0; $d< count($get_time_duration); $d++){
                        
                        if ( $get_time_duration[$d]->TIME_STAGING != null){
                            array_push($sub_total_time_staging, $get_time_duration[$d]->TIME_STAGING);
                        }
                        
                        if ( $get_time_duration[$d]->TIME_PRELOADING != null){
                            array_push($sub_total_time_preload, $get_time_duration[$d]->TIME_PRELOADING);
                        }

                        if ( $get_time_duration[$d]->TIME_CHECKLIST != null){
                            array_push($sub_total_time_checklist, $get_time_duration[$d]->TIME_CHECKLIST);
                        }
                    }

                    $get_sub_total_staging      = $this->getSubTotal($sub_total_time_staging);
                    $get_sub_total_preload      = $this->getSubTotal($sub_total_time_preload);
                    $get_sub_total_checklist    = $this->getSubTotal($sub_total_time_checklist);

                    $details_sn = [
                        'detail_sn'                     => $get_time_duration, 
                        'detail_po'                     => $get_data_po[$c],
                        'subtotal_time_staging'         => $get_sub_total_staging,
                        'subtotal_time_preloading'      => $get_sub_total_preload,
                        'subtotal_time_checklist'       => $get_sub_total_checklist, 
                        'subtotal_time_specification'   => $get_data_po[$c]->time_specification, 
                        'types'                         => $types,  
                        'models'                        => $models
                    ];
                    array_push($details, $details_sn);
                }
                array_push($detail_po, $details);
            }

            $data_detail = [
                'id_customer'    => $id_customer, 
                'customer_name'  => $customer, 
                'detail_po'      => $detail_po
            ];
            array_push($datas, $data_detail);
        }

        return response()->json([
            'success' => true, 
            'totalDatas' => count($datas), 
            'datas' => $datas
        ]);
    }


    function getStaginDurationReportV2(){
        $query = 'select 
                    distinct 
                    tp.customer as id_customer, 
                    (select mc.bank_desc from mst_customer mc where mc.id = tp.customer) as customer_name, 
                    tp.model as id_types, 
                    (select m.name from models m where m.id = tp.model) as types,
                    tp.id_type_mesin as id_model, 
                    (select mm.type from mst_mesin mm where mm.id = tp.id_type_mesin) as model
                    from tbl_po tp 
                    where tp.deleted_at is null  
                    and exists( 
                        select 1 from transaksi_spesifikasi_mesin tsm
                        where tsm.id_po = tp.id
                    ) order by tp.customer';

        //and tp.customer = 3 and tp.id_type_mesin = 9
        //and tp.customer IN (6, 7) 

        $get_datas = DB::select($query);
        $datas=[];

        for ( $a=0; $a<count($get_datas); $a++ ){
            $id_cust    = $get_datas[$a]->id_customer;
            $customer   = $get_datas[$a]->customer_name; 
            $id_type    = $get_datas[$a]->id_types;
            $id_model   = $get_datas[$a]->id_model;
            $types      = $get_datas[$a]->types;
            $models     = $get_datas[$a]->model;

            $data_detail = [
                'id_customer'   => $id_cust, 
                'customer'      => $customer, 
                'id_type'       => $id_type, 
                'types'         => $types,
                'id_model'      => $id_model, 
                'models'        => $models
            ];

            $qry = 'select 
                    tp.id as id_po, 
                    tp.no_po, 
                    tp.jumlah as jml_mesin,
                    (select tsm.time_todo from transaksi_spesifikasi_mesin tsm where tsm.id_po = tp.id) as time_specification
                    from tbl_po tp  
                    where tp.deleted_at is null  
                    and exists( 
                        select 1 from transaksi_spesifikasi_mesin tsm
                        where tsm.id_po = tp.id
                    )
                    and tp.customer = '.$id_cust.' and tp.model = '.$id_type.' and tp.id_type_mesin = '.$id_model;
            
            $get_data_po = DB::select($qry);

            $detail_po = [];
            $jml_po = 0;
            $data_avg_staging = [];
            $data_avg_preload = [];
            $data_avg_checklist = [];
            $data_avg_spesification = [];

            for( $b=0; $b< count($get_data_po); $b++ ){
                $jml_po +=1;
                $id_po = $get_data_po[$b]->id_po;
                $no_po = $get_data_po[$b]->no_po;
                
                $column_snMesin = '';
                switch ($types){
                    case "ATM"      : $column_snMesin ='ATM_MESIN'; break;
                    case "ATMS"     : $column_snMesin ='ATM_MESIN'; break;
                    case "CRM"      : $column_snMesin ='CRM_MESIN'; break;
                    case "TCR"      : $column_snMesin ='TCR_MESIN'; break;
                    case "CS KIOS"  : $column_snMesin ='CS_KIOS_MESIN'; break;
                    case "VBK"      : $column_snMesin ='VBK_MESIN'; break;
                    case "TTW"      : $column_snMesin ='ATM_MESIN'; break;
                    case "CRMS"     : $column_snMesin ='CRM_MESIN'; break;
                    default : $column_snMesin ='NEW_MESIN';
                }

                $qry3 = 'select id, 
                            TIME_STAGING, 
                            TIME_PRELOADING, 
                            TIME_CHECKLIST 
                            from crt_'.$id_po.' where '.$column_snMesin.' is not null';
                $get_time_duration = DB::select($qry3);

                // check total mesin yang sudah di stagging 
                $qryy= 'select count(*) as tot_mesin 
                        from crt_'.$id_po.' where '.$column_snMesin.' is not null';
                $tot_mesin_stagging = DB::select($qryy)[0]->tot_mesin;

                $sub_total_time_staging     = [];
                $sub_total_time_preload     = [];
                $sub_total_time_checklist   = [];

                for ($d=0; $d< count($get_time_duration); $d++){
                        
                    if ( $get_time_duration[$d]->TIME_STAGING != null){
                        array_push($sub_total_time_staging, $get_time_duration[$d]->TIME_STAGING);
                    }
                    
                    if ( $get_time_duration[$d]->TIME_PRELOADING != null){
                        array_push($sub_total_time_preload, $get_time_duration[$d]->TIME_PRELOADING);
                    }

                    if ( $get_time_duration[$d]->TIME_CHECKLIST != null){
                        array_push($sub_total_time_checklist, $get_time_duration[$d]->TIME_CHECKLIST);
                    }
                }

                $get_sub_total_staging      = $this->getSubTotal($sub_total_time_staging);
                $get_sub_total_preload      = $this->getSubTotal($sub_total_time_preload);
                $get_sub_total_checklist    = $this->getSubTotal($sub_total_time_checklist);

                if ($sub_total_time_staging){
                    $get_avg_total_staging = date('H:i:s', array_sum(array_map('strtotime', $sub_total_time_staging)) / count($sub_total_time_staging));
                } else {
                    $get_avg_total_staging = "00:00:00";
                }

                if ($sub_total_time_preload){
                    $get_avg_total_preload = date('H:i:s', array_sum(array_map('strtotime', $sub_total_time_preload)) / count($sub_total_time_preload));
                } else {
                    $get_avg_total_preload = "00:00:00";
                }

                if ($sub_total_time_checklist){
                    $get_avg_total_checklist = date('H:i:s', array_sum(array_map('strtotime', $sub_total_time_checklist)) / count($sub_total_time_checklist));
                } else {
                    $get_avg_total_checklist = "00:00:00";
                }

                $details_sn = [
                    'id_po'                             => $id_po, 
                    'no_po'                             => $no_po, 
                    'detail_sn'                         => $get_time_duration, 
                    'subtotal_time_staging'             => $get_sub_total_staging,
                    'subtotal_time_preloading'          => $get_sub_total_preload,
                    'subtotal_time_checklist'           => $get_sub_total_checklist, 
                    'subtotal_time_specification'       => $get_data_po[$b]->time_specification, 
                    'jumlah_mesin'                      => $get_data_po[$b]->jml_mesin, 
                    'average_subtotal_time_staging'     => $get_avg_total_staging, 
                    'average_subtotal_time_preload'     => $get_avg_total_preload, 
                    'average_subtotal_time_checklist'   => $get_avg_total_checklist, 
                    'total_mesin_sudah_staging'         => $tot_mesin_stagging
                ];

                array_push($detail_po, $details_sn);
                array_push($data_avg_staging, $get_avg_total_staging);
                array_push($data_avg_preload, $get_avg_total_preload);
                array_push($data_avg_checklist, $get_avg_total_checklist);
                
                if ($get_data_po[$b]->time_specification != null){
                    array_push($data_avg_spesification, $get_data_po[$b]->time_specification);
                }
            }

            if ($data_avg_staging){
                $get_total_avg_staging = date('H:i:s', array_sum(array_map('strtotime', $data_avg_staging)) / $jml_po );
            } else {
                $get_total_avg_staging = "00:00:00";
            }

            if ($data_avg_preload){
                $get_total_avg_preload = date('H:i:s', array_sum(array_map('strtotime', $data_avg_preload)) / $jml_po );
            } else {
                $get_total_avg_preload = "00:00:00";
            }

            if ($data_avg_checklist){
                $get_total_avg_checklist = date('H:i:s', array_sum(array_map('strtotime', $data_avg_checklist)) / $jml_po );
            } else {
                $get_total_avg_checklist = "00:00:00";
            }

            if ($data_avg_spesification){
                $get_total_avg_specification = date('H:i:s', array_sum(array_map('strtotime', $data_avg_spesification)) / count($data_avg_spesification) );
            } else {
                $get_total_avg_specification = "00:00:00";
            }

            $get_total_avg = $this->getTotalDuration($get_total_avg_staging, 
                                                        $get_total_avg_preload, 
                                                        $get_total_avg_checklist,
                                                        $get_total_avg_specification);

            $data_detail['jml_po']                  = $jml_po;
            $data_detail['detail_po']               = $detail_po;
            $data_detail['total_avg_staging']       = $get_total_avg_staging;
            $data_detail['total_avg_preload']       = $get_total_avg_preload;
            $data_detail['total_avg_checklist']     = $get_total_avg_checklist;
            $data_detail['total_avg_specification'] = $get_total_avg_specification;
            $data_detail['total_avg']               = $get_total_avg;
            array_push($datas, $data_detail);
        }

        return response()->json([
            'success' => true, 
            'totalDatas' => count($datas), 
            'datas' => $datas
        ]);
    }

    function getSubTotal($arr_data){
        $sum = strtotime('00:00:00');
        $totaltime = 0;

        foreach( $arr_data as $element ) {
            $timeinsec = strtotime($element) - $sum;   // Converting the time into seconds
            $totaltime = $totaltime + $timeinsec;   // Sum the time with previous value
        }

        $h = intval($totaltime / 3600);
        $h = $h < 10 ? '0'.$h : $h;
        
        $totaltime = $totaltime - ($h * 3600);

        $m = intval($totaltime / 60);
        $m = $m < 10 ? '0'.$m : $m;

        $s = $totaltime - ($m * 60);
        $s = $s < 10 ? '0'.$s : $s;

        $total_time = "$h:$m:$s";
        return $total_time;
    }

    function getDevelopmentSummary(){
        /*$query = 'select
                    xx.id_customer,
                    xx.customer_name,
                    xx.id_type, 
                    xx.types, 
                    xx.id_model, 
                    xx.models, 
                    sum( xx.qty_delivery) as QTY_DELIV, 
                    sum( xx.qty_withdrawal) as QTY_WITHDRAW
                    from 
                    (
                    SELECT tp.customer AS id_customer
                        ,(
                            SELECT mc.bank_desc
                            FROM mst_customer mc
                            WHERE mc.id = tp.customer
                            ) AS customer_name
                        ,tp.model AS id_type
                        ,(
                            SELECT m.name
                            FROM models m
                            WHERE m.id = tp.model
                            ) AS types
                        ,tp.id_type_mesin AS id_model
                        ,(
                            SELECT mm.type
                            FROM mst_mesin mm
                            WHERE mm.id = tp.id_type_mesin
                            ) AS models
                        ,tp.id AS id_po
                        , (
                            select count(dr.sn_mesin)
                            from delivery_request dr 
                            where dr.task = \'DELIVERY\'
                            and dr.id_po = tp.id
                        ) as qty_delivery
                        , (
                            select count(dr.sn_mesin)
                            from delivery_request dr 
                            where dr.task = \'WITHDRAWAL\'
                            and dr.id_po = tp.id
                        ) as qty_withdrawal
                    FROM tbl_po tp
                    WHERE EXISTS (
                            SELECT 1
                            FROM delivery_request dr
                            WHERE tp.id = dr.id_po
                            )
                    ) xx
                    group by 
                    xx.id_customer,
                    xx.customer_name,
                    xx.id_type, 
                    xx.types, 
                    xx.id_model, 
                    xx.models';
                    */
        
        $query = '
        select
                    xx.id_customer,
                    xx.customer_name,
                    xx.id_type, 
                    xx.types, 
                    xx.id_model, 
                    xx.models, 
                    sum( xx.qty_delivery) as QTY_DELIV, 
                    sum( xx.qty_withdrawal) as QTY_WITHDRAW, 
                    xx.purpose 
                    from 
                    (SELECT tp.customer AS id_customer
                        ,(
                            SELECT mc.bank_desc
                            FROM mst_customer mc
                            WHERE mc.id = tp.customer
                            ) AS customer_name
                        ,tp.model AS id_type
                        ,(
                            SELECT m.name
                            FROM models m
                            WHERE m.id = tp.model
                            ) AS types
                        ,tp.id_type_mesin AS id_model
                        ,(
                            SELECT mm.type
                            FROM mst_mesin mm
                            WHERE mm.id = tp.id_type_mesin
                            ) AS models
                        ,tp.id AS id_po
                        , (
                            select count(dr.sn_mesin)
                            from delivery_request dr 
                            where dr.task =\'DELIVERY\'
                            and dr.id_po = tp.id
                            and dr.purpose = drx.purpose
                            and (dr.status_approval <> 2 OR dr.status_approval IS NULL)
                        ) as qty_delivery
                        , (
                            select count(dr.sn_mesin)
                            from delivery_request dr 
                            where dr.task = \'WITHDRAWAL\'
                            and dr.id_po = tp.id
                            and dr.purpose = drx.purpose
                            and (dr.status_approval <> 2 OR dr.status_approval IS NULL)
                        ) as qty_withdrawal, 
                        drx.purpose 
                    FROM tbl_po tp, 
                    	 delivery_request drx
                    	where tp.id = drx.id_po 
                   ) xx
                    group by 
                    xx.id_customer,
                    xx.customer_name,
                    xx.id_type, 
                    xx.types, 
                    xx.id_model, 
                    xx.models, 
                    xx.purpose';

        $get_datas = DB::select($query);

        return response()->json([
            'success'       => true,
            'totalDatas'    => count($get_datas),
            'data'          => $get_datas,
        ]);
    }

    function getDetailMesinPerPo($idPo){
        $query ='select 
                    po.id, 
                    po.no_po, 
                    po.id_po_master, 
                    po.model as id_type, 
                    (select m.name from models m where m.id = po.model) as types, 
                    po.id_type_mesin as id_model, 
                    (select msn.type from mst_mesin msn where msn.id = po.id_type_mesin) as models, 
                    po.brand, 
                    po.customer as id_customer, 
                    (select mc.bank_desc from mst_customer mc where mc.id = po.customer) as customer, 
                    po.nama_gudang as id_gudang, 
                    (select mg.gudang_desc from mst_gudang mg where mg.id = po.nama_gudang ) as gudang,
                    date_format(substr(po.tgl_masuk, 1, 10), \'%Y-%m-%d\') as tanggal_masuk, 
                    po.batch, 
                    (select bp.name from bacth_po bp where bp.id = po.batch ) as batch_name, 
                    (
                        select case when (count(*) = 1) then \'Y\'
                          else \'N\' 
                         end		                
                        from transaksi_spesifikasi_mesin tsm  
                        where tsm.id_po = po.id 
                        and exists (
                          select 1 from transaksi_spesifikasi_mesin_dtl tsmd 
                          where tsmd.id_spek_mesin_hdr  = tsm.id 
                        )
                    ) as flag_spesifikasi,
                    (select time_todo from transaksi_spesifikasi_mesin mss where mss.id_po = po.id) as time_spesifikasi
                from tbl_po po
               where po.id = '.$idPo;

        $detail_po = DB::select($query);
        $get_all_machine = [];

        if ($detail_po){

            $column_snMesin = '';
            switch ($detail_po[0]->types){
                case "ATM"      : $column_snMesin ='ATM_MESIN'; break;
                case "ATMS"     : $column_snMesin ='ATM_MESIN'; break;
                case "CRM"      : $column_snMesin ='CRM_MESIN'; break;
                case "TCR"      : $column_snMesin ='TCR_MESIN'; break;
                case "CS KIOS"  : $column_snMesin ='CS_KIOS_MESIN'; break;
                case "VBK"      : $column_snMesin ='VBK_MESIN'; break;
                case "TTW"      : $column_snMesin ='ATM_MESIN'; break;
                case "CRMS"     : $column_snMesin ='CRM_MESIN'; break;
                default : $column_snMesin ='NEW_MESIN';
            }

            $sql2 = 'select id, '.$column_snMesin.' as SN_MESIN from crt_'.$detail_po[0]->id.' where '.$column_snMesin.' is not null order by id';
            $getsnMesin= DB::select($sql2);

            for ($xx=0; $xx<count($getsnMesin); $xx++) {
                $delivery_date ="";
                // query untuk check apa mesin sudah DELIVERY 
                $sql3 = 
                   'select count(*) as STATUS_DELIVERY from transaksi_status_delivery tsd 
                    where tsd.id_po = '.$idPo.' 
                    -- and tsd.id_mesin ='.$getsnMesin[$xx]->id.'
                    and tsd.sn_mesin =\''.$getsnMesin[$xx]->SN_MESIN.'\' 
                    and exists (
                        select 1 from transaksi_status_deliv_detail tsdd 
                        where tsdd.id_header = tsd.id
                        and tsdd.status = \'TIBA\'
                    )';
                
                $check_delivered = DB::select($sql3);

                if ($check_delivered){
                    // ambil tanggal received / tgl tiba 
                    $sql4 = 'select tsdd.updated_at  
                        from transaksi_status_delivery tsd, 
                        transaksi_status_deliv_detail tsdd 
		                where tsdd.id_header = tsd.id 
    		            and tsd.id_po = '.$idPo.' 
                        -- and tsd.id_mesin ='.$getsnMesin[$xx]->id.' 
                        and tsd.sn_mesin =\''.$getsnMesin[$xx]->SN_MESIN.'\' 
                        and tsdd.status = \'TIBA\'';

                    $get_delivery_date = DB::select($sql4);

                    if ($get_delivery_date){
                        $delivery_date = $get_delivery_date[0]->updated_at;
                    }
                }

                // query untuk check apa mesin sudah checklist-Staging
                $sql5 = 'select x.* 
                        from (
                            select tcs.id_po, 
                                count(*) jml_checklist, 
                                tcs.no_mesin, 
                                tcs.sn_mesin 
                            from transaksi_checklist_staging tcs 
                            group by 
                                tcs.no_mesin, 
                                tcs.sn_mesin, 
                                tcs.id_po
                            UNION
                            select tcsm.id_po, 
                                count(*) jml_checklist, 
                                tcsm.no_mesin, 
                                tcsm.sn_mesin 
                            from transaksi_checklist_stag_mv400 tcsm 
                            group by 
                                tcsm.no_mesin, 
                                tcsm.sn_mesin, 
                                tcsm.id_po
                        ) x
                        where x.id_po = '.$idPo.' and x.no_mesin = '.$getsnMesin[$xx]->id.' and x.sn_mesin = \''.$getsnMesin[$xx]->SN_MESIN.'\'';

                $get_status_checklist = DB::select($sql5);

                $status_prestaging = "N";
                if ($get_status_checklist){
                    $status_prestaging = $get_status_checklist[0]->jml_checklist > 1 ? 'Y' : 'N';
                }

                $sql6 = 'select count(*) jml_preloading from transaksi_inspeksi ti 
                         where ti.id_po = '.$idPo.' and ti.no_mesin = '.$getsnMesin[$xx]->id.' and ti.sn_mesin = \''.$getsnMesin[$xx]->SN_MESIN.'\'';
                
                $get_status_preloading = DB::select($sql6);

                $status_preloading = "N";
                if ($get_status_preloading){
                    $status_preloading = $get_status_preloading[0]->jml_preloading > 1 ? 'Y' : 'N';
                }

                $sql7 = 'select ws_id, ws_name, installation_date from mst_ws_info mwi where mwi.serial_number = \''.$getsnMesin[$xx]->SN_MESIN.'\'';
                $get_ws_info = DB::select($sql7);

                $detail_ws_info = [];
                if ($get_ws_info){
                    $detail_ws_info = [
                        'ws_id'             => $get_ws_info[0]->ws_id, 
                        'ws_name'           => $get_ws_info[0]->ws_name,
                        'installation_date' => $get_ws_info[0]->installation_date
                    ];
                } else {
                    $detail_ws_info = [
                        'ws_id'             => null, 
                        'ws_name'           => null,
                        'installation_date' => null
                    ];
                }

                $datas = [
                    'no_po'                 => $detail_po[0]->no_po,
                    'customer'              => $detail_po[0]->customer, 
                    'no_mesin'              => $getsnMesin[$xx]->id,
                    'sn_mesin'              => $getsnMesin[$xx]->SN_MESIN, 
                    'ws_id'                 => $detail_ws_info['ws_id'], 
                    'ws_name'               => $detail_ws_info['ws_name'],
                    'installation_date'     => $detail_ws_info['installation_date'],
                    'received_date'         => $detail_po[0]->tanggal_masuk, 
                    'delivery_date'         => $delivery_date, 
                    'type'                  => $detail_po[0]->types, 
                    'model'                 => $detail_po[0]->models,
                    'gudang'                => $detail_po[0]->gudang, 
                    'status_spesifikasi'    => $detail_po[0]->flag_spesifikasi, 
                    'status_prestaging'     => $status_prestaging, 
                    'status_preloading'     => $status_preloading, 
                    'status_delivery'       => $check_delivered[0]->STATUS_DELIVERY == 1 ? 'Y' : 'N'
                ];
                array_push($get_all_machine, $datas);
            }
        }

        return response()->json([
                'success' => true,
                'totalDatas' => count($get_all_machine), 
                'data' => $get_all_machine, 
                'detail_po' => $detail_po
        ], 200);        
    }

    // flow create transaksi PO Registration -> function for copy from dummy to valid  ----
    // 2023-09-07 
    function getAllPoDummyBasedOnIdModel($idStatusPo)
    {

        if ($idStatusPo == 2){
            $datas = PurchaseOrder::select(['tbl_po.id', 'tbl_po.no_po', 'style.name', 'msn.type as model', 
                DB::raw("CONCAT(tbl_po.no_po,' - ',msn.type, ' - ',style.name) as concat_po")
            ])
            ->join('mst_style as style', 'style.id', '=', 'tbl_po.style', 'left outer')
            ->join('mst_mesin as msn', 'msn.id', '=', 'tbl_po.id_type_mesin')
            ->where('tbl_po.id_status_po', 1)
            ->get();
        } elseif ($idStatusPo == 3){
            $datas = PurchaseOrder::select(['tbl_po.id', 'tbl_po.no_po', 'style.name', 'msn.type as model', 
                DB::raw("CONCAT(tbl_po.no_po,' - ',msn.type, ' - ',style.name) as concat_po")
            ])
            ->join('mst_style as style', 'style.id', '=', 'tbl_po.style', 'left outer')
            ->join('mst_mesin as msn', 'msn.id', '=', 'tbl_po.id_type_mesin')
            ->whereIn('tbl_po.id_status_po', [1, 2])
            ->get();
        } elseif (!in_array($idStatusPo, [1,2,3])) { 
            $datas = PurchaseOrder::select(['tbl_po.id', 'tbl_po.no_po', 'style.name', 'msn.type as model', 
                 DB::raw("CONCAT(tbl_po.no_po,' - ',msn.type, ' - ',style.name) as concat_po")
            ])
            ->join('mst_style as style', 'style.id', '=', 'tbl_po.style', 'left outer')
              ->join('mst_mesin as msn', 'msn.id', '=', 'tbl_po.id_type_mesin')
              ->where('tbl_po.id_status_po', 1)
              ->get();
        } else {
            $datas = [];
        }
        //->where('tbl_po.id_type_mesin', $idModel)

        return response()->json([
            'success' => true,
            'totalDatas' => count($datas),
            'data' => $datas
        ]);
    }

    function getSnMesinByIdPoDummy($idPoDummay){
        $exists_po = PurchaseOrder::whereId($idPoDummay)
                     //->where('id_status_po', 1)
                     ->exists();

        if ($exists_po){
            $check_po = PurchaseOrder::select('mdl.name')
                    ->join('models as mdl', 'tbl_po.model', '=', 'mdl.id')
                    ->where('tbl_po.id', $idPoDummay)
                    ->first();

            $column_snMesin = '';
            switch ($check_po['name']){
                case "ATM"      : $column_snMesin ='ATM_MESIN'; break;
                case "ATMS"     : $column_snMesin ='ATM_MESIN'; break;
                case "CRM"      : $column_snMesin ='CRM_MESIN'; break;
                case "TCR"      : $column_snMesin ='TCR_MESIN'; break;
                case "CS KIOS"  : $column_snMesin ='CS_KIOS_MESIN'; break;
                case "VBK"      : $column_snMesin ='VBK_MESIN'; break;
                case "TTW"      : $column_snMesin ='ATM_MESIN'; break;
                case "CRMS"     : $column_snMesin ='CRM_MESIN'; break;
                default : $column_snMesin ='NEW_MESIN';
            }

            $sql = 'select id, '.$column_snMesin.' as sn_mesin from crt_'.$idPoDummay.' where '.$column_snMesin.' IS NOT NULL AND STATUS_MESIN IS NULL';
            $getSnMesin = DB::select($sql);
            
            $data_snMesin =[];

            for($x=0; $x<count($getSnMesin); $x++){
                $detail_sn = [
                    "idMesin"   => $getSnMesin[$x]->id, 
                    "snMesin"   => $getSnMesin[$x]->sn_mesin
                ];
                array_push($data_snMesin, $detail_sn);
            }

            return response()->json([
                'success' => true,
                'totalDatas' => count($data_snMesin),
                'data' => $data_snMesin
            ]);
        }
    }
}
