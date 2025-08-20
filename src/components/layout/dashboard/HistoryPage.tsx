import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Badge,
  Button,
  Card,
  Flex,
  Paper,
  ScrollArea,
  Text,
  Timeline,
} from "@mantine/core";
import React from "react";

// Import mock data
import { MOCK_DOCUMENT_HISTORY } from "@/lib/constants/mockData";

interface HistoryPageProps {
  onDocumentSelect: (documentId: string) => void;
}

function HistoryPage({ onDocumentSelect }: HistoryPageProps) {
  return (
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
                  onClick={() => onDocumentSelect(doc.id)}
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
                  onClick={() => onDocumentSelect(doc.id)}
                >
                  Lihat Hasil Analisis
                </Button>
              </Card>
            </Timeline.Item>
          ))}
        </Timeline>
      </ScrollArea>
    </Paper>
  );
}

export default HistoryPage;
