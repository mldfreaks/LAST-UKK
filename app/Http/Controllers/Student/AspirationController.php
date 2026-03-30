<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Aspiration;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class AspirationController extends Controller
{
    public function index(): Response
    {
        $aspirations = Auth::guard('student')->user()
            ->aspirations()
            ->with('category')
            ->latest()
            ->paginate(10);

        return Inertia::render('student/aspirations/index', [
            'aspirations' => $aspirations
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('student/aspirations/create', [
            'categories' => Category::all()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'description' => ['required', 'string', 'min:10'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        Auth::guard('student')->user()->aspirations()->create([
            'category_id' => $validated['category_id'],
            'description' => $validated['description'],
            'image_path' => $request->hasFile('image')
                ? $request->file('image')->store('aspirations', 'public')
                : null,
            'status' => 'pending',
        ]);

        return redirect()->route('student.aspirations.index')->with('message', 'Aspirasi berhasil dikirim.');
    }
    
    public function show(Aspiration $aspiration): Response
    {
        // Ensure student can only view their own aspiration
        if ($aspiration->student_id !== Auth::guard('student')->id()) {
            abort(403);
        }

        $aspiration->load('category');

        return Inertia::render('student/aspirations/show', [
            'aspiration' => $aspiration
        ]);
    }
}
