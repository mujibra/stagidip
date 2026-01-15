<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterGudang;
use App\Models\PurchaseOrder;
use App\Models\MasterCustomer;
use App\Models\MasterWSInfo;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DashboardController extends Controller
{
    // get data Mesin per Warehouse
    function getDataMesinPerWarehouse(){
        $q1 = '
            select xx.gudang_id, 
            xx.gudang_name, 
            ifnull(xx.jml_mesin, 0) + ifnull(xx.jml_yg_keluar_darigudang, 0) + ifnull(xx.jml_yg_masuk_kegudang, 0) jumlah
            from (
                select gdg.id gudang_id, 
                       gdg.gudang_desc gudang_name, 
                        (select sum(jumlah) from tbl_po po where po.nama_gudang = gdg.id) jml_mesin, 
                        (select -sum(jumlah) from warehouse_transfer wt where wt.from_warehouse = gdg.id) jml_yg_keluar_darigudang, 
                        (select sum(jumlah) from warehouse_transfer wt where wt.to_warehouse = gdg.id) jml_yg_masuk_kegudang
                        from mst_gudang gdg
            ) xx 
        ';

        $getDatas = DB::select($q1);
        
        return response()->json([
            'success' => true,
            'totalDatas' => count($getDatas),
            'data' => $getDatas
        ]);
    }


    // get data top 3 customer purchase
    function getData3TopByCustomer(){
        $year = isset($_GET['year']) ? $_GET['year'] : '';

        // Construct the base query
        $q1 = 'SELECT xx.* FROM (
                    SELECT cust.id, cust.bank_desc, 
                        (SELECT SUM(po.jumlah) FROM tbl_po po
                        WHERE po.customer = cust.id';

        // If year is set, add the year condition to the subquery
        if ($year) {
            $q1 .= " AND YEAR(po.tgl_po) = $year";
        }

        // Complete the subquery and main query
        $q1 .= ') total_mesin_per_customer
                FROM mst_customer cust) xx
                WHERE xx.total_mesin_per_customer IS NOT NULL
                ORDER BY xx.total_mesin_per_customer DESC
                LIMIT 3';

        // Execute the query
        $getDatas = DB::select($q1);

        // Return the response
        return response()->json([
            'success' => true,
            'totalDatas' => count($getDatas),
            'data' => $getDatas
        ]);
    }

    function getDataMachineStatus(){

        // $start_date = date('Y-m-d', strtotime(date('Y-m-1')));
        // $end_date = date("Y-m-d");

        $month = $_GET['month'] ? $_GET['month'] : date('m');
        $year = $_GET['year'] ? $_GET['year'] : date('Y');

        $start_date = date('Y-m-01', strtotime(date("$year-$month-01")));
        $end_date = date('Y-m-t', strtotime("$year-$month-01"));
        
        if ($month == date('m') && $year == date('Y')) {
            $end_date = date('Y-m-d'); // Set end date to current date
        }

        $current_date = $start_date;

        $data_range = ['new_machine' => [], 'old_machine' => []];

        $idx = 0;
        while ( strtotime($current_date) <= strtotime($end_date))
        {
            $data_range['new_machine'][$idx]['tanggal'] = $current_date;
            $data_range['old_machine'][$idx]['tanggal'] = $current_date;
            $current_date = date('Y-m-d', strtotime("+1 day", strtotime($current_date)));
            $idx++;
        }

        for ( $x=0; $x < count($data_range['new_machine']); $x++ ){

            $q1 = 'select sum(jumlah) jml, date_format(tgl_staging, "%Y-%m-%d") tgl_staging  
                    from tbl_po 
                    where date_format(tgl_staging, "%Y-%m-%d") <= curdate()
                    and status_mesin = "New Machine"
                    group by date_format(tgl_staging, "%Y-%m-%d") 
                    order by tgl_staging';

            $datas = DB::select($q1);

            for ( $y=0; $y< count($datas); $y++ ) {
                if ($datas[$y]->tgl_staging === $data_range['new_machine'][$x]['tanggal']){
                    $data_range['new_machine'][$x]['jumlah'] = $datas[$y]->jml ? $datas[$y]->jml : null;
                }
            }

            if (!array_key_exists('jumlah', $data_range['new_machine'][$x])) {
                $data_range['new_machine'][$x]['jumlah'] = "0";
            }
        }


        for ($a=0; $a < count($data_range['old_machine']); $a++ ) {

            $q2 = 'select sum(jumlah) jml, date_format(tgl_staging, "%Y-%m-%d") tgl_staging  
                    from tbl_po 
                    where date_format(tgl_staging, "%Y-%m-%d") <= curdate()
                    and status_mesin = "Old Machine"
                    group by date_format(tgl_staging, "%Y-%m-%d") 
                    order by tgl_staging';

            $datas2 = DB::select($q2);

            for ( $z=0; $z< count($datas2); $z++ ) {
                if ($datas2[$z]->tgl_staging === $data_range['old_machine'][$a]['tanggal']){
                    $data_range['old_machine'][$a]['jumlah'] = $datas2[$z]->jml ? $datas2[$z]->jml : "0";
                }
            }

            if (!array_key_exists('jumlah', $data_range['old_machine'][$a])) {
                $data_range['old_machine'][$a]['jumlah'] = "0";
            }
        }

        return response()->json([
            'data_range' => $data_range
        ]);
    }

    function getDataProjectStatus(){
        $getDataBank = MasterCustomer::select('id', 'bank_desc')->get();
        $month = $_GET['month'] ? $_GET['month'] : '';
        $year = $_GET['year'] ? $_GET['year'] : '';

        foreach ($getDataBank as $bank) {
            // Use setters or public properties to modify the model attributes
            $bank->jumlah = 0;
            $poCounts = [];
            $totalMesin = 0;
    
            // Fetch PO counts and total machines for the customer
            $poQuery = PurchaseOrder::where('customer', $bank->id)
                            ->whereNull('deleted_at');
            
            if ($month && $year) {
                // If both month and year are set, filter by both
                $poQuery->whereYear('tgl_staging', $year)
                    ->whereMonth('tgl_staging', $month);
            } elseif ($month) {
                // If only month is set, filter by month
                $poQuery->whereMonth('tgl_staging', $month);
            } elseif ($year) {
                // If only year is set, filter by year
                $poQuery->whereYear('tgl_staging', $year);
            }
    
            $poQuery->get()
                    ->each(function ($po) use (&$poCounts, &$totalMesin) {
                        $poCounts[$po->id] = $po->jumlah;
                        $totalMesin += $po->jumlah;
                    });
    
            $bank->total_mesin = $totalMesin;
            
            // Fetch and process machines for each PO
            foreach ($poCounts as $poId => $poCount) {
                $tableColumns = Schema::getColumnListing('crt_' . $poId);
                $columnNames = array_intersect(['ATM_MESIN', 'CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN', 'NEW_MESIN'], $tableColumns);
                $columnName = reset($columnNames);
    
                for ($i = 1; $i <= $poCount; $i++) {
                    $snMesin = DB::table('crt_' . $poId)->where('id', $i)->value($columnName);
    
                    $checkInstallDate = MasterWSInfo::where('serial_number', $snMesin)
                        ->whereNotNull('installation_date')
                        ->exists();
    
                    if ($checkInstallDate) {
                        $bank->jumlah++;
                    }
                }
            }
    
            $bank->persentase = $totalMesin != 0 ? ($bank->jumlah * 100) / $totalMesin : 0;
        }
    
        return response()->json([
            'datas_per_customer' => $getDataBank
        ]);
    }

    // get count jumlah mesin group by bulan by customer 
    function getJumlahMesinPerbulan($month_from, $month_to){
        $list_month = [];
        $idx = 0;
        for ($i=5; $i> 0; $i--){
            $list_month[$idx] = date('Y-m', strtotime("-$i month")); 
            $idx++;
        }
        $get_year = explode('-', $list_month[4])[0];
        $get_last_month = (int) explode('-', $list_month[4])[1] +1;
        $add_month = $get_last_month < 10 ? '0'.(String)$get_last_month : (String)$get_last_month; 
        array_push($list_month, $get_year.'-'.$add_month);

        $sql = 'select distinct 
                   mc.id, 
                   mc.bank_desc
                   from tbl_po po, mst_customer mc 
                   where po.customer = mc.id';

        if ($month_from != 'null' && $month_to != 'null'){
            $where = ' and DATE_FORMAT(po.tgl_po, "%Y-%m") between "'.$month_from.'" and "'.$month_to.'"';
            $sql = $sql.$where;
        }

        $get_list_bank = DB::select($sql);

        $datas_per_month = [];
        $idx = 0;

        for ($i=0; $i<count($list_month); $i++){
            $get_month = (String)$list_month[$i];
            $get_data_bank = [];
            for($j=0; $j<count($get_list_bank); $j++){

                $query = 'select
                           DATE_FORMAT(po.tgl_po, \'%Y-%m\') tanggal_po, 
                           DATE_FORMAT(po.tgl_po, \'%M\') as bulan,
                           sum(po.jumlah) as total_mesin, 
                           po.customer as id_customer, 
                           (select mc.bank_desc from mst_customer mc where mc.id = po.customer) as customer 
                           from tbl_po po
                           where 1=1';

                if ($month_from != 'null' && $month_to != 'null'){
                    $where2 = $query.' and DATE_FORMAT(po.tgl_po, "%Y-%m") between \''.$month_from.'\' and \''.$month_to.'\'';
                    $query = $where2;

                    $query .=' group by 
                        po.customer, 
                        DATE_FORMAT(po.tgl_po, \'%Y-%m\'), 
                        DATE_FORMAT(po.tgl_po, \'%M\')';
                } else {
                    $query .=' group by 
                        po.customer, 
                        DATE_FORMAT(po.tgl_po, \'%Y-%m\'), 
                        DATE_FORMAT(po.tgl_po, \'%M\')';
                }
                $get_data_total_mesin = DB::select($query);

                $datas_per_month[$idx]['periode']   = $get_month;
                $datas_per_month[$idx]['id_bank']   = $get_list_bank[$j]->id;
                $datas_per_month[$idx]['bank']      = $get_list_bank[$j]->bank_desc;

                for ($k=0; $k<count($get_data_total_mesin); $k++){
                    if ($get_data_total_mesin[$k]->id_customer == $datas_per_month[$idx]['id_bank'] && 
                        $get_data_total_mesin[$k]->tanggal_po == $datas_per_month[$idx]['periode']) 
                    {
                        if (isset($get_data_total_mesin[$k]->total_mesin)){
                            $datas_per_month[$idx]['bulan']         = $get_data_total_mesin[$k]->bulan;
                            $datas_per_month[$idx]['total_mesin']   = $get_data_total_mesin[$k]->total_mesin;
                        }
                    } 
                }

                $check_month = explode('-', $datas_per_month[$idx]['periode'])[1];

                $months = '';
                switch ($check_month){
                    case '01' : $months = 'January'; break;
                    case '02' : $months = 'February'; break;
                    case '03' : $months = 'March'; break;
                    case '04' : $months = 'April'; break;
                    case '05' : $months = 'May'; break;
                    case '06' : $months = 'June'; break;
                    case '07' : $months = 'July'; break;
                    case '08' : $months = 'August'; break;
                    case '09' : $months = 'September'; break;
                    case '10' : $months = 'October'; break;
                    case '11' : $months = 'November'; break;
                    case '12' : $months = 'December'; break;
                }
                if (!array_key_exists('total_mesin', $datas_per_month[$idx])) {
                    $datas_per_month[$idx]['bulan'] = $months;
                    $datas_per_month[$idx]['total_mesin'] =0;
                }
                $idx++;
            }
        }

        return response()->json([
            'success' => true,
            'data' => $datas_per_month
        ]);
    }
}
