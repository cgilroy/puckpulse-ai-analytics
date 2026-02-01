
/**
 * LLM Configuration
 * 
 * Popular OpenRouter models you can use:
 * - deepseek/deepseek-chat (fast, cost-effective)
 * - deepseek/deepseek-reasoner (advanced reasoning)
 * - tngtech/deepseek-r1t2-chimera:free (free tier)
 * - openai/gpt-4o-mini (OpenAI via OpenRouter)
 * - openai/gpt-4o (OpenAI GPT-4 via OpenRouter)
 * - anthropic/claude-3.5-sonnet (Claude via OpenRouter)
 * - google/gemini-pro-1.5 (Gemini via OpenRouter)
 * - meta-llama/llama-3.1-405b-instruct (Llama via OpenRouter)
 * 
 * Set OPENROUTER_MODEL in your .env.local file to override the default.
 * Or use the UI selector in the app sidebar.
 */

export const LLM_MODELS = {
  // DeepSeek Models
  'deepseek-r1-0528-free': {
    id: 'deepseek/deepseek-r1-0528:free',
    name: 'DeepSeek R1 0528',
    provider: 'DeepSeek',
    description: 'Free tier model'
  },
  'deepseek-chimera-free': {
    id: 'tngtech/deepseek-r1t2-chimera:free',
    name: 'DeepSeek Chimera',
    provider: 'DeepSeek',
    description: 'Free tier model'
  },
} as const;

export type LLMModelKey = keyof typeof LLM_MODELS;

export const DEFAULT_MODEL: LLMModelKey = 'deepseek-chimera-free';

/**
 * Get the model ID to use for API calls
 * Checks environment variable first, then falls back to default
 */
export function getModelId(): string {
  // Check if a custom model ID is provided via env var
  const customModel = process.env.OPENROUTER_MODEL;
  if (customModel) {
    return customModel;
  }
  
  // Check if a model key is provided via env var
  const modelKey = process.env.OPENROUTER_MODEL_KEY as LLMModelKey;
  if (modelKey && modelKey in LLM_MODELS) {
    return LLM_MODELS[modelKey].id;
  }
  
  // Use default model
  return LLM_MODELS[DEFAULT_MODEL].id;
}

/**
 * Get model info by key
 */
export function getModelInfo(key: LLMModelKey) {
  return LLM_MODELS[key];
}

/**
 * Get all available models as an array
 */
export function getAllModels() {
  return Object.entries(LLM_MODELS).map(([key, value]) => ({
    key: key as LLMModelKey,
    ...value
  }));
}
