export type Item = {
    name: string;
    quantity: number;
    unit: string;
    comment: string;
    date: Date;
    saved: boolean;
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
}

export function cloneItem(item: Item): Item {
    return {...item};
}