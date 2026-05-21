import data from "@/app/visiting_card/data";

export async function GET() {
  const vCard = `
BEGIN:VCARD
VERSION:3.0

FN:Engineer Gogul V Kalloviyam

N:Gogul V;;;Engineer;

ORG:Kalloviyam - The Breathable Homes

TEL;TYPE=CELL:${data.phone}

EMAIL:${data.email}

URL:${data.website}

ADR:;;${data.address};;;;


END:VCARD
`;

  return new Response(vCard, {
    status: 200,

    headers: {
      "Content-Type": "text/vcard; charset=utf-8",

      "Content-Disposition": `attachment; filename="Engineer Gogul V Kalloviyam.vcf"`,

      "Cache-Control": "no-store",
    },
  });
}