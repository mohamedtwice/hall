import Head from 'next/head';
import Image from 'next/image';
import { getHonorees, getHonoreeById } from '@/lib/notion';
import { AspectRatio, Container, Heading, SimpleGrid, Box, color, Link, Text } from '@chakra-ui/react';
import { socialImage, url } from '@/lib/config';

import MainLayout from '@/layouts/MainLayout';
import Blocks from '@/components/blocks';

export default function Post({ honoree }) {
  console.log(honoree)
  const { pageInfo, blocks } = honoree;
  // const { entry, slug, summary, image, social_image } = pageInfo.properties;
const image = pageInfo.properties?.Cover_Image?.rich_text[0]?.href;
const profileImage = pageInfo.properties?.Profile_Image?.rich_text[0]?.href;
  const titleContent = pageInfo.properties.Name.title[0].text.content;
  const sport = pageInfo.properties.Sport?.select?.name;
  const sportColor = pageInfo.properties.Sport?.select?.color;
  const year = pageInfo.properties.Year?.select?.name;
  const yearColor = pageInfo.properties.Year?.select?.color;
  const college = pageInfo.properties.College?.select?.name;
  const collegeColor = pageInfo.properties.College?.select?.color;
  const position = pageInfo.properties.Position?.rich_text[0]?.text?.content;
  // const summaryContent = summary.rich_text[0].text?.content;
  // const slugContent = slug.rich_text[0].plain_text;
console.log(sport)
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
          alt={titleContent}
          layout="responsive"
          objectFit="cover"
        />
      </AspectRatio>
    );
  };

  return (
    <MainLayout>
      <Head>
        {/* <title>{titleContent}</title>
        <meta name="description" content={summaryContent} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={titleContent} />
        <meta property="og:description" content={summaryContent} />
        <meta property="og:url" content={`${url}/${slugContent}`} />
        <meta
          property="og:image"
          content={social_image ? social_image.url : socialImage}
        /> */}
      </Head>

      {image && (
        <AspectRatio ratio={16 / 9} mb={[4, 8]} overflow="hidden" height={450}>
          <Image
            src={image}
            alt={titleContent}
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
          />
        </AspectRatio>
      )}

      {/* <Container maxW="container.lg">
        <Heading
          as="h1"
          mb={[4, 8, 16]}
          fontSize={['2xl', '4xl', '5xl']}
          px={[null, null, 16]}
        >
          {titleContent}
        </Heading>
            </Container> */}

      {/* <Container maxW="container.md" px={[5, 6, 16]} pb={16}> */}
      <Container maxW="container.lg">
        <Heading
          as="h1"
          mt={[8, 10, 12]}
          mb={[4, 8, 12]}
          alignSelf="start"
          fontSize={['3xl', '5xl', '7xl']}
        >
          {titleContent}
        </Heading>
        <SimpleGrid columns={[1, 2, 2]} spacing="40px">
          <Box
            d="flex"
            flexDirection="column"
            alignItems="baseline"
            bg="#f2f2f2"
            p={[4, 10, 20]}
            mb={[4, 8]}
          >
            <Box d="flex" justifyContent="center" alignItems="center" mb={1}>
              <Text fontSize={['l', 'xl', '2xl']}>Inducted:</Text>
              <Text>
                <Link
                  href={`/year/${year}`}
                  className={`${honoree.pageInfo.properties.Year.select.color}-color`}
                  ml={4}
                  py={0}
                  px={0}
                  fontWeight="400"
                  fontSize={['xl', '2xl', '3xl']}
                  color={yearColor}
                >
                  <b>{year}</b>
                </Link>
              </Text>
            </Box>

            <Box d="flex" justifyContent="center" alignItems="center" mb={1}>
              <Text fontSize={['l', 'xl', '2xl']}>Sport:</Text>
              <Text>
                <Link
                  href={`/sport/${sport}`}
                  className={`${honoree.pageInfo.properties.Year.select.color}-color`}
                  ml={4}
                  py={0}
                  px={0}
                  fontWeight="400"
                  fontSize={['xl', '2xl', '3xl']}
                  color={sportColor}
                >
                  <b>{sport}</b>
                </Link>
              </Text>
            </Box>

            {college && (
              <Box d="flex" justifyContent="center" alignItems="center" mb={1}>
                <Text fontSize={['l', 'xl', '2xl']}>College:</Text>
                <Text
                  fontSize={['xl', '2xl', '3xl']}
                  ml={4}
                  py={0}
                  px={0}
                  color={collegeColor}
                >
                  <b>{college}</b>
                </Text>
              </Box>
            )}

            {position && (
              <Box d="flex" justifyContent="center" alignItems="center" mb={1}>
                <Text fontSize={['l', 'xl', '2xl']}>Position:</Text>
                <Text fontSize={['xl', '2xl', '3xl']} ml={4} py={0} px={0}>
                  <b>{position}</b>
                </Text>
              </Box>
            )}

            <Blocks blocks={blocks} />
          </Box>
          <Box height="">
            {profileImage && (
              <AspectRatio
                ratio={16 / 9}
                mb={[4, 8]}
                overflow="hidden"
                height={400}
              >
                <Image
                  src={profileImage}
                  alt={titleContent}
                  layout="fill"
                  objectFit="cover"
                />
              </AspectRatio>
            )}
          </Box>
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const honorees = await getHonorees();

  const paths = honorees.data.map((honoree) => ({
    params: { id: honoree.id },
  }));
    // console.log(paths)
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const honoree = await getHonoreeById(params.id);

  return { props: { honoree }, revalidate: 30 };
}
