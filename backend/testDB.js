const db = require('./db');

async function test() {
    try {
        const [res] = await db.query('SELECT * FROM users');
        console.log("Success:", res);
    } catch (e) {
        console.error("DB Error:", e);
    } finally {
        process.exit();
    }
}
test();
