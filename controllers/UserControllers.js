const User = require('../models/User');
const bcrypt = require('bcrypt');
const sequelize = require("../database/config")


    exports.getAllUser = async (req, res) => {
    try {
    const users = await User.findAll({
      order: sequelize.literal('createdAt ASC')
    });
    const count = await User.count();
    res.status(200).json({
      status: 'success',
      total_data: count,
      data : users
     });
    } catch (err) {
    console.error(err);
    res.status(500).json({
        status: 'error',
      message: 'Server error.',
     });
    }
  }


    exports.deleteUserID = async ( req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(200).json({
      status: 'Detail Table berhasil dihapus',
      data: user
    });
  }



    exports.getUserID = async (req, res) => {
    const { id} = req.params;
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      status: 'succes',
      data:user
    });
  };


  exports.updateUserID =async (req, res) => {
  const { nama, email } = req.body;
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.nama = nama;
  if (email && email !== user.email) {
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    user.email = email;
  }

  await user.save();

  res.json({ message: 'User updated successfully' });
}



    exports.updatePasswordUserID = async (req, res) => {
    const { id } = req.params;
    const { password, confirm_password} = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }else if(req.body.password !== req.body.confirm_password){
      res.status(422).json({
        status: "Validation error",
        message: "Password Baru Tidak Sesuai",
    });
    }else if(req.body.password === req.body.confirm_password){
      const salt = await bcrypt.genSalt(10);
      await user.update({
      password: password ? bcrypt.hashSync(password, salt) : User.password,
      });
    res.json({
      status: "succes",
      data: user
      });
    }
  }
