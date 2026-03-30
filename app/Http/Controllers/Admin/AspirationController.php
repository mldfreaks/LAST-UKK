<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Aspiration;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class AspirationController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Aspiration::with(['student', 'category'])->latest();

        // Implement simple filtering if necessary
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        if ($request->filled('date')) {
            $query->whereDate('created_at', $request->date);
        }
        if ($request->filled('student_id')) {
            $query->where('student_id', $request->student_id);
        }

        return Inertia::render('admin/aspirations/index', [
            'aspirations' => $query->paginate(15)->withQueryString(),
            'categories' => Category::all(),
            'filters' => $request->only(['status', 'category_id', 'date', 'student_id'])
        ]);
    }

    public function show(Aspiration $aspiration): Response
    {
        $aspiration->load(['student', 'category']);
        
        return Inertia::render('admin/aspirations/show', [
            'aspiration' => $aspiration
        ]);
    }

    public function update(Request $request, Aspiration $aspiration): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,in_progress,completed,rejected'],
            'feedback' => ['nullable', 'string'],
            'repair_progress' => ['nullable', 'string'],
        ]);

        $aspiration->update($validated);

        return back()->with('message', 'Aspirasi berhasil diperbarui.');
    }
}
