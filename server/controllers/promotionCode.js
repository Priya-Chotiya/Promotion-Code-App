const PromotionCode = require("../models/promotionCode");

exports.getAllPromotionCode = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const status = req.query.status || "";

    const promotionCode = await PromotionCode.find({
      promotionCode: { $regex: search, $options: "i" },
      status: { $regex: status },
    })
      .skip(page * limit)
      .limit(limit)
      .sort({ _id: -1 });
    const total = await PromotionCode.countDocuments({
      promotionCode: { $regex: search, $options: "i" },
      status: { $regex: status },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      promotionCode,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

exports.getByIdCode = async (req, res, next) => {
  try {
    const promotionCode = await PromotionCode.findById(req.params.id);
    res.status(200).json(promotionCode);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Promotion code not found" });
  }
};

exports.addPromotionCode = async (req, res) => {
  try {
    const promotionCode = await PromotionCode.create(req.body);
    res.status(200).json(promotionCode);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: true, message: "Promotion code not created" });
  }
};

exports.updatePromotionCode = async (req, res) => {
  try {
    const promotionCode = await PromotionCode.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({ message: "Promotion code successfully updated" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: true, message: "Promotion code not updated" });
  }
};

exports.deletePromotionCode = async (req, res) => {
  try {
    const promotionCode = await PromotionCode.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Promotion code successfully deleted" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: true, message: "Promotion code not created" });
  }
};
