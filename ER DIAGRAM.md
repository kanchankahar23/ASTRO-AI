#  AstroAI — AI-Powered Astrology Platform 
#  Entity Relationship Diagram

---

## Visual ER Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           ASTROAI PLATFORM                                          │
│                                                                                     │
│                           DATABASE SCHEMA                                           │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘

                          ┌─────────────────────┐
                          │        USER         │
                          │    (MongoDB Atlas)  │
                          │                     │
                          │  • _id (PK)         │
                          │  • name             │
                          │  • email            │
                          │  • password         │
                          │  • zodiacSign       │
                          │  • dob              │
                          │  • createdAt        │
                          │                     │
                          │  Auth via JWT       │
                          └──────────┬──────────┘
                                     │
                                     │  Creates/Owns
                                     │  (1:N)
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
              ▼                      ▼                      ▼
┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
│     HOROSCOPES      │ │    BIRTH_CHARTS      │ │   CHAT_HISTORIES    │
│                     │ │                     │ │                     │
│ ┌─────────────────┐ │ │ ┌─────────────────┐ │ │ ┌─────────────────┐ │
│ │  _id (PK)       │ │ │ │  _id (PK)       │ │ │ │  _id (PK)       │ │
│ │  ObjectId/CUID  │ │ │ │  ObjectId/CUID  │ │ │ │  ObjectId/CUID  │ │
│ └─────────────────┘ │ │ └─────────────────┘ │ │ └─────────────────┘ │
│                     │ │                     │ │                     │
│  • userId (FK)      │ │  • userId (FK)      │ │  • userId (FK)      │
│  • zodiacSign       │ │  • dob              │ │  • messages[]       │
│  • date             │ │  • tob              │ │    - role           │
│  • content          │ │  • pob              │ │    - content        │
│  • aiModel          │ │  • sunSign          │ │    - timestamp      │
│  • createdAt        │ │  • moonSign         │ │  • createdAt        │
│  • updatedAt        │ │  • risingSign       │ │  • updatedAt        │
│                     │ │  • createdAt        │ │                     │
│                     │ │  • updatedAt        │ │                     │
└─────────────────────┘ └─────────────────────┘ └─────────────────────┘
              │                      │                      │
              │                      │                      │
              ▼                      ▼                      ▼
┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
│    Gemini / Groq    │ │  Astronomy Calc     │ │  Gemini / Groq AI   │
│                     │ │                     │ │                     │
│  • AI Horoscope     │ │  • Planet Positions │ │  • Chat Response    │
│  • Text Generation  │ │  • Sign Calculation │ │  • Context-Aware    │
│  • Groq Inference   │ │  • DOB Processing   │ │  • Multi-turn       │
└─────────────────────┘ └─────────────────────┘ └─────────────────────┘


┌─────────────────────┐
│    ZODIAC_SIGNS     │
│  (Lookup / Seeded)  │
│                     │
│ ┌─────────────────┐ │
│ │  _id (PK)       │ │
│ │  ObjectId/CUID  │ │
│ └─────────────────┘ │
│                     │
│  • name (UNIQUE)    │
│  • symbol           │
│  • element          │
│  • dates            │
│  • traits[]         │
│  • rulingPlanet     │
│  • description      │
│  • compatibility[]  │
│  • updatedAt        │
└─────────────────────┘
         │
         │ Referenced by zodiacSign
         │ string field in other docs
         ▼
   (Standalone lookup —
    no FK constraint in MongoDB)
