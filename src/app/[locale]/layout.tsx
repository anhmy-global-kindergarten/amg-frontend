import {NextIntlClientProvider} from 'next-intl';
import {Metadata} from "next";
import {getMessages} from "next-intl/server";
import {locales} from "@/config";
import {notFound} from "next/navigation";

type Props = {
    children: React.ReactNode;
    params: {locale: string};
}

export const metadata: Metadata = {
  title: "AMG Kindergarten",
  description: "Trường Mầm Non Anh Mỹ - Nơi Khởi Đầu Tương Lai",
};

export default async function LocaleLayout({ children, params: { locale }} : Props){
    if (!locales.includes(locale as any)) {
        notFound();
    }

    // 2. Lấy messages và TRUYỀN LOCALE VÀO
    const messages = await getMessages({ locale: locale });

    return (
        <html lang={locale}>
        <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}