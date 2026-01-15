<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterCustomer;
use App\Models\PurchaseOrder;
use App\Models\MasterPo;
use Illuminate\Support\Facades\Validator;

class MasterCustomerController extends Controller
{
    //
    public function index(){
        $masterCustomer = MasterCustomer::all();

        return response()->json([
                'success' => true,
                'totalDatas' => $masterCustomer->count(),
                'data' => $masterCustomer  
            ]);
    }

    public function store(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'bank_desc' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try{
            $customer = MasterCustomer::create($input);
            
            return response()->json([
                "success" => true, 
                "message" => "Customer created successfully.", 
                "data" => $customer
            ]);
        } catch(\Illuminate\Database\QueryException $ex) {
             return response()->json(["errorMessage"=> $ex->getMessage()], 400);
        }
    }

    public function show($id)
    {
        $customer  = Customer::whereId($id)->first();

        if($customer){
            return response()->json([
                'success' => true,
                'message' => 'Detail data customer',
                'data' => $customer
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data customer tidak ditemukan',
                'data' => []
            ], 400);
        }
    }


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),
            ['bank_desc'=> 'required'],
            ['bank_desc.required' => 'Nama Customer tidak boleh kosong']
        );

        if($validator->fails()){
             return response()->json($validator->errors(), 400);
        } else {
            $customer = MasterCustomer::whereId($id)->update(
                [ 'bank_desc' => $request->input('bank_desc'), 
                  'address' => $request->input('address')
            ]);

            if($customer){

                $selectCust = MasterCustomer::whereId($id)->first();
                return response()->json([
                    'success' => true,
                    'message' => 'Data Customer berhasil di update',
                    'data' => $selectCust
                ],200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data customer gagal diupdate',
                    'data' => []
                ], 400);
            }
        }
    }

    public function destroy($id)
    {
        $checkTransaksiPo = PurchaseOrder::select('*')->where('customer',$id)->exists();
        $customer = MasterCustomer::whereId($id)->first();

        if ($checkTransaksiPo){    
            return response()->json([
                'success' => false,
                'message' => 'Customer '.$customer->bank_desc.' Gagal di hapus, karena sudah ada di Transaksi PO',
            ], 400);
        }

        $checkMasterPo = MasterPo::select('*')->where('id_customer', $id)->exists();
        if ($checkMasterPo){
            return response()->json([
                'success' => false,
                'message' => 'Customer '.$customer->bank_desc.' Gagal di hapus, karena sudah di pakai di Master Purchase Order',
            ], 400);
        }

        $customer = MasterCustomer::findOrFail($id);
        $customer->delete();

        if($customer) {

            return response()->json([
                'success' => true,
                'message' => 'Data customer berhasil dihapus',
                'data' => $customer
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data customer gagal dihapus',
                'data' => []
            ], 400);
        }
    }
}
