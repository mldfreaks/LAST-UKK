import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    status?: string;
    errors?: Record<string, string>;
};

export default function StudentLogin({ status, errors }: Props) {
    return (
        <>
            <Head title="Login Siswa" />

            <Form
                action="/siswa/login"
                method="post"
                className="flex flex-col gap-6"
            >
                {({ processing }: { processing: boolean }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="nis">Nomor Induk Siswa (NIS)</Label>
                                <Input
                                    id="nis"
                                    type="text"
                                    name="nis"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    placeholder="Masukkan NIS Anda"
                                />
                                {errors?.nis && <InputError message={errors.nis} />}
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={2}
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Masuk ke Portal Siswa
                            </Button>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="text-center text-sm text-muted-foreground">
                Login sebagai admin?{' '}
                <a href="/login" className="text-primary underline underline-offset-4 hover:text-primary/80">
                    Portal Admin
                </a>
            </div>
        </>
    );
}

StudentLogin.layout = {
    title: 'Login Siswa',
    description: 'Masukkan Nomor Induk Siswa (NIS) Anda untuk masuk',
};
