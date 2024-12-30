const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  marketing,
  marketingTeam,
  marketingMonth,
  marketingTeamMonth,
  bonus,
  bonusMonth,
  userReview,
  getDashboard,
  getIncomeDaily,
  getIncomeYear,
  getUserPromotion,
  getSaleMonth,
  userEliteClub,
  saleMonth,
} = require("../controllers/getReportController");

const router = express.Router();

// Định nghĩa các route
router.get("/marketing", authMiddleware, marketing);
router.get("/marketingTeam", authMiddleware, marketingTeam);
router.get("/marketingMonth", authMiddleware, marketingMonth);
router.get("/marketingTeamMonth", authMiddleware, marketingTeamMonth);
router.get("/bonus", authMiddleware, bonus);
router.get("/bonusMonth", authMiddleware, bonusMonth);
router.get("/userReview", authMiddleware, userReview);
router.post("/getDashboard", authMiddleware, getDashboard);
router.post("/getIncomeDaily", authMiddleware, getIncomeDaily);
router.post("/getIncomeYear", authMiddleware, getIncomeYear);
router.post("/getUserPromotion", authMiddleware, getUserPromotion);
router.post("/getSaleMonth", authMiddleware, getSaleMonth);
router.get("/userEliteClub", authMiddleware, userEliteClub);
router.get("/saleMonth", authMiddleware, saleMonth);

module.exports = router;
