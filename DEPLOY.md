# AEDLER — aktualizacja serwisu i uruchomienie na aedler.de

Ten dokument ma dwie części:
1. **Instrukcja dla Ciebie** — jak wgrać zaktualizowany serwis na GitHub (krok po kroku, bez wiedzy technicznej).
2. **Gotowa wiadomość dla informatyka** — do przekazania po wgraniu plików (przekierowanie domeny w nazwa.pl + SSL).

---

## CZĘŚĆ 1 — Aktualizacja serwisu na GitHub (dla Ciebie)

Masz cały projekt w jednym pobranym pliku ZIP. W środku są m.in.:
`index.html`, folder `assets/` (style, skrypty, zdjęcia, katalogi PDF), `robots.txt`, `sitemap.xml`, `llms.txt`, `CNAME`, `README.md`, `EDITING-GUIDE.md`.

> Jeśli w ZIP-ie znajdziesz foldery **`uploads`, `screenshots`, `scraps`** — **pomiń je** (to pliki robocze, nie są częścią serwisu). Wgrywaj tylko: `index.html`, folder `assets`, `robots.txt`, `sitemap.xml`, `llms.txt`, `CNAME`, `README.md`, `EDITING-GUIDE.md`, `DEPLOY.md` oraz ulotki `Ulotka AEDLER A4*.html` (jeśli chcesz je zachować w repo).

> Najprostsza metoda to przeciąganie plików w przeglądarce (bez instalowania niczego).

### Krok po kroku

1. **Rozpakuj ZIP** na komputerze (prawy przycisk → „Wyodrębnij wszystkie"). Otrzymasz folder z plikami serwisu.
2. Wejdź na **github.com**, zaloguj się i otwórz repozytorium projektu: **`schedpol/Aedler`**.
3. Kliknij przycisk **`Add file`** (u góry, po prawej) → **`Upload files`**.
4. **Zaznacz wszystkie pliki i foldery** z rozpakowanego folderu i **przeciągnij je** do okna przeglądarki (albo kliknij „choose your files" i zaznacz wszystko).
   - Ważne: przeciągnij również folder **`assets`** w całości — GitHub zachowa jego zawartość.
5. Przewiń na dół do sekcji **„Commit changes"**. W polu opisu wpisz np. `Aktualizacja serwisu — lipiec 2026`.
6. Zostaw zaznaczone **„Commit directly to the main branch"** i kliknij zielony **`Commit changes`**.
7. Gotowe. GitHub sam opublikuje zmiany. Podgląd pojawi się po **~1 minucie** pod adresem roboczym:
   **https://schedpol.github.io/Aedler/**

> Jeśli GitHub zapyta o nadpisanie istniejących plików — potwierdź. Nowe wersje zastąpią stare.

### Włączenie własnej domeny w GitHub (jednorazowo)

W pliku ZIP jest już plik **`CNAME`** z wpisem `aedler.de` — dzięki niemu GitHub wie, że serwis ma działać pod tą domeną. Dodatkowo, jednorazowo:

1. W repozytorium `schedpol/Aedler` wejdź w **`Settings`** → w menu po lewej **`Pages`**.
2. W polu **„Custom domain"** wpisz: **`aedler.de`** i kliknij **`Save`**.
3. Na razie może pojawić się ostrzeżenie o DNS — to normalne. Zniknie, gdy informatyk ustawi przekierowanie (Część 2).
4. Gdy ostrzeżenie zniknie, zaznacz **„Enforce HTTPS"** (wymuś HTTPS) — to aktywuje darmowy certyfikat SSL. Jeśli opcja jest jeszcze szara, poczekaj kilka–kilkanaście godzin po zmianach DNS i wróć zaznaczyć.

To wszystko po Twojej stronie. 🎉

---

## CZĘŚĆ 2 — Wiadomość do informatyka (skopiuj i wyślij)

> Wyślij poniższą wiadomość dopiero **po** wgraniu plików na GitHub (Część 1).

---

**Temat: Przekierowanie domeny aedler.de na nowy serwis (GitHub Pages) + SSL**

Cześć,

nowa wersja strony AEDLER jest już opublikowana na GitHub Pages. Proszę o skonfigurowanie domeny **aedler.de** (nasza jedyna domena z certyfikatem/gotowa na SSL) tak, aby wskazywała na ten serwis. Pozostałe domeny (aedler.pl, aedler.com.pl) podłączymy później.

**1. DNS w panelu nazwa.pl dla domeny `aedler.de`:**

Dla domeny głównej (rekord „@" / apex) ustaw **4 rekordy A** na adresy GitHub Pages:
```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```
(Opcjonalnie, dla IPv6 — 4 rekordy AAAA:)
```
AAAA  @  2606:50c0:8000::153
AAAA  @  2606:50c0:8001::153
AAAA  @  2606:50c0:8002::153
AAAA  @  2606:50c0:8003::153
```
Dla subdomeny **www** ustaw rekord CNAME:
```
CNAME  www  schedpol.github.io.
```
Jeśli na domenie są już stare rekordy A/CNAME kierujące na dotychczasowy hosting — proszę je usunąć/zastąpić powyższymi.

**2. Repozytorium serwisu (GitHub):** `https://github.com/schedpol/Aedler`
Adres roboczy do weryfikacji przed przełączeniem DNS: `https://schedpol.github.io/Aedler/`
W ustawieniach GitHub Pages domena `aedler.de` jest już wpisana jako „Custom domain" (w repo jest plik `CNAME`).

**3. SSL:** certyfikat jest **darmowy i automatyczny** (Let's Encrypt od GitHub Pages) — uruchomi się sam po propagacji DNS. Nic nie trzeba kupować ani wgrywać. Po tym, jak DNS zacznie wskazywać na GitHub, w ustawieniach repo → Settings → Pages zaznaczymy „Enforce HTTPS". Jeśli w nazwa.pl istnieje osobny, stary certyfikat/przekierowanie SSL na dawny hosting — proszę je wyłączyć, żeby nie kolidowało.

**4. Uwaga o propagacji:** zmiany DNS mogą działać od kilkunastu minut do ~24 h. Po tym czasie `https://aedler.de` powinno pokazywać nowy serwis z kłódką (HTTPS).

Daj proszę znać, gdy DNS będzie ustawiony — potwierdzę poprawność i włączę wymuszanie HTTPS.

Dzięki!

---

### Szybka checklista
- [ ] Pliki wgrane na GitHub (Część 1)
- [ ] „Custom domain: aedler.de" ustawione w Settings → Pages
- [ ] Wiadomość wysłana do informatyka (Część 2)
- [ ] DNS ustawiony w nazwa.pl (informatyk)
- [ ] „Enforce HTTPS" zaznaczone po propagacji DNS
- [ ] `https://aedler.de` działa z kłódką ✅
