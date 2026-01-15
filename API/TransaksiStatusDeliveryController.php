<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\TransaksiStatusDelivery;
use App\Models\PurchaseOrder;
use App\Models\MasterCustomer;
use App\Models\MasterGudang;
use App\Models\TransaksiStatusDeliveryDetail;
use App\Models\User;
use App\Models\MasterPo;
use Illuminate\Support\Facades\DB;
use DateTime;

class TransaksiStatusDeliveryController extends Controller
{
    function indexPaging($rowPerPage, $user_login, Request $request){
        $user_info = User::where('id', $user_login)->first();
        $statusDelivery = [];
        set_time_limit(500);

        if ($user_info){
            if ($user_info['roles'] == 'GUEST_BANK'){
                $customer_id = $user_info['id_customer'];

                $this->statusDelivery = TransaksiStatusDelivery::select(['transaksi_status_delivery.*'])
                                                ->join('tbl_po', 'tbl_po.id' , '=', 'transaksi_status_delivery.id_po')
                                                ->where('tbl_po.customer', $customer_id)
                                                ->orderBy('id', 'DESC')
                                                ->paginate($rowPerPage);
            } else {
                 $this->statusDelivery = TransaksiStatusDelivery::orderBy('id', 'DESC')->paginate($rowPerPage);
            }

            // Pencarian data
            $searchTerm = $request->input('dataSearch');
            if (isset($searchTerm)) {
                // pengecekan is date
                $dateTime = DateTime::createFromFormat('m/d/Y', $searchTerm);
                if ($dateTime instanceof DateTime && $dateTime->format('m/d/Y') === $searchTerm) {
                    $formattedDate = $dateTime->format('Y-m-d');
                    $searchTerm = $formattedDate;
                }
                if ($user_info['roles'] == 'GUEST_BANK'){
                    $customer_id = $user_info['id_customer'];
                    $query = TransaksiStatusDelivery::select(['transaksi_status_delivery.*'])
                                                    ->join('tbl_po', 'tbl_po.id' , '=', 'transaksi_status_delivery.id_po')
                                                    ->where('tbl_po.customer', $customer_id)
                                                    ->orderBy('id', 'DESC');
                } else {
                    $query = TransaksiStatusDelivery::select(['transaksi_status_delivery.*'])
                                                    ->join('tbl_po', 'tbl_po.id' , '=', 'transaksi_status_delivery.id_po')
                                                    ->join('transaksi_status_deliv_detail', 'transaksi_status_deliv_detail.id_header' , '=', 'transaksi_status_delivery.id')
                                                    ->distinct()
                                                    ->orderBy('transaksi_status_delivery.id', 'DESC');
                    // $query = TransaksiStatusDelivery::orderBy('id', 'DESC');
                }

                $query->where(function($query) use ($searchTerm) {
                    $query->where('transaksi_status_delivery.sn_mesin', 'LIKE', '%'.$searchTerm.'%')
                        ->orWhere('tbl_po.no_po', 'LIKE', '%'.$searchTerm.'%')
                        ->orWhere('transaksi_status_deliv_detail.updated_at', 'LIKE', '%'.$searchTerm.'%');
                });

                $searchResult = $query->get();

                for ($i = 0; $i < count($searchResult); $i++){
                    $getPo = PurchaseOrder::where('id', $searchResult[$i]->id_po)->first();
                    $searchResult[$i]['detailPo'] = $getPo;

                    $po_master = MasterPo::where('id', $getPo['id_po_master'])->first();
                    $searchResult[$i]['detailPo']['po_master'] = $po_master;

                    $getCustomer = MasterCustomer::where('id', $getPo->customer)->first();
                    $searchResult[$i]['detailPo']['customer'] = $getCustomer;

                    $getGudang = MasterGudang::where('id', $getPo->nama_gudang)->first();
                    $searchResult[$i]['detailPo']['gudang'] = $getGudang;

                    $searchResult[$i]['tgl_perkiraan_keluar'] = $searchResult[$i]['tgl_perkiraan_keluar'];
                    $searchResult[$i]['tgl_perkiraan_tiba'] = $searchResult[$i]['tgl_perkiraan_tiba'];

                    $get_tgl_keluar = TransaksiStatusDeliveryDetail::select('updated_at')
                                                      ->where('status', 'LOADING')
                                                      ->where('id_header', $searchResult[$i]['id'])->first();

                    $get_tgl_tiba = TransaksiStatusDeliveryDetail::select('updated_at')
                                                      ->where('status', 'TIBA')
                                                      ->where('id_header', $searchResult[$i]['id'])->first();

                    $searchResult[$i]['tgl_keluar'] = $get_tgl_keluar ? $get_tgl_keluar['updated_at'] : null;
                    $searchResult[$i]['tgl_received'] = $get_tgl_tiba ? $get_tgl_tiba['updated_at'] : null;
                }

                if ($searchResult->count() > 0) {
                    return response()->json([
                        "success" => true,
                        "totalDatas" => $searchResult->count(),
                        "data" => [
                            "data" => $searchResult
                        ]
                    ], 200);
                }else{
                    return response()->json([
                        "success" => true,
                        "totalDatas" => 0,
                        "data" => [
                            "data" => []
                        ]
                    ], 200);
                }
            }
        }

        for ($i = 0; $i < count($this->statusDelivery); $i++){
              $getPo = PurchaseOrder::where('id', $this->statusDelivery[$i]->id_po)->first();
              $this->statusDelivery[$i]['detailPo'] = $getPo;

              $po_master = MasterPo::where('id', $getPo['id_po_master'])->first();
              $this->statusDelivery[$i]['detailPo']['po_master'] = $po_master;

              $getCustomer = MasterCustomer::where('id', $getPo->customer)->first();
              $this->statusDelivery[$i]['detailPo']['customer'] = $getCustomer;

              $getGudang = MasterGudang::where('id', $getPo->nama_gudang)->first();
              $this->statusDelivery[$i]['detailPo']['gudang'] = $getGudang;

              $this->statusDelivery[$i]['tgl_perkiraan_keluar'] = $this->statusDelivery[$i]['tgl_perkiraan_keluar'];
              $this->statusDelivery[$i]['tgl_perkiraan_tiba'] = $this->statusDelivery[$i]['tgl_perkiraan_tiba'];

              $get_tgl_keluar = TransaksiStatusDeliveryDetail::select('updated_at')
                                                ->where('status', 'LOADING')
                                                ->where('id_header', $this->statusDelivery[$i]['id'])->first();

              $get_tgl_tiba = TransaksiStatusDeliveryDetail::select('updated_at')
                                                ->where('status', 'TIBA')
                                                ->where('id_header', $this->statusDelivery[$i]['id'])->first();

              $this->statusDelivery[$i]['tgl_keluar'] = $get_tgl_keluar ? $get_tgl_keluar['updated_at'] : null;
              $this->statusDelivery[$i]['tgl_received'] = $get_tgl_tiba ? $get_tgl_tiba['updated_at'] : null;
        }

        return response()->json([
                "success" => true,
                "totalDatas" => $this->statusDelivery->count(),
                "data" => $this->statusDelivery
            ], 200);
    }

