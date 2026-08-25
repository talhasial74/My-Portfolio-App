const express = require("express");
const db = require("./config/db");

const app = express();

app.use(express.json());

async function testDatabase() {
    try {
        const connection = await db.getConnection();
        console.log("MySQL connected successfully!");
        connection.release();
    } catch (error) {
        console.error("MySQL connection failed:", error.message);
    }
}

testDatabase();

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const sql = `
            INSERT INTO contact_messages (name, email, message)
            VALUES (?, ?, ?)
        `;

        await db.execute(sql, [name, email, message]);

        res.status(201).json({
            message: "Message saved successfully"
        });

    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            message: "Failed to save message"
        });
    }
});

app.listen(5000, () => {
    console.log("Portfolio API listening on http://localhost:5000");
});