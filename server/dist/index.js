"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ResturentRoutes_1 = require("./routes/ResturentRoutes");
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const MenuRoute_1 = __importDefault(require("./routes/MenuRoute"));
const DB_1 = __importDefault(require("./utils/DB"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
(0, DB_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5200;
// const _dirname = path.resolve();
app.use(body_parser_1.default.json({ limit: "10mb" })); // Parses JSON requests
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use("/api/v1/auth", UserRoute_1.default);
app.use("/api/v1/resturent", ResturentRoutes_1.resturentRoute);
app.use("/api/v1/menu", MenuRoute_1.default);
app.use("/api/v1/order", orderRoute_1.default);
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../front/dist")));
// Handle all other routes by serving the React app
app.get("*", (req, res, next) => {
    res.sendFile(path_1.default.resolve(__dirname, "../../front/dist", "index.html"), (err) => {
        if (err) {
            next(err);
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map