```

---

## Detailed Entity Specifications

### 1. USER Entity

```
┌─────────────────────────────────────────────────────────────┐
│                        USER COLLECTION                      │
├───────────────┬──────────────┬────────────────┬────────────┤
│ Field Name    │ Data Type    │ Constraints    │ Description│
├───────────────┼──────────────┼────────────────┼────────────┤
│ _id           │ ObjectId     │ PK, auto       │ Unique ID  │
│ name          │ String       │ required       │ Full name  │
│ email         │ String       │ required,unique│ Email addr │
│ password      │ String       │ required       │ bcrypt hash│
│ zodiacSign    │ String       │ optional       │ Sun sign   │
│ dob           │ String       │ optional       │ Birth date │
│ createdAt     │ Date         │ default: now   │ Created    │
│ updatedAt     │ Date         │ auto-update    │ Modified   │
└───────────────┴──────────────┴────────────────┴────────────┘
```

Indexes:
- `PRIMARY KEY (_id)`
- `UNIQUE INDEX (email)`
- `INDEX (zodiacSign)` — for sign-based filtering

---

### 2. HOROSCOPES Entity

```
┌─────────────────────────────────────────────────────────────┐
│                    HOROSCOPES COLLECTION                    │
├───────────────┬──────────────┬────────────────┬────────────┤
│ Field Name    │ Data Type    │ Constraints    │ Description│
├───────────────┼──────────────┼────────────────┼────────────┤
│ _id           │ ObjectId     │ PK, auto       │ Unique ID  │
│ userId        │ ObjectId     │ required, FK   │ Ref: User  │
│ zodiacSign    │ String       │ required       │ Sign name  │
│ date          │ String       │ required       │ For date   │
│ content       │ String       │ required       │ AI text    │
│ aiModel       │ String       │ default:gemini │ AI source  │
│ createdAt     │ Date         │ default: now   │ Created    │
│ updatedAt     │ Date         │ auto-update    │ Modified   │
└───────────────┴──────────────┴────────────────┴────────────┘
```

Indexes:
- `PRIMARY KEY (_id)`
- `INDEX (userId)` — for user history queries
- `INDEX (createdAt DESC)` — for recent horoscopes
- `INDEX (zodiacSign)` — for sign-based filtering

---

### 3. BIRTH_CHARTS Entity

```
┌─────────────────────────────────────────────────────────────┐
│                   BIRTH_CHARTS COLLECTION                   │
├───────────────┬──────────────┬────────────────┬────────────┤
│ Field Name    │ Data Type    │ Constraints    │ Description│
├───────────────┼──────────────┼────────────────┼────────────┤
│ _id           │ ObjectId     │ PK, auto       │ Unique ID  │
│ userId        │ ObjectId     │ required, FK   │ Ref: User  │
│ dob           │ String       │ required       │ Birth date │
│ tob           │ String       │ optional       │ Birth time │
│ pob           │ String       │ optional       │ Birth place│
│ sunSign       │ String       │ required       │ Sun sign   │
│ moonSign      │ String       │ optional       │ Moon sign  │
│ risingSign    │ String       │ optional       │ Rising sign│
│ createdAt     │ Date         │ default: now   │ Created    │
│ updatedAt     │ Date         │ auto-update    │ Modified   │
└───────────────┴──────────────┴────────────────┴────────────┘
```

Indexes:
- `PRIMARY KEY (_id)`
- `INDEX (userId)` — for user chart lookups
- `INDEX (createdAt DESC)` — for recent charts

---

### 4. CHAT_HISTORIES Entity

```
┌─────────────────────────────────────────────────────────────┐
│                  CHAT_HISTORIES COLLECTION                  │
├───────────────┬──────────────┬────────────────┬────────────┤
│ Field Name    │ Data Type    │ Constraints    │ Description│
├───────────────┼──────────────┼────────────────┼────────────┤
│ _id           │ ObjectId     │ PK, auto       │ Unique ID  │
│ userId        │ ObjectId     │ required, FK   │ Ref: User  │
│ messages      │ Array        │ required       │ Chat turns │
│  - role       │ String       │ user/assistant │ Sender     │
│  - content    │ String       │ required       │ Message    │
│  - timestamp  │ Date         │ default: now   │ Sent at    │
│ createdAt     │ Date         │ default: now   │ Created    │
│ updatedAt     │ Date         │ auto-update    │ Modified   │
└───────────────┴──────────────┴────────────────┴────────────┘
```

Indexes:
- `PRIMARY KEY (_id)`
- `INDEX (userId)` — for user chat history
- `INDEX (createdAt DESC)` — for recent sessions

---

### 5. ZODIAC_SIGNS Entity

```
┌─────────────────────────────────────────────────────────────┐
│                   ZODIAC_SIGNS COLLECTION                   │
├───────────────┬──────────────┬────────────────┬────────────┤
│ Field Name    │ Data Type    │ Constraints    │ Description│
├───────────────┼──────────────┼────────────────┼────────────┤
│ _id           │ ObjectId     │ PK, auto       │ Unique ID  │
│ name          │ String       │ required,unique│ Sign name  │
│ symbol        │ String       │ required       │ Unicode ♈  │
│ element       │ String       │ required       │ Fire/Earth │
│ dates         │ String       │ required       │ Date range │
│ traits        │ [String]     │ array          │ Personality│
│ rulingPlanet  │ String       │ optional       │ Planet     │
│ description   │ String       │ optional       │ Full desc  │
│ compatibility │ [String]     │ array          │ Compatible │
│ updatedAt     │ Date         │ auto-update    │ Modified   │
└───────────────┴──────────────┴────────────────┴────────────┘
```

Indexes:
- `PRIMARY KEY (_id)`
- `UNIQUE INDEX (name)` — sign names are unique
- `INDEX (element)` — for element-based filtering

---

## Relationship Diagram

```
                    ┌─────────────────┐
                    │      USER       │
                    │  (MongoDB Auth) │
                    └────────┬────────┘
                             │
                             │  userId (ObjectId ref)
                             │  1:N relationship
                             │
       ┌─────────────────────┼─────────────────────┐
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ HOROSCOPES  │    │  BIRTH_CHARTS    │    │ CHAT_HISTORIES  │
│             │    │                  │    │                 │
│ References  │    │  References      │    │ References      │
│ userId      │    │  userId          │    │ userId          │
│             │    │                  │    │                 │
│ No direct   │    │  No direct       │    │ No direct       │
│ FK (NoSQL)  │    │  FK (NoSQL)      │    │ FK (NoSQL)      │
└─────────────┘    └──────────────────┘    └─────────────────┘
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ Gemini/Groq │    │ Astronomy Calc   │    │ Gemini/Groq AI  │
│ AI API      │    │ Engine           │    │ Chatbot API     │
└─────────────┘    └──────────────────┘    └─────────────────┘
```

---

## Data Flow: User → Collections

```
User (JWT Auth)
     │
     ├── Generates Horoscope (1:N)
     │        └── Stores in HOROSCOPES collection
     │                  └── AI text via Gemini / Groq
     │
     ├── Creates Birth Chart (1:N)
     │        └── Stores in BIRTH_CHARTS collection
     │                  └── Planet calculation engine
     │
     └── Chats with Astrobot (1:N)
              └── Stores in CHAT_HISTORIES collection
                        └── Multi-turn Gemini / Groq response