    function store(Request $request){

        $check_exist = TransaksiStatusDelivery::where('id_po', $request->id_po)->where('sn_mesin', $request->sn_mesin)->exists();

        if ($check_exist){
            return response()->json([
                "success" => false,
                "message" => "Transaksi Status Delivery with SN Number ".$request->sn_mesin." was Exists."
            ], 400);
        }


        $data = $request->all();
        $validator = Validator::make($data, [
            'id_po' => 'required',
            'id_mesin' => 'required',
            'sn_mesin' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try{
            $inserted = TransaksiStatusDelivery::create($data);

            if ($inserted){
                return response()->json([
                    "success" => true,
                    "message" => "Transaksi Status Delivery created successfully.",
                    "data" => $inserted
                ], 200);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "Transaksi Status Delivery Insert Error.",
                    "data" => []
                ], 400);
            }
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 500);
        }
    }

    function update($id, Request $request){
        $data = $request->except(['detailPo', 'created_at', 'updated_at', 'tgl_keluar', 'tgl_received']);

        $validator = Validator::make($data, [
            'id_po' => 'required',
            'id_mesin' => 'required',
            'sn_mesin' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $updateStatusDelivery = TransaksiStatusDelivery::where('id', $id)->update($data);
        $statusDelivery = TransaksiStatusDelivery::where('id', $id)->first();

        if($statusDelivery){
            return response()->json([
                "success" => true,
                "message" => "PO Master was Updated.",
                "data" => $statusDelivery
            ]);
        } else {

        }
    }

    function destroy($id){
        $transStatusDeliv = TransaksiStatusDelivery::findOrFail($id);
        $transStatusDeliv->delete();

        if ($transStatusDeliv){
            TransaksiStatusDeliveryDetail::where('id_header', $id)->delete();

            return response()->json([
                "success" => true,
                "message" => "Status Delivery dengan SN Mesin ".$transStatusDeliv->sn_mesin." berhasil di hapus.",
                "data" => $transStatusDeliv
            ], 200);
        } else {
            return response()->json([
                    'success' => false,
                    'message' => 'Status Delivery Gagal di hapus',
                ], 400);
        }
    }

    // filtering data summary
    function getDataStatusDelivery($idPo, $snMesin, $id_customer, $warehouse, $tgl_tiba){

        $q1 = 'select po.customer, po.nama_gudang, tsd.* from transaksi_status_delivery tsd, tbl_po po
                where tsd.id_po = po.id and tsd.obsolete IS NULL ';

        switch($q1){
            case $idPo != 'null' && $snMesin == 'null' && $id_customer == 'null' && $warehouse == 'null' && $tgl_tiba == 'null':
                $q1 .=' and id_po = '.$idPo;
                break;
            case $idPo != 'null' && $snMesin != 'null' && $id_customer == 'null' && $warehouse == 'null' && $tgl_tiba == 'null':
                $q1 .= ' and id_po = '.$idPo
                    .' and sn_mesin = \''.$snMesin.'\'';
                break;
             case $idPo != 'null' && $snMesin == 'null' && $id_customer != 'null' && $warehouse == 'null' && $tgl_tiba == 'null':
                $q1 .= ' and id_po = '.$idPo
                    .=' and customer = '.$id_customer;
                break;
            case $idPo == 'null' && $snMesin == 'null' && $id_customer != 'null' && $warehouse == 'null' && $tgl_tiba == 'null':
                $q1 .=' and customer = '.$id_customer;
                break;
            case $idPo == 'null' && $snMesin == 'null' && $id_customer == 'null' && $warehouse != 'null' && $tgl_tiba == 'null':
                $q1 .=' and nama_gudang = '.$warehouse;
                break;
            case $idPo == 'null' && $snMesin == 'null' && $id_customer == 'null' && $warehouse == 'null' && $tgl_tiba != 'null':
                $q1 .=' and date_format(tgl_perkiraan_tiba , \'%Y-%m-%d\') = \''.$tgl_tiba.'\'';
                break;
            case $idPo == 'null' && $snMesin == 'null' && $id_customer == 'null' && $warehouse != 'null' && $tgl_tiba != 'null':
                $q1 .=' and nama_gudang = '.$warehouse
                    .' and date_format(tgl_perkiraan_tiba , \'%Y-%m-%d\') = \''.$tgl_tiba.'\'';
                break;
            case $idPo == 'null' && $snMesin == 'null' && $id_customer != 'null' && $warehouse != 'null' && $tgl_tiba != 'null':
                $q1 .=' and customer = '.$id_customer
                    .' and nama_gudang = '.$warehouse
                    .' and date_format(tgl_perkiraan_tiba , \'%Y-%m-%d\') = \''.$tgl_tiba.'\'';
                break;
            case $idPo != 'null' && $snMesin == 'null' && $id_customer != 'null' && $warehouse != 'null' && $tgl_tiba == 'null':
                $q1 .=' and id_po = '.$idPo
                    .' and customer = '.$id_customer
                    .' and nama_gudang = '.$warehouse;
                break;
            case $idPo != 'null' && $snMesin == 'null' && $id_customer != 'null' && $warehouse != 'null' && $tgl_tiba != 'null':
                $q1 .=' and id_po = '.$idPo
                    .' and customer = '.$id_customer
                    .' and nama_gudang = '.$warehouse
                    .' and date_format(tgl_perkiraan_tiba , \'%Y-%m-%d\') = \''.$tgl_tiba.'\'';
                break;
            case $idPo != 'null' && $snMesin != 'null' && $id_customer != 'null' && $warehouse != 'null' && $tgl_tiba != 'null':
                $q1 .=' and id_po = '.$idPo
                    .' and sn_mesin = \''.$snMesin.'\''
                    .' and customer = '.$id_customer
                    .' and nama_gudang = '.$warehouse
                    .' and date_format(tgl_perkiraan_tiba , \'%Y-%m-%d\') = \''.$tgl_tiba.'\'';
                break;
            default:
                $q1 = $q1;
                break;
        }

        $get_datas = DB::select($q1);

        for ($a=0; $a< count($get_datas); $a++){
            $getPo = PurchaseOrder::where('id', $get_datas[$a]->id_po)->first();
            $get_datas[$a]->detailPo = $getPo;

            $po_master = MasterPo::where('id', $getPo['id_po_master'])->first();
            $get_datas[$a]->detailPo->po_master = $po_master;

            $getCustomer = MasterCustomer::where('id', $getPo['customer'])->first();
            $get_datas[$a]->detailPo->customer = $getCustomer;

            $getGudang = MasterGudang::where('id', $getPo['nama_gudang'])->first();
            $get_datas[$a]->detailPo->gudang = $getGudang;

            $get_tgl_keluar = TransaksiStatusDeliveryDetail::select('updated_at')
                                ->where('status', 'LOADING')
                                ->where('id_header', $get_datas[$a]->id)->first();

            $get_tgl_tiba = TransaksiStatusDeliveryDetail::select('updated_at')
                                ->where('status', 'TIBA')
                                ->where('id_header', $get_datas[$a]->id)->first();

            $get_datas[$a]->tgl_keluar = $get_tgl_keluar ? $get_tgl_keluar['updated_at'] : null;
            $get_datas[$a]->tgl_received = $get_tgl_tiba ? $get_tgl_tiba['updated_at'] : null;
        }

        return response()->json([
            'success' => true,
            'totalDatas' => count($get_datas),
            'data' => $get_datas
        ]);
    }
}
