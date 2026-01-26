<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WarehouseTransfer;
use Illuminate\Support\Facades\Validator;
use App\Models\PurchaseOrder;
use App\Models\MasterGudang;
use App\Models\PicMitra;
use App\Models\MasterCustomer;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\MasterPo;
use App\Models\MasterPicMover;

class WarehouseTransferController extends Controller
{
    public function index(){
        // menampilkan keseluruhan data
        $transfer = WarehouseTransfer::orderBy('id', 'DESC')->get();

         for ( $i = 0; $i < count($transfer); $i++){
            $getPoDetail = PurchaseOrder::where('id', $transfer[$i]->id_po)->first();

            $getPoMaster = MasterPo::where('id', $getPoDetail['id_po_master'])->first();

            $getFromWarehouse = MasterGudang::where('id', $transfer[$i]->from_warehouse)->first();
            $getToWarehouse = MasterGudang::where('id', $transfer[$i]->to_warehouse)->first();
            $getPic = PicMitra::where('id', $transfer[$i]->pic)->first();
            $getCustomer = MasterCustomer::where('id', $transfer[$i]->id_customer)->first();

            $transfer[$i]['purchaseOrder'] = $getPoDetail;
            $transfer[$i]['purchaseOrder']['po_master'] = $getPoMaster;
            $transfer[$i]['from_warehouse'] = $getFromWarehouse;
            $transfer[$i]['to_warehouse'] = $getToWarehouse;
            $transfer[$i]['pic'] = $getPic;
            $transfer[$i]['customer'] = $getCustomer;
            $transfer[$i]['sn_mesins'] = $transfer[$i]['sn_mesins'] ? json_decode($transfer[$i]['sn_mesins'], true) : [];
         }
        
        return response()->json([
            'success' => true,
            'totalDatas' => $transfer->count(),
            'data' => $transfer
        ]);
    }

    function indexPaging($rowPerPage){
        $transfer = WarehouseTransfer::orderBy('id', 'DESC')->paginate($rowPerPage);

        for ( $i = 0; $i < count($transfer); $i++){
            $getPoDetail = PurchaseOrder::where('id', $transfer[$i]->id_po)->first();
            $getFromWarehouse = MasterGudang::where('id', $transfer[$i]->from_warehouse)->first();
            $getToWarehouse = MasterGudang::where('id', $transfer[$i]->to_warehouse)->first();
            $getPic = PicMitra::where('id', $transfer[$i]->pic)->first();
            $getCustomer = MasterCustomer::where('id', $transfer[$i]->id_customer)->first();

            $transfer[$i]['purchaseOrder'] = $getPoDetail;
            $transfer[$i]['from_warehouse'] = $getFromWarehouse;
            $transfer[$i]['to_warehouse'] = $getToWarehouse;
            $transfer[$i]['pic'] = $getPic;
            $transfer[$i]['customer'] = $getCustomer;
            $transfer[$i]['sn_mesins'] = $transfer[$i]['sn_mesins'] ? json_decode($transfer[$i]['sn_mesins'], true) : [];
        }

        return response()->json([
            'success' => true,
            'totalDatas' => $transfer->count(),
            'data' => $transfer
        ]);
    }

    public function store(Request $request){
        $input = $request->all();
        $input['sn_mesins'] = json_encode($request->sn_mesins, true);

        $checkTotal = PurchaseOrder::where('id', $request->id_po)->first();

        if ($request->jumlah > $checkTotal->jumlah){
            return response()->json([
                'success' => false,
                'message' => 'Transfer Jumlah Mesin tidak boleh melebihi dari total mesin di gudang'
            ], 400);
        } else {

            $validator = Validator::make($input, ['id_po' => 'required', 'jumlah' => 'required', 'to_warehouse' => 'required']);
            if ($validator->fails()){return response()->json($validator->errors(), 400);}

            try{
                $selectPo =  PurchaseOrder::where('id', $request->input('id_po'))->first();
                if ($selectPo){
                    
                    // $stock = $selectPo->stok - $request->input('jumlah');
                    // $updateStock = PurchaseOrder::where('id', '=', $request->input('id_po'))->update(['stok' => $stock, 'updated_at' => Carbon::now()]);

                    $transferWarehouse = WarehouseTransfer::create($input);

                    return response()->json([
                        "success" => true, 
                        "message" => "Transfer Warehouse created successfully.", 
                        "data" => $transferWarehouse
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Transfer Warehouse error update..',
                        'data' => []
                    ], 400);
                }
            } catch(\Illuminate\Database\QueryException $ex) {
                 return response()->json(["errorMessage"=> $ex->getMessage()], 500);
            }
        }
    }

