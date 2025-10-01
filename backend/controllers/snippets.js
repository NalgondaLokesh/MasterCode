
const Snippet = require('../models/Snippet');

// @desc    Get all snippets
// @route   GET /api/snippets
// @access  Public
exports.getSnippets = async (req, res, next) => {
  try {
    const snippets = await Snippet.find().populate('author', 'username');
    res.status(200).json({ success: true, data: snippets });
  } catch (err) {
    console.error(err); // Log the detailed error for debugging
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get single snippet
// @route   GET /api/snippets/:id
// @access  Public
exports.getSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.params.id).populate('author', 'username');
    if (!snippet) {
      return res.status(404).json({ success: false, message: 'Snippet not found' });
    }
    res.status(200).json({ success: true, data: snippet });
  } catch (err) {
    console.error(err); // Log the detailed error for debugging
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create new snippet
// @route   POST /api/snippets
// @access  Private
exports.createSnippet = async (req, res, next) => {
  try {
    req.body.author = req.user.id;
    const snippet = await Snippet.create(req.body);
    res.status(201).json({ success: true, data: snippet });
  } catch (err) {
    console.error(err); // Log the detailed error for debugging
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update snippet
// @route   PUT /api/snippets/:id
// @access  Private
exports.updateSnippet = async (req, res, next) => {
  try {
    let snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ success: false, message: 'Snippet not found' });
    }

    // Make sure user is snippet owner
    if (snippet.author.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to update this snippet' });
    }

    snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: snippet });
  } catch (err) {
    console.error(err); // Log the detailed error for debugging
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete snippet
// @route   DELETE /api/snippets/:id
// @access  Private
exports.deleteSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ success: false, message: 'Snippet not found' });
    }

    // Make sure user is snippet owner
    if (snippet.author.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this snippet' });
    }

    await snippet.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.error(err); // Log the detailed error for debugging
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get user's snippets
// @route   GET /api/snippets/me
// @access  Private
exports.getUserSnippets = async (req, res, next) => {
  try {
    const snippets = await Snippet.find({ author: req.user.id }).populate('author', 'username');
    res.status(200).json({ success: true, data: snippets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
