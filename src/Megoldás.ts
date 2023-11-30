import fs from "fs";
import VálasztásiEredmény from "./VálasztásiEredmény";

export default class Megoldás {
    #ve: VálasztásiEredmény[] = [];

    get jelötekSzáma(): number {
        return this.#ve.length;
    }

    get #szavazatokSzáma(): number {
        return this.#ve.reduce((összeg, e) => összeg + e.szavazatok, 0);
    }

    get #szavazatokSzáma2(): number {
        let db: number = 0;
        for (const e of this.#ve) {
            db += e.szavazatok;
        }
        return db;
    }

    get #megjelentekAránya(): string {
        const arány: number = this.#szavazatokSzáma / 12345;
        return `${(arány * 100).toFixed(2)}%`;
    }

    get részvételiStatisztika(): string {
        return `A választáson ${this.#szavazatokSzáma} állampolgár, a jogosultak ${this.#megjelentekAránya}-a vett részt.\n`;
    }

    constructor(állományNeve: string) {
        // beolvasás + példányosítás + tárolás
        fs.readFileSync(állományNeve)
            .toString()
            .split("\n")
            .forEach(sor => {
                const aktSor = sor.trim();
                if (aktSor.length > 0) this.#ve.push(new VálasztásiEredmény(aktSor));
            });
    }

    képviselő_keresése(nev: string): string {
        for (const e of this.#ve) {
            if (e.nev == nev) {
                return `A képviselőjelölt ${e.szavazatok} szavazatot kapott`;
            }
        }
        return "Ilyen  nevű  képviselőjelölt  nem  szerepel a nyilvántartásban!";
    }
}
