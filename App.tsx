import React, { useState, useCallback, useRef, useEffect } from 'react';
import { analyzeQuery } from './services/deepseekService';
import { executeQuery } from './services/queryEngine';
import { AnalyticsResult } from './types';
import { getModelInfo, type LLMModelKey, DEFAULT_MODEL } from './config/llmConfig';
import Sidebar from './components/Sidebar';
import SearchHeader from './components/SearchHeader';
import EmptyState from './components/EmptyState';
import ResultCard from './components/ResultCard';
import ErrorMessage from './components/ErrorMessage';
import LoadingState from './components/LoadingState';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalyticsResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<LLMModelKey>(() => {
    const saved = localStorage.getItem('selectedLLMModel');
    return (saved as LLMModelKey) || DEFAULT_MODEL;
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  // Save model selection to localStorage
  useEffect(() => {
    localStorage.setItem('selectedLLMModel', selectedModel);
  }, [selectedModel]);

  const handleSearch = useCallback(async (customPrompt?: string) => {
    const promptToUse = customPrompt || query;
    if (!promptToUse.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const modelInfo = getModelInfo(selectedModel);
      const aiResponse = await analyzeQuery(promptToUse, modelInfo.id);
      const data = executeQuery(aiResponse);

      const newResult: AnalyticsResult = {
        query: aiResponse,
        data,
        timestamp: Date.now()
      };

      setResults(prev => [newResult, ...prev]);
      setQuery('');
    } catch (err: any) {
      console.error(err);
      setError("Analysis unavailable. Try rephrasing your question.");
    } finally {
      setIsLoading(false);
    }
  }, [query, selectedModel]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleFollowUpClick = useCallback((followUpQuery: string) => {
    setQuery(followUpQuery);
    handleSearch(followUpQuery);
  }, [handleSearch]);

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-slate-950 text-slate-200">
      <Sidebar selectedModel={selectedModel} onModelChange={setSelectedModel} />

      <main className="flex-1 flex flex-col min-w-0">
        <SearchHeader
          query={query}
          isLoading={isLoading}
          onQueryChange={setQuery}
          onSearch={() => handleSearch()}
          onKeyDown={handleKeyDown}
        />

        <div className="flex-1 overflow-y-auto p-8" ref={scrollRef}>
          <div className="max-w-4xl mx-auto flex flex-col gap-10">
            {error && <ErrorMessage message={error} />}

            {results.length === 0 && !isLoading && (
              <EmptyState onPromptClick={handleSearch} />
            )}

            {results.map((res) => (
              <ResultCard
                key={res.timestamp}
                result={res}
                onFollowUpClick={handleFollowUpClick}
              />
            ))}

            {isLoading && <LoadingState />}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default App;
