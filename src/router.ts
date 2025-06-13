import { Router, Request, Response } from "express";
import pool from "./db";

const router = Router();

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    createdAt: Date;
}

// Get all products
router.get('/products', async (_req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM product');
    res.json(rows);
});

// Get a product by ID
router.get('/products/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [rows]: any = await pool.query('SELECT * FROM product WHERE id = ?', [id]);
    if (rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(rows[0]);
});

// Create a new product
router.post('/products', async (req: Request, res: Response) => {
    const { name, price, description } = req.body;

    if (!name || price === undefined) {
        return res.status(400).json({ message: 'Name and price are required' });
    }

    const [result]: any = await pool.execute(
        'INSERT INTO product (name, description, price, createdAt) VALUES (?, ?, ?, NOW())',
        [name, description, Number(price)]
    );

    const insertId = (result as any).insertId;
    const [rows]: any = await pool.query('SELECT * FROM product WHERE id = ?', [insertId]);
    res.status(201).json(rows[0]);
});

// Update a product by ID
router.put('/products/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, price, description } = req.body;

    await pool.execute(
        'UPDATE product SET name = COALESCE(?, name), description = COALESCE(?, description), price = COALESCE(?, price) WHERE id = ?',
        [name ?? null, description ?? null, price ?? null, id]
    );

    const [rows]: any = await pool.query('SELECT * FROM product WHERE id = ?', [id]);
    if (rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(rows[0]);
});

// Delete a product by ID
router.delete('/products/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [result]: any = await pool.execute('DELETE FROM product WHERE id = ?', [id]);
    if ((result as any).affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
});

// Health-check / welcome route
router.get('/', (_req: Request, res: Response) => {
    res.json({ status: 'API running', version: '1.0.0' });
});

export default router;
