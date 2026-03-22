import { dbRepository } from "../../DB.repository.js";
import { otp } from "./otp.model.js";

class OTPRepository extends dbRepository{

    constructor(){
        super(otp)
    }
}

export const otpRepository = new OTPRepository()