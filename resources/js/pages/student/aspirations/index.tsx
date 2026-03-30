import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Aspiration {
    id: number;
    description: string;
    status: 'pending' | 'in_progress' | 'completed' | 'rejected';
    created_at: string;
    category: {
        id: number;
        name: string;
    };
}

interface PageProps {
    aspirations: {
        data: Aspiration[];
        links: any[];
    };
    flash?: {
        message?: string;
    };
}

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500',
    in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500',
};

const statusLabels: Record<string, string> = {
    pending: 'Menunggu',
    in_progress: 'Diproses',
    completed: 'Selesai',
    rejected: 'Ditolak',
};

export default function Index({ aspirations, flash }: PageProps) {
    return (
        <>
            <Head title="Histori Aspirasi" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Histori Aspirasi Saya</h1>
                    <Button asChild>
                        <Link href="/siswa/aspirations/create">Ajukan Aspirasi Baru</Link>
                    </Button>
                </div>

                {flash?.message && (
                    <div className="rounded border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
                        {flash.message}
                    </div>
                )}

                <div className="rounded-md border overflow-hidden bg-card text-card-foreground">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tanggal</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Kategori</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {aspirations.data.length === 0 ? (
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td colSpan={4} className="p-4 align-middle text-center h-24">
                                        Anda belum pernah mengajukan aspirasi.
                                    </td>
                                </tr>
                            ) : (
                                aspirations.data.map((aspiration) => (
                                    <tr key={aspiration.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle">
                                            {new Date(aspiration.created_at).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="p-4 align-middle">{aspiration.category?.name || '-'}</td>
                                        <td className="p-4 align-middle">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[aspiration.status]}`}>
                                                {statusLabels[aspiration.status]}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/siswa/aspirations/${aspiration.id}`}>Lihat Detail</Link>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/student/dashboard' },
        { title: 'Aspirasi Saya', href: '/siswa/aspirations' },
    ],
};
