import express, { Request, Response } from "express";
import cors from "cors";

import { loadJSON, normalizeData } from "./server.utils";
import Item from "./server.props";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000; // Porta do servidor

// Carregar dados dinamicamente
const categories = [
    { 
        file: "sales_orders.json",
        id: "SalesOrderID",
        name: "MaterialName",
        category: "Pedidos de Venda",
        extra: (item: any) => ({
            quantity: item.Quantity || "",
        })
    },

    { 
        file: "purchase_orders.json",
        id: "PurchaseOrderID",
        name: "MaterialName",
        category: "Pedidos de Compra",
        extra: (item: any) => ({
            quantity: item.Quantity || "",
        })
    },

    {
        file: "workforce.json",
        id: "WorkforceID",
        name: "Name",
        category: "Mão de Obra",
        extra: (item: any) => ({
            shift: item.Shift || ""
        })
    },
    
    {
        file: "materials.json",
        id: "MaterialID",
        name: "MaterialName",
        category: "Produtos"
    },

    {
        file: "equipments.json",
        id: "EquipmentID",
        name: "EquipmentName",
        category: "Equipamentos"
    },
];

// Normalizar todos os dados de uma vez
const dataStore: Item[] = categories.flatMap(({ file, id, name, category, extra }) => 
    normalizeData(loadJSON(file), id, name, category, extra)
);

app.get("/search", (req: Request, res: Response) => {
    const query = (req.query.q as string)?.toLowerCase().trim();

    // Filtrar por nome, categoria, turno e quantidade
    const results = dataStore.filter(({ name, shift, category, quantity }) =>
        name.toLowerCase().includes(query) ||
        category.toLowerCase().includes(query) ||
        shift?.toLowerCase().includes(query) ||
        quantity?.toString().includes(query)
    );

    res.json({ results });
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));