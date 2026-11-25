const lessons = [
  {
    "id": "hello",
    "title": "Hello",
    "grammar": [
      [
        "Present Simple – szokások",
        "I play football every day.",
        "Mindennap focizom.",
        "He/she/it után az ige általában -s végződést kap. Kérdés: Do/Does + alany + ige? Tagadás: don’t/doesn’t + ige."
      ],
      [
        "Present Continuous – éppen most",
        "She is reading now.",
        "Most olvas.",
        "am/is/are + ige-ing. Kérdésben az am/is/are kerül előre."
      ],
      [
        "Past Simple – múlt",
        "We went to the cinema yesterday.",
        "Tegnap moziba mentünk.",
        "Szabályos igék: -ed; rendhagyó: go → went. Kérdés: Did + alany + alapige? Tagadás: didn’t + alapige."
      ],
      [
        "Comparison – melléknévfokozás",
        "Tom is taller than Ben.",
        "Tom magasabb Bennél.",
        "tall – taller – the tallest; easy – easier – the easiest; expensive – more expensive – the most expensive; good – better – the best; bad – worse – the worst. Azonos fok: as tall as."
      ],
      [
        "Időhatározók",
        "I get up at seven on Monday.",
        "Hétfőn hétkor kelek.",
        "at seven, at the weekend; on Monday, on weekdays; in the morning."
      ],
      [
        "Mikor történt?",
        "Where were you yesterday? I was at home.",
        "Hol voltál tegnap? Otthon voltam.",
        "A be múlt ideje was vagy were. Ezekkel közvetlenül kérdezünk. Más igével a did után alapige áll. A can múlt ideje could, tagadva couldn’t."
      ],
      [
        "Összehasonlítás",
        "This film is not as exciting as the book.",
        "Ez a film nem olyan izgalmas, mint a könyv.",
        "Középfok után than, azonos foknál as … as áll. Felsőfoknál: the fastest in our class vagy the fastest of the three."
      ]
    ],
    "reading": [
      [
        "Jennifer enjoys watching sitcoms.",
        "Jennifer szeret vígjátéksorozatokat nézni.",
        "Dzsenifer indzsojz vocsing szitkomz."
      ],
      [
        "Her favourite show is called Flatmates.",
        "A kedvenc műsorának címe Flatmates.",
        "Hör féjvörit sóu iz kóld Fletméjtsz."
      ],
      [
        "Mark goes skateboarding in his free time.",
        "Mark a szabadidejében gördeszkázik.",
        "Márk góuz szkéjtbórding in hiz frí tájm."
      ],
      [
        "At weekends he meets his friends at the skatepark.",
        "Hétvégén a gördeszkaparkban találkozik a barátaival.",
        "Et víkendz hí mítsz hiz frendz et dö szkéjtpárk."
      ],
      [
        "What do you usually do after school?",
        "Te mit szoktál csinálni iskola után?",
        "Vot du jú júzsuöli dú áfter szkúl?"
      ],
      [
        "Imagine this: you usually ride your bike, but today you are reading.",
        "Képzeld el: általában biciklizel, de ma éppen olvasol.",
        "Imedzsin disz: jú júzsuöli rájd jor bájk, bat tödéj jú ár ríding."
      ],
      [
        "Yesterday you went to an amusement park and had a milkshake.",
        "Tegnap elmentél egy vidámparkba, és ittál egy tejturmixot.",
        "Jesztördéj jú vent tu ön ömjúzmönt párk end hed ö milkséjk."
      ],
      [
        "Which was more exciting: the bike ride or the roller coaster?",
        "Melyik volt izgalmasabb: a biciklizés vagy a hullámvasutazás?",
        "Vics voz mór ikszájting: dö bájk rájd ór dö róulör kóusztör?"
      ]
    ],
    "q": [
      [
        "She ___ TV every day.",
        "watches",
        "watch",
        "is watch"
      ],
      [
        "Look! Ben ___ his bike.",
        "is riding",
        "rides",
        "ride"
      ],
      [
        "We ___ to the cinema yesterday.",
        "went",
        "go",
        "going"
      ],
      [
        "My bike is ___ than yours.",
        "faster",
        "fastest",
        "fast"
      ],
      [
        "This is the ___ book in the shop.",
        "most expensive",
        "more expensive",
        "expensive"
      ],
      [
        "I get up ___ seven.",
        "at",
        "on",
        "in"
      ],
      [
        "___ you play football yesterday?",
        "Did",
        "Do",
        "Are"
      ],
      [
        "He ___ tidy his room on Mondays.",
        "doesn’t",
        "don’t",
        "isn’t"
      ],
      [
        "What does Mark do in his free time?",
        "He goes skateboarding.",
        "He reads books.",
        "He plays tennis."
      ],
      [
        "Jennifer enjoys watching ___.",
        "sitcoms",
        "football",
        "the news"
      ],
      [
        "My sister is as tall ___ me.",
        "as",
        "than",
        "from"
      ],
      [
        "good – better – ___",
        "the best",
        "the goodest",
        "the better"
      ],
      [
        "Last night I ___ send the email because my phone was off.",
        "couldn’t",
        "can’t",
        "don’t"
      ],
      [
        "Which is correct? Choose the whole sentence.",
        "Where were you yesterday?",
        "Where did you were yesterday?",
        "Where are you yesterday?"
      ],
      [
        "Ella is the fastest runner ___ our class.",
        "in",
        "than",
        "as"
      ],
      [
        "Of all my friends, Eva is the ___.",
        "friendliest",
        "friendlier",
        "friendly"
      ],
      [
        "We often play basketball ___ the afternoon.",
        "in",
        "on",
        "at"
      ],
      [
        "Where ___ you yesterday afternoon?",
        "were",
        "did",
        "are"
      ],
      [
        "She tried to open the app, but she ___.",
        "couldn’t",
        "doesn’t",
        "isn’t"
      ]
    ],
    "writing": [
      [
        "Mindennap focizom. Használd az every day kifejezést!",
        "I play football every day.",
        "I play soccer every day.",
        "Every day I play football.",
        "Every day I play soccer."
      ],
      [
        "Most olvasok.",
        "I am reading now.",
        "I am reading right now.",
        "I am reading at the moment."
      ],
      [
        "Tegnap moziba mentünk.",
        "We went to the cinema yesterday.",
        "Yesterday we went to the cinema.",
        "We went to the movies yesterday.",
        "Yesterday we went to the movies.",
        "We went to the movie theater yesterday."
      ],
      [
        "Mit csináltál a múlt hétvégén? Írj múlt idejű kérdést!",
        "What did you do last weekend?"
      ],
      [
        "Rendezd mondattá: is / Ben / now / cooking",
        "Ben is cooking now.",
        "Now Ben is cooking."
      ]
    ],
    "theme": "Szabadidő, szokások és élmények",
    "short": [
      [
        "Mark likes skateboarding.",
        "Mark szeret gördeszkázni.",
        "Márk lájksz szkéjtbórding."
      ],
      [
        "Jennifer watches sitcoms.",
        "Jennifer vígjátéksorozatokat néz.",
        "Dzsenifer vocsiz szitkomz."
      ],
      [
        "They talk about their free time.",
        "A szabadidejükről beszélgetnek.",
        "Déj tók öbáut der frí tájm."
      ]
    ],
    "vocab": [
      [
        "free time",
        "szabadidő",
        "frí tájm"
      ],
      [
        "hang out",
        "együtt tölti az időt",
        "heng áut"
      ],
      [
        "sitcom",
        "vígjátéksorozat",
        "szitkom"
      ],
      [
        "skateboarding",
        "gördeszkázás",
        "szkéjtbórding"
      ],
      [
        "wake up",
        "felébred",
        "véjk áp"
      ],
      [
        "tidy",
        "rendet rak",
        "tájdi"
      ],
      [
        "weekday",
        "hétköznap",
        "víkdéj"
      ],
      [
        "ride a bike",
        "biciklizik",
        "rájd ö bájk"
      ],
      [
        "clean the windows",
        "ablakot tisztít",
        "klín dö vindóuz"
      ],
      [
        "arts and crafts",
        "kézműveskedés",
        "ártsz end kreftsz"
      ],
      [
        "amusement park",
        "vidámpark",
        "ömjúzmönt párk"
      ],
      [
        "roller coaster",
        "hullámvasút",
        "róulör kóusztör"
      ],
      [
        "milkshake",
        "tejturmix",
        "milkséjk"
      ],
      [
        "download",
        "letölt",
        "dáunlóud"
      ],
      [
        "expensive",
        "drága",
        "ikszpensziv"
      ],
      [
        "difficult",
        "nehéz",
        "difikölt"
      ],
      [
        "exciting",
        "izgalmas",
        "ikszájting"
      ],
      [
        "boring",
        "unalmas",
        "bóring"
      ]
    ],
    "readQs": [
      [
        "What does Mark enjoy?",
        "Skateboarding.",
        "Swimming.",
        "Cooking."
      ],
      [
        "What does Jennifer watch?",
        "Sitcoms.",
        "Sports programmes.",
        "The news."
      ],
      [
        "Where does Mark meet his friends?",
        "At the skatepark.",
        "At school.",
        "At the cinema."
      ],
      [
        "In the imaginary example, what are you doing today?",
        "Reading.",
        "Riding a bike.",
        "Watching TV."
      ]
    ],
    "listen": [
      [
        "I usually walk to school, but today I am riding my bike.",
        "Hogyan megy ma iskolába a beszélő?",
        "Biciklivel.",
        "Gyalog.",
        "Busszal."
      ],
      [
        "We went to the park on Saturday. On Sunday we stayed at home.",
        "Melyik napon mentek a parkba?",
        "Szombaton.",
        "Vasárnap.",
        "Pénteken."
      ],
      [
        "I like both sports, but basketball is more exciting for me than tennis.",
        "Melyik sportot találja izgalmasabbnak?",
        "A kosárlabdát.",
        "A teniszt.",
        "Mindkettőt egyformán."
      ]
    ],
    "talk": [
      "Szabadidő és élménybeszámoló",
      "Kérdezzétek meg egymástól, mit szoktatok csinálni, és mit csináltatok tegnap! Hasonlítsatok össze két elfoglaltságot.",
      "What do you do after school? / What did you do yesterday? / For me, cycling is more exciting than running."
    ]
  },
  {
    "id": "1a",
    "title": "1a · The Recyclables",
    "grammar": [
      [
        "Be going to – terv és látható jel",
        "I am going to recycle these bottles.",
        "Újra fogom hasznosítani ezeket a palackokat.",
        "am/is/are + going to + alapige. Tagadás: am not/isn’t/aren’t going to. Kérdés: Are you going to recycle? Már eltervezett jövőbeli cselekvésre vagy jelenlegi jel alapján várható eseményre használjuk."
      ],
      [
        "Kérdés és rövid válasz",
        "Is she going to come? No, she isn’t.",
        "El fog jönni? Nem.",
        "A be megfelelő alakja az alany elé kerül. Kérdőszóval: What are you going to bring? – Mit fogsz hozni?"
      ]
    ],
    "reading": [
      [
        "Tom, an empty metal can, is looking forward to a new life.",
        "Tom, az üres fémdoboz, már várja az új életét.",
        "Tom, ön empti metöl ken, iz luking fórvörd tu ö njú lájf."
      ],
      [
        "Mrs Spencer usually recycles, so Tom imagines becoming part of a bike or a car.",
        "Spencerné általában szelektíven gyűjti a hulladékot, ezért Tom elképzeli, hogy egy bicikli vagy egy autó része lesz.",
        "Misziz Szpenször júzsuöli riszájkölz, szóu Tom imedzsinz bikaming párt öv ö bájk ór ö kár."
      ],
      [
        "But Sophie is doing the cleaning today, and Tom is worried.",
        "Ma viszont Sophie takarít, és Tom aggódik.",
        "Bat Szóufi iz dúing dö klíning tödéj, end Tom iz vörid."
      ],
      [
        "In the bathroom, Derek and Shirley wonder what will happen to them.",
        "A fürdőszobában Derek és Shirley azon gondolkodnak, mi lesz velük.",
        "In dö bethrúm, Derik end Sörli vandör vot vil hepön tu dem."
      ],
      [
        "People sometimes forget to recycle bathroom waste. Shirley’s sister Sonia ended up in the bin.",
        "Az emberek néha elfelejtik szelektíven gyűjteni a fürdőszobai hulladékot. Shirley testvére, Sonia is a szemetesben végezte.",
        "Pípl szamtájmz förget tu riszájköl bethrúm vészt. Sörliz szisztör Szónja endid áp in dö bin."
      ],
      [
        "Shirley would like to become a larger shampoo bottle.",
        "Shirley nagyobb samponos flakon szeretne lenni.",
        "Sörli vud lájk tu bikam ö lárdzsör sempú botöl."
      ],
      [
        "Derek dreams of becoming a stadium seat so he can watch football.",
        "Derek stadionülés szeretne lenni, hogy focimeccseket nézhessen.",
        "Derik drímz öv bikaming ö sztéjdiöm szít szóu hí ken vocs futból."
      ],
      [
        "Sophie takes out the rubbish, but Kim notices the bottles and cans.",
        "Sophie kiviszi a szemetet, de Kim észreveszi a palackokat és a fémdobozokat.",
        "Szóufi téjksz áut dö rabis, bat Kim nóutisziz dö botölz end kenz."
      ],
      [
        "Kim wants them to take these items to the recycling bins together.",
        "Kim azt szeretné, ha együtt vinnék el ezeket a tárgyakat a szelektív gyűjtőkhöz.",
        "Kim vontsz dem tu téjk díz ájtömz tu dö riszájkling binz tögedör."
      ]
    ],
    "q": [
      [
        "I ___ going to recycle paper.",
        "am",
        "is",
        "are"
      ],
      [
        "She ___ going to visit a friend.",
        "is",
        "am",
        "are"
      ],
      [
        "They ___ going to clean the house.",
        "are",
        "is",
        "am"
      ],
      [
        "___ you going to recycle glass?",
        "Are",
        "Do",
        "Is"
      ],
      [
        "He isn’t going to ___ the bottle away.",
        "throw",
        "throws",
        "throwing"
      ],
      [
        "Look at those dark clouds! It ___ rain.",
        "is going to",
        "are going to",
        "going to"
      ],
      [
        "What does Tom want?",
        "To be recycled.",
        "To watch TV.",
        "To buy a car."
      ],
      [
        "Who tells Sophie to recycle?",
        "Kim",
        "Tom",
        "Derek"
      ],
      [
        "Which material is üveg?",
        "glass",
        "paper",
        "plastic"
      ],
      [
        "Which word means szemét?",
        "rubbish",
        "seat",
        "bottle"
      ],
      [
        "Which item belongs with electronic devices?",
        "An old phone.",
        "A newspaper.",
        "A glass jar."
      ],
      [
        "Which is a plan for Saturday?",
        "We are going to sort the paper.",
        "We sorted paper yesterday.",
        "We usually sort paper."
      ],
      [
        "___ they going to visit the recycling centre?",
        "Are",
        "Do",
        "Will"
      ],
      [
        "Which recycling group is right for a newspaper?",
        "Paper.",
        "Glass.",
        "Plastic."
      ],
      [
        "Choose the right group for an empty jam jar made of glass.",
        "Glass.",
        "Paper.",
        "Metal cans."
      ],
      [
        "Which group is right for an empty drinks can made of aluminium?",
        "Metal cans.",
        "Electronic devices.",
        "Batteries."
      ],
      [
        "A used battery goes with ___.",
        "batteries",
        "paper",
        "glass"
      ],
      [
        "Sort an empty plastic shampoo bottle.",
        "Plastic.",
        "Metal cans.",
        "Glass."
      ]
    ],
    "writing": [
      [
        "Újra fogom hasznosítani a papírt. Használd a going to szerkezetet!",
        "I am going to recycle paper.",
        "I am going to recycle the paper."
      ],
      [
        "El fogjuk vinni a palackokat. Használd a going to szerkezetet!",
        "We are going to take the bottles.",
        "We are going to take the bottles away."
      ],
      [
        "Szombaton meglátogatom Kimet. Használd a going to szerkezetet!",
        "I am going to visit Kim on Saturday.",
        "On Saturday I am going to visit Kim."
      ],
      [
        "Rendezd kérdéssé: you / going / are / to / recycle / glass",
        "Are you going to recycle glass?"
      ]
    ],
    "theme": "Újrahasznosítás és hétvégi tervek",
    "short": [
      [
        "Tom is an empty can.",
        "Tom egy üres fémdoboz.",
        "Tom iz ön empti ken."
      ],
      [
        "He wants to be recycled.",
        "Azt szeretné, ha újrahasznosítanák.",
        "Hí vontsz tu bí riszájköld."
      ],
      [
        "Kim helps Sophie sort the rubbish.",
        "Kim segít Sophie-nak szétválogatni a szemetet.",
        "Kim helpsz Szóufi szórt dö rabis."
      ]
    ],
    "vocab": [
      [
        "recycle",
        "újrahasznosít",
        "riszájköl"
      ],
      [
        "rubbish",
        "szemét",
        "rabis"
      ],
      [
        "recycling bin",
        "szelektív hulladékgyűjtő",
        "riszájkling bin"
      ],
      [
        "plastic",
        "műanyag",
        "plásztik"
      ],
      [
        "glass",
        "üveg",
        "glász"
      ],
      [
        "paper",
        "papír",
        "péjpör"
      ],
      [
        "metal cans",
        "fémdobozok",
        "metöl kenz"
      ],
      [
        "batteries",
        "elemek",
        "betöriz"
      ],
      [
        "electronic devices",
        "elektronikus eszközök",
        "ilektronik divájsziz"
      ],
      [
        "throw away",
        "kidob",
        "thróu övéj"
      ],
      [
        "shampoo bottle",
        "samponos flakon",
        "sempú botöl"
      ],
      [
        "stadium seat",
        "stadionülés",
        "sztéjdiöm szít"
      ],
      [
        "take out the rubbish",
        "kiviszi a szemetet",
        "téjk áut dö rabis"
      ],
      [
        "tidy the house",
        "rendet rak a házban",
        "tájdi dö háusz"
      ]
    ],
    "readQs": [
      [
        "What is Tom?",
        "An empty metal can.",
        "A glass jar.",
        "A paper bag."
      ],
      [
        "Who helps Sophie sort the rubbish?",
        "Kim.",
        "Sonia.",
        "Tom."
      ],
      [
        "Why does Derek want to be a stadium seat?",
        "To watch football.",
        "To travel by bike.",
        "To be in a bathroom."
      ],
      [
        "What happened to Sonia?",
        "She went in the rubbish bin.",
        "She became a new bottle.",
        "She went to a stadium."
      ]
    ],
    "listen": [
      [
        "This is our school announcement. Please bring paper on Friday. Leave glass at home.",
        "Mit kérnek péntekre?",
        "Papírt.",
        "Üveget.",
        "Elemeket."
      ],
      [
        "Our recycling event starts at two and finishes at four. Meet us in the school garden.",
        "Hol lesz ez a program?",
        "Az iskola kertjében.",
        "A stadionban.",
        "Az üzletben."
      ],
      [
        "I am taking the old batteries to a special collection point. They cannot go in our paper bin.",
        "Hová kerülnek az elemek?",
        "Külön gyűjtőhelyre.",
        "A papírgyűjtőbe.",
        "Az udvarra."
      ]
    ],
    "talk": [
      "Hétvégi terv és újrahasznosítás",
      "Válassz két újrahasznosítható tárgyat! Beszéljétek meg, mit visztek el és hová.",
      "What are you going to bring? / I’m going to bring some old batteries."
    ],
    "poster": [
      "15 April",
      "Gladstone School",
      "Plastic · Glass · Metal · Paper",
      "A program vége: 18 óra."
    ]
  },
  {
    "id": "1b",
    "title": "1b · Future Technology",
    "grammar": [
      [
        "Will – jövő idő",
        "People will use flying cars.",
        "Az emberek repülő autókat fognak használni.",
        "will + alapige, minden személyben ugyanaz. Tagadás: won’t + alapige. Kérdés: Will you help me? Jóslat, spontán döntés, ígéret, felajánlás és kérés."
      ],
      [
        "Jóslat, ígéret és felajánlás",
        "I think it will rain. I promise I’ll call. I’ll carry your bag.",
        "Szerintem esni fog. Megígérem, hogy telefonálok. Viszem a táskádat.",
        "Az I think véleményt, az I promise ígéretet jelez. A helyzetre adott azonnali felajánlásnál is jó a will."
      ],
      [
        "Időt jelölő kifejezések",
        "In a few years from now, things may change.",
        "Néhány év múlva megváltozhatnak a dolgok.",
        "in the past = a múltban, in the future = a jövőben, in no time = pillanatok alatt, for sure = biztosan."
      ]
    ],
    "reading": [
      [
        "A printer that makes toys, jewellery or even parts for a plane once sounded like science fiction.",
        "Egy játékokat, ékszereket vagy akár repülőgép-alkatrészeket készítő nyomtató egykor tudományos fantasztikumnak hangzott.",
        "Ö printör det méjksz tojz, dzsúölri ór ívön pártsz for ö pléjn vansz száundid lájk szájönsz fiksön."
      ],
      [
        "A 3D printer builds a real object from a digital design.",
        "A 3D nyomtató egy digitális terv alapján valódi tárgyat készít.",
        "Ö thrí-dí printör bildz ö ríöl obdzsikt from ö didzsitöl dizájn."
      ],
      [
        "To print a pair of trainers, you need software and the right material.",
        "Egy pár edzőcipő kinyomtatásához szoftverre és megfelelő alapanyagra van szükséged.",
        "Tu print ö per öv tréjnörz, jú níd szoftver end dö rájt mötíriöl."
      ],
      [
        "If printers get cheaper, more families may use one at home.",
        "Ha a nyomtatók olcsóbbak lesznek, több család használhat majd otthon is ilyen gépet.",
        "If printörz get csípör, mór femöliz méj júz van et hóum."
      ],
      [
        "Perhaps one day printers will build whole cities, even beyond Earth.",
        "Talán egyszer egész városokat építenek majd a nyomtatók, akár a Földön kívül is.",
        "Pörhepsz van déj printörz vil bild hóul szitiz, ívön bijond örth."
      ],
      [
        "Would printing things at home change how often we go shopping?",
        "Ha otthon nyomtatnánk tárgyakat, vajon más gyakorisággal járnánk vásárolni?",
        "Vud printing thingz et hóum cséjndzs háu ofön ví góu soping?"
      ],
      [
        "Now imagine a car that can leave the road and take off like a helicopter.",
        "Most képzelj el egy autót, amely elhagyhatja az utat, és helikopterként felszállhat.",
        "Náu imedzsin ö kár det ken lív dö róud end téjk of lájk ö helikoptör."
      ],
      [
        "Flying over traffic jams might make city journeys easier.",
        "A forgalmi dugók feletti repülés megkönnyítheti a városi utazást.",
        "Flájing óuvör trefik dzsemz májt méjk sziti dzsörniz íziör."
      ],
      [
        "How safe will these cars be, and how much will they cost? We do not know yet.",
        "Mennyire lesznek biztonságosak ezek az autók, és mennyibe kerülnek majd? Ezt még nem tudjuk.",
        "Háu széjf vil díz kárz bí, end háu macs vil déj koszt? Ví dú not nóu jet."
      ]
    ],
    "q": [
      [
        "I think people ___ live on the Moon one day.",
        "will",
        "are",
        "did"
      ],
      [
        "I promise I ___ help you.",
        "will",
        "am",
        "do"
      ],
      [
        "He won’t ___ the film.",
        "watch",
        "watches",
        "watching"
      ],
      [
        "___ you carry my bag, please?",
        "Will",
        "Did",
        "Is"
      ],
      [
        "I’m hungry. I ___ make a sandwich.",
        "will",
        "am",
        "do"
      ],
      [
        "What can 3D printers make?",
        "Many objects.",
        "Only water.",
        "Nothing."
      ],
      [
        "What might flying cars help solve?",
        "Traffic problems.",
        "Homework.",
        "Illness."
      ],
      [
        "Which means felszáll?",
        "take off",
        "take out",
        "take back"
      ],
      [
        "___ the future",
        "in",
        "on",
        "at"
      ],
      [
        "She will ___ a photographer.",
        "be",
        "is",
        "being"
      ],
      [
        "They arrived ___ no time.",
        "in",
        "at",
        "from"
      ],
      [
        "Nobody knows ___ sure.",
        "for",
        "from",
        "in"
      ],
      [
        "A prediction about your life: In fifteen years I think I ___ live abroad.",
        "will",
        "did",
        "am"
      ],
      [
        "Choose a possible disadvantage of technology.",
        "Some devices cost a lot of money.",
        "A phone saves me time.",
        "Software can help me learn."
      ],
      [
        "Choose a request.",
        "Will you open the window, please?",
        "I promise I will call.",
        "They will travel tomorrow."
      ]
    ],
    "writing": [
      [
        "Segíteni fogok neked.",
        "I will help you."
      ],
      [
        "Nem fogom nézni a filmet.",
        "I will not watch the film.",
        "I will not watch the movie."
      ],
      [
        "Elviszel a repülőtérre?",
        "Will you drive me to the airport?",
        "Will you take me to the airport?"
      ],
      [
        "Rendezd kérdéssé: live / where / you / will",
        "Where will you live?"
      ],
      [
        "Írd a for sure kifejezést használva: Biztosan tudom.",
        "I know for sure.",
        "I know it for sure."
      ]
    ],
    "theme": "3D nyomtatók, repülő autók és jóslatok",
    "short": [
      [
        "A 3D printer can make toys.",
        "A 3D nyomtató játékokat tud készíteni.",
        "Ö thrí-dí printör ken méjk tojz."
      ],
      [
        "A flying car can use the road and the sky.",
        "Egy repülő autó az úton és a levegőben is közlekedhet.",
        "Ö flájing kár ken júz dö róud end dö szkáj."
      ],
      [
        "It may help people avoid traffic jams.",
        "Segíthet az embereknek elkerülni a forgalmi dugókat.",
        "It méj help pípl övojd trefik dzsemz."
      ]
    ],
    "vocab": [
      [
        "technology",
        "technológia",
        "teknolödzsi"
      ],
      [
        "invention",
        "találmány",
        "invensön"
      ],
      [
        "3D printer",
        "3D nyomtató",
        "thrí-dí printör"
      ],
      [
        "furniture",
        "bútor",
        "förnicsör"
      ],
      [
        "jewellery",
        "ékszer",
        "dzsúölri"
      ],
      [
        "spare parts",
        "alkatrészek",
        "szper pártsz"
      ],
      [
        "software",
        "szoftver",
        "szoftver"
      ],
      [
        "flying car",
        "repülő autó",
        "flájing kár"
      ],
      [
        "traffic jam",
        "forgalmi dugó",
        "trefik dzsem"
      ],
      [
        "take off",
        "felszáll",
        "téjk of"
      ],
      [
        "safe",
        "biztonságos",
        "széjf"
      ],
      [
        "solve",
        "megold",
        "szolv"
      ],
      [
        "in the past",
        "a múltban",
        "in dö pászt"
      ],
      [
        "in the future",
        "a jövőben",
        "in dö fjúcsör"
      ],
      [
        "in no time",
        "pillanatok alatt",
        "in nóu tájm"
      ],
      [
        "for sure",
        "biztosan",
        "för sur"
      ],
      [
        "from now",
        "mostantól számítva",
        "from náu"
      ]
    ],
    "readQs": [
      [
        "What can a 3D printer make?",
        "Toys.",
        "Rain.",
        "Sunlight."
      ],
      [
        "What might flying cars help people avoid?",
        "Traffic jams.",
        "Homework.",
        "Bad weather."
      ],
      [
        "What do you need to print trainers?",
        "A digital design and suitable material.",
        "Only a photo on paper.",
        "A helicopter."
      ],
      [
        "What is still uncertain about flying cars?",
        "Their price and safety.",
        "The meaning of the word car.",
        "The number of wheels on a bike."
      ]
    ],
    "listen": [
      [
        "Our printer made a toy yesterday. Tomorrow we are going to print a spare part for my bike.",
        "Mit nyomtatnak holnap?",
        "Egy biciklihez való alkatrészt.",
        "Játékot.",
        "Edzőcipőt."
      ],
      [
        "I think flying cars will save time, but I am worried about their price.",
        "Mi aggasztja a beszélőt?",
        "Az autók ára.",
        "A dugók hossza.",
        "A nyomtatás ideje."
      ],
      [
        "My bag is heavy. Will you carry it for me? Of course, I will help you.",
        "Mire kéri a beszélő a másikat?",
        "Vigye a táskáját.",
        "Vegyen egy táskát.",
        "Hívjon taxit."
      ]
    ],
    "talk": [
      "Találmányok és jóslatok",
      "Melyik találmány takarít meg neked időt? Mit gondolsz, milyen munkád lesz tizenöt év múlva?",
      "My phone saves me time because … / In fifteen years, I think I’ll …"
    ]
  },
  {
    "id": "1c",
    "title": "1c · In the Future",
    "grammar": [
      [
        "Will vagy going to?",
        "I am going to visit Grandma. / I’ll help you.",
        "Meg fogom látogatni a nagymamát. / Segítek neked.",
        "going to: előre eltervezett szándék vagy látható jel. will: véleményen alapuló jóslat, hirtelen döntés, ígéret, felajánlás. A szövegkörnyezet segít választani."
      ],
      [
        "Válaszolj a helyzetre",
        "These bags are heavy. I’ll help you.",
        "Ezek a táskák nehezek. Segítek.",
        "Most döntöttél a segítségről: will. Ha már előre megbeszéltétek a tervet: We are going to help on Saturday."
      ],
      [
        "Következmény és feltétel",
        "There is no soil, so we cannot grow vegetables.",
        "Nincs talaj, ezért nem tudunk zöldséget termeszteni.",
        "so = ezért, because = mert, if = ha. Ezekkel indokolhatod a saját elképzelésedet is."
      ]
    ],
    "reading": [
      [
        "Picture a day a hundred years from now. Your home is in a dome beneath the sea.",
        "Képzelj el egy napot száz év múlva! Az otthonod egy kupolában van a tenger alatt.",
        "Pikcsör ö déj ö handröd jírz from náu. Jor hóum iz in ö dóum biníth dö szí."
      ],
      [
        "Machines supply the air you breathe and the light you need.",
        "Gépek biztosítják a levegőt, amelyet belélegzel, és a szükséges fényt.",
        "Mösínz szöpláj di er jú bríd end dö lájt jú níd."
      ],
      [
        "There is no soil in this city, so growing vegetables is a problem.",
        "Ebben a városban nincs termőtalaj, ezért gondot okoz a zöldségtermesztés.",
        "Der iz nóu szojl in disz sziti, szóu gróuing vedzstöbölz iz ö problöm."
      ],
      [
        "Perhaps your lunch will be a pill. If the water is clean enough, fish may be on the menu too.",
        "Talán egy tabletta lesz az ebéded. Ha elég tiszta a víz, hal is kerülhet az étlapra.",
        "Pörhepsz jor lancs vil bí ö pil. If dö vótör iz klín inaf, fis méj bí on dö menjú tú."
      ],
      [
        "Computers and robots could shorten the working day.",
        "A számítógépek és a robotok lerövidíthetik a munkanapot.",
        "Kömpjútörz end róubotsz kud sórtön dö vörking déj."
      ],
      [
        "While a robot does the housework, you will have time to play your favourite sport.",
        "Miközben egy robot elvégzi a házimunkát, lesz időd a kedvenc sportodra.",
        "Vájl ö róubot daz dö háuszvörk, jú vil hev tájm tu pléj jor féjvörit szpórt."
      ],
      [
        "For a holiday, you might leave the sea and visit the Moon or another planet.",
        "A nyaralásra talán elhagyod a tengert, és a Holdra vagy egy másik bolygóra látogatsz.",
        "For ö holödéj, jú májt lív dö szí end vizit dö mún ór önadör plenit."
      ],
      [
        "Which part of this imagined future would you enjoy, and what would you miss?",
        "Ennek az elképzelt jövőnek melyik részét élveznéd, és mi hiányozna?",
        "Vics párt öv disz imedzsind fjúcsör vud jú indzsoj, end vot vud jú misz?"
      ]
    ],
    "q": [
      [
        "We have planned it. We ___ visit Grandma tomorrow.",
        "are going to",
        "will to",
        "going"
      ],
      [
        "Don’t worry. I ___ help you.",
        "will",
        "am",
        "did"
      ],
      [
        "I think robots ___ do our housework in 2050.",
        "will",
        "are",
        "did"
      ],
      [
        "She has a plan. She ___ take part in the event.",
        "is going to",
        "are going to",
        "will to"
      ],
      [
        "People may live under the ___.",
        "sea",
        "desk",
        "school"
      ],
      [
        "In this story, robots will help with ___.",
        "housework",
        "traffic lights",
        "the weather"
      ],
      [
        "Which means környezet?",
        "environment",
        "soil",
        "pill"
      ],
      [
        "Which means kölcsönkér?",
        "borrow",
        "bring",
        "buy"
      ],
      [
        "I promise I ___ bring it back.",
        "will",
        "am",
        "was"
      ],
      [
        "They are going to ___ their grandparents.",
        "visit",
        "visits",
        "visiting"
      ],
      [
        "Your friend says: I feel ill. Choose an offer.",
        "I’ll make you some soup.",
        "I made soup yesterday.",
        "I never eat soup."
      ],
      [
        "I bought the tickets yesterday. I ___ travel on Friday.",
        "am going to",
        "going to",
        "will to"
      ],
      [
        "Which sentence is a promise?",
        "I’ll bring your bike back tomorrow, I promise.",
        "My bike is green.",
        "I rode my bike yesterday."
      ],
      [
        "The water is too polluted, ___ people cannot eat the fish.",
        "so",
        "because",
        "if"
      ],
      [
        "I need to borrow your bike. Choose a suitable reply.",
        "Will you bring it back tonight?",
        "It will rain on the Moon.",
        "She likes fish."
      ]
    ],
    "writing": [
      [
        "A robotok segíteni fognak nekünk.",
        "Robots will help us."
      ],
      [
        "Holnap meg fogom látogatni a nagymamámat. Használd a going to szerkezetet!",
        "I am going to visit my grandmother tomorrow.",
        "Tomorrow I am going to visit my grandmother.",
        "I am going to visit my grandma tomorrow.",
        "Tomorrow I am going to visit my grandma."
      ],
      [
        "Rendezd mondattá: will / do / robots / the / washing-up",
        "Robots will do the washing-up."
      ],
      [
        "Írd angolul a will segítségével: Hol fognak élni az emberek?",
        "Where will people live?"
      ]
    ],
    "theme": "Élet a tenger alatt és a távoli jövőben",
    "short": [
      [
        "Imagine a city under the sea.",
        "Képzelj el egy várost a tenger alatt!",
        "Imedzsin ö sziti andör dö szí."
      ],
      [
        "People live in domes there.",
        "Az emberek ott kupolákban élnek.",
        "Pípl liv in dóumz der."
      ],
      [
        "Robots do the housework.",
        "A robotok végzik a házimunkát.",
        "Róubotsz dú dö háuszvörk."
      ]
    ],
    "vocab": [
      [
        "dome",
        "kupola",
        "dóum"
      ],
      [
        "environment",
        "környezet",
        "invájrönmönt"
      ],
      [
        "soil",
        "talaj",
        "szojl"
      ],
      [
        "pill",
        "tabletta",
        "pil"
      ],
      [
        "polluted",
        "szennyezett",
        "pölútid"
      ],
      [
        "underwater",
        "víz alatti",
        "andörvótör"
      ],
      [
        "grow food",
        "élelmet termeszt",
        "gróu fúd"
      ],
      [
        "housework",
        "házimunka",
        "háuszvörk"
      ],
      [
        "planet",
        "bolygó",
        "plenit"
      ],
      [
        "moon",
        "hold",
        "mún"
      ],
      [
        "washing-up",
        "mosogatás",
        "vosing áp"
      ],
      [
        "take part",
        "részt vesz",
        "téjk párt"
      ],
      [
        "bring",
        "hoz",
        "bring"
      ],
      [
        "borrow",
        "kölcsönkér",
        "boróu"
      ],
      [
        "promise",
        "megígér",
        "promisz"
      ]
    ],
    "readQs": [
      [
        "Where is the imaginary city?",
        "Under the sea.",
        "Inside a mountain.",
        "On the Moon."
      ],
      [
        "Who does the housework?",
        "Robots.",
        "Tourists.",
        "Fishers."
      ],
      [
        "Why is growing food difficult?",
        "There is no soil.",
        "The days are too short.",
        "The robots eat the plants."
      ],
      [
        "When might people eat fish?",
        "If the water is clean enough.",
        "Only when it rains.",
        "If the city has soil."
      ]
    ],
    "listen": [
      [
        "In my future home, a robot will wash the dishes. I want to cook dinner myself.",
        "Mit fog csinálni a robot?",
        "Mosogat.",
        "Vacsorát főz.",
        "Bevásárol."
      ],
      [
        "We are going to visit our grandparents this weekend. Our tickets are ready.",
        "Mit terveznek a hétvégére?",
        "Meglátogatják a nagyszüleiket.",
        "A Holdra utaznak.",
        "Kirándulnak az iskolával."
      ],
      [
        "I think people will have more free time because robots will do some of their work.",
        "Miért lehet több szabadidejük az embereknek?",
        "A robotok átveszik a munka egy részét.",
        "Rövidebbek lesznek a napok.",
        "Mindenki a Holdon fog élni."
      ]
    ],
    "talk": [
      "Vélemény a jövőről",
      "Szívesen élnél egy víz alatti városban? Milyen munkát bíznál robotokra? Indokold a válaszodat!",
      "I would like to live there because … / I think robots will …"
    ]
  }
];
