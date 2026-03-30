<?php

namespace App\Http\Controllers\StudentAuth;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('student/auth/login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nis' => ['required', 'string'],
        ]);

        $student = Student::where('nis', $request->nis)->first();

        if (! $student) {
            return back()->withErrors([
                'nis' => 'NIS tidak ditemukan di sistem kami.',
            ])->onlyInput('nis');
        }

        Auth::guard('student')->login($student);

        $request->session()->regenerate();

        return redirect()->intended(route('student.dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::guard('student')->logout();

        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return redirect('/siswa/login');
    }
}
