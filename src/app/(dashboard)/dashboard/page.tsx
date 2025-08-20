"use client";

import {
  Box,
  Container,
  Stack,
  Text,
  Paper,
  Flex,
  Button,
  Card,
  Grid,
  Badge,
  Tabs,
  FileInput,
  Group,
  Divider,
  Timeline,
  ScrollArea,
  ActionIcon,
  Spoiler,
} from "@mantine/core";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { notifications } from "@mantine/notifications";

// Mock data for document analysis history
const MOCK_DOCUMENT_HISTORY = [
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
const DOCUMENT_CATEGORIES = [
  { name: "Pidana", count: 127, color: "red" },
  { name: "Perdata", count: 89, color: "blue" },
  { name: "TUN", count: 45, color: "green" },
  { name: "Administrasi", count: 32, color: "yellow" },
  { name: "Lainnya", count: 18, color: "grape" },
];

// Mock data for analysis results
const MOCK_ANALYSIS_RESULTS = {
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
    "Dokumen ini berisi perkara pidana terkait pencurian dengan pemberatan yang terjadi di wilayah Jakarta Selatan. Terdakwa didakwa melanggar Pasal 363 KUHP dengan barang bukti berupa peralatan untuk melakukan pencurian. Perkara ini memiliki kemiripan dengan beberapa kasus pencurian lainnya yang terjadi di lokasi yang sama dalam kurun waktu berdekatan. Analisis ini mencakup ringkasan, kata kunci penting, dan dokumen terkait yang relevan. Dan Sebagaimana mestinya, hasil analisis ini diharapkan dapat memberikan wawasan yang lebih dalam mengenai kasus ini.",
};

function DashboardPage() {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedDocument, setSelectedDocument] = useState<
    string | null
  >(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fileValue, setFileValue] = useState<File | null>(null);

  const handleDocumentSelect = (documentId: string) => {
    // In a real app, you would fetch the document data here
    setSelectedDocument(documentId);
    setActiveTab("results");
  };

  const handleFileUpload = () => {
    if (!fileValue) {
      notifications.show({
        title: "Error",
        message: "Silakan pilih file terlebih dahulu",
        color: "red",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setSelectedDocument("doc-001"); // Use first mock document as result
      setActiveTab("results");

      notifications.show({
        title: "Analisis Selesai",
        message: "Dokumen berhasil dianalisis",
        color: "green",
      });
    }, 2000);
  };

  // Find selected document data
  const selectedDocData = MOCK_DOCUMENT_HISTORY.find(
    (doc) => doc.id === selectedDocument,
  );

  return (
    <Container fluid py="md">
      <Box>
        <Text size="xl" fw={700} className="text-foreground">
          Sistem Analisis Dokumen Canggih
        </Text>
        <Text size="sm" className="text-muted-foreground">
          Sebuah sistem analisis dokumen canggih yang didukung oleh AI
          untuk tinjauan yudisial dan persiapan kasus
        </Text>
      </Box>

      <Tabs
        value={activeTab}
        onChange={(value) => value && setActiveTab(value)}
        my="md"
      >
        <Tabs.List grow>
          <Tabs.Tab
            value="upload"
            leftSection={
              <Icon icon="material-symbols:upload-file" width={18} />
            }
          >
            Upload Dokumen
          </Tabs.Tab>
          <Tabs.Tab
            value="history"
            leftSection={
              <Icon icon="material-symbols:history" width={18} />
            }
          >
            Riwayat Analisis
          </Tabs.Tab>
          <Tabs.Tab
            value="results"
            leftSection={
              <Icon icon="material-symbols:analytics" width={18} />
            }
            disabled={!selectedDocument}
          >
            Hasil Analisis
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {activeTab === "upload" && (
        <Paper p="md" radius="md" withBorder>
          <Stack gap="xl">
            <Box>
              <Text size="lg" fw={600} mb="md">
                Upload Dokumen Baru
              </Text>
              <Text c="dimmed" mb="lg">
                Upload dokumen dalam format PDF, DOCX, atau TXT untuk
                dianalisis menggunakan sistem AI. Hasil analisis akan
                menampilkan ringkasan, kata kunci, dan dokumen
                terkait.
              </Text>

              <FileInput
                value={fileValue}
                onChange={setFileValue}
                placeholder="Pilih file"
                label="Dokumen untuk dianalisis"
                accept=".pdf,.docx,.txt"
                clearable
                size="md"
                leftSection={
                  <Icon
                    icon="material-symbols:description"
                    width={18}
                  />
                }
                mb="md"
              />

              <Group justify="apart" mt="lg">
                <Text size="sm" c="dimmed">
                  Format yang didukung: PDF, DOCX, TXT
                </Text>
                <Button
                  leftSection={
                    <Icon
                      icon="material-symbols:analytics"
                      width={18}
                    />
                  }
                  onClick={handleFileUpload}
                  loading={isAnalyzing}
                >
                  {isAnalyzing
                    ? "Menganalisis..."
                    : "Analisis Dokumen"}
                </Button>
              </Group>
            </Box>

            <Divider
              label="atau pilih dari kategori"
              labelPosition="center"
            />

            <Box>
              <Text size="lg" fw={600} mb="sm">
                Kategori Dokumen
              </Text>
              <Grid>
                {DOCUMENT_CATEGORIES.map((category) => (
                  <Grid.Col
                    span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                    key={category.name}
                  >
                    <Card
                      withBorder
                      p="md"
                      radius="md"
                      className="hover:shadow-md transition-shadow"
                    >
                      <Flex justify="space-between" align="center">
                        <Text fw={600}>{category.name}</Text>
                        <Badge
                          color={category.color}
                          variant="light"
                          size="lg"
                        >
                          {category.count}
                        </Badge>
                      </Flex>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Paper>
      )}

      {activeTab === "history" && (
        <Paper p="md" radius="md" withBorder>
          <Text size="lg" fw={600} mb="md">
            Riwayat Dokumen
          </Text>

          <ScrollArea h={500}>
            <Timeline bulletSize={24} lineWidth={2}>
              {MOCK_DOCUMENT_HISTORY.map((doc) => (
                <Timeline.Item
                  key={doc.id}
                  bullet={
                    <Icon
                      icon={
                        doc.type === "Pidana"
                          ? "material-symbols:gavel"
                          : "material-symbols:description"
                      }
                      width={16}
                    />
                  }
                  title={
                    <Text
                      fw={600}
                      size="md"
                      onClick={() => handleDocumentSelect(doc.id)}
                      className="cursor-pointer hover:text-blue-500"
                    >
                      {doc.title}
                    </Text>
                  }
                >
                  <Text size="sm" c="dimmed" mb="xs">
                    {new Date(doc.date).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>

                  <Card withBorder radius="md" className="bg-gray-50">
                    <Flex gap="xs" wrap="wrap" mb="xs">
                      <Badge
                        color={
                          doc.type === "Pidana"
                            ? "red"
                            : doc.type === "Perdata"
                              ? "blue"
                              : "green"
                        }
                      >
                        {doc.type}
                      </Badge>
                      <Badge color="gray" variant="outline">
                        Confidence: {doc.confidence}%
                      </Badge>
                    </Flex>

                    <Text size="sm" mb="xs">
                      {doc.summary}
                    </Text>

                    <Flex gap="xs" wrap="wrap">
                      {doc.keywords.map((keyword, idx) => (
                        <Badge key={idx} variant="dot" size="sm">
                          {keyword}
                        </Badge>
                      ))}
                    </Flex>

                    <Button
                      variant="subtle"
                      size="xs"
                      mt="xs"
                      onClick={() => handleDocumentSelect(doc.id)}
                    >
                      Lihat Hasil Analisis
                    </Button>
                  </Card>
                </Timeline.Item>
              ))}
            </Timeline>
          </ScrollArea>
        </Paper>
      )}

      {activeTab === "results" && selectedDocData && (
        <Paper p="md" radius="md" withBorder>
          <Flex justify="space-between" align="center" mb="lg">
            <Box>
              <Text size="lg" fw={700}>
                {selectedDocData.title}
              </Text>
              <Flex gap="xs" align="center" mt={5}>
                <Badge
                  color={
                    selectedDocData.type === "Pidana"
                      ? "red"
                      : selectedDocData.type === "Perdata"
                        ? "blue"
                        : "green"
                  }
                >
                  {selectedDocData.type}
                </Badge>
                <Text size="sm" c="dimmed">
                  {new Date(selectedDocData.date).toLocaleString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </Text>
              </Flex>
            </Box>

            {/* <Button
              variant="outline"
              leftSection={
                <Icon icon="material-symbols:download" width={18} />
              }
              
            >
            </Button> */}
            <Group gap="xs">
              <ActionIcon
                variant="light"
                color="cyan"
                w={35}
                h={35}
                onClick={() => {
                  notifications.show({
                    title: "Unduhan dimulai",
                    message: "Laporan analisis sedang diunduh",
                    color: "blue",
                  });
                }}
              >
                <Icon icon="mdi:download" width="25" height="25" />
                {/* Unduh Laporan */}
              </ActionIcon>
              <ActionIcon
                variant="light"
                color="orange"
                w={35}
                h={35}
              >
                <Icon icon="mdi:share" width="25" height="25" />
              </ActionIcon>
              <ActionIcon variant="light" color="teal" w={35} h={35}>
                <Icon icon="mdi:printer" width="25" height="25" />
              </ActionIcon>
            </Group>
          </Flex>

          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Paper p="md" radius="md" withBorder mb="md">
                <Text fw={600} mb="md">
                  Ringkasan Dokumen
                </Text>
                <Spoiler
                  maxHeight={100}
                  showLabel={
                    <Flex align="center" gap="xs">
                      <Text size="sm">Baca selengkapnya</Text>
                      <Icon icon="mdi:chevron-down" width={16} />
                    </Flex>
                  }
                  hideLabel={
                    <Flex align="center" gap="xs">
                      <Text size="sm">Sembunyikan</Text>
                      <Icon icon="mdi:chevron-up" width={16} />
                    </Flex>
                  }
                >
                  <Text>{MOCK_ANALYSIS_RESULTS.summary}</Text>
                </Spoiler>
              </Paper>

              <Paper p="md" radius="md" withBorder mb="md">
                <Text fw={600} mb="md">
                  Istilah Kunci
                </Text>
                <Grid>
                  {MOCK_ANALYSIS_RESULTS.keyTerms.map((term, idx) => (
                    <Grid.Col span={{ base: 12, sm: 6 }} key={idx}>
                      <Card withBorder p="sm" radius="md">
                        <Flex justify="space-between" align="center">
                          <Text fw={600}>{term.term}</Text>
                          <Badge color="blue">
                            Relevansi:{" "}
                            {(term.relevance * 100).toFixed(0)}%
                          </Badge>
                        </Flex>
                        <Text size="sm" c="dimmed">
                          Frekuensi: {term.frequency} kali
                        </Text>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              </Paper>

              <Paper p="md" radius="md" withBorder>
                <Text fw={600} mb="md">
                  Dokumen Terkait
                </Text>
                {MOCK_ANALYSIS_RESULTS.relatedDocuments.map(
                  (doc, idx) => (
                    <Card
                      key={idx}
                      withBorder
                      p="sm"
                      radius="md"
                      mb="sm"
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleDocumentSelect(doc.id)}
                    >
                      <Flex justify="space-between" align="center">
                        <Text>{doc.title}</Text>
                        <Badge color="cyan">
                          Kemiripan:{" "}
                          {(doc.similarity * 100).toFixed(0)}%
                        </Badge>
                      </Flex>
                    </Card>
                  ),
                )}
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper p="md" radius="md" withBorder mb="md">
                <Text fw={600} mb="md">
                  Informasi Dokumen
                </Text>
                <Stack gap="xs">
                  <Flex justify="space-between">
                    <Text size="sm">Judul:</Text>
                    <Text size="sm" fw={500}>
                      {MOCK_ANALYSIS_RESULTS.documentInfo.title}
                    </Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text size="sm">Format File:</Text>
                    <Text size="sm" fw={500}>
                      {MOCK_ANALYSIS_RESULTS.documentInfo.fileType}
                    </Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text size="sm">Jumlah Halaman:</Text>
                    <Text size="sm" fw={500}>
                      {MOCK_ANALYSIS_RESULTS.documentInfo.pageCount}
                    </Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text size="sm">Jumlah Kata:</Text>
                    <Text size="sm" fw={500}>
                      {MOCK_ANALYSIS_RESULTS.documentInfo.wordCount.toLocaleString()}
                    </Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text size="sm">Tanggal Upload:</Text>
                    <Text size="sm" fw={500}>
                      {MOCK_ANALYSIS_RESULTS.documentInfo.uploadDate}
                    </Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text size="sm">Terakhir Dianalisis:</Text>
                    <Text size="sm" fw={500}>
                      {
                        MOCK_ANALYSIS_RESULTS.documentInfo
                          .lastAnalyzed
                      }
                    </Text>
                  </Flex>
                </Stack>
              </Paper>

              <Paper p="md" radius="md" withBorder mb="md">
                <Text fw={600} mb="md">
                  Prediksi Kategori
                </Text>
                {MOCK_ANALYSIS_RESULTS.categoryPrediction.map(
                  (cat, idx) => (
                    <Flex key={idx} align="center" mb="xs">
                      <Box w="60%" mr="md">
                        <Text size="sm">{cat.category}</Text>
                        <Box
                          style={{
                            width: `${cat.probability * 100}%`,
                            height: "8px",
                            backgroundColor:
                              idx === 0
                                ? "#228be6"
                                : idx === 1
                                  ? "#40c057"
                                  : "#fab005",
                            borderRadius: "4px",
                            marginTop: "4px",
                          }}
                        />
                      </Box>
                      <Text size="sm" fw={600}>
                        {(cat.probability * 100).toFixed(0)}%
                      </Text>
                    </Flex>
                  ),
                )}
              </Paper>

              <Paper p="md" radius="md" withBorder>
                <Text fw={600} mb="md">
                  Analisis Sentimen
                </Text>
                <Box>
                  <Flex
                    align="center"
                    justify="space-between"
                    mb="xs"
                  >
                    <Text size="sm">Positif</Text>
                    <Text size="sm" fw={600}>
                      {
                        MOCK_ANALYSIS_RESULTS.sentimentAnalysis
                          .positive
                      }
                      %
                    </Text>
                  </Flex>
                  <Box
                    style={{
                      width: `${MOCK_ANALYSIS_RESULTS.sentimentAnalysis.positive}%`,
                      height: "8px",
                      backgroundColor: "#40c057",
                      borderRadius: "4px",
                      marginBottom: "10px",
                    }}
                  />

                  <Flex
                    align="center"
                    justify="space-between"
                    mb="xs"
                  >
                    <Text size="sm">Netral</Text>
                    <Text size="sm" fw={600}>
                      {
                        MOCK_ANALYSIS_RESULTS.sentimentAnalysis
                          .neutral
                      }
                      %
                    </Text>
                  </Flex>
                  <Box
                    style={{
                      width: `${MOCK_ANALYSIS_RESULTS.sentimentAnalysis.neutral}%`,
                      height: "8px",
                      backgroundColor: "#fab005",
                      borderRadius: "4px",
                      marginBottom: "10px",
                    }}
                  />

                  <Flex
                    align="center"
                    justify="space-between"
                    mb="xs"
                  >
                    <Text size="sm">Negatif</Text>
                    <Text size="sm" fw={600}>
                      {
                        MOCK_ANALYSIS_RESULTS.sentimentAnalysis
                          .negative
                      }
                      %
                    </Text>
                  </Flex>
                  <Box
                    style={{
                      width: `${MOCK_ANALYSIS_RESULTS.sentimentAnalysis.negative}%`,
                      height: "8px",
                      backgroundColor: "#fa5252",
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              </Paper>
            </Grid.Col>
          </Grid>
        </Paper>
      )}
    </Container>
  );
}

export default DashboardPage;
