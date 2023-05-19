import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Grid,
  GridItem,
  Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Video_Input = props => {
  const { videodata, setVideoData, index } = props;
  const handleInputChange = (e, type, index) => {
    let data = {...videodata};
    switch (type) {
      case 'title':
        data.title = e.target.value;
        break;
      case 'link':
        data.url = e.target.value;
        break;
      default:
        console.log(e.target.value);
    }
    setVideoData(data);
  };
  const isError = '';
  return (
    <Grid>
      <GridItem w="100%">
        <Grid templateColumns="repeat(2, 1fr)" gap={1}>
          <GridItem w="100%">
            <FormControl isRequired>
              <FormLabel>Sub-Module Title</FormLabel>
              <Input
                name={'video_link_' + index}
                // type="email"
                input={videodata.title}
                onChange={e => {
                  handleInputChange(e, 'title', index);
                }}
              />
            </FormControl>
          </GridItem>
          <GridItem w="100%">
            <FormControl isRequired>
              <FormLabel>Video Link </FormLabel>
              <Input
                name={'video_link_' + index}
                // type="email"
                input={videodata.url}
                onChange={e => {
                  handleInputChange(e, 'link', index);
                }}
              />
            </FormControl>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default Video_Input;
