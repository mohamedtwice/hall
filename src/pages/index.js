import Head from 'next/head';
import Image from 'next/image';
import {NextLink, Link} from 'next/link';
import { getHonorees } from '@/lib/notion';
import { Text, Button, Box, Container, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { name, description, url, socialImage } from '@/lib/config';
import { ChevronRightIcon } from '@chakra-ui/icons';

import MainLayout from '@/layouts/MainLayout';

export default function Home({ honorees }) {

  console.log(honorees)
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

            <SimpleGrid minChildWidth="120px" spacing="40px">
            {honorees.map((honoree, index) => {
              const hId = honoree.id

              return (
                 <a index={index} href={`/honorees/${hId}`}>
                  <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                     
                    <Flex direction="column" justify="center" p={3}>
                        <Heading as="h3" size="md" alignSelf="center">
                              {honoree.properties.Name.title[0].text?.content}
                        </Heading>
                        <Text alignSelf="start" fontSize="sm">{honoree.properties.Year.number}</Text>
                    </Flex>
                  </Box>
                  </a>
              )
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
