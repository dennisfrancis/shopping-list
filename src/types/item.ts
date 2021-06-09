export type Item = {
    name: string;
    quantity: number;
    unit: string;
    comment: string;
};

export type ShoppingListItem = Item & {
    date: Date;
}

export type ItemStatesAndSetters = {
    name: string;
    setName: (name: string) => void;
    quantity: number;
    setQuantity: (qty: number) => void;
    unit: string;
    setUnit: (unit: string) => void;
    comment: string;
    setComment: (comment: string) => void;
    existing: boolean;
    setExisting: (val: boolean) => void;
}

export function SItemfromItem(item: Item, date?: Date): ShoppingListItem {
    return {
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        comment: item.comment,
        date: date ? date : new Date()
    };
}

export function cloneItem(item: Item): Item {
    return {...item};
}

export function cloneSItem(item: ShoppingListItem): ShoppingListItem {
    return {...item};
}