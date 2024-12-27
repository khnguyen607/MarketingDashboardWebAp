const { User, Team, Branch, IncomeReport } = require("../config/associations");
const Modal = IncomeReport;
// const Modal = require("../models/income_reports");

// Lấy danh sách tất cả
const getAlls = async (req, res) => {
  try {
    const incomeReports = await Modal.findAll({
      include: [
        { model: User, attributes: ["name"] },
        { model: Team, attributes: ["name"] },
        { model: Branch, attributes: ["name"] },
      ],
      raw: true,
    });
    incomeReports.forEach((report) => {
      const date = new Date(report.tern);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      report.tern = `${month}/${year}`;
    });
    const formatted = incomeReports.map((data) => ({
      ...data,
      userName: data["User.name"],
      teamName: data["Team.name"],
      branchName: data["Branch.name"],
    }));
    res.status(200).json({
      message: "Retrieved successfully",
      data: formatted,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // try {
  //   const datas = await Modal.findAll();
  //   res.status(200).json({
  //     message: "Retrieved successfully",
  //     data: datas,
  //   });
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};

// Lấy theo ID
const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Modal.findByPk(id);
    if (!data) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json({
      message: "Retrieved successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo mới
const createModel = async (req, res) => {
  try {
    const { userId, position, teamId, branchId, tern, adsRate, income } =
      req.body;

    const data = await Modal.create({
      userId,
      position,
      teamId,
      branchId,
      tern,
      adsRate,
      income,
    });

    res.status(201).json({
      message: "Created successfully",
      data: data,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Cập nhật theo ID
const updateModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, position, teamId, branchId, tern, adsRate, income } =
      req.body;

    const data = await Modal.findByPk(id);
    if (!data) {
      return res.status(404).json({ error: "Not found" });
    }

    // Cập nhật dữ liệu
    await data.update({
      userId,
      position,
      teamId,
      branchId,
      tern,
      adsRate,
      income,
    });

    res.status(200).json({
      message: "Updated successfully",
      data: data,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Xóa theo ID
const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Modal.findByPk(id);
    if (!data) {
      return res.status(404).json({ error: "Not found" });
    }

    // Xóa
    await data.destroy();

    res.status(204).send(); // Thành công nhưng không trả về dữ liệu
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xuất các hàm controller
module.exports = {
  getAlls,
  getById,
  createModel,
  updateModel,
  deleteModel,
};
