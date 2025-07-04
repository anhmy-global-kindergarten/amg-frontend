import {NextIntlClientProvider} from 'next-intl';
import {Metadata} from "next";
import {getMessages} from "next-intl/server";
import {locales} from "@/config";
import {notFound} from "next/navigation";
import "./globals.css";
import Providers from "@/app/[locale]/providers";
import {Toaster} from "sonner";

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

    let messages;
    try {
        messages = await getMessages({ locale: locale });
    } catch (error) {
        console.error("LỖI KHI LẤY MESSAGES TRONG LAYOUT:", error);
        messages = {};
    }

    return (
        <html lang={locale}>
        <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <Providers>
                <Toaster position="top-right" richColors />
                {children}
            </Providers>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}