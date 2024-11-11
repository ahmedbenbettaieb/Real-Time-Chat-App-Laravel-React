<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register (Request $request)
    {
        try {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }
        if(User::where('email', $request->email)->exists()){
            return response()->json([
                'message' => 'Email already exists'
            ], 409);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 200);


        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ], 500);
        }

    }

      public function login(Request $request)
    {
        
        try {
            $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors(), 'success' => false], 400);
        }

        $credentials = $request->only('email', 'password');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials', 'success' => false], 401);
        }

        return $this->createNewToken($token);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ], 500);
        }
    }

       
    public function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => 3600,
            'success' => true
        ]);
    }
    public function Profile(){
        try {
            $user = auth()->user();
            return response()->json([
                'message' => 'User Profile',
                'user' => $user
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ], 500);
        }
    }

}
