// Mock data for document analysis history
export const MOCK_DOCUMENT_HISTORY = [
  {
    id: "doc-001",
    title: "Perkara Pidana No. 123/PID/2023",
    type: "Pidana",
    date: "2023-12-15T10:30:00",
    status: "completed",
    confidence: 87,
    summary:
      "Kasus pencurian dengan pemberatan di wilayah Jakarta Selatan",
    keywords: ["pencurian", "pemberatan", "Jakarta Selatan"],
    relatedCases: ["doc-003", "doc-008"],
  },
  {
    id: "doc-002",
    title: "Perkara Perdata No. 456/PDT/2023",
    type: "Perdata",
    date: "2023-12-10T14:45:00",
    status: "completed",
    confidence: 92,
    summary: "Gugatan perdata terkait sengketa tanah di Bandung",
    keywords: ["sengketa", "tanah", "gugatan", "Bandung"],
    relatedCases: ["doc-007"],
  },
  {
    id: "doc-003",
    title: "Perkara Pidana No. 789/PID/2023",
    type: "Pidana",
    date: "2023-11-25T09:15:00",
    status: "completed",
    confidence: 78,
    summary: "Kasus penipuan online dengan kerugian material",
    keywords: ["penipuan", "online", "kerugian material"],
    relatedCases: ["doc-001"],
  },
  {
    id: "doc-004",
    title: "Surat Edaran Mahkamah Agung No. 12/2023",
    type: "Administrasi",
    date: "2023-11-20T13:20:00",
    status: "completed",
    confidence: 95,
    summary:
      "Tata cara pelaksanaan sidang secara elektronik di masa pandemi",
    keywords: ["sidang elektronik", "pandemi", "tata cara"],
    relatedCases: [],
  },
  {
    id: "doc-005",
    title: "Perkara Tata Usaha Negara No. 234/TUN/2023",
    type: "TUN",
    date: "2023-11-05T11:00:00",
    status: "completed",
    confidence: 84,
    summary:
      "Gugatan terhadap keputusan pejabat tata usaha negara di Surabaya",
    keywords: ["gugatan", "keputusan", "pejabat", "Surabaya"],
    relatedCases: [],
  },
];

// Mock data for document categories with counts
export const DOCUMENT_CATEGORIES = [
  { name: "Pidana", count: 127, color: "red" },
  { name: "Perdata", count: 89, color: "blue" },
  { name: "TUN", count: 45, color: "green" },
  { name: "Administrasi", count: 32, color: "yellow" },
  { name: "Lainnya", count: 18, color: "grape" },
];

// Mock data for analysis results
export const MOCK_ANALYSIS_RESULTS = {
  documentInfo: {
    title: "Perkara Pidana No. 123/PID/2023",
    fileType: "PDF",
    pageCount: 15,
    wordCount: 4520,
    uploadDate: "15 Des 2023",
    lastAnalyzed: "15 Des 2023",
  },
  keyTerms: [
    { term: "pencurian", frequency: 28, relevance: 0.92 },
    { term: "pemberatan", frequency: 15, relevance: 0.87 },
    { term: "Pasal 363 KUHP", frequency: 12, relevance: 0.85 },
    { term: "Jakarta Selatan", frequency: 10, relevance: 0.72 },
    { term: "barang bukti", frequency: 8, relevance: 0.68 },
  ],
  sentimentAnalysis: {
    positive: 12,
    neutral: 75,
    negative: 13,
  },
  categoryPrediction: [
    { category: "Pidana", probability: 0.87 },
    { category: "Pencurian", probability: 0.82 },
    { category: "Pemberatan", probability: 0.76 },
  ],
  relatedDocuments: [
    {
      id: "doc-003",
      title: "Perkara Pidana No. 789/PID/2023",
      similarity: 0.78,
    },
    {
      id: "doc-008",
      title: "Perkara Pidana No. 562/PID/2022",
      similarity: 0.65,
    },
  ],
  summary:
    "Dokumen ini berisi perkara pidana terkait pencurian dengan pemberatan yang terjadi di wilayah Jakarta Selatan. Terdakwa didakwa melanggar Pasal 363 KUHP dengan barang bukti berupa peralatan untuk melakukan pencurian. Perkara ini memiliki kemiripan dengan beberapa kasus pencurian lainnya yang terjadi di lokasi yang sama dalam kurun waktu berdekatan.",
};
