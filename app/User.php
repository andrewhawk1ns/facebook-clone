<?php

namespace App;

use App\Post;
use App\User;
use App\UserImage;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function friends()
    {
        return $this->belongsToMany(User::class, 'friends', 'friend_id', 'user_id');
    }

    public function likedPosts()
    {
        return $this->belongsToMany(Post::class, 'likes', 'user_id', 'post_id');
    }
    public function images()
    {
        return $this->hasMany(UserImage::class);
    }
    public function coverImage()
    {
        return $this->hasOne(UserImage::class)->orderByDesc('id')->where('location', 'cover')->withDefault(function ($userImage) {
            $userImage->path = 'user-images/cover-default-image.png';
        });
    }
    public function profileImage()
    {
        return $this->hasOne(UserImage::class)->orderByDesc('id')->where('location', 'profile')->withDefault(function ($userImage) {
            $userImage->path = 'user-images/profile-default-image.jpeg';
        });
    }
}
