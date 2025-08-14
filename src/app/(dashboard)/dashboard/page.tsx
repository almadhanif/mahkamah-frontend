"use client";

import {
  Box,
  Container,
  Stack,
  Text,
  Paper,
  Flex,
  Button,
} from "@mantine/core";
import React from "react";
import { LineChart } from "@mantine/charts";
import { Icon } from "@iconify/react/dist/iconify.js";
import MODAL_IDS from "@/components/ui/Modals/modalIds";
import NiceModal from "@ebay/nice-modal-react";

// Simulated historical data (until today)
const HISTORICAL_DATA = [
  { date: "Jan 01", price: 2400 },
  { date: "Jan 15", price: 2200 },
  { date: "Feb 01", price: 2600 },
  { date: "Feb 15", price: 2900 },
  { date: "Mar 01", price: 3100 },
  { date: "Mar 15", price: 3000 },
  { date: "Apr 01", price: 2800 }, // Today's data point
];

// Generate future prediction data
const PREDICTION_DATA = [
  // Today's data point (repeated to connect lines)
  {
    date: "Apr 01",
    actual: 2800,
    prediction_up: null,
    prediction_stable: null,
    prediction_down: null,
  },

  // Future predictions
  {
    date: "Apr 15",
    actual: null,
    prediction_up: 3000,
    prediction_stable: 2800,
    prediction_down: 2600,
  },
  {
    date: "May 01",
    actual: null,
    prediction_up: 3300,
    prediction_stable: 2800,
    prediction_down: 2400,
  },
  {
    date: "May 15",
    actual: null,
    prediction_up: 3500,
    prediction_stable: 2750,
    prediction_down: 2300,
  },
  {
    date: "Jun 01",
    actual: null,
    prediction_up: 3800,
    prediction_stable: 2800,
    prediction_down: 2100,
  },
];

// Combined data for the chart
const COMBINED_DATA = [
  ...HISTORICAL_DATA.map((item) => ({
    date: item.date,
    actual: item.price,
    prediction_up: null,
    prediction_stable: null,
    prediction_down: null,
  })),
  ...PREDICTION_DATA,
];

function DashboardPage() {
  return (
    <Container fluid py="sm">
      <Stack>
        <Text size="xl" fw={700}>
          Dashboard
        </Text>

        <Paper p="md" radius="md" withBorder>
          <Flex
            justify="space-between"
            align="center"
            wrap="wrap"
            gap="sm"
          >
            <Box>
              <Text size="xs" c="dimmed">
                Harga Saat Ini
              </Text>
              <Text size="xl" fw={700}>
                Rp 2.800/kg
              </Text>
              <Flex align="center" gap="xs">
                <Icon
                  icon="bxs:down-arrow"
                  width="24"
                  height="24"
                  color="red"
                />
                <Text size="sm" c="red">
                  2.3% dari bulan lalu
                </Text>
              </Flex>
            </Box>

            <Box>
              <Text size="xs" c="dimmed">
                Prediksi 30 Hari
              </Text>
              <Text size="xl" fw={700}>
                Rp 2.750/kg
              </Text>
              <Flex align="center" gap="xs">
                <Icon
                  icon="ic:baseline-minus"
                  width="24"
                  height="24"
                  color="yellow"
                />
                <Text size="sm" c="yellow">
                  Kemungkinan stabil
                </Text>
              </Flex>
            </Box>

            <Box>
              <Text size="xs" c="dimmed">
                Prediksi 60 Hari
              </Text>
              <Text size="xl" fw={700}>
                Rp 2.800/kg
              </Text>
              <Flex align="center" gap="xs">
                <Icon
                  icon="bxs:up-arrow"
                  width="24"
                  height="24"
                  color="green"
                />
                <Text size="sm" c="green">
                  Potensi kenaikan
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Flex className="justify-between items-center" mb="sm">
            <Text size="md" fw={600} mb="xs">
              Harga Baja (Rp/kg)
            </Text>
            <Button
              onClick={() => {
                NiceModal.show(MODAL_IDS.GENERAL.CONFIRMATION, {
                  message:
                    "Apakah Anda ingin mengatur parameter prediksi?",
                  subMessage:
                    "Perubahan parameter akan mempengaruhi hasil prediksi",
                  variant: "danger",
                  handleConfirm: () => {
                    // Your action here
                  },
                });
              }}
            >
              Atur Prediksi
            </Button>
          </Flex>

          <Box mb="lg">
            <LineChart
              h={400}
              data={COMBINED_DATA}
              dataKey="date"
              withLegend
              legendProps={{ verticalAlign: "bottom" }}
              series={[
                {
                  name: "actual",
                  label: "Harga Aktual",
                  color: "blue",
                },
                {
                  name: "prediction_up",
                  label: "Prediksi Naik",
                  color: "green",
                  strokeDasharray: "5,5",
                },
                {
                  name: "prediction_stable",
                  label: "Prediksi Stabil",
                  color: "yellow",
                  strokeDasharray: "5,5",
                },
                {
                  name: "prediction_down",
                  label: "Prediksi Turun",
                  color: "red",
                  strokeDasharray: "5,5",
                },
              ]}
              connectNulls={true}
              curveType="monotone"
              gridAxis="xy"
              tooltipProps={{
                content: ({ payload }) => {
                  if (!payload || payload.length === 0) {
                    return null;
                  }

                  const data = payload[0].payload;

                  return (
                    <Paper withBorder p="md" radius="md" shadow="md">
                      <Stack gap="xs">
                        <Text fw={700}>{data.date}</Text>
                        {payload.map((item) => (
                          <Flex
                            key={item.name}
                            gap="xs"
                            align="center"
                          >
                            <Box bg={item.color} w={10} h={10} />
                            <Text size="sm">
                              {item.name}: Rp{" "}
                              {item.value.toLocaleString()}
                            </Text>
                          </Flex>
                        ))}
                      </Stack>
                    </Paper>
                  );
                },
              }}
            />
          </Box>

          <Text size="sm" c="dimmed">
            Prediksi harga baja untuk 2 bulan ke depan berdasarkan
            analisis machine learning. Prediksi dapat berubah sesuai
            dengan kondisi pasar dan faktor eksternal lainnya.
          </Text>
        </Paper>
      </Stack>
    </Container>
  );
}

export default DashboardPage;
