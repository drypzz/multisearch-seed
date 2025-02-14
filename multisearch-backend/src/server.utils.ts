import fs from "fs";
import path from "path";

import Item from "./server.props";

const dataDir = path.join(__dirname, "data");

// Carregar JSON da pasta "./data"
export const loadJSON = (filename: string): any[] => {
    try {
        const filePath = path.join(dataDir, filename);

        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
        console.error(`❌ Erro ao carregar ${filename}:`, error);
        return [];
    }
};

// Normalizar dados de qualquer tipo
export const normalizeData = (data: any[], idKey: string, nameKey: string, category: string, extraFields?: (item: any) => Partial<Item>): Item[] => data.map((item) => ({
    id: item[idKey],
    name: item[nameKey] || "",
    category,
    ...(extraFields ? extraFields(item) : {})
})).filter((item) => item.name.trim() !== "");