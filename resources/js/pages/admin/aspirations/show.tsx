import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Aspiration {
    id: number;
    description: string;
    image_url: string | null;
    status: 'pending' | 'in_progress' | 'completed' | 'rejected';
    feedback: string | null;
    repair_progress: string | null;
    created_at: string;
    student: {
        id: number;
        name: string;
        nis: string;
        class: string;
    };
    category: {
        id: number;
        name: string;
    };
}

const statusLabels: Record<string, string> = {
    pending: 'Menunggu',
    in_progress: 'Diproses',
    completed: 'Selesai',
    rejected: 'Ditolak',
};

export default function Show({ aspiration }: { aspiration: Aspiration }) {
    const { data, setData, put, processing, errors } = useForm({
        status: aspiration.status,
        feedback: aspiration.feedback || '',
        repair_progress: aspiration.repair_progress || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/aspirations/${aspiration.id}`);
    };

    return (
        <>
            <Head title="Detail Aspirasi" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Detail Aspirasi #{aspiration.id}</h1>
                    <Button variant="outline" asChild>
                        <Link href="/admin/aspirations">Kembali</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Data Aspirasi */}
                    <div className="rounded-md border p-6 bg-card text-card-foreground space-y-4">
                        <h2 className="text-lg font-semibold border-b pb-2">Informasi Pengaduan</h2>
                        
                        <div>
                            <p className="text-sm text-muted-foreground">Pengirim (Siswa)</p>
                            <p className="font-medium">{aspiration.student.name} ({aspiration.student.nis})</p>
                            <p className="text-sm">{aspiration.student.class}</p>
                        </div>
                        
                        <div>
                            <p className="text-sm text-muted-foreground">Tanggal & Kategori</p>
                            <p className="font-medium">
                                {new Date(aspiration.created_at).toLocaleString('id-ID')} — {aspiration.category?.name || '-'}
                            </p>
                        </div>
                        
                        <div>
                            <p className="text-sm text-muted-foreground">Deskripsi / Laporan</p>
                            <div className="mt-1 p-3 bg-muted rounded-md text-sm whitespace-pre-wrap">
                                {aspiration.description}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Gambar Pendukung {aspiration.image_url}</p>
                            {aspiration.image_url ? (
                                <a href={aspiration.image_url} target="_blank" rel="noreferrer" className="mt-2 block overflow-hidden rounded-md border bg-muted/30">
                                    <img
                                        src={aspiration.image_url}
                                        alt={`Gambar aspirasi #${aspiration.id}`}
                                        className="max-h-80 w-full object-cover"
                                    />
                                </a>
                            ) : (
                                <p className="mt-1 text-sm italic text-muted-foreground">Siswa tidak melampirkan gambar.</p>
                            )}
                        </div>
                    </div>

                    {/* Form Update */}
                    <div className="rounded-md border p-6 bg-card text-card-foreground">
                        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Tindak Lanjut Admin</h2>
                        
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="status" className="text-sm font-medium leading-none">
                                    Status Penyelesaian
                                </label>
                                <select
                                    id="status"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as any)}
                                >
                                    {Object.entries(statusLabels).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                                {errors.status && <p className="text-sm font-medium text-destructive">{errors.status}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="repair_progress" className="text-sm font-medium leading-none">
                                    Progres Perbaikan 
                                </label>
                                <textarea
                                    id="repair_progress"
                                    required={true}
                                    rows={3}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.repair_progress}
                                    onChange={(e) => setData('repair_progress', e.target.value)}
                                    placeholder="Deskripsikan kondisi terkini, misal: 'Sedang dikerjakan teknisi'"
                                />
                                {errors.repair_progress && <p className="text-sm font-medium text-destructive">{errors.repair_progress}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="feedback" className="text-sm font-medium leading-none">
                                    Umpan Balik untuk Siswa (Opsional)
                                </label>
                                <textarea
                                    id="feedback"
                                    rows={3}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.feedback}
                                    onChange={(e) => setData('feedback', e.target.value)}
                                    placeholder="Pesan yang akan ditampilkan kepada siswa..."
                                />
                                {errors.feedback && <p className="text-sm font-medium text-destructive">{errors.feedback}</p>}
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Aspirasi', href: '/admin/aspirations' },
        { title: 'Detail', href: '#' },
    ],
};
