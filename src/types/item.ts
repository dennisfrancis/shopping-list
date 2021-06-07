export type Item = {
    name: string;
    quantity: number;
    unit: string;
    comment: string;
};

export type ShoppingListItem = Item & {
    date: Date;
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