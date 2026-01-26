<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\API\BacthController;
use App\Http\Controllers\API\BrandController;
use App\Http\Controllers\API\MasterPartController;
use App\Http\Controllers\API\MasterMesinController;
use App\Http\Controllers\API\MasterCustomerController;
use App\Http\Controllers\API\ModelController;
use App\Http\Controllers\API\PicMitraController;
use App\Http\Controllers\API\PurchaseOrderController;
use App\Http\Controllers\API\MasterGudangController;
use App\Http\Controllers\API\MasterPoController;
use App\Http\Controllers\API\WarehouseTransferController;
use App\Http\Controllers\API\MasterInspeksiController;
use App\Http\Controllers\API\MasterDivisiController;
use App\Http\Controllers\API\TransaksiInspeksiController;
use App\Http\Controllers\API\TransaksiStatusDeliveryController;
use App\Http\Controllers\API\MasterPicMoverController;
use App\Http\Controllers\API\MasterSettingPreStagingController;
use App\Http\Controllers\API\TransaksiStatusDeliveryDetailController;
use App\Http\Controllers\API\TransaksiChecklistStagingController;
use App\Http\Controllers\API\MasterSpesifikasiMesinController;
use App\Http\Controllers\API\MasterWSInfoController;
use App\Http\Controllers\API\TransaksiChecklistApprovalController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\TransaksiSpesifikasiMesinController;
use App\Http\Controllers\API\TransaksiSpesifikasiMesinDetailController;
use App\Http\Controllers\API\TransaksiChecklistStagingMv400Controller;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\PicTssController;
use App\Http\Controllers\API\DeliveryRequestController;
use App\Http\Controllers\API\MasterTypeSpekMesinController;
use App\Http\Controllers\API\MasterSpekMesinFNewController;
use App\Http\Controllers\API\MasterParentTypeSpekMesinController;
use App\Http\Controllers\API\TransaksiSpesifikasiMesinDetailNewController;
use App\Http\Controllers\API\MasterStatusPoController;
use App\Http\Controllers\API\MasterCheckliStagingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//API route for register new user
Route::post('/register', [App\Http\Controllers\API\AuthController::class, 'register']);
//API route for login user
Route::post('/login', [App\Http\Controllers\API\AuthController::class, 'login']); 
// Done
//API route for forgot password
Route::post('/send-email', [App\Http\Controllers\API\AuthController::class, 'sendEmails']);
Route::post('/verif-email', [App\Http\Controllers\API\AuthController::class, 'verifikasiEmails']);
Route::post('/change-new-password', [App\Http\Controllers\API\AuthController::class, 'changeNewPassword']);
//Protecting Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::get('/test', [TestController::class, 'test']);
    Route::get('/get-data-ims', [App\Http\Controllers\API\DataController::class, 'getData']);

    Route::post('/insert-data-ims', [App\Http\Controllers\API\DataController::class, 'storeData']);


    Route::controller(MasterCustomerController::class)->group(function(){
        Route::post('/master-customer', 'store');
        Route::get('/master-customer', 'index');
        Route::get('/master-customer/{id}', 'show');
        Route::put('/master-customer/{id}', 'update');
        Route::delete('/master-customer/{id}', 'destroy');
    });
    // Done

    Route::controller(MasterGudangController::class)->group(function(){
        Route::get('/master-gudang', 'index');
        Route::get('/master-gudang/{idGudang}', 'getDataById');
        Route::post('/master-gudang', 'store');
        Route::put('/master-gudang/{id}', 'update');
        Route::delete('/master-gudang/{id}', 'destroy');
    });
    // Done

    // PO Model
    Route::controller(ModelController::class)->group(function(){
        Route::post('/master-model', 'store');
        Route::get('/master-model', 'index');
        Route::get('/master-model/{id?}', 'show');
        Route::put('/master-model/{id}', 'update');
        Route::delete('/master-model/{id}', 'destroy');
    });
    // Done

    // PO Batch
    Route::controller(BacthController::class)->group(function(){
        Route::post('/bacth', 'store');
        Route::get('/bacth', 'index');
        Route::get('/bacth/{id?}', 'show');
        Route::put('/bacth/{id?}', 'update');
        Route::delete('/bacth/{id?}', 'destroy');
    });
    // Done

    // PO brand
    Route::controller(BrandController::class)->group(function(){
        Route::get('/brand', 'index');
        Route::post('/brand', 'store');
        Route::get('/brand/{id?}', 'show');
        Route::put('/brand/{id}', 'update');
        Route::delete('/brand/{id?}', 'destroy');
    });
    // Done

    // PO Pic Mitra
    Route::controller(PicMitraController::class)->group(function() {
        Route::post('/picmitra', 'store');
        Route::get('/picmitra', 'index');
        Route::get('/picmitra/{id?}', 'show');
        Route::put('/picmitra/{id}', 'update');
        Route::delete('/picmitra/{id?}', 'destroy');
    });
    // Done

    // master mesin
    Route::controller(MasterMesinController::class)->group(function () {
        Route::get('/master-mesin','index');
        // Route::get('/master-mesin/{id?}', 'show');
        Route::get('/master-mesin/{namaModel}', 'getTypeMesinBasedModel');
        Route::get('/master-mesin/{id}/edit', 'getDataById');
        Route::put('/master-mesin/{id}/update', 'update');
        Route::post('/master-mesin','store');
        Route::delete('/master-mesin/{id}', 'destroy');
        Route::get('/getAllNewModels/{idType}', 'getAllNewModels');
        Route::get('/getByIdNewMesin/{idMesin}', 'getByIdNewMesin');
        Route::put('/copyTemplatePreStaging/{idMesin}', 'copyTemplatePreStaging');
    });

    Route::controller(MasterSpesifikasiMesinController::class)->group(function() {
        Route::get('/master-spekmesin/{rowPerPage}', 'indexPaging');
        Route::get('/master-spekmesin/{type}/datas', 'getDataByItem');
        Route::get('/master-spekmesin', 'getDataAllSpek');
        Route::post('/master-spekmesin', 'store');
        Route::put('/master-spekmesin/{id}', 'update');
        Route::delete('/master-spekmesin/{id}', 'destroy');
    });

    // format baru type dan spesifikasi mesin v2
    Route::controller(MasterTypeSpekMesinController::class)->group(function() {
        Route::get('getAllTypeSpekMesin', 'getAllTypes');
        Route::post('addChildType/{idParent}', 'store');
        Route::put('/updateChildType/{idType}', 'update');
        Route::delete('/removeItemChild/v2/{idType}', 'destroy');
        ROute::delete('/removeItemChild/{idType}', 'destroyV2');
    });

    Route::controller(MasterSpekMesinFNewController::class)->group(function() {
        Route::get('/master-spekmesin/v2/{rowPerPage}', 'indexPaging');
        Route::post('/master-spekmesin/v2/', 'store');
        Route::get('/getDetailListItems/{idParent}', 'getDetailListItems');
        Route::put('/updateListItem/{idListItem}', 'update');
        Route::delete('/removeListItem/{idListItem}', 'destroy');
    });

    Route::controller(MasterParentTypeSpekMesinController::class)->group(function() {
        Route::get('/getParentSpekMesin', 'index');
        Route::get('/getTypeSpekBasedOnIdParent/{idParent}', 'getTypeSpekMesin');
        Route::post('/addParentType', 'store');
        Route::delete('/removeParentType/{idParent}', 'destroy');
        Route::put('/updateParentType/{idParent}', 'update');
    });

    // ---------------------------------------------------------------

    Route::controller(MasterPartController::class)->group(function () {
        Route::get('/master-part', 'index');
        Route::get('/master-part/{rowPerPage}', 'indexPaging');
        Route::post('/master-part','store');
        Route::put('/master-part/{id}', 'update');
        Route::delete('/master-part/{id}', 'destroy');
        Route::get('/master-part/{mesinId}','getDataById');
        Route::get('/master-part/{mesinId}/{rowPerPage}','getDataByIdPaging');
        Route::get('/master-part/{mesinId}/{customerId}/detail','getDataStaging');
        Route::get('/master-part/{mesinId}/{rowPerPage}/{status}', 'getDataByIdStatusPaging');
        Route::get('/master-part/{mesinId}/{rowPerPage}/{status}/{type}', 'getDataByIdStatusTypePaging');
        Route::get('/master-part/{mesinId}/{rowPerPage}/{status}/{type}/{searchPart}', 'getDataByIdStatusTypePartdescPaging');
        Route::get('/master-part/{mesinId}/{rowPerPage}/all-data/{type}/types', 'getDataByIdType');
        Route::get('/master-parts/{rowPerPage}/{type}', 'getDataBasedOnType');
        Route::get('/master-parts/typeMesinPartColumn/{mesinId}/{rowPerPage}/{partColumn}', 'getByIdTipeMesinAndPartColumn');
        Route::get('/get-listPartNumber/{idMesin}/{partDesc}', 'getListPartNumber');
    });

    Route::controller(PurchaseOrderController::class)->group(function () {
        Route::get('/purchaseOrder/{user_login}','index');
        Route::get('/purchaseOrder/exportToPdf','exportToPdf');
        Route::get('/purchaseOrder/exportToExcel','exportToExcel');
        Route::get('purchaseOrder/{dateFrom}/{dateTo}/ranges', 'indexFromTo');
        Route::get('/purchaseOrder/{idPo}/datas', 'getDataById');
        Route::put('/purchaseOrder/{idPo}/{rowNum}', 'updateRowStaging');
        Route::put('/purchaseOrder/{idPo}/{rowNum}/snMesin', 'updateSNMesin');
        Route::get('/purchaseOrder/{idPo}/{rowNum}/snMesin', 'getSNMesin');
        Route::get('/purchaseOrder/{idPo}/allSnMesin/datas', 'getAllSNMesin');
        Route::get('/purchaseOrder/{idPo}/{rowNum}', 'getDataStagingBasedOnRowMesin');
        Route::post('/purchaseOrder', 'store');
        Route::put('/purchaseOrder/{idPo}', 'updatePO');
        Route::delete('/purchaseOrder/{idPo}', 'destroy');
        Route::delete('/purchaseOrder/{idPo}/cancel', 'cancelPo');
        Route::get('/stagging/{type}', 'getAllDataStaggingBasedOnType');
        Route::get('/allsnmesin/{idPo}', 'getDataSNMesinByIdPO');
        Route::get('/checklistStaging/{idPo}/{idMesin}', 'getDataChecklistStagingByIdPO');
        Route::get('/checklistStaging/{idPo}/{idMesin}/{idDivisi}', 'getDataChecklistStagingDetails');
        Route::get('/checklistStagingReport/{idPo}/{idMesin}', 'getDataChecklistStagingReport');
        Route::get('/checklistStagingReport/v2/{idPo}/{idMesin}', 'getDataChecklistStagingReportV2');
        // for checklistStaging mv400
        Route::get('/checklistStagingMv400/{idPo}/{idMesin}/spek', 'getDataChecklistStagingMv400');
        Route::get('/checklistStagingMv400/v2/{idPo}/{idMesin}/spek', 'getDataChecklistStagingMv400V2');
        Route::get('/checklistStagingMv400/{idPo}/{idMesin}/{idClassif}/details', 'getDataChecklistStagingMv400Details');
        // end of for checklistStaging mv400
        Route::get('get-all-data-snmsin', 'getALSNMesinByModelAndType');
        Route::get('/inspeksi/{idPo}/', 'getDataInspectionByIdPO');
        Route::put('/inspeksi/update-approval/{type}/{idPo}/{idMesin}', 'updateApprovalInspeksi');
        Route::get('/inspeksi/approval/{type}/{idPo}/{idMesin}', 'getApprovalInspeksi');
        Route::put('/update-notes/{idPo}/{idMesin}', 'updateNotesByIdPo');
        Route::get('/get-notes/{idPo}/{idMesin}', 'getNotesByIdPoIdMesin');
        Route::get('/getTemplateStagingFormat/{idPo}', 'getTemplateStagingFormat');
        // filter for summary
        Route::get('/get-data-summary/{idPoMaster}/{type}', 'getDataSummary');
        Route::get('/get-data-summary/{idCustomer}/{idWarehouse}/{idModel}/{idPoMaster}/{type}', 'getDataSummaryPO');
        Route::get('/getWarehouseByCustomer/{idCustomer}/{type}', 'getDataWarehouseByCustomer');
        Route::get('/getModelByCustWarehouse/{idCustomer}/{idWarehouse}/{type}', 'getDataModelByCustomerWarehouse');
        Route::get('/getPoByCustWarehouseModel/{idCustomer}/{idWarehouse}/{idModel}/{type}', 'getDataPoByCustWarehouseModel');
        Route::get('/implement-summary/{idPoMaster}/{idCustomer}/{idGudang}/{dateFrom}/{dateTo}', 'getDataImplementSummary');
        Route::get('/implement-summary-v2/{idPoMaster}/{idCustomer}/{dateFrom}/{dateTo}', 'getDataImplementSummaryV2');
        Route::get('/getPreStagingSummary/{idCustomer}/{idModel}/{idPoMaster}', 'getPreStaggingSummary');
        Route::get('/getWarehouseSummary/{idWarehouse}/{idCustomer}/{idModel}/{idStyle}/{statusMesin}/{process}/{dateFrom}/{dateTo}', 'getWarehouseSummary');
        // Route::get('/getMachineSummary/{idPo}/{idCustomer}/{idBatch}/{tglMasuk}/{type}/{model}', 'getMachineSummary');
        Route::get('/getMachineSummary/{idPoMaster}/{idBatch}', 'getMachineSummary');
        Route::get('/getBatchOnPoMaster/{idPoMaster}', 'getDataBatchOnPoMaster');
        Route::get('getAccessoriesSummary/{idPomaster}/{idBatch}', 'getAccessoriesSummary');
        Route::get('getAccessoriesSummary/v2/{idPomaster}/{idBatch}', 'getAccessoriesSummaryV2');

        // for summary  fase 2
        Route::get('getMachineDeliveryByType', 'getMachineDeliveryByType');
        Route::get('getUPSSummary/{idPoMaster}/{idBatch}', 'getUPSSummary');
        Route::get('getMachineActivationByCustomer', 'getMachineActivationByCustomer');
        Route::get('getMachineReceivedByCustomer', 'getMachineReceivedByCustomer');
        Route::get('getTimeDurationSummary/{date_from}/{date_to}/{idPo}', 'getTimeDurationSummary');
        Route::get('getPoBySpekDateFromTo/{date_from}/{date_to}', 'getPoBySpekDateFromTo');
        Route::get('getDevelopmentSummary', 'getDevelopmentSummary');
        Route::get('getStaginDurationReport', 'getStaginDurationReport');
        Route::get('getDetailMesinPerPo/{idPo}', 'getDetailMesinPerPo');
        Route::get('getStaginDurationReportV2', 'getStaginDurationReportV2');
        Route::get('/getAllPoDummyBasedOnIdModel/{idStatusPo}', 'getAllPoDummyBasedOnIdModel');
        Route::get('/getSnMesinByIdPoDummy/{idPoDummay}', 'getSnMesinByIdPoDummy');
        
        // filter data snMesin - preloading - prestaging-checklist
        Route::get('/filterDataSNMesinByApprovalChecklist/{idPo}/{approved_by}/{type}', 'getFilterSNMesinByApprovalChecklist');
        Route::get('/filterDataSNMesinByApprovalPreLoading/{idPo}/{approved_by}/{type}', 'getFilterSNMesinByApprovalPreloading');
    });

    Route::controller(DeliveryRequestController::class)->group( function() {
        Route::get('getListSN', 'getListSN');
        Route::get('getDetailPOBySNMesinIdPo/{snMesin}/{idPo}', 'getDetailPOBySNMesinIdPo');
        Route::post('/deliveryRequest', 'store');
        Route::put('/deliveryRequest/{idDeliveryReq}', 'update');
        Route::delete('/deliveryRequest/{idDeliveryReq}', 'destroy');
        Route::get('/getAllDeliveryRequest', 'getAllDeliveryRequest');
        Route::put('/updateApproval/{id}', 'updateApproval');
        Route::get('/getListApprovalBy/{user_login}', 'getListApprovalBy');
    });

    Route::controller(DashboardController::class)->group( function() {
        Route::get('/getDataMesinPerWarehouse', 'getDataMesinPerWarehouse');
        Route::get('/getData3TopByCustomer', 'getData3TopByCustomer');
        Route::get('/getDataMachineStatus', 'getDataMachineStatus');
        Route::get('/getDataProjectStatus', 'getDataProjectStatus');
        Route::get('/getDataJenisMesin', 'getDataJenisMesin');
        Route::get('/getJumlahMesinPerbulan/{month_from}/{month_to}', 'getJumlahMesinPerbulan');
        Route::get('/getJumlahMesinPerbulan/v2/{month_from}/{month_to}', 'getJumlahMesinPerbulanV2');
    });

    Route::controller(MasterInspeksiController::class)->group(function() {
        Route::get('/dataTableInspeksi/', 'index');
    });

    Route::controller(TransaksiInspeksiController::class)->group(function() {
        Route::post('/inspeksi', 'store');
        Route::put('/inspeksi/{idPo}/{idMesin}', 'update');
        Route::get('/inspeksi/{idPo}/{idMesin}', 'getByIdPoAndIdMesin');
        Route::post('/mstInspeksi', 'storeMstInspeksi');
        Route::get('/mstInspeksi', 'getMstInspeksi');
        Route::get('/mstInspeksi/{id}', 'getIdMstInspeksi');
        Route::put('/mstInspeksi/{id}', 'updateMstInspeksi');
        Route::delete('/mstInspeksi/{id}', 'deleteMstInspeksi');
        Route::get('/mstInfoInspeksi/{id}', 'getInfoIdMstInspeksi');
        Route::put('/mstInfoInspeksi/{id}', 'updateInfoMstInspeksi');
        Route::delete('/mstInfoInspeksi/{id}', 'deleteInfoMstInspeksi');
    });

    Route::controller(TransaksiStatusDeliveryController::class)->group(function(){
        Route::post('/statusDelivery', 'store');
        Route::put('/statusDelivery/{id}', 'update');
        Route::get('/statusDelivery/{rowPerPage}/{user_login}', 'indexPaging');
        Route::delete('/statusDelivery/{id}', 'destroy');
        // filtering data summary
        Route::get('/get-status-delivery/{idPo}/{snMesin}/{id_customer}/{warehouse}/{tgl_tiba}', 'getDataStatusDelivery');
    });

    Route::controller(TransaksiStatusDeliveryDetailController::class)->group(function(){
        Route::get('/statusDeliveryDetail/{idHeader}', 'index');
        Route::post('/statusDeliveryDetail', 'store');
        Route::put('/statusDeliveryDetail/{id}', 'update');
    });

    Route::controller(MasterDivisiController::class)->group(function() {
        Route::get('/getAllMasterDivisi', 'getAllMasterDivisi');
        Route::get('/dataTableChecklist/{idMesin}', 'getDataChecklistStaging');
        Route::get('/dataTableChecklist/{idMesin}/{idDivisi}', 'getDataChecklistById');
        Route::post('/addNewDivisi/{idMesin}', 'store');
        Route::get('/getMasterDivisiByIdMesin/{idMesin}', 'getMasterDivisiByIdMesin');
    });

    Route::controller(TransaksiChecklistStagingController::class)->group(function() {
        Route::post('/checklistStaging', 'store');
        Route::put('/checklistStaging/{idPo}/{idMesin}/{idDivisi}', 'update');
        Route::put('/checklistStaging/{idPo}/{idMesin}', 'updateAll');
        // Route::post('/checklistStagingAllDivisi', 'storeAllDataDivisi');
        Route::get('/checklistStaging/{type}/{idPo}/{idMesin}/count', 'getCountDataResults');
        Route::get('/checklistStaging/{idPo}/{idMesin}/countDataResult/status', 'getCountDataResultAll');
    });

    Route::controller(TransaksiChecklistStagingMv400Controller::class)->group(function () {
        Route::post('/checklistStagingMv400', 'store');
        Route::put('/checklistStagingMv400/{idPo}/{idMesin}', 'update');
        Route::get('/checklistStagingMv400/{idPo}/{idMesin}/{idClassif}', 'getDataChecklistStagingDetailsMv400');
        Route::get('/checklistStagingMv400/{idPo}/{idMesin}', 'getDataChecklistStaingDetailMV400_AllData');
    });

    Route::controller(MasterPoController::class)->group(function(){
        Route::get('/master-po','index');
        Route::get('/master-po/{idPoMaster}', 'getDataById');
        Route::post('/master-po', 'store');
        Route::put('/master-po/{idPo}', 'update');
        Route::delete('/master-po/{idPo}', 'destroy');
    });

    Route::controller(WarehouseTransferController::class)->group(function(){
        Route::get('/warehouse-transfer','index');
        Route::get('/warehouse-transfer/{rowPerPage}','indexPaging');
        Route::post('/warehouse-transfer', 'store');
        Route::put('/warehouse-transfer/{id}', 'update');
        Route::delete('/warehouse-transfer/{id}', 'destroy');
        // filtering data Summary
        Route::get('/get-warehouse-transfer/{idPo}/{snMesin}/{from_warehouse}/{tgl_keluar}', 'getDataWarehouseTransfer');
    });

    Route::controller(MasterPicMoverController::class)->group(function(){
        Route::get('/picMover/{rowPerPage}', 'indexPaging');
        Route::get('/picmovers/{gudang}', 'indexByIdGudang');
        Route::post('/picMover', 'store');
        Route::put('/picMover/{id}', 'update');
        Route::delete('/picMover/{id}', 'destroy');
    });

    Route::controller(MasterSettingPreStagingController::class)->group(function(){
        Route::get('/settingPreStaging/{rowPerPage}', 'indexPaging');
        Route::get('/settingPreStaging/{types}/{rowPerPage}', 'indexByTypesPaging');
        Route::get('/getListOptions/{types}', 'getDataBasedOnTypes');
        Route::post('/settingPreStaging', 'store');
        Route::put('/settingPreStaging/{id}', 'update');
        Route::delete('/settingPreStaging/{id}', 'destroy');
    });

    Route::controller(MasterWSInfoController::class)->group(function(){
        Route::post('/register-ws-info', 'store');
        Route::post('/register-ws-info/{snNumber}/{model}', 'storeParam');
    });

    Route::controller(TransaksiChecklistApprovalController::class)->group(function(){
        Route::put('/checklist-approval/{type}/{idPo}/{idMesin}', 'updateApprovalChecklist');
        Route::get('/checklist-approval/{type}/{idPo}/{idMesin}', 'getApprovalChecklist');
    });

    Route::controller(TransaksiSpesifikasiMesinController::class)->group(function(){
        // Route::get('/spekmesin', 'index');
        Route::get('/spekmesin/{user_login}', 'index');
        Route::post('/spekmesin-header', 'store');
        Route::put('/spekmesin-header/{id}', 'update');
        Route::delete('/spekmesin-header/{id}', 'destroy');
        Route::put('/spekmesin-approval/{type}/{id}', 'updateApprovalSpekMesin');
        Route::get('/spekmesin-approval/{type}/{id}', 'getApprovalSpekMesin');
    });

    Route::controller(TransaksiSpesifikasiMesinDetailController::class)->group(function (){
        Route::post('/spekmesin-detail', 'store');
        Route::get('/spekmesin-detail/{idHeader}', 'getByIdSpek');
        Route::put('/spekmesin-detail/{id}', 'update');
    });

    Route::controller(TransaksiSpesifikasiMesinDetailNewController::class)->group(function() {
        Route::post('/spekmesin-detail/v2', 'store');
        Route::put('/spekmesin-detail/v2/{idHeader}', 'update');
        Route::get('/spekmesin-detail/v2/{idHeader}', 'getByIdSpekNew');
    });

    Route::controller(AuthController::class)->group(function() {
        Route::get('/master-user/', 'master_user');
        Route::get('/get-pic-approval/{type}', 'get_pic_approval');
        Route::put('/users/{id}/{user_login}', 'update');
        Route::delete('/users/{id}/{user_login}', 'destroy');
        Route::get('/picmitra/v2/{type}/{id_user_login}', 'get_approval_by_user_login'); // get data approval by User Login
        Route::get('/getPicMarketing', 'getPicMarketing');
    });

    // API route for logout user
    Route::post('/logout', [App\Http\Controllers\API\AuthController::class, 'logout']);

    //Check is Login
    Route::post('/login-check', [App\Http\Controllers\API\AuthController::class, 'loginCheck']);

    // Pic TSS
    Route::controller(PicTssController::class)->group(function(){
        Route::get('/pictss', 'index');
        Route::post('/pictss', 'store');
        Route::get('/pictss/{id?}', 'show');
        Route::put('/pictss/{id}', 'update');
        Route::delete('/pictss/{id?}', 'destroy');
    });

    // Master Style
    Route::controller(App\Http\Controllers\API\MasterStyleController::class)->group(function(){
        Route::get('/master-style', 'index');
        Route::post('/master-style', 'store');
        Route::get('/master-style/{id?}', 'show');
        Route::put('/master-style/{id}', 'update');
        Route::delete('/master-style/{id?}', 'destroy');
    });

    Route::controller(MasterStatusPoController::class)->group(function(){
        Route::get('/status-po', 'index');
        Route::post('/addStatusPo', 'store');
        Route::put('/ubahStatusPo/{idStatusPo}', 'update');
        Route::delete('/hapusStatusPo/{idStatusPo}', 'destroy');
    });

    Route::controller(MasterCheckliStagingController::class)->group(function(){
        Route::get('/mst-checkliststaging', 'index');
        Route::get('/get-list-typeValues', 'getListTypeValues');
        Route::put('/mst-checkliststaging/{idMaster}', 'update');
        Route::post('/mst-checkliststaging/{idDivisi}', 'store');
        Route::delete('/mst-checkliststaging/{idMaster}', 'destroy');
    });
});

//API Forgot Password
Route::post('/forgot-password-email', [App\Http\Controllers\API\AuthController::class, 'forgotPwEmail']);
Route::post('/forgot-password-code', [App\Http\Controllers\API\AuthController::class, 'forgotPwCode']);
Route::post('/forgot-password-new', [App\Http\Controllers\API\AuthController::class, 'forgotPwNew']);
