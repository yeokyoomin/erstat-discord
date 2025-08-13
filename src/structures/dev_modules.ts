// const title = formatMessage(messages.res_title, { user: "Name" });
export function formatMessage(template: string, variables: Record<string, string>) {
    return template.replace(/\{(\w+)\}/g, (_, key) => variables[key] ?? "");
}
export async function loadLocale(userLocale: string) {
    try {
        return (await import(`../lang/${userLocale}.json`)).default;
    } catch {
        return (await import(`../lang/en-US.json`)).default;
    }
}