<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    
    public function index()
    {
        return response()->json(Product::all());
    }
   
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'description' => 'nullable|string',
            'category' => 'required|string|max:50',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|string',
        ]);
        
        $product = Product::create($request->all());
        return response()->json([
            'product'=>$product,
            'message'=> 'Sikeres mentés!'],
             201);
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }
    
    public function update(Request $request, Product $product)
    {
        
        $request->validate([
            'name' => 'sometimes|string|max:50',
            'description' => 'sometimes|string|nullable',
            'category' => 'sometimes|string|max:50',
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'image' => 'sometimes|string|nullable',
        ]);
    
        $product->fill($request->only([
            'name',
            'description',
            'category',
            'price',
            'stock',
            'image'
        ]));
    
        $product->save();
    
        return response()->json([
            'product' => $product,
            'message' => 'Sikeres frissítés!'
        ]);
    }
    
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([
            'product'=>$product,
            'message'=> 'Sikeres törlés!'], 202);
             
    
    }



}   