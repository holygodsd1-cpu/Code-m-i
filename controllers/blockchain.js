const contract = require("../services/contract");

exports.checkStatus = async (req, res) => {
    try {
        const userAddress = req.params.userAddress;

        if (!userAddress) {
            return res.status(400).json({ error: "userAddress is required" });
        }

        const status = await contract.isCheckedIn(userAddress);

        return res.json({
            success: true,
            checkedIn: status
        });

    } catch (error) {
        console.error("checkStatus error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
