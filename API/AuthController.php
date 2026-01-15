<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;
use Validator;
use App\Models\User;
use App\Models\MasterCustomer;
use App\Models\MasterGudang;
use App\Models\PicMarketing;
use Carbon\Carbon;
use App\Jobs\SendEmailJob;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\Mime\Part\TextPart;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {   
        $check = $request->user_login == 'ADMIN' && $request->roles == 'SUPER_ADMIN';

        $check_emailExist = User::where('email', $request->email)->exists();

        if ($check_emailExist){
            return response()->json([
                'success' => false,
                'message' => 'Email yang anda masukkan sebelumnya sudah terdaftar. Harap pilih email lain'
            ], 400);
        }

        if ($check)
        {
            return response()->json([
                'success' => false,
                'message' => 'Role Admin tidak Bisa Menambahkan Role Super Admin.'
            ], 400);
        }

        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'roles' => $request->roles,
            'id_customer' => $request->id_customer,
            'id_gudang' => $request->id_gudang,
            'status' => $request->status
         ]);

         if ($request->roles == "OPERATOR_MOVER"){
            $user['gudang'] = MasterGudang::where('id', $request->id_gudang)->first();
         } else if ($request->roles == "GUEST_BANK"){
            $user['bank_detail'] = MasterCustomer::where('id', $request->id_customer)->first();
         }

        //$token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['data' => $user,'access_token' => null, 'token_type' => 'Bearer', ]);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password')))
        {
            return response()
                ->json(['message' => 'Unauthorized'], 401);
        }


        $user = User::where('email', $request['email'])->firstOrFail();

        if ($user['status'] == 0){
            return response()->json([
                'success' => false,
                'message' => 'user '.$user['name'].' status nya tidak aktif'
            ], 400);
        }

        $data_user = User::where('email', $request['email'])->get();

        //Check Userlogin only on one device. By WinX 16 June 2023 ...
        //$tokenable_id = request()->user()->currentAccessToken()->tokenable_id;
        $personal_access_token = DB::select('select * from personal_access_tokens where tokenable_id = ?', [$user->id] );

        if($personal_access_token != null) {

            DB::delete('delete from personal_access_tokens where tokenable_id = ?', [$user->id]);
            // return response()->json([
            //     'message' => 'Your login session is currently active'

            // ], 400);

        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json([
                'message' => 'Hi '.$user->name.', welcome to home',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user_profile' => $data_user
            ]);
    }

    // method for user logout and delete token
    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'You have successfully logged out and the token was successfully deleted'
        ];
    }

    //forgot password
    public function forgotPwEmail(Request $request){
        $user = User::where('email', $request->email)->first();
        if(!$user){
            return response()
                ->json(['message' => 'Unauthorized'], 401);
        }

        //Generate reset code 4 digits...
        $otp = mt_rand(1000,9999);

        //reset code expired at add 30 minutes
        $current_date = Carbon::now();
        $reset_code_expired_at = Carbon::now()->addMinutes(30);

        //update to table users by email
        $user->reset_code = $otp;
        $user->reset_code_expired_at = $reset_code_expired_at;
        $user->save();

        //send email with queue
        $details['email'] = $user->email;
        $details['name'] = $user->name;
        $details['code'] = $otp;
        $details['subject'] = 'Forgot Password';
        SendEmailJob::dispatch($details);

        return response()
                ->json(['message' => 'The reset code has been successfully sent by email']);
    }
    public function forgotPwCode(Request $request){
        $current_date = Carbon::now();

        $user = User::
            where('email', $request->email)->
            where('reset_code',$request->code)->
            where('reset_code_expired_at','>=',$current_date)->
            first();
        if(!$user){
            return response()
                ->json(['message' => 'Unauthorized'], 401);
        }
        return response()
                ->json(['message' => 'Reset code matches']);
    }
    public function forgotPwNew(Request $request){
        $validator = Validator::make($request->all(),[
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8'
        ]);

        if($validator->fails()){
            return response()->json([
                'validation' => $validator->errors()
            ],400);
        }

        $current_date = Carbon::now();
        $user = User::
            where('email', $request->email)->
            where('reset_code',$request->code)->
            where('reset_code_expired_at','>=',$current_date)->
            first();
        if(!$user){
            return response()
                ->json(['message' => 'Unauthorized'], 401);
        }


        $user->reset_code = null;
        $user->reset_code_expired_at = null;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()
                ->json(['message' => 'The password has been successfully changed. Please log in again.']);
    }

    //check is login
    public function loginCheck(){
        //$user = auth()->user();
        $user = request()->user()->currentAccessToken()->tokenable_id;
        return response()
            ->json(['message' => 'Hi '.$user.', welcome to home']);
    }

    function master_user(){
        $get_data_user = User::get();

        for ($a=0; $a< count($get_data_user); $a++){
            $getCustomer = isset($get_data_user[$a]->id_customer) ? MasterCustomer::where('id', $get_data_user[$a]->id_customer)->first() : null;
            $get_data_user[$a]['customer'] = $getCustomer;

            $getGudang = isset($get_data_user[$a]->id_gudang) ? MasterGudang::where('id', $get_data_user[$a]->id_gudang)->first() : null;
            $get_data_user[$a]['gudang'] = $getGudang;

            unset($get_data_user[$a]['id_customer']);
        }



        if($get_data_user){
            return response()->json([
                'success' => true,
                'data' => $get_data_user
            ], 200);
        }
    }

    function get_pic_approval($type){
        $users = [];

        if ($type == 'DIP'){
            $this->users = User::where('roles', 'OPERATOR_DIP')->get();
        } else if ($type == 'TSS'){
            $this->users = User::where('roles', 'OPERATOR_TSS')->get();
        } else if ($type == 'MOVER'){
            $this->users = User::where('roles', 'OPERATOR_MOVER')->get();
        } else {
            $this->users = [];
        }

        return response()->json([
                'success' => true,
                'totalDatas' => count($this->users),
                'data' => $this->users
            ], 200);
    }


    function update($id, $user_login, Request $request){
        $data = $request->all();

        $check_user_login = User::select('roles')->where('id', $user_login)->first();
        $check_user_update = User::where('id', $id)->first();

        if ($request->has('password')){
            $data['password'] = Hash::make($request->password);
        } else {
            unset($data['password']);
        }

        $check_cannot_inactive = $check_user_login['roles'] =='ADMIN' && $request->status == 0 && $check_user_update['roles'] == 'SUPER_ADMIN';

        if ($check_cannot_inactive){
            return response()->json([
                'success' => false,
                'message' => 'Role Admin tidak Bisa melakukan Inactive Role Super Admin.'
            ], 400);
        }

        $validator = Validator::make($request->all(),
            ['roles' => 'required'],
            ['roles.required' => 'Roles wajib dipilih']
        );

        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'data' => $validator->errors()
            ]);
        } else {

            $updated = User::whereId($id)->update($data);

            if ($data){
                return response()->json([
                    'success' => true,
                    'message' => 'Data User '.$check_user_update['name'].' berhasil diupdate',
                    'data' => $check_user_update
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data pic mitra gagal diupdate'
                ], 400);
            }
        }
    }


    function destroy($id, $user_login){

        $check_user_login = User::select('roles')->where('id', $user_login)->first();
        $check_user_delete = User::where('id', $id)->first();

        $check_not_deleted = $check_user_login['roles'] == 'ADMIN' && $check_user_delete['roles'] == 'SUPER_ADMIN';

        if ($check_not_deleted){
            return response()->json([
                'success' => false,
                'message' => 'Role Admin tidak Bisa Menghapus Role Super Admin.'
            ], 400);
        }

        $users = User::findOrFail($id);
        $users->delete();

        if($users){
            return response()->json([
                'success' => true,
                'message' => 'User '.$check_user_delete['name'].' berhasil dihapus',
                'data' => $users
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'User '.$check_user_delete['name'].' gagal dihapus',
            ], 400);
        }
    }

    function get_approval_by_user_login($type, $id_userLogin)
    {
        $check_user_login = User::select('roles')->where('id', $id_userLogin)->first();
        $dataApproval = [];

        if (in_array ($check_user_login['roles'], ['OPERATOR_TSS', 'OPERATOR_DIP', 'OPERATOR_MOVER']))
        {
            $get_roles = '';

            switch($type ){
                case 'TSS': $get_roles = 'OPERATOR_TSS'; break;
                case 'STAGING': $get_roles = 'OPERATOR_DIP'; break;
                default : $get_roles = 'OPERATOR_MOVER'; break;
            }

            $get_user = User::where('roles',  $get_roles)->where('id', $id_userLogin)->first();

            if ($get_user == null){
                return response()->json([
                    'success' => true,
                    'totalDatas' => 0,
                    'data' => []
                ]);
            }

            array_push($dataApproval, $get_user);

            unset($dataApproval[0]['reset_code'],
                      $dataApproval[0]['email_verified_at'],
                      $dataApproval[0]['reset_code_expired_at'],
                      $dataApproval[0]['created_at'],
                      $dataApproval[0]['updated_at']
            );

        } elseif ( in_array($check_user_login['roles'], ['SUPER_ADMIN', 'ADMIN', 'SUPERVISOR'])) {

            $get_roles = '';

            switch($type ){
                case 'TSS': $get_roles = 'OPERATOR_TSS'; break;
                case 'STAGING': $get_roles = 'OPERATOR_DIP'; break;
                default : $get_roles = 'OPERATOR_MOVER'; break;
            }

            $get_user = User::where('roles', $get_roles)->get();

            if(count($get_user) > 0){
                for ($a=0; $a< count($get_user); $a++){
                    $dataApproval[$a] = $get_user[$a];

                    unset($dataApproval[$a]['reset_code'],
                       $dataApproval[$a]['email_verified_at'],
                       $dataApproval[$a]['reset_code_expired_at'],
                       $dataApproval[$a]['created_at'],
                       $dataApproval[$a]['updated_at']
                    );
                }
            }
        }

        return response()->json([
            'success' => true,
            'totalDatas' => count($dataApproval),
            'data' => $dataApproval
        ]);

    }


    function getPicMarketing()
    {
        $datas = PicMarketing::all();
        return response()->json([
            'success' => true,
            'totalDatas' => count($datas),
            'data' => $datas
        ]);


    }

    public function sendEmails(Request $request)
    {
        try{
            $request->validate([
                'email' => 'required|email',
            ]);
            $to = $request->input('email');

            $user = User::where('email', $to)->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found.'
                ], 404);
            }else{
                $subject = "Lupa Password StagiDIP";
                $kodeVerifikasi = strtoupper(Str::random(6));
                $kodeTerenkripsi = Crypt::encryptString($kodeVerifikasi);
                $message = "Kode Verifikasi : {$kodeVerifikasi}";
                $textPart = new TextPart($message);
                Mail::send([], [], function ($mail) use ($to, $subject, $message) {
                    $mail->to($to)
                        ->subject($subject)
                        ->text($message);
                });
                return response()->json([
                    'success' => true,
                    'message' => 'Email sent successfully.',
                    'token' => $kodeTerenkripsi
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Email sent unsuccessfully.',
            ], 500);
        }
    }

    public function verifikasiEmails(Request $request)
    {
        try{
            $kodeInput = $request->input('kode');
            $kodeToken = $request->input('token');

            $hasilDecript = Crypt::decryptString($kodeToken);
            $verifikasiBerhasil = ($hasilDecript === $kodeInput);

            if($verifikasiBerhasil==1){
                return response()->json([
                    'success' => true,
                    'message' => 'Code successfully.'
                ], 200);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Code unsuccessfully.'
                ], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something Wrong.',
            ], 500);
        }
    }

    public function changeNewPassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required',
                'password' => 'required|string|min:8'
            ]);

            $email = $request->input('email');
            $password = $request->input('password');

            $user = User::where('email', $email)->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found.'
                ], 404);
            }

            $user->password = Hash::make($password);
            $user->save();
            return response()->json([
                'success' => true,
                'message' => 'Password updated successfully.'
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update Password.'
            ], 500);
        }
    }

}
