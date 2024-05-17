const router = require("express").Router()
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken")
const ctrls = require("../controllers/order")

router.post("/", verifyAccessToken, ctrls.createOrder)
router.put("/status/:oid", verifyAccessToken, isAdmin, ctrls.updateStatus)
router.get("/admin", verifyAccessToken, isAdmin, ctrls.getOrders)
router.get("/dashboard", ctrls.getDashboard)
router.get("/", verifyAccessToken, ctrls.getUserOrders)
router.delete(
  "/admin/:id",
  verifyAccessToken,
  isAdmin,
  ctrls.deleteOrderByAdmin
)

module.exports = router
