"use client";

import { useTranslations} from 'next-intl';

export default function HomePage() {
    // locale sẽ được tự động lấy từ context của NextIntlClientProvider
    const t = useTranslations('Hero');

    return (
        <div>
            <h1>{t('title')}</h1>
        </div>
    );
}
