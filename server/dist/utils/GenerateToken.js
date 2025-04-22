"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GenerateToken = (res, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield jsonwebtoken_1.default.sign({ userid: user._id }, process.env.JWT_TOKEN, {
            expiresIn: "1d",
        });
        if (res) {
            // Set cookie with appropriate settings for cross-origin
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // true in production
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });
            // Also return token in response for client storage
            return { token };
        }
        return token;
    }
    catch (error) {
        if (res) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.GenerateToken = GenerateToken;
//# sourceMappingURL=GenerateToken.js.map