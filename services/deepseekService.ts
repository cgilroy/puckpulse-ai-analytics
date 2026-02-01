
import { AIQueryResponse } from "../types";
import { getModelId } from "../config/llmConfig";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function analyzeQuery(prompt: string, modelId?: string): Promise<AIQueryResponse> {
  const systemInstruction = `
You are a professional NHL data analyst. Extract the correct keys from our schema to answer the user's question.

REQUIRED JSON OUTPUT FORMAT:
{
  "insightTitle": "Professional headline (e.g., 'Top Goal Scorers This Season')",
  "explanation": "Brief analysis explanation",
  "chartType": "bar" | "line" | "scatter" | "pie",
  "xAxisKey": "name",
  "yAxisKey": "one of the numeric keys below",
  "situation": "all" | "5on5" | "5on4" | "4on5",
  "filterDescription": "Description of filters applied",
  "suggestedFollowUp": ["question 1", "question 2"],
  "sortDirection": "desc" | "asc",
  "limit": 8
}

SITUATION KEYS (for 'situation' field):
- Overall/All situations: "all"
- 5 on 5: "5on5"
- Power Play: "5on4"
- Penalty Kill: "4on5"

NUMERIC VALUE KEYS (for 'yAxisKey' field - use EXACTLY these strings):
- "I_F_goals" (Individual Goals)
- "I_F_points" (Individual Points)
- "I_F_xGoals" (Individual Expected Goals)
- "I_F_shotsOnGoal" (Individual Shots on Goal)
- "I_F_hits" (Individual Hits)
- "I_F_takeaways" (Individual Takeaways)
- "I_F_giveaways" (Individual Giveaways)
- "onIce_xGoalsPercentage" (On-ice Expected Goals %, 0-1 scale)
- "onIce_corsiPercentage" (On-ice Corsi %, 0-1 scale)
- "faceoffsWon" (Faceoffs Won)
- "shotsBlockedByPlayer" (Shots Blocked)
- "icetime" (Total Ice Time in seconds)

CRITICAL RULES:
1. xAxisKey MUST always be "name" (exact string)
2. yAxisKey MUST be one of the exact numeric keys listed above
3. sortDirection: Use "desc" for top performers (highest values first), "asc" for lowest values
4. limit: Use 8 for most queries (shows top 8 players)
5. chartType: Use "bar" for comparisons, "line" for trends, "scatter" for correlations, "pie" for distributions
6. For percentage questions (possession, scoring share), use "onIce_xGoalsPercentage" or "onIce_corsiPercentage"
7. For "top", "best", "most", "highest" queries, use sortDirection: "desc"
8. For "worst", "least", "lowest" queries, use sortDirection: "asc"
9. situation: Infer from context - if user mentions "power play" use "5on4", "penalty kill" use "4on5", "5v5" or "even strength" use "5on5", otherwise use "all"

EXAMPLE OUTPUT:
{
  "insightTitle": "Top Goal Scorers This Season",
  "explanation": "These players lead the league in individual goals scored across all situations.",
  "chartType": "bar",
  "xAxisKey": "name",
  "yAxisKey": "I_F_goals",
  "situation": "all",
  "filterDescription": "All situations, sorted by goals",
  "suggestedFollowUp": ["Who has the most points?", "Show me power play goals"],
  "sortDirection": "desc",
  "limit": 8
}

Return ONLY valid JSON, no additional text or markdown formatting.
  `;

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY environment variable is not set");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };

  // Add optional headers if window is available
  if (typeof window !== "undefined") {
    headers["HTTP-Referer"] = window.location.origin;
    headers["X-Title"] = "PuckPulse AI Analytics";
  }

  const selectedModel = modelId || getModelId();

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: selectedModel,
      messages: [
        {
          role: "system",
          content: systemInstruction
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: {
        type: "json_object"
      },
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content in API response");
  }
  
  // Clean the content - remove markdown code blocks if present
  let cleanedContent = content.trim();
  if (cleanedContent.startsWith("```json")) {
    cleanedContent = cleanedContent.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleanedContent.startsWith("```")) {
    cleanedContent = cleanedContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }
  
  console.log("AI Response:", cleanedContent);
  
  try {
    const parsed = JSON.parse(cleanedContent) as AIQueryResponse;
    
    // Validate required fields
    if (!parsed.yAxisKey || !parsed.xAxisKey || !parsed.sortDirection || !parsed.limit) {
      throw new Error("Missing required fields in AI response");
    }
    
    // Ensure limit is a reasonable number
    if (parsed.limit < 1 || parsed.limit > 50) {
      parsed.limit = 8;
    }
    
    return parsed;
  } catch (parseError) {
    console.error("JSON Parse Error:", parseError);
    console.error("Content that failed to parse:", cleanedContent);
    throw new Error(`Failed to parse AI response as JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
  }
}
