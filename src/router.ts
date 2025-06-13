import { Router, Request, Response } from "express";

const router = Router();

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

const products: Product[] = [];
let currentId = 1;

// Get all products
router.get('/products', (_req: Request, res: Response) => {
    res.json(products);
});

// Get a product by ID
router.get('/products/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});

// Create a new product
router.post('/products', (req: Request, res: Response) => {
    const { name, price, description } = req.body;

    if (!name || price === undefined) {
        return res.status(400).json({ message: 'Name and price are required' });
    }

    const product: Product = {
        id: currentId++,
        name,
        price: Number(price),
        description,
    };

    products.push(product);

    res.status(201).json(product);
});

// Update a product by ID
router.put('/products/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const { name, price, description } = req.body;

    if (name !== undefined) products[index].name = name;
    if (price !== undefined) products[index].price = Number(price);
    if (description !== undefined) products[index].description = description;

    res.json(products[index]);
});

// Delete a product by ID
router.delete('/products/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products.splice(index, 1);

    res.status(204).send();
});

// Health-check / welcome route
router.get('/', (_req: Request, res: Response) => {
    res.json({ status: 'API running', version: '1.0.0' });
});

export default router;
