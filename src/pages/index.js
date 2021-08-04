import Head from 'next/head';
import Image from 'next/image';
import {NextLink, Link} from 'next/link';
import { getHonorees } from '@/lib/notion';
import {Text, Button, Box, Container, Flex, Heading, SimpleGrid, AspectRatio} from '@chakra-ui/react';
import { name, description, url, socialImage } from '@/lib/config';
import { ChevronRightIcon } from '@chakra-ui/icons';

import MainLayout from '@/layouts/MainLayout';

export default function Home({ honorees }) {

  console.log(honorees)

  const renderFeaturedImage = () => {
    if (!image) {
      return null;
    }

    return (
        <AspectRatio
            ratio={16 / 9}
            mb={[4, 8]}
            overflow="hidden"
            borderRadius="lg"
            height={32}
        >
          <Image
              src={image}
              alt="alt text"
              layout="responsive"
              objectFit="cover"
          />
        </AspectRatio>
    );
  };

  return (
    <MainLayout>
      <Head>
        <title>{name}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={socialImage} />
      </Head>

      <Container maxW="container.lg" pb={16}>
        <Box mb={[12, 16]}>

            <SimpleGrid minChildWidth="250px" spacing="40px">
            {honorees.map((honoree, index) => {
              const hId = honoree.id;
              const slug = honoree.properties.slug?.rich_text[0]?.text?.content;
              const sport = honoree.properties.Sport?.select?.name;
              const sportColor = honoree.properties.Sport?.select?.color;
              const year = honoree.properties.Year?.select?.name;
              const yearColor = honoree.properties.Year?.select?.color;
              const image = honoree.properties?.Profile_Image?.rich_text[0]?.href;

              return (
                <a key={hId} href={`/honorees/${hId}`}>
                  <Box borderWidth="0px" overflow="hidden">
                    <Flex
                      direction="column"
                      justify="center"
                      h={450}
                      p={0}
                      bg="#fbeeca"
                    >
                      {image && (
                        <AspectRatio
                          ratio={4 / 3}
                          mb={[2, 4]}
                          overflow="hidden"
                          borderTopRadius="lg"
                          height={375}
                        >
                          <Image
                            src={image}
                            alt={honoree.properties.Name.title[0].text?.content}
                            layout="fill"
                            objectFit="cover"
                          />
                        </AspectRatio>
                      )}
                      <Heading
                        as="h3"
                        size="lg"
                        alignSelf="center"
                        mt={[2]}
                        mb={[4]}
                        w={`75%`}
                        textAlign="center"
                        color="#241c15"
                      >
                        {honoree.properties.Name.title[0].text?.content}
                      </Heading>

                      <Box d="flex" justifyContent="center">
                        <Heading as="h4" size="sm" mb={[8]} alignSelf="center">
                          <a
                            href={`/year/${year}`}
                            style={{
                              background: 'gold',
                              padding: '3px 8px',
                              color: 'rebeccapurple',
                            }}
                          >
                            {year}
                          </a>
                        </Heading>
                        <Heading as="h4" size="sm" mb={[8]} alignSelf="center">
                          <a
                            href={`/sport/${sport}`}
                            style={{
                              background: `${sportColor}`,
                              padding: '3px 8px',
                              color: 'white',
                            }}
                          >
                            {sport}
                          </a>
                        </Heading>
                      </Box>
                    </Flex>
                  </Box>
                </a>
              );
            })}

        </SimpleGrid>
        </Box>
      </Container>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const honorees = await getHonorees();

  if (!honorees) {
    return {
      notFound: true,
    };
  }

  return {
    props: { honorees: honorees.data },
    revalidate: 10,
  };
}
