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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDatabase = checkDatabase;
var pg_1 = require("pg");
var RESULT;
(function (RESULT) {
    RESULT["EXISTS"] = "Database already exists";
    RESULT["CREATED"] = "Database created";
})(RESULT || (RESULT = {}));
function checkDatabase(config) {
    return __awaiter(this, void 0, void 0, function () {
        var returnValue, dbName, host, port, user, pass, defaultDb, disableSSL, connectionString, client, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    returnValue = '';
                    console.log(process.env);
                    dbName = config.useEnvVars ? process.env[config.dbToCheck].toString() : config.dbToCheck;
                    host = config.useEnvVars ? process.env[config.host].toString() : config.host;
                    port = config.useEnvVars ? Number(process.env[config.port]) : config.port;
                    user = config.useEnvVars ? process.env[config.user].toString() : config.user;
                    pass = config.useEnvVars ? process.env[config.pass].toString() : config.pass;
                    defaultDb = config.useEnvVars ? process.env[config.defaultDb] : config.defaultDb;
                    disableSSL = config.disableSSL ? "" : "?sslmode=verify-full\"";
                    connectionString = "postgres://" + user + ":" + pass + "@" + host + ":" + port + "/" + defaultDb + disableSSL;
                    console.log(connectionString);
                    client = new pg_1.Client({
                        connectionString: connectionString
                    });
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.query("SELECT 1 FROM pg_database WHERE datname='".concat(dbName, "'"))];
                case 2:
                    res = _a.sent();
                    if (!(res.rowCount === 0)) return [3 /*break*/, 4];
                    console.log("".concat(dbName, " database not found, creating it."));
                    return [4 /*yield*/, client.query("CREATE DATABASE \"".concat(dbName, "\";"))];
                case 3:
                    _a.sent();
                    console.log("created database ".concat(dbName));
                    returnValue = RESULT.CREATED;
                    return [3 /*break*/, 5];
                case 4:
                    console.log("".concat(dbName, " database exists."));
                    returnValue = RESULT.EXISTS;
                    _a.label = 5;
                case 5: return [4 /*yield*/, client.end()];
                case 6:
                    _a.sent();
                    return [2 /*return*/, returnValue];
            }
        });
    });
}
