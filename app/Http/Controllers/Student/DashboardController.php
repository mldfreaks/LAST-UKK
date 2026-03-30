<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $student = Auth::guard('student')->user();
        
        return Inertia::render('student/dashboard', [
            'stats' => [
                'total_aspirations' => $student->aspirations()->count(),
                'pending_aspirations' => $student->aspirations()->where('status', 'pending')->count(),
                'completed_aspirations' => $student->aspirations()->where('status', 'completed')->count(),
            ]
        ]);
    }
}
