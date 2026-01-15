<?php

function getDataProjectStatus(){
    $getDataBank = MasterCustomer::select('id', 'bank_desc')->get();

    foreach ($getDataBank as $bank) {
        // Use setters or public properties to modify the model attributes
        $bank->jumlah = 0;
        $poCounts = [];
        $totalMesin = 0;

        $month = $_GET['month'] ? $_GET['month'] : '';
        $year = $_GET['year'] ? $_GET['year'] : '';
        
        $query = PurchaseOrder::where('customer', 6)
        ->whereNull('deleted_at');

        if ($month && $year) {
            $query->whereYear('tgl_staging', $year)
                  ->whereMonth('tgl_staging', $month);
        } elseif ($month) {
            $query->whereMonth('tgl_staging', $month);
        } elseif ($year) {
            $query->whereYear('tgl_staging', $year);
        }

        $purchaseOrders = $query->get();

        $purchaseOrders->each(function ($po) use (&$poCounts, &$totalMesin) {
            $poCounts[$po->id] = $po->jumlah;
            $totalMesin += $po->jumlah;
        });

        // Fetch and process machines for each PO
        foreach ($poCounts as $poId => $poCount) {
            $tableColumns = Schema::getColumnListing('crt_'.$poId);
            $data_sn_mesin = ['ATM_MESIN','CRM_MESIN', 'TCR_MESIN', 'CS_KIOS_MESIN', 'VBK_MESIN', 'NEW_MESIN'];
            $columnNames = array_intersect($data_sn_mesin, $tableColumns);
            $columnName = reset($columnNames);

            for ($i = 1; $i <= $poCount; $i++) {
                $snMesin = DB::table('crt_'.$poId)->where('id', $i)->value($columnName);
                
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