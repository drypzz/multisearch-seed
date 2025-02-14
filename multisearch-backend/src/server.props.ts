export default interface Item { // Interface para os itens
    id: string | number;
    name: string;
    quantity?: number;
    category?: string;
    shift?: string;
};