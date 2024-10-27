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

export const selectCategories = async (req, res) => {
    const { userId, categoryIds } = req.body;
  
    if (!userId || !categoryIds || !Array.isArray(categoryIds)) {
      return res.status(400).json({ message: 'User ID and category IDs are required' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await User.findByIdAndUpdate(userId, {
        $addToSet: { selectedCategories: { $each: categoryIds } },
      });
  
      res.status(200).json({ message: 'Categories updated successfully' });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Server error', error });
    }
  };