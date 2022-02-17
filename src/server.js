"use strict";
const app = require("./app");
/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
