<?php

namespace App;

use App\Comment;
use App\Scopes\ReverseScope;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = [];

    protected static function booted()
    {
        static::addGlobalScope(new ReverseScope());
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function likes()
    {
        return $this->belongsToMany(User::class, 'likes', 'post_id', 'user_id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
