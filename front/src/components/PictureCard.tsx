import {ChatIcon, StarIcon} from '@chakra-ui/icons';
import {Card, CardBody, CardFooter, Image, IconButton, Button, Spacer, useDisclosure} from '@chakra-ui/react';
import {CommentModal} from './CommentModal';

interface Props {
  img_src: string;
}

export function PictureCard(props: Props): JSX.Element {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <Card w={256} margin={'auto'}>
        <CardBody>
          <Image src={props.img_src} alt='dummy' />
        </CardBody>
        <CardFooter>
          <Button aria-label='Comment' leftIcon={<ChatIcon />} onClick={onOpen}>
            Comment
          </Button>
          <Spacer />
          <IconButton aria-label='Favorite' icon={<StarIcon />} />
        </CardFooter>
      </Card>

      <CommentModal is_open={isOpen} close={onClose} />
    </>
  );
}
