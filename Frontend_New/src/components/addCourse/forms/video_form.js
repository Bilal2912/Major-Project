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
  const { preset_data ,setPresetData, currentModule, index } = props;
  const [videos, setVideos] = useState(preset_data.courses[currentModule].videos[index]);
  const toast = useToast();
  useEffect(() => {
    let data = {...preset_data};
    data.courses[currentModule].videos[index] = videos;
    setPresetData(data);
  }, [videos]);
  return (
    <Grid gap={1}>
      <Video_Input videodata={videos} setVideoData={setVideos} index={index} />   
    </Grid>
  );
};

export default Video_Form;
