import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Aspiration {
    id: number;
    description: string;
    image_url: string | null;
    status: 'pending' | 'in_progress' | 'completed' | 'rejected';
    feedback: string | null;
    repair_progress: string | null;
    created_at: string;
    category: {
        id: number;
        name: string;
    };
}

const statusLabels: Record<string, string> = {
    pending: 'Menunggu',
    in_progress: 'Sedang Diproses',
    completed: 'Selesai',
    rejected: 'Ditolak',
};

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500',
    in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500',
};

export default function Show({ aspiration }: { aspiration: Aspiration }) {
    return (
        <>
            <Head title="Detail Aspirasi" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Detail Aspirasi #{aspiration.id}</h1>
                    <Button variant="outline" asChild>
                        <Link href="/siswa/aspirations">Kembali</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Data Laporan Saya */}
                    <div className="rounded-md border p-6 bg-card text-card-foreground space-y-4">
                        <h2 className="text-lg font-semibold border-b pb-2">Laporan Saya</h2>
                        
                        <div>
                            <p className="text-sm text-muted-foreground">Status Pengerjaan</p>
                            <span className={`px-3 py-1 mt-1 inline-block rounded-full text-sm font-medium ${statusColors[aspiration.status]}`}>
                                {statusLabels[aspiration.status]}
                            </span>
                        </div>
                        
                        <div>
                            <p className="text-sm text-muted-foreground">Kategori Laporan</p>
                            <p className="font-medium mt-1">{aspiration.category?.name || 'Lainnya'}</p>
                        </div>
                        
                        <div>
                            <p className="text-sm text-muted-foreground">Tanggal Pengajuan</p>
                            <p className="font-medium mt-1">{new Date(aspiration.created_at).toLocaleString('id-ID')}</p>
                        </div>
                        
                        <div>
                            <p className="text-sm text-muted-foreground">Deskripsi / Detail</p>
                            <div className="mt-2 p-3 bg-muted rounded-md text-sm whitespace-pre-wrap">
                                {aspiration.description}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Gambar Pendukung</p>
                            {aspiration.image_url ? (
                                <a href={aspiration.image_url} target="_blank" rel="noreferrer" className="mt-2 block overflow-hidden rounded-md border bg-muted/30">
                                    <img
                                        src={aspiration.image_url}
                                        alt={`Gambar aspirasi #${aspiration.id}`}
                                        className="max-h-80 w-full object-cover"
                                    />
                                </a>
                            ) : (
                                <p className="mt-1 text-sm italic text-muted-foreground">Tidak ada gambar yang dilampirkan.</p>
                            )}
                        </div>
                    </div>

                    {/* Feedback dan Progress */}
                    <div className="rounded-md border p-6 bg-card text-card-foreground space-y-6">
                        <h2 className="text-lg font-semibold border-b pb-2">Tindak Lanjut & Umpan Balik</h2>
                        
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Progres Perbaikan Infrastruktur</p>
                            {aspiration.repair_progress ? (
                                <div className="p-4 bg-muted/60 border rounded-lg text-sm whitespace-pre-wrap">
                                    {aspiration.repair_progress}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">Belum ada pembaruan mengenai progres perbaikan.</p>
                            )}
                        </div>
                        
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Pesan Umpan Balik dari Admin</p>
                            {aspiration.feedback ? (
                                <div className="p-4 bg-primary/10 border-l-4 border-primary rounded-r-lg text-sm whitespace-pre-wrap">
                                    {aspiration.feedback}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">Admin belum memberikan umpan balik terkait aspirasi ini.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/student/dashboard' },
        { title: 'Aspirasi Saya', href: '/siswa/aspirations' },
        { title: 'Detail', href: '#' },
    ],
};
