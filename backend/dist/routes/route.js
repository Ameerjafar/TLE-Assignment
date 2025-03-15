"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const codeChefRoute_1 = __importDefault(require("./codeChefRoute"));
const leetCodeRoute_1 = __importDefault(require("./leetCodeRoute"));
const codeForcesRoute_1 = __importDefault(require("./codeForcesRoute"));
const router = express_1.default.Router();
router.use('/codeChefRoute', codeChefRoute_1.default);
router.use('/leetCodeRoute', leetCodeRoute_1.default);
router.use('/codeForcesRoute', codeForcesRoute_1.default);
exports.default = router;
