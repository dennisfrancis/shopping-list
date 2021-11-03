/* eslint-disable */
export type BooleanNumber = 0 | 1;

export type Item = {
    name: string;
    quantity: number;
    unit: string;
    comment: string;
    date: Date;
    saved: BooleanNumber;
    category: string | undefined;
};

export type ItemStatesAndSetters = {
    name: string;
    setName: (name: string) => void;
    quantity: number;
    setQuantity: (qty: number) => void;
    unit: string;
    setUnit: (unit: string) => void;
    comment: string;
    setComment: (comment: string) => void;
    date: Date;
    setDate: (date: Date) => void;
    existing: boolean;
    setExisting: (val: boolean) => void;
    category: string | undefined;
    setCategory: (category: string | undefined) => void;
}

export function cloneItem(item: Item): Item {
    return {
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        comment: item.comment,
        date: item.date,
        saved: item.saved,
        category: item.category
    };
}

export type JSONRepresentationType = {
    items: Item[];
    name: string;
    message: string;
}

export function getItemFromObject(obj: any): Item | undefined {
    if (typeof obj !== 'object')
        return undefined;

    if (typeof obj.name !== 'string' ||
        typeof obj.quantity !== 'number' ||
        typeof obj.unit !== 'string' ||
        typeof obj.comment !== 'string' ||
        typeof obj.date !== 'string' ||
        typeof obj.saved !== 'number' ||
        (typeof obj.category !== 'string' && typeof obj.category !== 'undefined'))
        return undefined;

    return {
        name: obj.name,
        quantity: obj.quantity,
        unit: obj.unit,
        comment: obj.comment,
        date: new Date(obj.date),
        saved: obj.saved,
        category: obj.category,
    }
}

export interface StorageMin {
    clear(): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
}