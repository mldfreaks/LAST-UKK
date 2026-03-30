<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentAuth\AuthenticatedSessionController;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::guard('student')->check()) {
        return redirect()->route('student.dashboard');
    }
    return redirect()->route('student.login');
})->name('home');

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\StudentController as AdminStudentController;
use App\Http\Controllers\Admin\AspirationController as AdminAspirationController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;

use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use App\Http\Controllers\Student\AspirationController as StudentAspirationController;

// Admin Routes (using default web guard)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::resource('admin/students', AdminStudentController::class)->names([
        'index' => 'admin.students.index',
        'create' => 'admin.students.create',
        'store' => 'admin.students.store',
        'edit' => 'admin.students.edit',
        'update' => 'admin.students.update',
        'destroy' => 'admin.students.destroy',
    ]);
    
    Route::resource('admin/aspirations', AdminAspirationController::class)->only(['index', 'show', 'update'])->names([
        'index' => 'admin.aspirations.index',
        'show' => 'admin.aspirations.show',
        'update' => 'admin.aspirations.update',
        'destroy' => 'admin.categories.destroy',
    ]);
    
     Route::resource('admin/categories', AdminCategoryController::class)->only(['index', 'store', 'update', 'destroy'])->names([
        'index' => 'admin.categories.index',
        'show' => 'admin.categories.show',
        'update' => 'admin.categories.update',
        'destroy' => 'admin.categories.destroy',
    ]);
});

// Student Auth Routes
Route::middleware('guest:student')->group(function () {
    Route::get('/siswa/login', [AuthenticatedSessionController::class, 'create'])->name('student.login');
    Route::post('/siswa/login', [AuthenticatedSessionController::class, 'store']);
});

// Student Dashboard Routes
Route::middleware('auth:student')->group(function () {
    Route::get('/siswa/dashboard', [StudentDashboardController::class, 'index'])->name('student.dashboard');

    Route::resource('siswa/aspirations', StudentAspirationController::class)->only(['index', 'create', 'store', 'show'])->names([
        'index' => 'student.aspirations.index',
        'create' => 'student.aspirations.create',
        'store' => 'student.aspirations.store',
        'show' => 'student.aspirations.show',
    ]);

    Route::post('/siswa/logout', [AuthenticatedSessionController::class, 'destroy'])->name('student.logout');
});

require __DIR__.'/settings.php';
