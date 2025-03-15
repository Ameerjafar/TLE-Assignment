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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const codeForcesRoutes = express_1.default.Router();
codeForcesRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://codeforces.com/api/contest.list");
        // console.log("This is the codeforces url", import.meta.env.VITE_CODEFORCES_CONTESTS_API)
        // const response = await axios.get(import.meta.env.VITE_CODEFORCES_CONTESTS_API);
        const allData = response.data.result;
        const firstTenData = allData.slice(0, 10);
        res.json({ firstTenData });
    }
    catch (error) {
        console.error("Error fetching Codeforces contests:", error);
        res.json({ error });
    }
}));
exports.default = codeForcesRoutes;
