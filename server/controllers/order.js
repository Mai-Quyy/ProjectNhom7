const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { products, total, address, status } = req.body;
  if (address) {
    await User.findByIdAndUpdate(_id, { address, cart: [] });
  }
  const data = { products, total, orderBy: _id };
  if (status) data.status = status;
  const rs = await Order.create(data);
  return res.json({
    success: rs ? true : false,
    rs: rs ? rs : "Something went wrong",
  });
});
const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing status");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.json({
    success: response ? true : false,
    mes: response ? "Updated." : "Something went wrong",
  });
});
const getUserOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const { _id } = req.user;
  // Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Format lại các operators cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  const qr = { ...formatedQueries, orderBy: _id };
  console.log(qr);
  let queryCommand = Order.find(qr);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  // Execute query
  // Số lượng sp thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Order.find(qr).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      orders: response ? response : "Cannot get products",
    });
  });
});
const getOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Format lại các operators cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  const qr = { ...formatedQueries };
  let queryCommand = Order.find(qr).populate("orderBy", "firstname lastname");

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  // Execute query
  // Số lượng sp thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Order.find(qr).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      orders: response ? response : "Cannot get products",
    });
  });
});
const deleteOrderByAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const rs = await Order.findByIdAndDelete(id);
  return res.json({
    success: rs ? true : false,
    mes: rs ? "Deleted" : "Something went wrong",
  });
});
function getCountPreviousDay(count = 1, date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - count);
  return previous;
}
const getDashboard = asyncHandler(async (req, res) => {
  const { to, from, typess } = req.query;
  const format = typess === "MTH" ? "%Y-%m" : "%Y-%m-%d";
  const start = from || getCountPreviousDay(7, new Date(to));
  const end = to || getCountPreviousDay(0);
  const [users, totalSuccess, totalFailed, soldQuantities, chartData, pieData] =
    await Promise.all([
      User.aggregate([
        {
          $match: {
            $and: [
              { createdAt: { $gte: new Date(start) } },
              { createdAt: { $lte: new Date(end) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]),
      Order.aggregate([
        {
          $match: {
            $and: [
              { createdAt: { $gte: new Date(start) } },
              { createdAt: { $lte: new Date(end) } },
              { status: "Succeed" },
            ],
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: "$total" },
          },
        },
      ]),
      Order.aggregate([
        {
          $match: {
            $and: [
              { createdAt: { $gte: new Date(start) } },
              { createdAt: { $lte: new Date(end) } },
              { status: "Pending" },
            ],
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: "$total" },
          },
        },
      ]),
      Order.aggregate([
        {
          $match: {
            $and: [
              { createdAt: { $gte: new Date(start) } },
              { createdAt: { $lte: new Date(end) } },
              { status: "Succeed" },
            ],
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: { $sum: "$products.quantity" } },
          },
        },
      ]),
      Order.aggregate([
        {
          $match: {
            $and: [
              { createdAt: { $gte: new Date(start) } },
              { createdAt: { $lte: new Date(end) } },
              { status: "Succeed" },
            ],
          },
        },
        { $unwind: "$createdAt" },
        {
          $group: {
            _id: {
              $dateToString: {
                format,
                date: "$createdAt",
              },
            },
            sum: { $sum: "$total" },
          },
        },
        {
          $project: {
            date: "$_id",
            sum: 1,
            _id: 0,
          },
        },
      ]),
      Order.aggregate([
        {
          $match: {
            $and: [
              { createdAt: { $gte: new Date(start) } },
              { createdAt: { $lte: new Date(end) } },
            ],
          },
        },
        { $unwind: "$status" },
        {
          $group: {
            _id: "$status",
            sum: { $sum: 1 },
          },
        },
        {
          $project: {
            status: "$_id",
            sum: 1,
            _id: 0,
          },
        },
      ]),
    ]);
  return res.json({
    success: true,
    data: {
      users,
      totalSuccess,
      totalFailed,
      soldQuantities,
      chartData,
      pieData,
    },
  });
});
module.exports = {
  createOrder,
  updateStatus,
  getUserOrders,
  getOrders,
  deleteOrderByAdmin,
  getDashboard,
};
