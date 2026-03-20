# Boktok – Frontend

Boktok är en webbapplikation där användare kan söka efter böcker, läsa och skriva recensioner samt spara böcker i en personlig läslista. Bokinformation hämtas från Google Books API och recensioner lagras i en egen backend-databas.

## Tekniker

- **React** – komponentbaserat användargränssnitt
- **TypeScript** – statisk typning med interfaces och types
- **React Router** – klientsidig routing med BrowserRouter och NavLink
- **Context API** – global state-hantering för inloggad användare
- **CSS Modules** – komponentspecifik styling
- **React Icons** – ikonbibliotek

## Funktioner

- Sök efter böcker via Google Books API med realtidssökning
- Visa detaljerad information om enskilda böcker
- Registrera konto och logga in
- Skriva, redigera och ta bort recensioner
- Personlig läslista med lässtatus (Vill läsa, Läser just nu, Klar)
- Skyddade sidor för inloggade användare
- Adminvy för hantering av användare och recensioner

## Installation

### Krav

- Node.js
- Att backend-API:et körs lokalt, se [bookreview_backend](https://github.com/nathalievaster/bookreview_backend.git)

### Steg

1. Klona repot:
```bash
git clone https://github.com/nathalievaster/bookreview-frontend.git
```

2. Installera beroenden:
```bash
npm install
```

3. Skapa en `.env`-fil i rotkatalogen och lägg till din Google Books API-nyckel:
```
VITE_GOOGLE_BOOKS_API_KEY=din_api_nyckel_här
```

4. Starta utvecklingsservern:
```bash
npm run dev
```

## Miljövariabler

| Variabel | Beskrivning |
|---|---|
| `VITE_GOOGLE_BOOKS_API_KEY` | API-nyckel för Google Books API |

## Relaterade repon

- Backend: [bookreview_backend](https://github.com/nathalievaster/bookreview_backend.git)
