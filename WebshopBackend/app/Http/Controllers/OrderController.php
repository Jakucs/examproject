<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $user = Auth::user();
        $cartItems = CartItem::where('user_id', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'A kosár üres.'], 400);
        }

        
        foreach ($cartItems as $cartItem) {
            $product = $cartItem->product;

            if ($product->stock < $cartItem->quantity) {
                return response()->json([
                    'message' => 'Nincs elég készlet a(z) ' . $product->name . ' termékből.'
                ], 400);
            }
        }

        DB::beginTransaction();
        try {
            
            $totalPrice = $cartItems->sum(fn($item) => $item->quantity * $item->product->price);

            
            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $totalPrice,
                'status' => 'pending',
            ]);

            
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->price, 
                ]);

                
                $product = $cartItem->product;
                $product->stock -= $cartItem->quantity;
                $product->save();
            }

            
            CartItem::where('user_id', $user->id)->delete();

            DB::commit();
            return response()->json(['message' => 'Rendelés sikeresen leadva!', 'order' => $order], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Hiba történt a rendelés leadásakor.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getOrders()
    {
        $user = Auth::user();
    
        
        if ($user->role === 'admin' || $user->role === 'superadmin') {
            $orders = Order::with('items.product', 'user')->get();
        } else {
            
            $orders = Order::with('items.product')->where('user_id', $user->id)->get();
        }
    
        return response()->json($orders);
    }
   
    public function updateOrderStatus(Request $request, $id)
    {
        $user = Auth::user();

        
        if (!in_array($user->role, ['admin', 'superadmin'])) {
            return response()->json(['message' => 'Nincs jogosultságod a státusz módosítására.'], 403);
        }

        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Rendelés nem található.'], 404);
        }

        
        $validStatuses = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];

        if (!in_array($request->status, $validStatuses)) {
            return response()->json(['message' => 'Érvénytelen státusz.'], 400);
        }

        $order->status = $request->status;
        $order->save();

        return response()->json(['message' => 'Rendelés státusza frissítve.', 'order' => $order]);
    }
}
