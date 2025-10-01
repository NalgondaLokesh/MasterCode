import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SnippetCard from "../components/snippets/SnippetCard";
import SearchBar from "../components/snippets/SearchBar";
import FilterBar from "../components/snippets/FilterBar";
import LoadingSpinner from "../components/common/LoadingSpinner";
import snippetService from "../services/snippetService";
import "../styles/pages/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    language: "",
    tags: "",
    sortBy: "newest",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSnippets = async () => {
      setIsLoading(true);
      try {
        const response = await snippetService.getAllSnippets();
        if (response && response.data) {
          setSnippets(Array.isArray(response.data) ? response.data : []);
        } else {
          setSnippets([]);
        }
      } catch (error) {
        console.error("Error fetching snippets:", error);
        setSnippets([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSnippets();
  }, []);

  const filteredSnippets = useMemo(() => {
    let filtered = snippets;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (snippet) =>
          snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          snippet.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          snippet.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    // Language filter
    if (filters.language) {
      filtered = filtered.filter(
        (snippet) => snippet.programmingLanguage === filters.language,
      );
    }

    // Sort
    switch (filters.sortBy) {
      case "newest":
        filtered = [...filtered].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        break;
      case "oldest":
        filtered = [...filtered].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
        break;
      case "title":
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [snippets, searchTerm, filters]);

  const handleEditSnippet = (snippet) => {
    navigate(`/edit/${snippet._id}`);
  };

  const handleDeleteSnippet = async (snippet) => {
    if (window.confirm(`Are you sure you want to delete "${snippet.title}"?`)) {
      try {
        await snippetService.deleteSnippet(snippet._id);
        setSnippets(snippets.filter((s) => s._id !== snippet._id));
      } catch (error) {
        console.error("Error deleting snippet:", error);
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading snippets..." />;
  }

  return (
    <div className="home-page">
      <div className="page-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Welcome to MasterCode</h1>
            <p>Discover and share code snippets with your learning community</p>
          </div>
          {isAuthenticated && (
            <Link to="/create" className="create-btn">
              ➕ Create Snippet
            </Link>
          )}
        </div>
      </div>

      <div className="page-content">
        <div className="search-section">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by title, description, or tags..."
          />
        </div>

        <div className="content-layout">
          <aside className="sidebar">
            <FilterBar filters={filters} onFiltersChange={setFilters} />
          </aside>

          <main className="main-area">
            <div className="snippets-header">
              <h2>💻 Code Snippets ({filteredSnippets.length})</h2>
            </div>

            {filteredSnippets.length === 0 ? (
              <div className="empty-state">
                <h3>📝 No snippets found</h3>
                <p>Try adjusting your search or filters</p>
                {isAuthenticated && (
                  <Link to="/create" className="btn btn-primary">
                    Create First Snippet
                  </Link>
                )}
              </div>
            ) : (
              <div className="snippets-grid">
                {filteredSnippets.map((snippet) => (
                  <SnippetCard
                    key={snippet._id}
                    snippet={snippet}
                    onEdit={handleEditSnippet}
                    onDelete={handleDeleteSnippet}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;