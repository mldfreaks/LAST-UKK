<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class StudentController extends Controller
{
    public function index(): Response
    {
        $students = Student::latest()->paginate(10);
        
        return Inertia::render('admin/students/index', [
            'students' => $students
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/students/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nis' => ['required', 'string', 'unique:students,nis'],
            'name' => ['required', 'string', 'max:255'],
            'class' => ['required', 'string', 'max:255'],
        ]);

        Student::create($validated);

        return
        redirect()->route('admin.students.index')->with('message','Siswa Behasil Ditambahkan.');
    }

    public function edit(Student $student): Response
    {
        return Inertia::render('admin/students/edit', [
            'student' => $student
        ]);
    }

    public function update(Request $request, Student $student): RedirectResponse
    {
        $validated = $request->validate([
            'nis' => ['required', 'string','min:9', 'unique:students,nis,' . $student->id],
            'name' => ['required', 'string', 'max:255'],
            'class' => ['required', 'string', 'max:255'],
        ]);

        $student->update($validated);

        return redirect()->route('admin.students.index')->with('message', 'Data siswa berhasil diperbarui.');
    }

    public function destroy(Student $student): RedirectResponse
    {
        $student->delete();

        return redirect()->route('admin.students.index')->with('message', 'Siswa berhasil dihapus.');
    }
}
