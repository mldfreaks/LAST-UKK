import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface Student {
    id: number;
    nis: string;
    name: string;
    class: string;
    created_at: string;
}

interface PageProps {
    students: {
        data: Student[];
        links: any[];
    };
    flash?: {
        message?: string;
    };
}

export default function Index({ students, flash }: PageProps) {
    const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);

    function handleDelete(student: Student) {
        setDeleteTarget(student);
    }

    function confirmDelete() {
        if (!deleteTarget) return;

        router.delete(`/admin/students/${deleteTarget.id}`, {
            onSuccess: () => setDeleteTarget(null),
        });
    }

    return (
        <>
            <Head title="Manajemen Siswa" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Data Siswa</h1>
                    <Button asChild>
                        <Link href="/admin/students/create">Tambah Siswa</Link>
                    </Button>
                </div>

                {flash?.message && (
                    <div className="rounded border border-green-200 bg-green-50 p-4 text-green-700">
                        {flash.message}
                    </div>
                )}

                <div className="rounded-md border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4 text-left">NIS</th>
                                <th className="p-4 text-left">Nama</th>
                                <th className="p-4 text-left">Kelas</th>
                                <th className="p-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.data.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center">
                                        Belum ada data siswa.
                                    </td>
                                </tr>
                            ) : (
                                students.data.map((student) => (
                                    <tr key={student.id} className="border-b">
                                        <td className="p-4">{student.nis}</td>
                                        <td className="p-4">{student.name}</td>
                                        <td className="p-4">{student.class}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/admin/students/${student.id}/edit`}>
                                                        Edit
                                                    </Link>
                                                </Button>

                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(student)}
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ✅ Dialog Konfirmasi Hapus */}
            <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus</DialogTitle>
                    </DialogHeader>

                    <p>
                        Yakin ingin menghapus siswa <b>{deleteTarget?.name}</b>?
                    </p>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteTarget(null)}>
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Siswa', href: '/admin/students' },
    ],
};