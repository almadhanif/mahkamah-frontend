import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  FileInput,
  Flex,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";

// Import mock data
import { DOCUMENT_CATEGORIES } from "@/lib/constants/mockData";

interface UploadPageProps {
  onAnalysisComplete: (documentId: string) => void;
}

function UploadPage({ onAnalysisComplete }: UploadPageProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fileValue, setFileValue] = useState<File | null>(null);

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

      // Call the callback with the document ID
      onAnalysisComplete("doc-001");

      notifications.show({
        title: "Analisis Selesai",
        message: "Dokumen berhasil dianalisis",
        color: "green",
      });
    }, 2000);
  };

  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="xl">
        <Box>
          <Text size="lg" fw={600} mb="md">
            Upload Dokumen Baru
          </Text>
          <Text c="dimmed" mb="lg">
            Upload dokumen dalam format PDF, DOCX, atau TXT untuk
            dianalisis menggunakan sistem AI. Hasil analisis akan
            menampilkan ringkasan, kata kunci, dan dokumen terkait.
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
              <Icon icon="material-symbols:description" width={18} />
            }
            mb="md"
          />

          <Group justify="apart" mt="lg">
            <Text size="sm" c="dimmed">
              Format yang didukung: PDF, DOCX, TXT
            </Text>
            <Button
              leftSection={
                <Icon icon="material-symbols:analytics" width={18} />
              }
              onClick={handleFileUpload}
              loading={isAnalyzing}
            >
              {isAnalyzing ? "Menganalisis..." : "Analisis Dokumen"}
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
  );
}

export default UploadPage;
