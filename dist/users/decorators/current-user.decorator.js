"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserDecorator = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUserDecorator = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    console.log(req.session.userId);
    return 'hi there';
});
//# sourceMappingURL=current-user.decorator.js.map