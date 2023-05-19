import {
  Heading,
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Text,
  IconButton,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Spacer
} from '@chakra-ui/react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {AddIcon }from '@chakra-ui/icons';
import axios from 'axios';
import { newReview } from '../../actions/courseAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Edit } from 'tabler-icons-react';
import { NEW_REVIEW_RESET } from '../../constants/courseConstants';
const Reviews = props => {
  const { data, id } = props;
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { success, error: reviewError } = useSelector(state => state.newReview);
  const navigate = useNavigate();
  const [temp, setTemp] = useState(data.length >= 3 ? data.slice(0, 3) : data);
  useEffect(() => {
    setTemp(data.length >= 3 ? data.slice(0, 3) : data);
  }, [data]);
  const [review, setReview] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const submitReview = async () => {
    let payload = {
      courseId: id,
      rating: 2,
      comment: review,
    };
    dispatch(newReview(payload));
  };
  useEffect(() => {
    let url = `/course?id=${id}/`;
    // let url = '/courseslist'
    if (success) {
      onClose();
      navigate(url);
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [success, dispatch, navigate]);
  return (
    <>
      <Flex padding = {'5px'}>
      <Heading
        color={'black'}
        size={'md'}
        spacing={'1'}
        textStyle={'bold'}
        paddingBottom="5px"
      >
        Reviews
      </Heading>
      <Spacer/>
      <IconButton
        onClick={onOpen}
        colorScheme="blue"
        aria-label="Search database"
        icon={<AddIcon />}
      />
        </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Review</FormLabel>
              <Input
                input={review}
                onChange={e => {
                  setReview(e.target.value);
                }}
                placeholder="Review"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                submitReview();
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {temp.map(ele => (
          <GridItem w="100%">
            <Card maxW="md">
              <CardHeader>
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar name="Segun Adebayo" src={user.avatar.url} />

                    <Box>
                      <Heading size="sm">{ele?.name}</Heading>
                
                    </Box>
                  </Flex>
                  <Box
                    as="button"
                    onClick={async () => {
                      setReview(ele.comment);
                      onOpen();
                    }}
                  >
                    {ele.user === user._id && (
                      <Edit size={20} strokeWidth={2} color={'black'} />
                    )}
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>{ele?.comment}</Text>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default Reviews;
