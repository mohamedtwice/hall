import Head from 'next/head';
import Image from 'next/image';
import { getHonorees, getHonoreeById } from '@/lib/notion';
import { AspectRatio, Container, Heading, SimpleGrid, Box } from '@chakra-ui/react';
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
  const sport = pageInfo.properties.Sport?.select.name;
  const year = pageInfo.properties.Year?.select.name;
  const college = pageInfo.properties.College?.select.name;
  const position = pageInfo.properties.Position?.rich_text[0].text?.content;
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
        <AspectRatio
          ratio={16 / 9}
          mb={[4, 8]}
          overflow="hidden"
          borderRadius="lg"
          height={375}
        >
          <Image
            src={image}
            alt={titleContent}
            layout="fill"
            objectFit="cover"
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
        <SimpleGrid columns={[1, 2, 2]} spacing="40px">
          <Box d="flex" flexDirection="column" alignItems="baseline">
            <Heading
              as="h1"
              mb={[4]}
              alignSelf="start"
              fontSize={['2xl', '4xl', '5xl']}
            >
              {titleContent}
            </Heading>

            {year && (
              <Heading
                as="h4"
                mb={[4]}
                alignSelf="start"
                fontSize={['l', 'xl', '2xl']}
              >
                <b>Inducted:</b> {year}
              </Heading>
            )}

            {sport && (
              <Heading
                as="h4"
                mb={[4]}
                alignSelf="start"
                fontSize={['l', 'xl', '2xl']}
              >
                Sport: {sport}
              </Heading>
            )}

            {college && (
              <Heading
                as="h4"
                mb={[4]}
                alignSelf="start"
                fontSize={['l', 'xl', '2xl']}
              >
                College: {college}
              </Heading>
            )}

            {position && (
              <Heading
                as="h4"
                mb={[4]}
                alignSelf="start"
                fontSize={['l', 'xl', '2xl']}
              >
                Position: {position}
              </Heading>
            )}

            <Blocks blocks={blocks} />
          </Box>
          <Box bg="black" height="">
            {profileImage && (
              <AspectRatio
                ratio={16 / 9}
                mb={[4, 8]}
                overflow="hidden"
                borderRadius="lg"
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
