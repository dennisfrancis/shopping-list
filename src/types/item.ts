export type Item = {
    name: string;
    quantity: number;
    unit: string;
    comment: string;
};

export type ShoppingListItem = Item & {
    date: Date;
}