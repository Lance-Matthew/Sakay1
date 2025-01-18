import { Request, Response } from "express"
import { UserType } from "../../middlewares/token.authentication"
import { getCurrentUserByEmail } from "../../services/index.services";

export const getCurrentUserController = async (req: Request & { user?: UserType }, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const result = await getCurrentUserByEmail(user.email)
        res.status(200).json({ message: result })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}