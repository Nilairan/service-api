export class BaseResponse {
    readonly payload: any;

    constructor(payload: any) {
        this.payload = payload;
    }
}