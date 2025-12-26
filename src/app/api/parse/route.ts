import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    // REAL MODE: Using AI to parse intent
    const apiKey = process.env.AI_API_KEY;
    
    // Always prioritize AI if key is present
    if (apiKey) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content: "Ты — эксперт по анализу учебных запросов. Твоя задача — извлечь тип работы и тему из сообщения пользователя.\n" +
                         "Возможные типы: Реферат, Доклад, Эссе, Курсовая, Диплом, Презентация.\n" +
                         "Если пользователь пишет 'сочинение', это тип 'Эссе'.\n" +
                         "Если тип или тема не указаны явно, попытайся определить их по контексту.\n" +
                         "Верни JSON: {\"workType\": \"НазваниеТипа\", \"topic\": \"ТекстТемы\"}. Если не уверен, ставь null."
              },
              { role: "user", content: text }
            ],
            response_format: { type: "json_object" }
          }),
        });
        
        const aiData = await response.json();
        const result = JSON.parse(aiData.choices[0].message.content);
        
        if (result.workType || result.topic) {
          return NextResponse.json({
            workType: result.workType,
            topic: result.topic,
            mode: "REAL"
          });
        }
      } catch (e) {
        console.error("AI Error:", e);
      }
    }

    // FALLBACK MODE (Advanced Context Rules)
    const normalizedText = text.toLowerCase();
    
    // Advanced regex to find work types anywhere in context
    const typePatterns = [
      { label: "Реферат", regex: /реферат/i },
      { label: "Доклад", regex: /доклад/i },
      { label: "Эссе", regex: /(эссе|сочинение|рассказ|сочинить)/i },
      { label: "Курсовая", regex: /курсов[а-я]+/i },
      { label: "Диплом", regex: /диплом[а-я]*/i },
      { label: "Презентация", regex: /презентац[а-я]+/i },
    ];

    let detectedType = null;
    for (const pattern of typePatterns) {
      if (pattern.regex.test(normalizedText)) {
        detectedType = pattern.label;
        break;
      }
    }

    // Advanced topic extraction: 
    // If we find keywords like "про", "о", "тема", "тему", "история" etc.
    let detectedTopic = null;
    const cleanTopic = (t: string) => t.trim().replace(/^[^\wа-яё]+/i, "").replace(/[?.!]+$/, "");

    // Try to find topic after common prepositions or markers
    const topicRegex = /(?:по теме|на тему|про|о|тема|тему)\s+(.+)/i;
    const match = normalizedText.match(topicRegex);
    
    if (match && match[1]) {
      // Get original text to preserve case
      const startIndex = normalizedText.indexOf(match[1]);
      detectedTopic = cleanTopic(text.substring(startIndex));
    } else if (detectedType) {
      // If type is found, assume everything else might be the topic
      const typeMatch = normalizedText.match(typePatterns.find(p => p.label === detectedType)!.regex);
      if (typeMatch) {
        const afterType = text.substring(normalizedText.indexOf(typeMatch[0]) + typeMatch[0].length).trim();
        if (afterType.length > 2) {
          detectedTopic = cleanTopic(afterType.replace(/^(по|на|про|о|тему|тема)\s+/i, ""));
        }
      }
    }

    return NextResponse.json({
      workType: detectedType,
      topic: detectedTopic,
      mode: "FALLBACK"
    });
  } catch (error) {
    console.error("Parse error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

