import { Icon } from "@iconify/react/dist/iconify.js";
import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Flex,
  Grid,
  Group,
  Paper,
  Spoiler,
  Stack,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React from "react";

// Import mock data
import {
  MOCK_DOCUMENT_HISTORY,
  MOCK_ANALYSIS_RESULTS,
} from "@/lib/constants/mockData";

interface ResultsPageProps {
  documentId: string;
  onDocumentSelect: (documentId: string) => void;
}

function ResultsPage({
  documentId,
  onDocumentSelect,
}: ResultsPageProps) {
  // Find selected document data
  const selectedDocData = MOCK_DOCUMENT_HISTORY.find(
    (doc) => doc.id === documentId,
  );

  if (!selectedDocData) {
    return (
      <Paper p="md" radius="md" withBorder>
        <Text>Dokumen tidak ditemukan</Text>
      </Paper>
    );
  }

  return (
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
          <ActionIcon variant="light" color="orange" w={35} h={35}>
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
                        Relevansi: {(term.relevance * 100).toFixed(0)}
                        %
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
                  onClick={() => onDocumentSelect(doc.id)}
                >
                  <Flex justify="space-between" align="center">
                    <Text>{doc.title}</Text>
                    <Badge color="cyan">
                      Kemiripan: {(doc.similarity * 100).toFixed(0)}%
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
                  {MOCK_ANALYSIS_RESULTS.documentInfo.lastAnalyzed}
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
              <Flex align="center" justify="space-between" mb="xs">
                <Text size="sm">Positif</Text>
                <Text size="sm" fw={600}>
                  {MOCK_ANALYSIS_RESULTS.sentimentAnalysis.positive}%
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

              <Flex align="center" justify="space-between" mb="xs">
                <Text size="sm">Netral</Text>
                <Text size="sm" fw={600}>
                  {MOCK_ANALYSIS_RESULTS.sentimentAnalysis.neutral}%
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

              <Flex align="center" justify="space-between" mb="xs">
                <Text size="sm">Negatif</Text>
                <Text size="sm" fw={600}>
                  {MOCK_ANALYSIS_RESULTS.sentimentAnalysis.negative}%
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
  );
}

export default ResultsPage;
