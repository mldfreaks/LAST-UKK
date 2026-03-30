import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Users, MessageSquare, ClipboardList, Tag } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as adminAspirationsIndex } from '@/routes/admin/aspirations/index';
import { index as adminStudentsIndex } from '@/routes/admin/students/index';
import { index as studentAspirationsIndex } from '@/routes/student/aspirations/index';
import { dashboard as studentDashboard } from '@/routes/student/index';
import type { NavItem } from '@/types';

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard Admin',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Data Siswa',
        href: adminStudentsIndex(),
        icon: Users,
    },
    {
        title: 'Semua Aspirasi',
        href: adminAspirationsIndex(),
        icon: ClipboardList,
    },
    {
        title: 'Kategori',
        href: '/admin/categories',
        icon: Tag,
    },
];

const studentNavItems: NavItem[] = [
    {
        title: 'Dasbor Siswa',
        href: studentDashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Pengaduan & Aspirasi',
        href: studentAspirationsIndex(),
        icon: MessageSquare,
    },
];

export function AppSidebar() {
    const { auth } = usePage<any>().props;
    const role = auth?.user?.role;
    const navItems = role === 'admin' ? adminNavItems : studentNavItems;
    const dashboardHref = role === 'admin' ? dashboard() : studentDashboard();

    return (
        <Sidebar collapsible="offcanvas">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardHref} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
