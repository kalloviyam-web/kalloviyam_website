import data from "@/app/visiting_card/data";

export async function GET() {
  const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${data.owner}
ORG:${data.company}
TITLE:${data.role}
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

      // IMPORTANT
      "Content-Disposition": `inline; filename="${data.owner}.vcf"`,

      "Cache-Control": "no-store",
    },
  });
}