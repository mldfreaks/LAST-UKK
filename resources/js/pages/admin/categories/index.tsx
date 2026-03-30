import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Tag, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Category {
    id: number;
    name: string;
    aspirations_count: number;
}

interface PageProps {
    categories: Category[];
    flash?: { message?: string };
    errors?: { delete?: string };
}

export default function Index({ categories, flash, errors }: PageProps) {
    const [addOpen, setAddOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Category | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Category | null>(null); // ✅ NEW

    // Add form
    const addForm = useForm({ name: '' });

    // Edit form
    const editForm = useForm({ name: '' });

    function openEdit(category: Category) {
        setEditTarget(category);
        editForm.setData('name', category.name);
    }

    function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        addForm.post('/admin/categories', {
            onSuccess: () => {
                setAddOpen(false);
                addForm.reset();
            },
        });
    }

    function handleEdit(e: React.FormEvent) {
        e.preventDefault();

        if (!editTarget) return;

        editForm.put(`/admin/categories/${editTarget.id}`, {
            onSuccess: () => setEditTarget(null),
        });
    }

    // ❌ Hapus confirm()
    function handleDelete(category: Category) {
        setDeleteTarget(category);
    }

    // ✅ Konfirmasi hapus
    function confirmDelete() {
        if (!deleteTarget) return;

        router.delete(`/admin/categories/${deleteTarget.id}`, {
            onSuccess: () => setDeleteTarget(null),
        });
    }

    return (
        <>
            <Head title="Kelola Kategori" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Kategori Pengaduan</h1>
                    <Button onClick={() => setAddOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Kategori
                    </Button>
                </div>

                {flash?.message && (
                    <div className="rounded border border-green-200 bg-green-50 p-4 text-green-700">
                        {flash.message}
                    </div>
                )}

                {errors?.delete && (
                    <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">
                        {errors.delete}
                    </div>
                )}

                <div className="rounded-md border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4 text-left">
                                    <div className="flex items-center gap-2">
                                        <Tag className="h-4 w-4" />
                                        Kategori
                                    </div>
                                </th>
                                <th className="p-4 text-center">
                                    Jumlah Aspirasi
                                </th>
                                <th className="p-4 text-right">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-4 text-center">
                                        Belum ada kategori.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((cat) => (
                                    <tr key={cat.id} className="border-b">
                                        <td className="p-4">{cat.name}</td>
                                        <td className="p-4 text-center">
                                            {cat.aspirations_count} aspirasi
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openEdit(cat)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>

                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(cat)}
                                                    disabled={cat.aspirations_count > 0}
                                                >
                                                    <Trash2 className="h-4 w-4" />
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

            {/* Add Dialog */}
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Kategori</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAdd}>
                        <Input
                            value={addForm.data.name}
                            onChange={(e) => addForm.setData('name', e.target.value)}
                        />
                        <DialogFooter>
                            <Button type="submit">Simpan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Kategori</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEdit}>
                        <Input
                            value={editForm.data.name}
                            onChange={(e) => editForm.setData('name', e.target.value)}
                        />
                        <DialogFooter>
                            <Button type="submit">Update</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* ✅ DELETE CONFIRM DIALOG */}
            <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus</DialogTitle>
                    </DialogHeader>

                    <p>
                        Yakin ingin menghapus kategori <b>{deleteTarget?.name}</b>?
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
        { title: 'Kategori', href: '/admin/categories' },
    ],
};