ZODIAC_SIGNS (Seeded — standalone lookup)
     │
     └── Referenced by zodiacSign string in:
               ├── USERS.zodiacSign
               ├── HOROSCOPES.zodiacSign
               └── BIRTH_CHARTS.sunSign / moonSign / risingSign
```

---

## JSON Field Structures

### CHAT_HISTORIES.messages Array

```json
[
  {
    "role": "user",
    "content": "What does my Aries horoscope say for today?",
    "timestamp": "2025-03-23T10:30:00Z"
  },
  {
    "role": "assistant",
    "content": "As an Aries today, the stars align strongly...",
    "timestamp": "2025-03-23T10:30:02Z"
  }
]
```

### ZODIAC_SIGNS.traits Array

```json
{
  "name": "Aries",
  "symbol": "♈",
  "element": "Fire",
  "dates": "Mar 21 – Apr 19",
  "traits": ["courageous", "energetic", "confident", "impulsive"],
  "rulingPlanet": "Mars",
  "compatibility": ["Leo", "Sagittarius", "Gemini"]
}
```

### BIRTH_CHARTS computed fields

```json
{
  "userId": "64f2a3b1c5e7890abc123456",
  "dob": "2000-04-05",
  "tob": "14:30",
  "pob": "Jabalpur, India",
  "sunSign": "Aries",
  "moonSign": "Capricorn",
  "risingSign": "Virgo"
}
```

---

## Database Constraints and Rules

### Primary Keys
- All collections use MongoDB `ObjectId` (auto-generated)
- Mongoose uses `_id` by default

### Unique Constraints
- `USER.email` — no duplicate accounts
- `ZODIAC_SIGNS.name` — 12 unique sign names only

### Default Values
- `HOROSCOPES.aiModel` — `"gemini"`
- All `createdAt` fields — current timestamp
- All `updatedAt` fields — auto-update on modification

### Nullable / Optional Fields
- `USER.zodiacSign`, `USER.dob` — filled after profile setup
- `BIRTH_CHARTS.tob`, `BIRTH_CHARTS.pob` — optional for basic chart
- `BIRTH_CHARTS.moonSign`, `BIRTH_CHARTS.risingSign` — need time of birth

---

## Scalability Considerations

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  MongoDB Atlas  │   │  Primary Node   │   │  MongoDB Atlas  │
│  Read Replica   │   │  (Writes/Reads) │   │  Read Replica   │
│  (Queries)      │   │                 │   │  (Queries)      │
└─────────────────┘   └─────────────────┘   └─────────────────┘
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               │
                  ┌────────────▼────────────┐
                  │    Connection Pool      │
                  │    (Mongoose ODM)       │
                  └─────────────────────────┘
```

---
