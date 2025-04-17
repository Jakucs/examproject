<?php

namespace App\Policies;

use App\Models\User;
use App\Models\CartItem;

class CartItemPolicy
{
    public function update(User $user, CartItem $cartItem)
    {
        return $user->id === $cartItem->user_id;
    }

    public function delete(User $user, CartItem $cartItem)
    {
        return $user->id === $cartItem->user_id;
    }
}
