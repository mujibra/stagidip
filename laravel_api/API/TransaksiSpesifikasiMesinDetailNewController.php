<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiSpesifikasiMesin as TransaksiSpekHeader;
use App\Models\Models;
use App\Models\MasterParentTypeSpekMesin;
use App\Models\MasterTypeSpekMesin;
use App\Models\MasterSpekMesinFNew;
use App\Models\TransaksiSpesifikasiMesinDetailNew;

class TransaksiSpesifikasiMesinDetailNewController extends Controller
{
    function getByIdSpekNew($idHeader){
        $select_SpekId = TransaksiSpekHeader::select(['mdl.name as type_name', 'transaksi_spesifikasi_mesin.*'])
                            ->join('models as mdl', 'mdl.id', '=', 'transaksi_spesifikasi_mesin.model')
                            ->where('transaksi_spesifikasi_mesin.id', $idHeader)->first();

        $type_mesin = $select_SpekId['type_name'];

        $list_parent = [];
        $specification_dtl_status = false;

        if ($select_SpekId){
            $get_parent = MasterParentTypeSpekMesin::where('type_atm', 'like', '%'.$type_mesin.'%')->get();
            
            for ($x=0; $x< count($get_parent); $x++){

                $list_child = [];
                $data_parent = [
                    'id_parent' => $get_parent[$x]['id'], 
                    'parent'    => $get_parent[$x]['parent']
                ];
                $get_detail = MasterTypeSpekMesin::where('id_parent', $get_parent[$x]['id'])->get();

                for ($z=0; $z< count($get_detail); $z++){
                    $get_item_list = MasterSpekMesinFNew::where('item_code', $get_detail[$z]['val'])->get();
                    $get_detail[$z]['list_item'] = $get_item_list;

                    $get_transaction = TransaksiSpesifikasiMesinDetailNew::where('id_spek_mesin_hdr', $idHeader)->exists();

                    if ($get_transaction){
                        $item_selected = TransaksiSpesifikasiMesinDetailNew::where('id_spek_mesin_hdr', $idHeader)
                                                                           ->where('id_parent', $get_parent[$x]['id'])
                                                                           ->first();

                        if ($item_selected == null) {
                            // dd("Error Anjiir");
                            $get_parent[$x]['results'] =  null;
                        } else {

                            $get_parent[$x]['results'] =  $item_selected->results;

                            $get_detail[$z]['specification_dtl_status'] = true;
                            $specification_dtl_status = true;

                            if (isset($item_selected['fill_description'])){

                                $check_item_is_array = is_array(json_decode($item_selected['fill_description'], true));
                                if ($check_item_is_array){

                                    $total_array = count(json_decode($item_selected['fill_description'], true));
                                    $datas = json_decode($item_selected['fill_description'], true);

                                    for($a=0; $a<$total_array; $a++){
                                        if ($a == $z){
                                            $row_data = MasterSpekMesinFNew::where('id', $datas[$a])->where('item_code', $get_detail[$z]['val'])->first();
                                            $get_detail[$z]['item_selected'] = $row_data;
                                        }
                                    }
                                } else {
                                    $row_data = MasterSpekMesinFNew::where('id', $item_selected['fill_description'])->where('item_code', $get_detail[$z]['val'])->first();
                                    $get_detail[$z]['item_selected'] = $row_data;
                                }
                            } else {
                                $get_detail[$z]['item_selected'] = null;
                            }
                        }
                       
                    } else {
                        $get_detail[$z]['specification_dtl_status'] = false;
                        $specification_dtl_status = false;
                    }
                    array_push($list_child, $get_detail[$z]);
                }

                $get_parent[$x]['data_item'] = $list_child;
                unset ($get_parent[$x]['type_atm']);
            }
        }

        return response()->json([
            'success'       => true, 
            'totalDatas'    => count($get_parent), 
            'datas'         => $get_parent, 
            'specification_dtl_status' => $specification_dtl_status, 
            'timer_spesification' => $select_SpekId['time_todo']
        ]);
    }

    function store(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $get_timing = $data[0]['time_todo'];
        $dataArray = $data[0]['dataArray'];

        if ( count($dataArray) >0 ){
            $data_header_exist = TransaksiSpekHeader::where('id', $dataArray[0]['id_spek_mesin_hdr'])->exists();

            if ($data_header_exist) {
                $data_inserted = [];
                for ($a=0; $a< count($dataArray); $a++) {
                    $check_item_is_array = is_array($dataArray[$a]['fill_description']);

                    if ($check_item_is_array){
                        $check_array = $dataArray[$a]['fill_description'];
                        if (count($check_array) == 1) {
                            if ( $check_array[0] != null){
                                $dataArray[$a]['fill_description'] = str_replace(['[', ']'], '', json_encode($dataArray[$a]['fill_description'], true));
                            } else {
                                $dataArray[$a]['fill_description'] = NULL;
                            }
                        } else {
                            $dataArray[$a]['fill_description'] = json_encode($dataArray[$a]['fill_description'], true);
                        }
                    } else {
                        $dataArray[$a]['fill_description'] = NULL;
                    }
                    $data_inserted[$a] = TransaksiSpesifikasiMesinDetailNew::create($dataArray[$a]);
                }

                TransaksiSpekHeader::where('id', $dataArray[0]['id_spek_mesin_hdr'])->update(['time_todo' => $get_timing]);

                if (count($data_inserted)> 0){
                    return response()->json([
                        "success" => true, 
                        "message" => "Transaksi Spesifikasi Mesin Detail created successfully.", 
                        "data" => $data_inserted
                    ], 200);
                }
            }
        } else {
            return response()->json([
                "success" => false,
                "message"=> "Transaksi Spesifikasi Mesin Detail Error Inserted."
            ], 400);
        }
    }


    function update($idHeader, Request $request)
    {
        $data = json_decode($request->getContent(), true);

        if ( count($data)> 0) {
            $data_header_exist = TransaksiSpekHeader::where('id', $idHeader)->exists();
           
            if ($data_header_exist){
                $dataUpdated = [];
                for ($a=0; $a<count($data); $a++){

                    $check_item_is_array = is_array($data[$a]['fill_description']);

                    if ($check_item_is_array){
                        $check_array = $data[$a]['fill_description'];
                        if (count($check_array) ==1){
                            if ( $check_array[0] != null){
                                $data[$a]['fill_description'] = str_replace(['[', ']'], '', json_encode($data[$a]['fill_description'], true));
                            } else {
                                $data[$a]['fill_description'] = NULL;
                            }
                        } else {
                            $data[$a]['fill_description'] = json_encode($data[$a]['fill_description'], true);
                        }

                        $dataUpdated[$a] = TransaksiSpesifikasiMesinDetailNew::where('id_spek_mesin_hdr', $data[$a]['id_spek_mesin_hdr'])
                                                                            ->where('id_parent', $data[$a]['id_parent'])
                                                                            ->where('item_parent', $data[$a]['item_parent'])
                                                                            ->update($data[$a]);
                    }
                }

                if (count($dataUpdated)> 0){
                    return response()->json([
                        "success" => true, 
                        "message" => "Transaksi Spesifikasi Mesin Detail updated successfully.", 
                        "data" => $dataUpdated
                    ], 200);
                }
            }
            
        }


    }
}
