export type Action = {
    title: string;
    icon: string;
    description: string;
    label: string;
    metadata: Record<string, string>;
    links: {
        actions: {
            label: string;
            href: string;
        }[];
    };
};