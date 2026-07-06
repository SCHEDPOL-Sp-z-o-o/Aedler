# Instrukcja edycji strony AEDLER — dla zespołu marketingu

## 🌐 Adres strony
**https://schedpol.github.io/Aedler/** *(docelowo: aedler.de — jedyna domena z certyfikatem SSL; aedler.pl i aedler.com.pl w późniejszym etapie)*

Strona po każdej zmianie aktualizuje się automatycznie w ciągu **~1 minuty**.

---

## 📝 Najczęstsze edycje — w jednym pliku

**Wszystkie teksty strony** (po polsku, angielsku, niemiecku) znajdują się w pliku:

### `assets/i18n.js`

To **jedyny plik, którego dotykać 90% przypadków**.

### Jak edytować — krok po kroku

1. Wejdź na **https://github.com/schedpol/Aedler**
2. Kliknij folder **`assets`**
3. Kliknij plik **`i18n.js`**
4. W prawym górnym rogu pliku kliknij ikonę **ołówka ✏️** (Edit this file)
5. Znajdź tekst, który chcesz zmienić — np. `"hero.sub": "Marka Aedler łączy..."`. Każdy klucz wygląda tak:

   ```
   "klucz": "Tekst po polsku w sekcji PL",
   "klucz": "English text in EN section",
   "klucz": "Deutscher Text im DE Abschnitt",
   ```

6. Zmień tylko tekst **w cudzysłowach po dwukropku** — NIE zmieniaj samego klucza po lewej
7. Zjedź na dół strony do sekcji **„Commit changes"**:
   - **Commit message:** krótki opis, np. `Zmiana podtytułu hero`
   - Zostaw **„Commit directly to the main branch"**
   - Kliknij zielony **Commit changes**

⏳ Po ~1 minucie sprawdź stronę — odśwież (**Ctrl + Shift + R**), zmiana powinna być widoczna.

---

## 🗂️ Struktura tekstów w `i18n.js`

Plik dzieli się na trzy duże sekcje:

```js
window.I18N = {
  pl: { ...wszystkie teksty PL... },
  en: { ...wszystkie teksty EN... },
  de: { ...wszystkie teksty DE... }
};
```

**Kluczowe sekcje (w kolejności):**

| Klucz | Co edytuje |
|---|---|
| `nav.*` | Nawigacja u góry |
| `hero.*` | Sekcja powitalna (duży tytuł) |
| `trust.*` | Pasek z logami sieci DIY |
| `eco.*` | 4 karty kategorii produktowych |
| `num.*` | Sekcja z liczbami (45+ lat, 20+ patentów...) |
| `tech.*` | Karuzela technologii Stabildense® |
| `esg.*` | Sekcja ESG / odpowiedzialność |
| `cat.*` | Katalog produktów (4 plansze) |
| `map.*` | Mapa świata + obecność globalna |
| `part.*` | 4 modele współpracy |
| `road.*` | Roadmapa współpracy (3 kroki) |
| `form.*` | Formularz kontaktowy |
| `foot.*` | Stopka |

---

## ❗ Najważniejsze zasady

### ✅ MOŻNA
- Zmieniać tekst **w cudzysłowach po dwukropku**
- Usuwać/dodawać litery, słowa, zdania
- Używać polskich znaków
- Robić dużo małych zmian — każda to oddzielny commit

### ❌ NIE WOLNO
- Usuwać klucza (lewej strony, np. `"hero.sub":`)
- Usuwać cudzysłowów albo przecinka na końcu linii
- Edytować nawiasów `{` `}` ani nazw sekcji (`pl: {`, `en: {`, `de: {`)

### Jak rozpoznać błąd
Jeśli po zmianie strona **przestała działać** (np. cała sekcja pusta) — to znaczy że został złamany format. Najprawdopodobniej:
- Brakuje cudzysłowu na końcu tekstu
- Brakuje przecinka na końcu linii
- Brakuje nawiasu zamykającego `}`

**Naprawa:** w zakładce **History** repo (lub w GitHub Desktop) cofnij ostatni commit.

---

## 📸 Zmiana zdjęcia produktu

1. **Przygotuj zdjęcie**: 1600×1200 px lub większe, JPG, max ~500 KB. Trzymaj się formatu i rozdzielczości obecnych obrazów żeby się nie rozjeżdżało.
2. Wejdź w **folder `assets/`** na github.com
3. Kliknij **Add file → Upload files**
4. Przeciągnij nowe zdjęcie. **WAŻNE:** nazwa pliku musi być DOKŁADNIE TAKA SAMA jak obecnego — np. `render-omega-140.jpg` (zastąpi stare).
5. Commit changes.

---

## 🎨 Zmiana kolorów / czcionek / layoutu

Te zmiany są w pliku **`assets/styles.css`**. Wymagają większej ostrożności — najlepiej zgłoś deweloperowi.

Główne zmienne kolorów są na samej górze pliku, w sekcji `:root { ... }`:

```css
--gold:      #c1a06a;   /* główny kolor akcentu (złoty) */
--gold-deep: #8e7547;   /* ciemniejszy złoty */
--bg:        #0a0a0c;   /* czarne tło */
```

---

## 📞 Pomoc

W razie wątpliwości — **przed commitem** wklej fragment kodu do osoby technicznej, żeby zweryfikowała.

Każdą zmianę można cofnąć — historia jest w **History** w GitHub Desktop albo w zakładce **Commits** na githubie.
