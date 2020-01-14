"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.AuthCurrent = common_1.createParamDecorator((data, [root, args, ctx, info]) => ctx.req.auth);
//# sourceMappingURL=auth.decorator.js.map