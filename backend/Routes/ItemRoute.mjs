import express from 'express';
import conn from '../Utils/db.js';

const router = express.Router();

router.get('/items_master', (req, res) => {
    const sql = "SELECT * FROM items_master";
    conn.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

router.post('/items_master', (req, res) => {
    const itemsDescription = req.body.items_code_description;
    const query = "SELECT items_code_description FROM items_master WHERE items_code_description LIKE ?";
    conn.query(query, [`%${itemsDescription}%`], (err, results) => {
        if (err) {
            console.error("Error fetching data from database:", err);
            res.status(500).json({ Status: false, Message: "Error fetching data from database" });
        } else {
            res.status(200).json(results);
        }
    });
});

router.post('/items_master/details', (req, res) => {
    const items_code_description = req.body.items_code_description;
    const query = "SELECT new_code_erp, items_code_description, main_category, items_code_unit FROM items_master WHERE items_code_description = ?";
    conn.query(query, [items_code_description], (err, results) => {
        if (err) {
            console.error("Error fetching data from database:", err);
            res.status(500).json({ Status: false, Message: "Error fetching data from database" });
        } else {
            if (results.length > 0) {
                const { new_code_erp, items_code_description, main_category, items_code_unit } = results[0];
                res.status(200).json({ Status: true, erp: new_code_erp, itemDescription: items_code_description, mainCategory: main_category, itemCodeUnit: items_code_unit });
            } else {
                res.status(404).json({ Status: false, Message: "No matching record found" });
            }
        }
    });
});

export { router as ItemRoute };
