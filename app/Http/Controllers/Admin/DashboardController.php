<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Aspiration;
use App\Models\Student;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'total_students' => Student::count(),
                'total_aspirations' => Aspiration::count(),
                'pending_aspirations' => Aspiration::where('status', 'pending')->count(),
                'completed_aspirations' => Aspiration::where('status', 'completed')->count(),
            ]
        ]);
    }
}
