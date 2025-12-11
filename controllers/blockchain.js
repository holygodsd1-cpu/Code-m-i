const contract = require("../services/contract");


exports.checkStatus = async (req, res) => {
    try {
        const { userAddress } = req.params;
        const status = await contract.isCheckedIn(userAddress);

        res.json({ checkedIn: status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
