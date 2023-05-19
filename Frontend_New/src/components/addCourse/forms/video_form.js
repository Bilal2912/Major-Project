import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Grid,
  GridItem,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Video_Input from './video_input';

const Video_Form = props => {
  const { moduledata, setModuleData, index } = props;
  const [videos, setVideos] = useState(moduledata[index]);
  const toast = useToast();
  useEffect(() => {
    let data = [...moduledata];
    data[index] = videos;
    setModuleData(data);
    // console.log(data);
  }, [videos]);
  return (
    <Grid gap={1}>
      <Video_Input videodata={videos} setVideoData={setVideos} index={index} />
      {/* <GridItem w="100%">
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem w="100%">
            <Button onClick={onHandleChange}> Add </Button>
          </GridItem>
          <GridItem w="100%">
            <Button onClick={onHandleSubmit}> Submit </Button>
          </GridItem>
        </Grid>
      </GridItem> */}
    </Grid>
  );
};

export default Video_Form;
