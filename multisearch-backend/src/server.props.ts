export default interface Item { // Interface para os itens
    id: string | number;
    name: string;
    category: string;
    quantity?: number;
    shift?: string;
};