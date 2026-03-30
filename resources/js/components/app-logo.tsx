import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn-o-e9qv7YyA3nWcIOrYKYvlmn_Im48hU_Q&s' className="size-8 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Pengaduan Sarana Sekolah
                </span>
            </div>
        </>
    );
}
