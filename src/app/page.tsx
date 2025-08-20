"use client";
import { AuthenticationForm } from "@/components/ui/login";
import { Grid, Box, Text, Center, Flex } from "@mantine/core";
import { useRef } from "react";

import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import image1 from "@/styles/assets/images4.jpg";
import image2 from "@/styles/assets/images1.jpg";
import image3 from "@/styles/assets/images2.jpg";
import image4 from "@/styles/assets/images3.jpg";
import Image from "next/image";

import logo from "@/styles/assets/logoMA.jpg";

export default function Home() {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  return (
    <Grid gutter={0} className="h-screen">
      {/* Left Column - Login Form */}
      <Grid.Col span={{ base: 12, md: 5 }} className="h-screen">
        <Flex
          direction="column"
          justify="space-between"
          h="100%"
          py="xl"
          px="lg"
        >
          {/* Logo and Header */}
          <Box ml={20}>
            <Flex align="center" gap="md" mb="xl">
              <Image
                src={logo.src}
                width={60}
                height={60}
                alt="Mahkamah Agung Logo"
              />
              <div>
                <Text size="xl" fw={600} c="dark.8">
                  Mahkamah Agung
                </Text>
                <Text size="sm" c="dimmed">
                  Republik Indonesia
                </Text>
              </div>
            </Flex>
          </Box>

          {/* Login Form Container */}
          <Center style={{ flex: 1 }}>
            <Box w="100%" maw={400} mx="auto">
              <Text size="xl" fw={700} mb="sm">
                Sistem Informasi
              </Text>
              <Text size="md" c="dimmed" mb="xl">
                Silakan masuk untuk mengakses sistem
              </Text>

              <AuthenticationForm />
            </Box>
          </Center>

          {/* Footer */}
          <Box ta="center" c="dimmed" pb={30}>
            <Flex align="center" justify="center" gap="xs" mb="xs">
              <Box component="span" mt={4}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </Box>
              <Text size="sm">Helpdesk</Text>
            </Flex>
            <Text size="xs">Powered by Fortech Indotama | 2025</Text>
          </Box>
        </Flex>
      </Grid.Col>

      {/* Right Column - Info Section */}
      <Grid.Col
        span={{ base: 12, md: 7 }}
        className="h-screen bg-gray-100"
        visibleFrom="md"
      >
        <Flex
          direction="column"
          justify="center"
          align="center"
          h="100%"
          py={40}
          px={20}
        >
          {/* Feature Image/Screenshot */}
          <Box
            mb={60}
            style={{
              width: "90%",
              maxWidth: "750px",
              position: "relative",
            }}
          >
            <Carousel
              withIndicators
              height={400}
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={() => autoplay.current.play()}
              // styles={{
              //   indicators: {
              //     bottom: "-3rem",
              //   },
              //   indicator: {
              //     width: "3rem",
              //     height: "0.25rem",
              //     transition: "width 250ms ease",
              //   },
              // }}
            >
              <Carousel.Slide>
                <Box
                  className="overflow-hidden shadow-xl"
                  style={{
                    width: "100%",
                    height: "400px",
                    position: "relative",
                  }}
                >
                  <Image
                    src={image1}
                    alt="System Screenshot"
                    fill={true}
                  />
                </Box>
              </Carousel.Slide>
              <Carousel.Slide>
                <Box
                  className="overflow-hidden shadow-xl"
                  style={{
                    width: "100%",
                    height: "400px",
                    position: "relative",
                  }}
                >
                  <Image
                    src={image2}
                    alt="System Screenshot"
                    fill={true}
                  />
                </Box>
              </Carousel.Slide>
              <Carousel.Slide>
                <Box
                  className="overflow-hidden shadow-xl"
                  style={{
                    width: "100%",
                    height: "400px",
                    position: "relative",
                  }}
                >
                  <Image
                    src={image3}
                    alt="System Screenshot"
                    fill={true}
                  />
                </Box>
              </Carousel.Slide>
              <Carousel.Slide>
                <Box
                  className="overflow-hidden shadow-xl"
                  style={{
                    width: "100%",
                    height: "400px",
                    position: "relative",
                  }}
                >
                  <Image
                    src={image4}
                    alt="System Screenshot"
                    fill={true}
                  />
                </Box>
              </Carousel.Slide>
            </Carousel>
          </Box>

          {/* Information Text */}
          <Box ta="center" mb="md" px="xl">
            <Text className="text-black" size="2rem" fw={700} mb="md">
              Sistem Manajemen Pengetahuan
            </Text>
            <Text
              className="text-black"
              size="lg"
              opacity={0.9}
              maw={600}
              mx="auto"
            >
              Wadah kolaborasi dan berbagi pengetahuan
            </Text>
          </Box>
        </Flex>
      </Grid.Col>
    </Grid>
  );
}
