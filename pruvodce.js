/* ==========================================================
   KulKid – Průvodce výběrem (stránka /pruvodce-vyberem/)
   Načítá ho kulkid.js jen na stránce s <div id="kk-guide"></div>.
   Ceny = původní ceny bez slev (ověřeno 29. 10. 2026).
   ========================================================== */
(function(){
  var root=document.getElementById('kk-guide');
  if(!root)return;

  /* ===== NASTAVENÍ ===== */
  var CFG={
    base:'',          /* '' = odkazy relativně (funguje na kulkid.cz); případně 'https://www.kulkid.cz' */
    minExact:4,       /* když je přesných shod méně, doplní se „Mohlo by se hodit“ */
    maxTips:8,        /* kolik tipů navíc max. */
    pageSize:12,      /* kolik produktů zobrazit před „Zobrazit další“ */
    loadDetails:true, /* dotáhnout z detailu produktu obrázek, aktuální cenu a dostupnost */
    contactUrl:'/kontakty/'
  };

  /* ===== DATA (ceny = původní ceny bez slev, ověřeno 29. 10. 2026) ===== */
  var P=[["bug-nano-beruska-2","BUG Nano - Beruška",119],["nano-brouk-hexbots","Nano Brouk - HexBots",199],["nano-brouk-hexbots-flash","Nano Brouk - HexBots Flash",220],["hexbug-nano---startovaci-sada","HEXBUG Nano – Startovací sada",290],["connetix-12-ks-duhovych-nahradnich-kulicek","Connetix Tiles - Náhradní Kuličky (12 ks)",350],["connetix-16-ks-pastelovych-nahradnich-kulicek","Connetix Tiles - Náhradní Kuličky Pastel (16 ks)",390],["learn-grow-toys-podvozky-por-auta-2ks","Learn & Grow Toys - Podvozky por auta 2ks",490],["picassotiles-auticka-pro-magneticke-zavodni-drahy-2ks","PicassoTiles Autíčka pro Magnetické Závodní Dráhy 2ks",490],["picassotiles-sada-rozsireni-zavodni-drahy-12ks","PicassoTiles Sada Rozšíření Závodní Dráhy 12ks",490],["picassotiles-sada-rozsireni-pro-kulickovou-drahu-15-ks","PicassoTiles Sada Rozšíření pro Kuličkovou Dráhu 15ks",490],["picassotiles---magneticka-sada-zvireci-kamaradi-mix-match-4-ks","PicassoTiles – Magnetická sada Zvířecí kamarádi Mix & Match 4 ks",490],["svitici-kulicky-pro-kulickodrahu--4-ks","Svítící kuličky pro kuličkovou dráhu 4ks",490],["picassotiles-magneticke-stavebnice-s-whiteboardy-a-stiratelnymi-fixy-13-ks","PicassoTiles Magnetické Stavebnice s Whiteboardy a Stíratelnými Fixy 13 ks",540],["connetix-2ks-auta","CONNETIX Bright Car Pack – 2 ks",550],["magna-tiles-cat-tree---magneticka-stavebnice-13-ks","Magna-Tiles® Cat Tree – Magnetická stavebnice 13 ks",550],["magna-tiles-dog-house---magneticka-stavebnice-13-ks","Magna-Tiles® Dog House – Magnetická stavebnice 13 ks",550],["magna-tiles-hamster-ball---magneticka-stavebnice-13ks","Magna-Tiles® Hamster Ball – Magnetická stavebnice 13ks",550],["learn-grow---magneticka-hulka-a-kovove-zetony--100-ks","Learn & Grow – Magnetická hůlka a kovové žetony (100 ks)",590],["picassotiles-dinosauri-zavodni-auta-2-ks","PicassoTiles Dinosauří Závodní Auta 2ks",590],["picassotiles-magneticka-stavebnice-safari-zvirata-8-akcnich-figurek","PicassoTiles Magnetická Stavebnice Safari Zvířata 8ks Akčních Figurek",590],["picassotiles-magneticka-stavebnice-s-dinosaury-8-akcnich-figurek","PicassoTiles Magnetická Stavebnice s Dinosaury 8ks Akčních Figurek",590],["picassotiles-magneticka-stavebnice-s-morskymi-zviraty-8-akcnich-figurek","PicassoTiles Magnetická Stavebnice s Mořskými Zvířaty 8ks Akčních Figurek",590],["picassotiles-8dilna-magneticka-stavebnice-s-vozidly","PicassoTiles Magnetická Stavebnice s Vozidly 8ks Akčních Figurek",590],["picassotiles-magneticka-stavebnice-se-zrcadlovymi-dilky-12-ks","PicassoTiles Magnetická Stavebnice se Zrcadlovými Dílky 12ks",590],["picassotiles---doplnek-zavodni-drahy--dopravni-znacky-a-samolepky-18-ks","PicassoTiles – Doplněk závodní dráhy: dopravní značky a samolepky 18 ks",590],["picassotiles---magneticka-sada-metro-city-s-vozidly-8ks","PicassoTiles – Magnetická sada Metro City s vozidly 8ks",590],["picassotiles---magneticka-sada-panda-opice--rodice-a-mladata-4-ks","PicassoTiles – Magnetická sada Panda & Opice: rodiče a mláďata 4 ks",590],["picassotiles---magneticka-sada-lesnich-zviratek-8-ks","PicassoTiles – Magnetická sada lesních zvířátek 8 ks",590],["coblo-magneticka-stavebnice-podvozek-pro-auta-2ks","COBLO - Magnetická stavebnice podvozek pro auta - 2ks",625],["magna-tiles-micromags-gingerbread-house-travel-set-24-dilku","MAGNA-TILES microMAGS Gingerbread House Travel Set 24 dílků",649],["magna-tiles-dolphin-bay-13-dilu---magneticka-stavebnice-delfini-zatoka","MAGNA-TILES® Dolphin Bay 13 dílů – magnetická stavebnice Delfíní zátoka",650],["magna-tiles-shark-dive-13-dilu---magneticka-stavebnice-zraloci-ponor","MAGNA-TILES® Shark Dive 13 dílů – magnetická stavebnice Žraločí ponor",650],["magna-tiles-magneticka-stavebnice-micromags-heart-to-heart-travel-set-26-dilu","MAGNA-TILES Magnetická stavebnice microMAGS Heart to Heart Travel Set 26 dílů",655],["magna-tiles-micromags-zimni-kralovstvi---cestovni-sada--26-ks-","MAGNA-TILES® microMAGS Zimní království – Cestovní sada (26 ks)",655],["magneticka-stavebnice-magna-tiles-micromags---spring-garden-travel-set--24-ks-","Magnetická stavebnice MAGNA-TILES microMAGS – Spring Garden Travel Set (24 ks)",655],["magna-tiles-magneticka-stavebnice-micromags-cestovni-sada--26-ks-","Magna Tiles - Magnetická stavebnice microMAGS - cestovní sada (26 ks)",675],["connetix-tiles-magneticka-stavebnice-travel-mini-pack-v-kovovem-kufriku--32-ks-","Connetix Tiles - Magnetická Stavebnice Travel Mini Pack v Kovovém Kufříku (32 ks)",690],["magna-tiles-magneticka-stavebnice-micromags-treehouse-travel-set--24-ks-","Magna Tiles - Magnetická stavebnice microMAGS Treehouse Travel Set (24 ks)",690],["nano-land-sada-s-vice-nez-40-dilky-3-nano-broucky","Nano Land - Sada s více než 40 dílky & 3 Nano Broučky-HuxBug",690],["picassotiles-auticka-pro-magneticke-zavodni-drahy-3ks","PicassoTiles Autíčka pro Magnetické Závodní Dráhy 3ks",690],["picassotiles---magneticka-stavebnice-letadlo-s-postavickami","PicassoTiles – Magnetická stavebnice Letadlo s postavičkami",690],["magna-tiles-ulozny-kos-a-interaktivni-hraci-podlozka-pro-magna-tiles--connetix-apod-","Magna-tiles Úložný koš a interaktivní hrací podložka pro Magna-tiles, Connetix apod.",695],["coblo-magneticka-pismena-mala-60-dilu","COBLO - Magnetická písmena malá - 60 dílů",750],["coblo-magneticka-cisla-60-dilu","COBLO - Magnetická čísla - 60 dílů",750],["learn-grow-magneticka-stavebnice-ctverce-velke-8ks","TileTek by Learn & Grow Toys - Velké Magnetické Čtverce Rainbow (8 ks)",750],["learn-grow-magneticka-stavebnice-kupola-18ks","Learn & Grow Magnetická stavebnice Kupola 18ks",780],["magneticke-podlozky-puzzle-se-zviraty-40-ks","Learn & Grow Toys - Magnetické podložky Puzzle se zvířaty 40 ks",790],["magneticke-podlozky-silnice-40-el","Learn & Grow Toys - Magnetické podložky Silnice 40 ks",790],["learn-grow-toys-magneticka-stavebnice-zamek-40ks","Learn & Grow Toys - Magnetické podložky Zámek 40ks",790],["learn-grow-toys-magneticke-podlozky-zeleznice-36ks","Learn & Grow Toys - magnetické podložky Železnice 36ks",790],["learn-grow---magneticke-podlozky--zvireci-puzzle-40-ks","Learn & Grow – Magnetické podložky matematické puzzle 40 ks",790],["picassotiles-magneticka-sada---dinosauri-mix-match--praveci-kamaradi","PicassoTiles Magnetická sada – Dinosauři Mix & Match: Pravěcí kamarádi",790],["picassotiles---magneticka-sada-postavicek-s-3-auty","PicassoTiles – Magnetická sada postaviček s 3 auty",790],["picassotiles---magneticke-spojovaci-dilky-pro-lego-kostky-12-ks","PicassoTiles – Magnetické spojovací dílky pro LEGO® kostky 12 ks",790],["picassotiles---magneticke-spojovaci-dilky-pro-lego-kostky-12-ks---varianta-combo","PicassoTiles – Magnetické spojovací dílky pro LEGO® kostky 12 ks – varianta Combo",790],["picassotiles---ulozny-box-na-magneticke-stavebnice-les-s-vikem-a-uchyty","PicassoTiles – Úložný box na magnetické stavebnice Les s víkem a úchyty",790],["picassotiles---ulozny-box-na-magneticke-stavebnice-mesto-s-vikem-a-uchyty","PicassoTiles – Úložný box na magnetické stavebnice Město s víkem a úchyty",790],["svitici-kulicky-pro-kulickovou-drahu-8ks","Svítící kuličky pro kuličkovou dráhu 8ks",790],["connetix-magneticka-stavebnice-24-kusu","Connetix Tiles - Magnetická Stavebnice (24 ks)",850],["learn-and-grow-magneticka-stavebnice-auto-28-ks","Learn and grow- Magnetická stavebnice Auto 28 ks",890],["picassotiles-magneticke-stavebnice-2v1-vozidlo-playset","PicassoTiles Magnetické Stavebnice vozidlo 2v1",890],["picassotiles---magneticka-stavebnice-lesni-zvirata-26-ks","PicassoTiles – Magnetická stavebnice Lesní zvířata 26 ks",890],["magna-tiles-police-patrol---magneticka-stavebnice-20-ks","Magna-Tiles® Police Patrol – Magnetická stavebnice 20 ks",950],["connetix-pro-build-it-4-ways-flowers-pack---magneticka-stavebnice-kvetiny--21-ks","CONNETIX PRO Build It 4 Ways Flowers Pack – magnetická stavebnice Květiny, 21 ks",1140],["connetix-bright-discovery-pack-32-dilku","CONNETIX Bright Discovery Pack 32 dílků",1190],["connetix-pro-build-it-4-ways-animals-pack---magneticka-stavebnice-zvirata--30-ks","CONNETIX PRO Build It 4 Ways Animals Pack – magnetická stavebnice Zvířata, 30 ks",1190],["connetix-pro-build-it-4-ways-creatures-pack---magneticka-stavebnice-tvorove--36-ks","CONNETIX PRO Build It 4 Ways Creatures Pack – magnetická stavebnice Tvorové, 36 ks",1190],["connetix-pro-build-it-4-ways-vehicles-pack---magneticka-stavebnice-vozidla--30-ks","CONNETIX PRO Build It 4 Ways Vehicles Pack – magnetická stavebnice Vozidla, 30 ks",1190],["connetix-pastel-motion-pack---magneticka-stavebnice-s-kolecky--26-ks","CONNETIX Pastel Motion Pack – magnetická stavebnice s kolečky, 26 ks",1190],["connetix-geometry-pack-30ks","Connetix Tiles - Geometry Pack (30 ks)",1190],["connetix-magneticka-stavebnice-rainbow-motion-pack-24ks","Connetix Tiles - Magnetická Stavebnice Rainbow Motion Pack (24 ks)",1190],["connetix-dlazdice--zakladny-2ks","Connetix Tiles - Základny Citronová & Broskvová (2 ks)",1190],["connetix-dlazdice--zakladny-2ks-clear","Connetix Tiles - Základny Clear (2 ks)",1190],["connetix-dlazdice--zakladny-2ks-ruzove","Connetix Tiles - Základny Růžové (2 ks)",1190],["connetix-magneticka-stavebnice-stavebnice","Connetix tiles - DLAŽDICE, ZÁKLADNY (modrá a zelená) 2KS",1190],["magna-tiles-coral-reef-25-dilu---magneticka-stavebnice-s-podmorskym-svetem","MAGNA-TILES® Coral Reef 25 dílů – magnetická stavebnice s podmořským světem",1250],["magna-tiles-lighthouse-rescue-26-dilu---magneticka-stavebnice-majak","MAGNA-TILES® Lighthouse Rescue 26 dílů – magnetická stavebnice Maják",1250],["magna-tiles-raging-rapids-27-dilu---magneticka-stavebnice-divoke-pereje","MAGNA-TILES® Raging Rapids 27 dílů – magnetická stavebnice Divoké peřeje",1250],["magna-tiles-rail-racers---magneticka-stavebnice-33-ks","Magna-Tiles Rail Racers – Magnetická stavebnice 33 ks",1250],["magna-tiles-fire-rescue---magneticka-stavebnice-27-ks","Magna-Tiles® Fire Rescue – Magnetická stavebnice 27 ks",1250],["magna-tiles-puppy-park---magneticka-stavebnice-27-ks","Magna-Tiles® Puppy Park – Magnetická stavebnice 27 ks",1250],["magna-tiles-travel-set-deluxe---magneticka-stavebnice-55-ks","Magna-Tiles® Travel Set Deluxe – Magnetická stavebnice 55 ks",1250],["magna-tiles-micromags-pismenka-56-dilku","MAGNA-TILES microMAGS Písmenka 56 dílků",1259],["magna-tiles-zvirata-safari-25-ks","MAGNA TILES - ZVÍŘATA SAFARI 25 KS",1285],["magna-tiles-zviratka-dzungle-25-ks","Magna Tiles - zvířátka Džungle - 25 ks",1285],["magna-tiles-zviratka-v-lese","Magna-Tiles - Zvířátka v lese",1285],["connetix-tiles-magneticka-stavebnice-kulickova-draha-s-odpalovacem--47-ks-","Connetix Tiles - Magnetická Stavebnice Kuličková Dráha s Odpalovačem (47 ks)",1290],["connetix-tiles-magneticka-stavebnice-svitici-raketa--30-ks-","Connetix Tiles - Magnetická Stavebnice Svítící Raketa (30 ks)",1290],["magna-tiles-farma-25-ks","Magna Tiles -  Farma 25 ks",1340],["magneticka-stavebnice-castle-25-dilku","Magnetická stavebnice Castle 25Ks",1340],["connetix-pruhledne-obdelniky-12-ks","Connetix Tiles - Obdélníky Clear - Rectangles (12 ks)",1350],["picassotiles-farm---magneticka-stavebnice-farma-se-zviratky--52-ks","PicassoTiles Farm – magnetická stavebnice Farma se zvířátky, 52 ks",1390],["picassotiles-magneticke-stavebnice-zavodni-draha-30ks","PicassoTiles Magnetické Stavebnice Závodní Dráha 30ks",1390],["magneticka-stavebnice-kostky-46-ks","Magnetická stavebnice kostky 46 ks",1449],["connetix-geometry-pack-pastelovy-40ks","Connetix Tiles - Geometry Pastel (40 ks)",1490],["connetix-magneticka-stavebnice-34-kusu","Connetix Tiles - Magnetická Stavebnice Clear (34 ks)",1490],["connetix-rozsireni-tvary-clear-24-ks","Connetix Tiles - Rozšíření Tvary Clear (24 ks)",1490],["picassotiles-ledovy-hrad-s-postavickami-72ks","PicassoTiles Ledový Hrad s Postavičkami 72ks",1490],["connetix-tiles-light-star-pack---magneticka-stavebnice-se-svetlem-28-ks","Connetix Tiles Light Star Pack – Magnetická stavebnice se světlem 28 ks",1500],["magna-tiles-builder-32-dilu","Magna Tiles -  Builder 32 dílů",1590],["magneticka-stavebnice-space-32ks","Magnetická stavebnice Space 32Ks",1590],["picassotiles-magneticky-zavodni-stadion-se-stavebnici-a-prislusenstvim-64-ks","PicassoTiles Magnetický Závodní Stadion se Stavebnicí a Příslušenstvím 64ks",1590],["picassotiles-magneticka-stavebnice-dobrodruzstvi-v-hrackarstvi-60ks","PicassoTiles Magnetická Stavebnice Dobrodružství v Hračkářství 60ks",1690],["barevna-magneticka-stavebnice-mideer-60-ks","Barevná magnetická stavebnice Mideer - 60 ks",1699],["connetix-tiles-glitter-castle-pack-magneticka-stavebnice-48-ks","Connetix Tiles – Glitter Castle Pack – Magnetická stavebnice s třpytkami  48 ks",1700],["magna-tiles-police-station---magneticka-stavebnice-35-ks","Magna-Tiles® Police Station – Magnetická stavebnice 35 ks",1725],["connetix-magneticka-stavebnice-42-kusu","Connetix Tiles - Magnetická Stavebnice (42 ks)",1790],["connetix-magneticka-stavebnice-kulickova-draha-66-kusu","Connetix Tiles - Magnetická Stavebnice Kuličková Dráha (66 ks)",1790],["connetix-magneticka-stavebnice-pastel-40-kusu","Connetix Tiles - Magnetická Stavebnice Pastel (40 ks)",1790],["connetix-obdelniky-18-ks","Connetix Tiles - Obdélníky - Rectangles (18 ks)",1790],["barevna-magneticka-kulickodraha-mideer-100-ks","Barevná magnetická kuličkodráha Mideer - 100 ks",1950],["connetix-dopravni-set","Connetix Tiles - Dopravní Set (50 ks)",1950],["connetix-dopravni-set-pastel-50ks","Connetix Tiles - Dopravní Set Pastel (50 ks)",1950],["magna-tiles-cesta-downhill-duo-40-ks","Magna - Tiles Cesta Downhill Duo 40 ks",1950],["connetix-tiles-magneticka-stavebnice-svitici-kulickova-draha-galaxy--61-ks-","Connetix Tiles - Magnetická Stavebnice Svítící Kuličková Dráha Galaxy (61 ks)",1990],["picassotiles---magneticka-dinosauri-zavodni-draha-77-ks","PicassoTiles – Magnetická dinosauří závodní dráha 89 ks",1990],["magna-tiles-pet-playhouse---magneticka-stavebnice-50-ks","Magna-Tiles® Pet Playhouse – Magnetická stavebnice 50 ks",1999],["magneticka-stavebnice-castle-dlx-48-dilku","Magnetická stavebnice Castle DLX 48 dílků",2025],["connetix-tiles-60-kusu","Connetix Tiles - Magnetická Stavebnice (60 ks)",2090],["learn-grow---sada-stavebnich-vozidel-mega-mover-23ks","Learn & Grow – Sada stavebních vozidel Mega Mover 22ks",2090],["picassotiles-magneticka-draha-2ks-led-auta","PicassoTiles Magnetická Dráha 50ks vč. 2ks LED Aut",2090],["picassotiles-magneticka-stavebnice---vanocni-chaloupka-s-figurkami-50ks","PicassoTiles Magnetická stavebnice – Vánoční chaloupka s figurkami 50ks",2090],["picassotiles-magneticka-stavebnice---vanocni-pernikovy-domecek","PicassoTiles Magnetická stavebnice – Vánoční perníkový domeček 46ks",2090],["picassotiles---magneticka-stavebnice-princeznin-hrad-60-ks","PicassoTiles – Magnetická stavebnice Princeznin hrad 60 ks",2090],["connetix-tiles-portal-pack---magneticka-stavebnice-s-portaly-48-ks","Connetix Tiles Bright Portal Pack – Magnetická stavebnice s portály 48 ks",2100],["connetix-tiles-glitter-unicorn-pack---magneticka-stavebnice-s-trpytkami-56-ks","Connetix Tiles Glitter Unicorn Pack – Magnetická stavebnice s třpytkami 56 ks",2100],["connetix-sada-ramp-a-krizovatek-16ks","Connetix Tiles - Sada Rámp a Křižovatek (16 ks)",2150],["magna-tiles-fire-station---magneticka-stavebnice-50-ks","Magna-Tiles® Fire Station – Magnetická stavebnice 50 ks",2245],["connetix-magneticka-stavebnice-kulickova-draha-80ks-pastelova","Connetix Tiles - Magnetická Stavebnice Kuličková Dráha Pastel (80 ks)",2250],["connetix-obdelniky-pastel-24-ks","Connetix Tiles - Obdélníky Pastel - Rectangles (24 ks)",2250],["learn-grow-toys-magneticka-stavebnice-110ks-builders-pack","Learn & Grow Toys - Magnetická stavebnice 110ks Builders Pack",2250],["magna-tiles-treetop-adventure-42-dilu---magneticka-stavebnice-dobrodruzstvi-v-korunach-stromu","MAGNA-TILES® Treetop Adventure 42 dílů – magnetická stavebnice Dobrodružství v korunách stromů",2300],["connetix-magneticka-stavebnice-pastel-64-kusu","Connetix Tiles - Magnetická Stavebnice Pastel (64 ks)",2390],["connetix-ball-run-bright-pack---114-ks","CONNETIX Ball Run Bright Pack – 114 ks",2490],["connetix-ball-run-pastel-pack-114-dilku","CONNETIX Ball Run Pastel Pack 114 dílků",2490],["learn-grow-magneticka-stavebnice-pastel-builders-pack-112-ks","Learn & Grow Magnetická stavebnice Pastel Builders Pack 112 ks",2490],["picassotiles-101-ks-magnetickych-stavebnic-s-kufrikem","PicassoTiles 101 ks Magnetických Stavebnic s Kufříkem",2590],["magna-tiles-rail-racers-deluxe---magneticka-stavebnice-90-ks","Magna-Tiles® Rail Racers Deluxe – Magnetická stavebnice 90 ks",2650],["connetix-bright-creative-pack---104-ks","CONNETIX Bright Creative Pack – 104 ks",2700],["connetix-pastel-creative-pack-104-dilku","CONNETIX Pastel Creative Pack 104 dílků",2700],["magna-tiles-undersea-adventure-58-dilu---magneticka-stavebnice-podmorske-dobrodruzstvi","MAGNA-TILES® Undersea Adventure 58 dílů – magnetická stavebnice Podmořské dobrodružství",2700],["picassotiles-magneticke-stavebnice-3v1-kulickova-draha-a-zavodni-draha-108ks","PicassoTiles Magnetické Stavebnice 3v1 Kuličková Dráha a Závodní Dráha 108ks",2790],["picassotiles-magneticka-draha-80ks-vc--2ks-led-auta","PicassoTiles Magnetická Dráha 80ks vč. 2ks LED Aut",3090],["connetix-pro---magneticka-stavebnice-nove-generace-pro-male-i-velke-stavitele","Connetix PRO – Magnetická Stavebnice nové generace pro malé i velké stavitele",3450],["connetix-tiles-magneticka-stavebnice-kulickova-draha-134-ks-rainbow","Connetix Tiles - Magnetická Stavebnice Kuličková Dráha 134 ks Rainbow",3790],["connetix-silnice-48ks","Connetix Tiles - Silnice (48 ks)",3950],["magna-tiles-city-center---magneticka-stavebnice-110-ks","Magna-Tiles® City Center – Magnetická stavebnice 110 ks",3990],["picassotiles-magneticka-zavodni-draha-se-stavebnici-a-led-auty-128-ks","PicassoTiles Magnetická Závodní Dráha se Stavebnicí a LED Auty 128ks",4290],["connetix-pastel-mega-pack-202-dilku","CONNETIX Pastel Mega Pack 202 dílků",5490],["connetix-tiles-mega-202-kusu","Connetix Tiles - Magnetická Stavebnice BRIGHT MEGA Rainbow (202 ks)",5490],["picassotiles-magneticka-zavodni-draha-se-sviticimi-vozidly-150ks","PicassoTiles Magnetická Závodní Dráha se Svítícími Vozidly 150ks",5990]];
  var L={"kluk":[138,86,114,119,47,113,79,127,62,105,100,115,120,142,51,121,147,150,60,92,101],"holka":[134,148,139,86,129,73,104,125,48,32,116,89,117,34,123],"vsichni":[138,86,114,119,47,113,79,127,62,105,100,115,120,142,51,121,147,150,60,92,101,134,148,139,129,73,104,125,48,32,116,89,117,34,123,122,102,91,136,61,131,140,81,31,137,80,146,15,82,85,84,83,37,99,49,98,90,149,143,111,145],"vekA":[118,108,106,58,94,69,95,111,13,73,138,64,139,68,112,132,70,114,87,36,71,72,104,124,125,98,119,135,130,46,47,48,49,6,59,113,99,88,35,37,83,84,85,32,29,78,14,75,146,15,30,79,127,16,33,76,116,62,105,80,77,137,31,81,131,140,89,117,93,100,26,10,123,40,97,121,51,120,122,101],"vekB":[150,141,149,107,128,134,143,65,66,63,67,144,86,145],"prvni":[58,118,132,95,98,103,138,64,106,108,87],"rozsireni":[144,110,141,133,134,86,114,74,71,72,73,69,94,109,90,129,96,44,45,145,126,119,111,59,150,51],"doplnek":[11,51,2,19,13,17,26,10,27,50,46,47,48,49,6,24,53,54,55,56,7,39,23,12,9,8,57,4,5,43,42,0,3,41,1,38,25,52,40,18,20,21,22,60],"magnety":[138,64,139,148,58,106,118,149,95,108,132,135,130,103,93,133,134,13,65,66,63,67,68,143,111,112,69,94,107,144,128,86,70,114,87,36,4,5,109,90,129,96,126,145,71,72,73,124,125,98,104,74,45,46,47,48,6,49,17,119,59,44,28,110],"cena":[83,32,29,75,30,76,77,31,131,140,33,113,99,88,35,37,84,85,78,14,146,15,79,127,16,116,62,105,80,137,81,41,89,117,34,100,136,7,39,18,91,97,120,142,102,19,20,21,22,23,147,150,51,121,122,141,92,12,60,101,8,9,24,115,25,26,10,27,52,61,40,123,53,54,55,56]};

  function set(a){var o={};for(var i=0;i<a.length;i++)o[a[i]]=1;return o;}
  var S={};for(var k in L)S[k]=set(L[k]);
  var ALL=[];for(var i=0;i<P.length;i++)ALL.push(i);

  var Q=[
    {id:'kdo',sh:'Pro',q:'Pro koho vybíráte?',hint:'Pomůže nám to vybrat motivy, které dítě nejvíc chytnou.',opts:[
      {v:'kluk',ico:'👦',t:'Pro kluka'},
      {v:'holka',ico:'👧',t:'Pro holku'},
      {v:'vse',ico:'🧒',t:'Bez preference',s:'Ukažte mi vše'}]},
    {id:'vek',sh:'Věk',q:'Kolik je dítěti let?',hint:'Některé sady jsou vhodné až pro starší stavitele.',opts:[
      {v:'mlad',ico:'🧸',t:'2–5 let'},
      {v:'star',ico:'🚀',t:'6–12 let'}]},
    {id:'typ',sh:'Hledám',q:'Co hledáte?',hint:'Začínáte, nebo už doma nějakou stavebnici máte?',opts:[
      {v:'prvni',ico:'🎁',t:'První stavebnici',s:'Doma zatím žádnou nemáme'},
      {v:'rozsireni',ico:'🧩',t:'Rozšíření stavebnice',s:'Chceme víc dílků a možností'},
      {v:'doplnek',ico:'✨',t:'Doplněk ke stavebnici',s:'Autíčka, kuličky, figurky…'}]},
    {id:'rozp',sh:'Rozpočet',q:'Jaký máte rozpočet?',hint:'Počítáme s běžnou cenou bez slev.',opts:[
      {v:'r1',ico:'💰',t:'Do 1 500 Kč'},
      {v:'r2',ico:'💰💰',t:'1 500 – 3 000 Kč'},
      {v:'r3',ico:'💎',t:'Nad 3 000 Kč'},
      {v:'r0',ico:'♾️',t:'Bez omezení'}]},
    {id:'prio',sh:'Priorita',q:'Co je pro vás při výběru nejdůležitější?',hint:'Poslední otázka – pak vám ukážeme výsledky.',opts:[
      {v:'magnety',ico:'🧲',t:'Co nejsilnější magnety',s:'Connetix, Learn & Grow, Coblo, Mideer'},
      {v:'cena',ico:'🏷️',t:'Příznivá cena',s:'PicassoTiles, Magna-Tiles'},
      {v:'vse',ico:'🤷',t:'Nemám preferenci'}]}
  ];

  var A={},step=0,shown=CFG.pageSize;

  /* ----- pravidla ----- */
  function mKdo(i,v){return v==='kluk'?!!S.kluk[i]:v==='holka'?!!S.holka[i]:!!S.vsichni[i];}
  function mVek(i,v){return v==='mlad'?!!S.vekA[i]:(!!S.vekA[i]||!!S.vekB[i]);}
  function mTyp(i,v){return !!S[v][i];}
  function mRozp(i,v){var p=P[i][2];return v==='r1'?p<=1500:v==='r2'?(p>1500&&p<=3000):v==='r3'?p>3000:true;}
  function mPrio(i,v){return v==='magnety'?!!S.magnety[i]:v==='cena'?!!S.cena[i]:true;}
  /* tvrdé vyloučení i pro tipy: typ, věk 2–5 bez sad jen pro 6–12, produkty určené jen opačnému pohlaví */
  function hard(i){
    if(!mTyp(i,A.typ))return false;
    if(A.vek==='mlad'&&S.vekB[i]&&!S.vekA[i])return false;
    if(A.kdo==='kluk'&&S.holka[i]&&!S.kluk[i])return false;
    if(A.kdo==='holka'&&S.kluk[i]&&!S.holka[i])return false;
    return true;
  }
  function compute(){
    var exact=[],tips=[];
    ALL.forEach(function(i){
      if(!hard(i))return;
      var r=mRozp(i,A.rozp),pr=mPrio(i,A.prio),kd=mKdo(i,A.kdo),ve=mVek(i,A.vek);
      if(r&&pr&&kd&&ve)exact.push(i);
      else tips.push({i:i,sc:(r?8:0)+(pr?4:0)+(kd?2:0)+(ve?1:0),r:r});
    });
    exact.sort(byPrice);
    tips.sort(function(a,b){return b.sc-a.sc||P[a.i][2]-P[b.i][2];});
    if(exact.length>=CFG.minExact)tips=[];
    else tips=tips.slice(0,CFG.maxTips);
    return {exact:exact,tips:tips};
  }
  function maxB(){return A.rozp==='r1'?1500:A.rozp==='r2'?3000:1e9;}
  function byPrice(a,b){return P[a][2]-P[b][2];}

  /* ----- pomocné ----- */
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function kc(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' Kč';}
  function url(i){return CFG.base+'/'+P[i][0]+'/';}
  function optLabel(qi,v){var o=Q[qi].opts;for(var j=0;j<o.length;j++)if(o[j].v===v)return o[j].t;return v;}
  function scrollTop(){var r=root.getBoundingClientRect();if(r.top<0||r.top>window.innerHeight*.5)window.scrollTo({top:window.pageYOffset+r.top-100,behavior:'smooth'});}

  /* ----- otázky ----- */
  function renderQ(){
    var q=Q[step];
    var h='<div class="kkg-card"><div class="kkg-top"><button type="button" class="kkg-back"'+(step?'':' hidden')+'>← Zpět</button><span>Otázka '+(step+1)+' z '+Q.length+'</span></div>'+
      '<div class="kkg-bar"><span style="width:'+((step)/Q.length*100)+'%"></span></div>'+
      '<h2 class="kkg-q">'+esc(q.q)+'</h2><p class="kkg-hint">'+esc(q.hint)+'</p><div class="kkg-opts">';
    q.opts.forEach(function(o){
      h+='<button type="button" class="kkg-opt'+(A[q.id]===o.v?' is-sel':'')+'" data-v="'+o.v+'"><span class="kkg-ico" aria-hidden="true">'+o.ico+'</span><b>'+esc(o.t)+'</b>'+(o.s?'<small>'+esc(o.s)+'</small>':'')+'</button>';
    });
    h+='</div></div>';
    root.innerHTML=h;
    root.querySelector('.kkg-back').onclick=function(){if(step>0){step--;renderQ();}};
    [].forEach.call(root.querySelectorAll('.kkg-opt'),function(b){
      b.onclick=function(){
        A[q.id]=b.getAttribute('data-v');
        if(step<Q.length-1&&!A.__edit){step++;renderQ();}
        else{A.__edit=false;shown=CFG.pageSize;renderR();}
        scrollTop();
      };
    });
  }

  /* ----- výsledky ----- */
  function card(i,badge){
    return '<a class="kkg-p" href="'+esc(url(i))+'" data-i="'+i+'"><div class="kkg-img"><span class="kkg-ph" aria-hidden="true">🧲</span>'+(badge?'<span class="kkg-badge">'+esc(badge)+'</span>':'')+'</div>'+
      '<div class="kkg-body"><div class="kkg-name">'+esc(P[i][1])+'</div><div class="kkg-meta"><span class="kkg-price">'+kc(P[i][2])+'</span><span class="kkg-av"></span></div></div></a>';
  }
  function renderR(){
    var r=compute(),h='<div class="kkg-card"><div class="kkg-bar"><span style="width:100%"></span></div><div class="kkg-head"><h2 class="kkg-q" style="margin:0">'+
      (r.exact.length?'Tohle by mohlo sednout':'Přesnou shodu jsme nenašli')+'</h2></div><div class="kkg-chips">';
    Q.forEach(function(q,qi){h+='<button type="button" class="kkg-chip" data-q="'+qi+'"><span>'+esc(q.sh)+':</span> '+esc(optLabel(qi,A[q.id]))+' ✎</button>';});
    h+='</div>';
    if(r.exact.length){
      h+='<div class="kkg-grid">'+r.exact.slice(0,shown).map(function(i){return card(i);}).join('')+'</div>';
      if(r.exact.length>shown)h+='<div class="kkg-more"><button type="button" class="kkg-btn kkg-btn--g kkg-showmore">Zobrazit další ('+(r.exact.length-shown)+')</button></div>';
    }else{
      h+='<p class="kkg-note">Všem odpovědím zároveň neodpovídá žádný produkt. Níže jsou nejbližší varianty – klepnutím na odpověď nahoře ji můžete změnit.</p>';
    }
    if(r.tips.length){
      if(r.exact.length)h+='<h3 class="kkg-sub">Mohlo by se také hodit</h3><p style="margin:0 0 16px;opacity:.8">Splňují většinu vašich odpovědí.</p>';
      h+='<div class="kkg-grid">'+r.tips.map(function(t){return card(t.i,t.r?'':(P[t.i][2]>maxB()?'Nad rozpočet':'Levnější varianta'));}).join('')+'</div>';
    }
    h+='<div class="kkg-foot"><button type="button" class="kkg-btn kkg-btn--p kkg-restart">Začít znovu</button><a class="kkg-btn kkg-btn--g" href="'+esc(CFG.contactUrl)+'">Poradit se s námi</a></div></div>';
    root.innerHTML=h;
    [].forEach.call(root.querySelectorAll('.kkg-chip'),function(c){c.onclick=function(){step=+c.getAttribute('data-q');A.__edit=true;renderQ();scrollTop();};});
    var sm=root.querySelector('.kkg-showmore');if(sm)sm.onclick=function(){shown+=CFG.pageSize;renderR();};
    root.querySelector('.kkg-restart').onclick=function(){A={};step=0;renderQ();scrollTop();};
    if(CFG.loadDetails)[].forEach.call(root.querySelectorAll('.kkg-p'),function(a){details(+a.getAttribute('data-i'),a);});
  }

  /* ----- detail produktu (obrázek, aktuální cena, dostupnost) ----- */
  var cache={},queue=[],running=0;
  function details(i,el){
    if(cache[i]){paint(el,cache[i]);return;}
    queue.push([i,el]);pump();
  }
  function pump(){
    while(running<4&&queue.length){
      (function(job){
        var i=job[0];running++;
        if(cache[i]){paint(job[1],cache[i]);running--;pump();return;}
        fetch(url(i),{credentials:'same-origin'}).then(function(r){return r.ok?r.text():'';}).then(function(html){
          var d=new DOMParser().parseFromString(html,'text/html'),o={};
          var im=d.querySelector('meta[property="og:image"]');o.img=im&&im.getAttribute('content');
          var pr=d.querySelector('meta[itemprop="price"]');if(pr){var n=parseFloat(String(pr.getAttribute('content')).replace(',','.'));if(n>0)o.price=n;}
          var av=d.querySelector('.availability-label, .availability-value, [data-testid="labelAvailability"]');
          if(av){o.av=av.textContent.replace(/\s+/g,' ').trim();o.ok=/skladem/i.test(o.av)&&!/není|neni/i.test(o.av);}
          cache[i]=o;
        }).catch(function(){cache[i]={};}).then(function(){
          [].forEach.call(root.querySelectorAll('.kkg-p[data-i="'+i+'"]'),function(e){paint(e,cache[i]);});
          running--;pump();
        });
      })(queue.shift());
    }
  }
  function paint(el,o){
    if(o.img&&!el.querySelector('img')){var box=el.querySelector('.kkg-img'),ph=box.querySelector('.kkg-ph');var img=new Image();img.alt='';img.loading='lazy';img.src=o.img;img.onload=function(){if(ph)ph.remove();};box.insertBefore(img,box.firstChild);}
    var i=+el.getAttribute('data-i');
    if(o.price&&Math.round(o.price)<P[i][2])el.querySelector('.kkg-price').innerHTML=kc(o.price)+'<s>'+kc(P[i][2])+'</s>';
    if(o.av){var a=el.querySelector('.kkg-av');a.textContent=o.av;if(o.ok)a.className='kkg-av is-ok';}
  }

  /* předvyplnění z URL – posílá ho průvodce na homepage (?kdo=&vek=&typ=&rozp=&prio=) */
  (function(){
    var sp={};location.search.replace(/^\?/,'').split('&').forEach(function(p){var kv=p.split('=');if(kv[0])sp[decodeURIComponent(kv[0])]=decodeURIComponent(kv[1]||'');});
    Q.forEach(function(q){q.opts.forEach(function(o){if(sp[q.id]===o.v)A[q.id]=o.v;});});
    for(step=0;step<Q.length;step++)if(!A[Q[step].id])break;
  })();
  if(step>=Q.length){step=Q.length-1;renderR();}else renderQ();
})();
