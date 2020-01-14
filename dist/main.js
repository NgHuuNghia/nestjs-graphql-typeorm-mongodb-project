"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const validation_pipe_1 = require("./common/pipes/validation.pipe");
const port = process.env.PORT || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    await app.listen(port);
    common_1.Logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');
    common_1.Logger.log(`🚀 Subscriptions ready at ws://localhost:${port}/graphql`, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map