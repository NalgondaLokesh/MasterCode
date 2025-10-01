import api from "./api";

const getAllSnippets = () => {
  return api.get("/snippets");
};

const getSnippetById = (id) => {
  return api.get(`/snippets/${id}`);
};

const createSnippet = (snippetData) => {
  return api.post("/snippets", snippetData);
};

const updateSnippet = (id, snippetData) => {
  return api.put(`/snippets/${id}`, snippetData);
};

const deleteSnippet = (id) => {
  return api.delete(`/snippets/${id}`);
};

const getUserSnippets = () => {
  return api.get("/snippets/me");
};

const snippetService = {
  getAllSnippets,
  getSnippetById,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  getUserSnippets,
};

export default snippetService;
