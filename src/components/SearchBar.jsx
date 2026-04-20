import React, { useState, useRef, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const SearchBar = ({ onSearch, loading, theme }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const debouncedInput = useDebounce(input, 600);
  const prevDebounced = useRef('');

  // Focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Optional: auto-search on debounce (only if 3+ chars and changed)
  useEffect(() => {
    if (
      debouncedInput.trim().length >= 3 &&
      debouncedInput !== prevDebounced.current
    ) {
      prevDebounced.current = debouncedInput;
      // Uncomment below to enable auto-search on type:
      // onSearch(debouncedInput.trim());
    }
  }, [debouncedInput, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  const handleClear = () => {
    setInput('');
    inputRef.current?.focus();
  };

  const cardBg = theme?.cardBg || 'rgba(255,255,255,0.15)';
  const textColor = theme?.textColor || '#fff';
  const accent = theme?.accent || '#38bdf8';

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-container" style={{ '--card-bg': cardBg, '--text': textColor, '--accent': accent }}>
        <span className="search-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        <input
          ref={inputRef}
          className="search-input"
          type="text"
          placeholder="Search city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
          spellCheck="false"
          disabled={loading}
        />

        {input && (
          <button
            type="button"
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}

        <button
          type="submit"
          className="search-btn"
          disabled={loading || !input.trim()}
          aria-label="Search weather"
        >
          {loading ? (
            <span className="btn-spinner" />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
