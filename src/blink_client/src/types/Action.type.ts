export type Action = {
    title: string;
    icon: string;
    description: string;
    labels: string[];
    metadata: Record<string, string>;
    actions: {
        label: string;
        action: string;
    }[];
};