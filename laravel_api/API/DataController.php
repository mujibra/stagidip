<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;
use Validator;
use App\Models\User;
use App\Models\DataIms;

class DataController extends Controller
{
    public function storeData(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'dateProblem' => 'required|string|max:255',
            'partNumber' => 'required|string|max:255',
            'partDescription' => 'required|string|max:255',
            'snPart' => 'required|string|max:255',
            'partType' => 'required|string|max:255',
            'purpose' => 'required|string|max:255',
            'partStatus' => 'required|string|max:255',
            'baris' => 'required|string|max:255',
            'qty' => 'required|string|max:255',
            'snATM' => 'required|string|max:255',
            'consumer' => 'required|string|max:255',
            'descriptionProblem' => 'required|string|max:255',
            'snPartPengganti' => 'required|string|max:255',
            'date2Proble' => 'required|string|max:255',
            'doaRma' => 'required|string|max:255',
            'remake' => 'required|string|max:255',
            'qty2' => 'required|string|max:255',
            'date1Proble' => 'required|string|max:255',
            'ids' => 'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = DataIms::create([
            'dateProblem' => $request->dateProblem,
            'partNumber' => $request->partNumber,
            'partDescription' => $request->partDescription,
            'snPart' => $request->snPart,
            'partType' => $request->partType,
            'purpose' => $request->purpose,
            'partStatus' => $request->partStatus,
            'baris' => $request->baris,
            'qty' => $request->qty,
            'snATM' => $request->snATM,
            'consumer' => $request->consumer,
            'descriptionProblem' => $request->descriptionProblem,
            'snPartPengganti' => $request->snPartPengganti,
            'date2Proble' => $request->date2Proble,
            'doaRma' => $request->doaRma,
            'remake' => $request->remake,
            'qty2' => $request->qty2,
            'date1Proble' => $request->date1Proble,
            'ids' => $request->ids,
         ]);


        return response()
            ->json(['data' => $user ]);
    }
    public function getData(){
        $data = DataIms::select('*')->get();
        return $data;
    }
}
