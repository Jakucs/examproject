<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  
    use HasApiTokens, HasFactory, Notifiable;


    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'first_name', 'last_name', 'birth_date',
        'phone_number', 'postal_code', 'city', 'street', 'house_number', 'floor', 'door'
    ];
    
    protected $casts = [
        'birth_date' => 'date',
    ];

    protected $attributes = [
        'role' => self::ROLE_USER, 
    ];
    

    const ROLE_USER = 'user';
    const ROLE_ADMIN = 'admin';
    const ROLE_SUPERADMIN = 'superadmin';

    
    public function isAdmin()
    {
        return in_array($this->role, [self::ROLE_ADMIN, self::ROLE_SUPERADMIN]);;
    }

    
    public function isSuperAdmin()
    {
        return $this->role === self::ROLE_SUPERADMIN;
    }

    
    public function isUser()
    {
        return $this->role === self::ROLE_USER;
    }



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function setPhoneNumberAttribute($value) 
    {
    $this->attributes['phone_number'] = preg_replace('/[^0-9+]/', '', $value);
    }

}
