import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nis: '',
        name: '',
        class: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/students');
    };

    return (
        <>
            <Head title="Tambah Siswa" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Tambah Siswa</h1>
                    <Button variant="outline" asChild>
                        <Link href="/admin/students">Kembali</Link>
                    </Button>
                </div>

                <div className="rounded-md border p-6 max-w-2xl bg-card text-card-foreground">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="nis" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                NIS
                            </label>
                            <input
                                id="nis"
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={data.nis}
                                onChange={(e) => setData('nis', e.target.value)}
                                placeholder="Masukkan NIS Siswa"
                            />
                            {errors.nis && <p className="text-sm font-medium text-destructive">{errors.nis}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Nama Lengkap
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan Nama Lengkap"
                            />
                            {errors.name && <p className="text-sm font-medium text-destructive">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="class" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Kelas
                            </label>
                            <input
                                id="class"
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={data.class}
                                onChange={(e) => setData('class', e.target.value)}
                                placeholder="Contoh: XII RPL 1"
                            />
                            {errors.class && <p className="text-sm font-medium text-destructive">{errors.class}</p>}
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing}>
                                Simpan Siswa
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
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Siswa', href: '/admin/students' },
        { title: 'Tambah', href: '/admin/students/create' },
    ],
};
