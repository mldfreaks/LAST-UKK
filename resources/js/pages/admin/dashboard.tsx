import { Head, Link } from '@inertiajs/react';
import { ClipboardList, CheckCircle, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Stats {
    total_aspirations: number;
    completed_aspirations: number;
    pending_aspirations: number;
    total_students: number;
}

export default function AdminDashboard({ stats }: { stats: Stats }) {
    const cards = [
        {
            title: 'Total Aspirasi',
            value: stats?.total_aspirations ?? 0,
            icon: ClipboardList,
            description: 'Semua pengaduan yang masuk',
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
        },
        {
            title: 'Aspirasi Selesai',
            value: stats?.completed_aspirations ?? 0,
            icon: CheckCircle,
            description: 'Telah ditangani',
            color: 'text-green-500',
            bg: 'bg-green-500/10',
        },
        {
            title: 'Menunggu Diproses',
            value: stats?.pending_aspirations ?? 0,
            icon: Clock,
            description: 'Perlu segera ditangani',
            color: 'text-yellow-500',
            bg: 'bg-yellow-500/10',
        },
        {
            title: 'Total Siswa',
            value: stats?.total_students ?? 0,
            icon: Users,
            description: 'Terdaftar dalam sistem',
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
        },
    ];

    return (
        <>
            <Head title="Dashboard Admin" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard Admin</h1>
                    <p className="text-muted-foreground">Selamat datang! Berikut ringkasan data pengaduan sarana sekolah.</p>
                </div>

                {/* Stat Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Card key={card.title}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {card.title}
                                    </CardTitle>
                                    <div className={`rounded-lg p-2 ${card.bg}`}>
                                        <Icon className={`h-4 w-4 ${card.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{card.value}</div>
                                    <p className="mt-1 text-xs text-muted-foreground">{card.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Quick Links & Status Summary */}
                {/* <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Aksi Cepat</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <Link
                                href="/admin/aspirations"
                                className="flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                            >
                                <ClipboardList className="h-4 w-4 text-muted-foreground" />
                                Lihat Semua Aspirasi
                            </Link>
                            <Link
                                href="/admin/students"
                                className="flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                            >
                                <Users className="h-4 w-4 text-muted-foreground" />
                                Kelola Data Siswa
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Status Ringkasan</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            {[
                                { label: 'Selesai', value: stats?.completed_aspirations ?? 0, color: 'bg-green-500' },
                                { label: 'Menunggu', value: stats?.pending_aspirations ?? 0, color: 'bg-yellow-500' },
                                {
                                    label: 'Lainnya',
                                    value: Math.max(
                                        0,
                                        (stats?.total_aspirations ?? 0) -
                                            (stats?.completed_aspirations ?? 0) -
                                            (stats?.pending_aspirations ?? 0),
                                    ),
                                    color: 'bg-blue-500',
                                },
                            ].map((item) => {
                                const total = stats?.total_aspirations || 1;
                                const pct = Math.round((item.value / total) * 100);
                                return (
                                    <div key={item.label}>
                                        <div className="mb-1 flex justify-between text-xs">
                                            <span className="text-muted-foreground">{item.label}</span>
                                            <span className="font-medium">
                                                {item.value} ({pct}%)
                                            </span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                            <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </div> */}
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard Admin', href: '/dashboard' }],
};
