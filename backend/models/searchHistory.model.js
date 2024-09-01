// models/searchHistory.model.js
import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  searches: [{ type: String }],
});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

export default SearchHistory;
