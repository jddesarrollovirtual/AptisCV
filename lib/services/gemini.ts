import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function analyzeResume(text: string, jobDescription?: string) {
  const prompt = `
    Analiza exhaustivamente el siguiente CV en comparación con la oferta de empleo provista.
    Calcula un 'atsScore' (0-100) basado en:
    1. Coincidencia de skills técnicas y blandas requeridas.
    2. Alineación de experiencia profesional con los requisitos del puesto.
    3. Presencia de palabras clave relevantes.
    
    Reglas estrictas:
    - atsScore debe ser un NÚMERO puro (tipo integer), NO un string. No incluyas el signo % ni texto como "puntos".
    - Devuelve la respuesta en formato JSON puro.
    
    Estructura requerida:
    {
      "atsScore": 85,
      "skills": ["React", "TypeScript"],
      "strengths": ["Experiencia sólida en X", "Habilidad en Y"],
      "weaknesses": ["Falta de experiencia en Z"],
      "recommendations": ["Añadir más palabras clave"]
    }
    
    CV: ${text}
    
    Oferta de empleo: ${jobDescription || 'No proporcionada'}
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
    });

    const responseText = chatCompletion.choices[0]?.message?.content || '{}';
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Groq Error:", error);
    throw new Error("Failed to analyze resume with Groq");
  }
}
