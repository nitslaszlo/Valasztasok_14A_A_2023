import fs from "fs"; //  https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; //  https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; //  https://nodejs.org/docs/latest-v14.x/api/url.html
import Megoldás from "./Megoldás";

export default function content(req: http.IncomingMessage, res: http.ServerResponse): void {
    // favicon.ico kérés kiszolgálása:
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        fs.createReadStream("favicon.ico").pipe(res);
        return;
    }
    // Weboldal inicializálása + head rész:
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<!DOCTYPE html>");
    res.write("<html lang='hu'>");
    res.write("<head>");
    res.write("<meta charset='utf-8'>");
    res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
    res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    res.write("<title>Jedlik Ts Template</title>");
    res.write("</head>");
    res.write("<body><form><pre>");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

    // Kezd a kódolást innen -->
    const mo: Megoldás = new Megoldás("szavazatok.txt");

    res.write(`2. feladat: A helyhatósági választáson ${mo.jelötekSzáma} képviselőjelölt indult.\n`);

    // Próbáljuk számra konvertálni a "kor" paraméter (http://localhost:8080/?kor=16) értékét:
    let inev: string | null = params.get("nev");
    // Ha nincs "kor" paraméter megadva, vagy nem lehet számra konvertálni értékét,
    // akkor a "korod" változóba NaN érték kerül, ilyenkor legyen 18 év az értéke:
    if (!inev) inev = "Fasirt Ferenc";
    res.write(`<label>3. feladat: Kérem a nevet: <input type='text' name='nev' value='${inev}' style='max-width:100px;' onChange='this.form.submit();'></label>\n`);
    res.write(`${mo.képviselő_keresése(inev)}\n`);

    res.write("\n4. feladat:\n");
    res.write(mo.részvételiStatisztika);

    // res.write(`Te ${korod} éves vagy!\n`);

    // <---- Fejezd be a kódolást

    res.write("</pre></form></body></html>");
    res.end();
}
