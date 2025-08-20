"use client";

import { Box, Container, Tabs, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

// Import page components
import UploadPage from "@/components/layout/dashboard/UploadPage";
import HistoryPage from "@/components/layout/dashboard/HistoryPage";
import ResultsPage from "@/components/layout/dashboard/ResultsPage";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedDocument, setSelectedDocument] = useState<
    string | null
  >(null);

  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocument(documentId);
    setActiveTab("results");
  };

  const handleAnalysisComplete = (documentId: string) => {
    setSelectedDocument(documentId);
    setActiveTab("results");
  };

  return (
    <Container fluid py="md">
      <Box>
        <Title size="xl" fw={700} className="text-foreground">
          Sistem Analisis Dokumen Canggih
        </Title>
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
        <UploadPage onAnalysisComplete={handleAnalysisComplete} />
      )}

      {activeTab === "history" && (
        <HistoryPage onDocumentSelect={handleDocumentSelect} />
      )}

      {activeTab === "results" && selectedDocument && (
        <ResultsPage
          documentId={selectedDocument}
          onDocumentSelect={handleDocumentSelect}
        />
      )}
    </Container>
  );
}

export default DashboardPage;
