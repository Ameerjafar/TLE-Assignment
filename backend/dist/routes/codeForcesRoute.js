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
        const response = yield axios_1.default.get(process.env.CODEFORCES_ALLCONTESTS_API);
        const allData = response.data.result;
        const youTubeResponse = yield axios_1.default.get(process.env.YOU_TUBE_API_URL, {
            params: {
                part: "snippet",
                playlistId: process.env.CODEFORCES_PLAYILST,
                maxResults: 50,
                key: process.env.API_KEY
            },
        });
        const videos = youTubeResponse.data.items;
        videos.forEach((video) => {
            console.log(video.snippet.title.split('|')[0]);
        });
        const codeForcesContests = allData;
        res.json({
            codeForcesContests,
            videos
        });
    }
    catch (error) {
        console.error("Error fetching Codeforces contests:", error);
        res.json({ error });
    }
}));
exports.default = codeForcesRoutes;
