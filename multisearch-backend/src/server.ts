import express, { Request, Response } from "express";

import cors from "cors";
import fs from "fs";
import path from "path";

import Item from "./server.props";

const app = express();
app.use(cors());

const PORT = 5000;

const dataDir = path.join(__dirname, "data"); // Caminho para a pasta de dados

const loadJSON = (filename: string): any[] => { // Função para carregar arquivos JSON
    try {
        const filePath = path.join(dataDir, filename);
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
        console.error(`Erro ao carregar ${filename}:`, error);
        return [];
    }
};

// Função para normalizar os dados
const normalizeData = (data: any[], idKey: string, nameKey: string, category: string, extraFields?: (item: any) => Partial<Item>): Item[] => {
    return data.map((item) => ({
        id: item[idKey],
        name: item[nameKey] || "",
        quantity: item.Quantity || item.QuantityOrdered || item.QuantityDelivered,
        category,
        ...(extraFields ? extraFields(item) : {})
    })).filter((item) => item.name.trim() !== "");
};

const pedidosVenda: Item[] = normalizeData(loadJSON("sales_orders.json"), "SalesOrderID", "MaterialName", "Pedidos de Venda",
    (item) => ({
        quantity: item.Quantity || ""
    })
);

const pedidosCompra: Item[] = normalizeData(loadJSON("purchase_orders.json"), "PurchaseOrderID", "MaterialName", "Pedidos de Compra",
    (item) => ({
        quantity: item.Quantity || ""
    })
);

const maoDeObra: Item[] = normalizeData(loadJSON("workforce.json"), "WorkforceID", "Name", "Mão de Obra",
    (item) => ({
        shift: item.Shift || ""
    })
);

const produtos: Item[] = normalizeData(loadJSON("materials.json"), "MaterialID", "MaterialName", "Produtos");
const equipamentos: Item[] = normalizeData(loadJSON("equipments.json"), "EquipmentID", "EquipmentName", "Equipamentos");

app.get("/search", (req: Request, res: Response) => {
    const query = (req.query.q as string)?.toLowerCase().trim();

    const filterItems = (items: Item[]): Item[] => items.filter((item) => // Filtrar itens
        item.name.toLowerCase().includes(query) || (item.shift && item.shift.toLowerCase().includes(query) || (item.category && item.category.toLowerCase().includes(query)))
    );

    const results: Item[] = [ // Resultados
        ...filterItems(pedidosVenda),
        ...filterItems(pedidosCompra),
        ...filterItems(produtos),
        ...filterItems(equipamentos),
        ...filterItems(maoDeObra),
    ];

    res.json({ results });
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
