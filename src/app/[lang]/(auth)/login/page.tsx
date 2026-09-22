import LoginForm from "./LoginForm";

export default async function LoginPage({ params }: { params: Promise<{ lang: 'fa' | 'en'}> }) {
  const { lang } = await params;
  return (
    <LoginForm lang={lang} />
  );
}
