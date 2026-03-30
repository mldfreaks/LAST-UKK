import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface Category {
    id: number;
    name: string;
}

export default function Create({ categories }: { categories: Category[] }) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        description: '',
        image: null as File | null,
    });

    useEffect(() => {
        if (!data.image) {
            setPreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(data.image);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [data.image]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/siswa/aspirations', {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Ajukan Aspirasi" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Ajukan Aspirasi Baru</h1>
                    <Button variant="outline" asChild>
                        <Link href="/siswa/aspirations">Kembali</Link>
                    </Button>
                </div>

                <div className="rounded-md border p-6 max-w-2xl bg-card text-card-foreground">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="category_id" className="text-sm font-medium leading-none">
                                Kategori
                            </label>
                            <select
                                id="category_id"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                            >
                                <option value="" disabled>Pilih Kategori</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <p className="text-sm font-medium text-destructive">{errors.category_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium leading-none">
                                Penjelasan / Deskripsi Aspirasi
                            </label>
                            <textarea
                                id="description"
                                rows={5}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Jelaskan aspirasi atau masalah yang kamu temui secara detail..."
                            />
                            {errors.description && <p className="text-sm font-medium text-destructive">{errors.description}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="image" className="text-sm font-medium leading-none">
                                Upload Gambar Pendukung
                            </label>
                            <input
                                id="image"
                                type="file"
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                            />
                            <p className="text-xs text-muted-foreground">
                                Opsional. Format: JPG, PNG, atau WEBP. Maksimal 2 MB.
                            </p>
                            {previewUrl && (
                                <div className="overflow-hidden rounded-md border bg-muted/30">
                                    <img
                                        src={previewUrl}
                                        alt="Preview gambar aspirasi"
                                        className="h-56 w-full object-cover"
                                    />
                                </div>
                            )}
                            {errors.image && <p className="text-sm font-medium text-destructive">{errors.image}</p>}
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing}>
                                Kirim Aspirasi
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/student/dashboard' },
        { title: 'Aspirasi Saya', href: '/siswa/aspirations' },
        { title: 'Ajukan Baru', href: '#' },
    ],
};