    public function update(Request $request, $id){
        $data[] = $request->all();
        $updateTfGudang = DB::table('warehouse_transfer')->where('id', $id)->update($data[0]);

        if ($updateTfGudang){
             $selectTransfer =  WarehouseTransfer::where('id', $id)->first();
            return response()->json([
                "success" => true,
                "message" => "Warehouse Transfer updated successfully.",
                "data" => $selectTransfer
            ]);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Warehouse Transfer updated Errors."
            ], 400);
        }
    }

    public function destroy($id){
        $transfer = WarehouseTransfer::findOrFail($id);
        $transfer->delete();

        if($transfer) {
            return response()->json([
                'success' => true,
                'message' => 'Data Transfer Antar Gudang berhasil dihapus',
                'data' => $transfer
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data Transfer Antar Gudang gagal dihapus',
                'data' => ''
            ], 400);
        }
    }

    // filtering data summary 
    function getDataWarehouseTransfer($idPo, $snMesin, $from_warehouse, $tgl_keluar){
        $q1 = 'select * from warehouse_transfer'; 
        switch($q1)
        {
            case $idPo != 'null' && $snMesin == 'null' && $from_warehouse == 'null' && $tgl_keluar== 'null':
                $q1 .=' where id_po = '.$idPo. '';
                break;
            case $idPo != 'null' && $snMesin != 'null' && $from_warehouse == 'null' && $tgl_keluar== 'null':
                $q1 .=' where id_po = '.$idPo
                    . ' and sn_mesins LIKE \'%'.$snMesin.'%\'';
                break;
            case $idPo == 'null' && $snMesin == 'null' && $from_warehouse != 'null' && $tgl_keluar == 'null':
                $q1 .=' where from_warehouse = '.$from_warehouse.'';
                break;
            case $idPo == 'null' && $snMesin == 'null' && $from_warehouse == 'null' && $tgl_keluar != 'null':
                $q1 = $q1.' where date_format(tgl_keluar , \'%Y-%m-%d\') = \''.$tgl_keluar.'\'';
                break;
            case $idPo == 'null' && $snMesin == 'null' && $from_warehouse != 'null' && $tgl_keluar != 'null':
                $q1 .=' where from_warehouse = '.$from_warehouse
                    .' and date_format(tgl_keluar , \'%Y-%m-%d\') = \''.$tgl_keluar.'\'';
                break;
            case $idPo != 'null' && $snMesin == 'null' && $from_warehouse != 'null' && $tgl_keluar == 'null':
                $q1 .=' where id_po = '.$idPo
                    .' and from_warehouse = '.$from_warehouse;
                break;
            case $idPo != 'null' && $snMesin == 'null' && $from_warehouse == 'null' && $tgl_keluar != 'null':
                $q1 .=' where id_po = '.$idPo.' and date_format(tgl_keluar , \'%Y-%m-%d\') = \''.$tgl_keluar.'\'';
                break;
            case $idPo != 'null' && $snMesin == 'null' && $from_warehouse != 'null' && $tgl_keluar != 'null':
                $q1 .=' where id_po = '.$idPo
                    .' and from_warehouse = '.$from_warehouse
                    .' and date_format(tgl_keluar , \'%Y-%m-%d\') = \''.$tgl_keluar.'\''; 
                break;
            case $idPo != 'null' && $snMesin != 'null' && $from_warehouse != 'null' && $tgl_keluar != 'null':
                $q1 .=' where id_po = '.$idPo
                    .' and sn_mesins LIKE \'%'.$snMesin.'%\''
                    .' and from_warehouse = '.$from_warehouse
                    .' and date_format(tgl_keluar , \'%Y-%m-%d\') = \''.$tgl_keluar.'\''; 
                break;
            default:
                $q1 = $q1;
                break;
        }

        $get_datas = DB::select($q1);

        for ($a=0; $a< count($get_datas); $a++){
            $getPo = PurchaseOrder::where('id', $get_datas[$a]->id_po)->first();
            $get_datas[$a]->purchaseOrder = $getPo; 

            $getPicMover = MasterPicMover::where('id', $get_datas[$a]->pic)->first();
            $get_datas[$a]->pic = $getPicMover; 

             $getFromWarehouse = MasterGudang::where('id', $get_datas[$a]->from_warehouse)->first();
             $get_datas[$a]->from_warehouse = $getFromWarehouse;

             $getToWarehouse = MasterGudang::where('id', $get_datas[$a]->to_warehouse)->first();
             $get_datas[$a]->to_warehouse = $getToWarehouse;

             $getCustomer = MasterCustomer::where('id', $get_datas[$a]->id_customer)->first();
             $get_datas[$a]->customer = $getCustomer;

             $get_datas[$a]->sn_mesins = $get_datas[$a]->sn_mesins ? json_decode($get_datas[$a]->sn_mesins, true) : [];

        }

        return response()->json([
            'success' => true,
            'totalDatas' => count($get_datas),
            'data' => $get_datas 
        ]);
    }

    // check posisi mesin berdasarkan po dan sn mesin 
    function check_posisi_Mesin ( $idPo, $dataSnMesin ) {

        $data_sn = explode(",",$dataSnMesin);
        

        $get_posisi_mesin = [];

        if ($data_sn){

            for ($x=0;  $x< count($data_sn); $x++ ) {

                $sql1 = 'select wt.to_warehouse 
                              from warehouse_transfer wt
                                where wt.id_po = '.$idPo.' and wt.sn_mesins like "%'.$data_sn[$x].'%" 
                                and wt.created_at = (select max(yy.created_at) 
                                                     from warehouse_transfer yy 
                                                     where yy.id_po = wt.id_po
                                                     and yy.sn_mesins like "%'.$data_sn[$x].'%")'; 

                $check_posisi_mesin = DB::select($sql1);

                if ($check_posisi_mesin){
                    // dd("Data Found");
                    $get_posisi_mesin[$x]['sn_mesin'] = $data_sn[$x];
                    $get_posisi_mesin[$x]['gudang'] = MasterGudang::where('id', $check_posisi_mesin[0]->to_warehouse)->first();

                } else {
                    // dd("Data Not Found");
                    $get_posisi_mesin[$x]['sn_mesin'] = null;
                    $get_posisi_mesin[$x]['gudang'] = [];
                }
            }

            return response()->json([
                'success' => true,
                'data' => $get_posisi_mesin 
            ]);
        }
    }
}
