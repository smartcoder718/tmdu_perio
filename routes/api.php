<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientAuthController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\DataController;

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
// Route::post('clientusers', function (Request $request) {
//     return $request->input('a');
// });
// Route::post('/clientusers', [ClientAuthController::class,'register']);
Route ::group(['prefix'=>'client'],function (){
    Route::post('/login', [ClientAuthController::class,'login']);
    Route::group(["middleware"=>'auth:sanctum'],function(){
        Route::get('/me',[DataController::class,"me"]);
        Route::get('/logout',[DataController::class,"logout"]);
        Route::post('/create',[DataController::class,"create"]);
        Route::post('/createfile',[DataController::class,"createfile"]);
        Route::post('/createsleep',[DataController::class,"createsleep"]);
        Route::get('/loaddata',[DataController::class,"loaddata"]);
        Route::post('/update',[DataController::class,"update"]);
        Route::post('/updatemeal',[DataController::class,"updatemeal"]);
    });
});
Route ::group(['prefix'=>'admin'],function (){
    Route::post('/register', [ClientAuthController::class,'register']);
    Route::post('/login', [AdminAuthController::class,'login']);

    Route::group(["middleware"=>'auth:sanctum'],function(){
        Route::get('/loadusers', [ClientAuthController::class,'loadusers']);
        Route::post('/registerclient', [ClientAuthController::class,'register']);
    });
});
