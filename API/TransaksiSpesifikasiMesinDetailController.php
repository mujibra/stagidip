<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiSpesifikasiMesin as TransaksiSpekHeader;
use App\Models\TransaksiSpesifikasiMesinDetail as TransaksiSpekDetail;
use App\Models\MasterSpesifikasiMesin as MasterSpekMesin;

class TransaksiSpesifikasiMesinDetailController extends Controller
{
    function store(Request $request){
        $data = json_decode($request->getContent(), true);

        $get_timing = $data[0]['time_todo'];
        $dataArray = $data[0]['dataArray'];

        if (count($dataArray)>0){
            $data_header_exist = TransaksiSpekHeader::where('id', $dataArray[0]['id_spek_mesin_hdr'])->exists();

            if ($data_header_exist){
                $data_inserted = [];
                for ($a=0; $a< count($dataArray); $a++){

                    if ( in_array($dataArray[$a]['item_desc'], ['MEMORY', 'MONITOR', 'HDD', 'CARDBIN', 
                                                           'CASSETTE', 'REJECT', 'KUNCI FASCIA ATAS', 
                                                           'KUNCI CASSETTE/REJECT', 'LAN CARD',
                                                           'KABEL HDMI TO DVI', 'CUSTOMER DISPLAY', 'CUSTOMER INPUT'])) {

                        $dataArray[$a]['fill_description'] = json_encode($dataArray[$a]['fill_description'], true);
                    }

                    $data_inserted[$a] = TransaksiSpekDetail::create($dataArray[$a]);
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

    function update(Request $request){
        $data = json_decode($request->getContent(), true);
        $dataUpdated= [];
        
        for ($a=0; $a< count($data); $a++){
            if ( in_array($data[$a]['item_desc'], ['MEMORY', 'MONITOR', 'HDD', 'CARDBIN', 
                                                           'CASSETTE', 'REJECT', 'KUNCI FASCIA ATAS', 
                                                           'KUNCI CASSETTE/REJECT', 'LAN CARD',
                                                           'KABEL HDMI TO DVI']) ) {

                $data[$a]['fill_description'] = json_encode($data[$a]['fill_description'], true);
            }

            $dataUpdated[$a] = TransaksiSpekDetail::where('id_spek_mesin_hdr', $data[$a]['id_spek_mesin_hdr'])
                                                    ->where('item_desc', $data[$a]['item_desc'])
                                                    ->update($data[$a]);
        }

         if (count($dataUpdated)> 0){
                    return response()->json([
                        "success" => true, 
                        "message" => "Transaksi Spesifikasi Mesin Detail updated successfully.", 
                        "data" => $dataUpdated
                    ], 200);
         }

    }

    function getByIdSpek($idHeader){
        $select_SpekId = TransaksiSpekHeader::where('id', $idHeader)->first();

        if ($select_SpekId){
            $datas = TransaksiSpekDetail::where('id_spek_mesin_hdr', $select_SpekId->id)->get();

            for ($a=0; $a< count($datas); $a++){
                if ( in_array($datas[$a]['item_desc'], ['MEMORY', 'MONITOR', 'HDD', 'CARDBIN', 
                                                           'CASSETTE', 'REJECT', 'KUNCI FASCIA ATAS', 
                                                           'KUNCI CASSETTE/REJECT', 'LAN CARD',
                                                           'KABEL HDMI TO DVI', 'CUSTOMER DISPLAY', 'CUSTOMER INPUT'])){
                    
                    $total_array = count(json_decode($datas[$a]['fill_description'], true));

                    $dataArray=array();
                    for ($b=0; $b< $total_array; $b++){

                        $row_data = json_decode($datas[$a]['fill_description']);

                        $selectObject = MasterSpekMesin::where('id', $row_data[$b])->first();
                        array_push($dataArray, $selectObject);
                    }
                    $datas[$a]['fill_description'] = $dataArray;
                } else {
                    $selectObject = MasterSpekMesin::where('id', $datas[$a]->fill_description)->first();
                    $datas[$a]['fill_description'] = $selectObject;
                }
            }

            return response()->json([
                'success' => true,
                'totalDatas' => count($datas),
                'data' => $datas, 
                'status' => count($datas) > 0 ? true : false
             ]);
        }
    }
}
