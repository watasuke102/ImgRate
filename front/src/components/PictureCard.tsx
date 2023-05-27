import {ChatIcon, StarIcon} from '@chakra-ui/icons';
import {Card, CardBody, CardFooter, Image, IconButton, Button, Spacer} from '@chakra-ui/react';

interface Props {
  img_src: string,
}

export function PictureCard(props: Props): JSX.Element {
  return (
    <Card w={256} margin={'auto'}>
      <CardBody>
        <Image src={props.img_src} alt='dummy' />
      </CardBody>
      <CardFooter>
        <Button aria-label='Comment' leftIcon={<ChatIcon />}>
          Comment
        </Button>
        <Spacer />
        <IconButton aria-label='Favorite' icon={<StarIcon />} />
      </CardFooter>
    </Card>
  );
}
