import { NextRequest, NextResponse } from "next/server";
import { analyzeResume } from "@/lib/services/gemini";
// Asumiendo que ya tienes una utilidad para extraer texto de PDF
import { extractTextFromPdf } from "@/lib/services/pdf"; 

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = await extractTextFromPdf(buffer);
    const jobDescription = formData.get("jobDescription") as string;
    
    const analysis = await analyzeResume(text, jobDescription);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
