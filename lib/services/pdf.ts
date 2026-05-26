import PDFParser from 'pdf2json';

export async function extractTextFromPdf(buffer: Buffer) {
  return new Promise<string>((resolve, reject) => {
    const pdfParser = new (PDFParser as any)(null, 1);

    pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError));
    pdfParser.on("pdfParser_dataReady", () => {
      resolve((pdfParser as any).getRawTextContent());
    });

    pdfParser.parseBuffer(buffer);
  });
}
