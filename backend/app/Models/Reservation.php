<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    // Tambahkan properti $fillable ini
    protected $fillable = [
        'user_id',
        'service_id',
        'car_type_id',
        'reservation_time',
        'total_price',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function carType()
    {
        return $this->belongsTo(CarType::class);
    }
}