import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface PageProps {
    stats: {
        total_aspirations: number;
        pending_aspirations: number;
        completed_aspirations: number;
    };
}

export default function Dashboard({ stats }: PageProps) {
    return (
        <>
            <Head title="Student Dashboard" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <Button asChild>
                        <Link href="/siswa/aspirations/create">Ajukan Aspirasi</Link>
                    </Button>
                </div>
                
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="rounded-xl border bg-card text-card-foreground shadow space-y-2 p-6">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium">Total Aspirasi</h3>
                        </div>
                        <div className="text-2xl font-bold">{stats.total_aspirations}</div>
                    </div>
                    <div className="rounded-xl border bg-card text-card-foreground shadow space-y-2 p-6">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium text-yellow-600">Menunggu</h3>
                        </div>
                        <div className="text-2xl font-bold">{stats.pending_aspirations}</div>
                    </div>
                    <div className="rounded-xl border bg-card text-card-foreground shadow space-y-2 p-6">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium text-green-600">Selesai</h3>
                        </div>
                        <div className="text-2xl font-bold">{stats.completed_aspirations}</div>
                    </div>
                </div>

                <div className="min-h-[100vh] flex-1 rounded-xl bg-card border shadow-sm md:min-h-min p-6">
                    <h2 className="text-lg font-semibold mb-4">Informasi</h2>
                    <p className="text-muted-foreground">
                        Selamat datang di portal pengaduan sarana sekolah. Melalui portal ini, Anda dapat menyampaikan keluhan atau aspirasi terkait dengan fasilitas dan infrastruktur yang ada di lingkungan sekolah.
                    </p>
                    <div className="mt-6 flex gap-4">
                        <Button variant="secondary" asChild>
                            <Link href="/siswa/aspirations">Lihat Histori Aspirasi Saya</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/student/dashboard' },
    ],
};
