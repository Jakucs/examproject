<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;




class CartController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $cartItems = CartItem::with('product')->where('user_id', Auth::id())->get();

        
        $totalCartPrice = $cartItems->sum(fn($item) => $item->quantity * $item->product->price);

        return response()->json([
            'Kosár tartalma' => $cartItems,
            'Fizetendő összeg' => $totalCartPrice,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::where('user_id', Auth::id())
                            ->where('product_id', $request->product_id)
                            ->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $request->quantity);
        } else {
            $cartItem = CartItem::create([
                'user_id' => Auth::id(),
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        $cartItem->load('product'); 

        
        $productPrice = $cartItem->product->price;
        $totalProductPrice = $cartItem->quantity * $productPrice;

        
        $totalCartPrice = CartItem::where('user_id', Auth::id())
            ->with('product')
            ->get()
            ->sum(fn($item) => $item->quantity * $item->product->price);

        return response()->json([
            'cart_item' => $cartItem,
            'product_price' => $productPrice,
            'total_product_price' => $totalProductPrice,
            'total_cart_price' => $totalCartPrice,
        ], 201);
    }

    public function update(Request $request, $id)
    {
    
    $cartItem = CartItem::findOrFail($id);

    if ($cartItem->user_id !== auth()->id()) {
        return response()->json(['error' => 'Nincs jogosultsága a művelethez!'], 403);
    }

    
    $cartItem->update($request->all());

    return response()->json($cartItem);
    }



    public function destroy(CartItem $cartItem)
    {
    if (Auth::id() !== $cartItem->user_id) {
        return response()->json(['message' => 'Hozzáférés nem engedélyezett!'], 403);
    }

    $cartItem->delete();

    return response()->json(['message' => 'A terméket töröltük a kosarából!'], 204);
    }



    public function clear()
    {
        CartItem::where('user_id', Auth::id())->delete();
        return response()->json(['message' => 'A kosár üres!']);
    }

    public function getCartItemCount()
    {
    $count = CartItem::where('user_id', auth()->id())->sum('quantity');

    return response()->json(['count' => $count]);
    }

}
