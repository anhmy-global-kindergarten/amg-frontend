import {getRequestConfig} from "next-intl/server";
import {locales} from "@/config";
import {notFound} from "next/navigation";

export default getRequestConfig(async ({locale}) => {
    if (!locales.includes(locale as any)) {
        console.log(`Locale ${locale} is not supported.`);
        notFound();
    }

    return {
        locale: locale as string,
        messages: (await import(`./messages/${locale}.json`)).default
    }
})