import Category from '../Models/categoryModel.js';
import User from '../Models/userModel.js';

export const getCategories = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = 6; 
  const skip = (page - 1) * limit;

  try {
    const categories = await Category.find().skip(skip).limit(limit);
    const totalCategories = await Category.countDocuments();
    const totalPages = Math.ceil(totalCategories / limit);

    res.status(200).json({
      categories,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getSelectedCategories = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ selectedCategories: user.selectedCategories });
  } catch (error) {
    console.error('Error fetching selected categories:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const selectCategories = async (req, res) => {
  const { userId, categoryIds } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updateResult = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { selectedCategories: { $each: categoryIds } } },
      { new: true }
    );

    res.status(200).json({ message: 'Categories updated successfully', updatedUser: updateResult });
  } catch (error) {
    console.error('Error updating categories:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};