<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TransaksiSpesifikasiMesin as TransaksiSpekHeader;
use App\Models\Models;
use App\Models\MasterParentTypeSpekMesin;
use App\Models\MasterTypeSpekMesin;
use App\Models\MasterSpekMesinFNew;

class TransaksiSpesifikasiMesinDetailNewController extends Controller
{
    function getByIdSpekNew($idHeader){
        $select_SpekId = TransaksiSpekHeader::select(['mdl.name as type_name', 'transaksi_spesifikasi_mesin.*'])
                            ->join('models as mdl', 'mdl.id', '=', 'transaksi_spesifikasi_mesin.model')
                            ->where('transaksi_spesifikasi_mesin.id', $idHeader)->first();

        $type_mesin = $select_SpekId['type_name'];

        $list_parent = [];
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
                    array_push($list_child, $get_detail[$z]);
                }

                $get_parent[$x]['data_item'] = $list_child;
                unset ($get_parent[$x]['type_atm']);
            }
        }

        return response()->json([
            'success' => true, 
            'totalDatas' => count($get_parent), 
            'datas' => $get_parent
        ]);
    }
}
