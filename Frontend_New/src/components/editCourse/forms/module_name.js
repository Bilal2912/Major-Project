import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Grid,
  GridItem,
  SimpleGrid,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';

const ModuleName = props => {
  const {preset_data , setPresetData, currentModule } =
    props;

  return (
    <>
      <form>
        <FormControl>
          <Input
            type="text"
            value={preset_data?.courses[currentModule].name}
            onChange={(e) => {
              console.log(e.target.value);
              let temp = {...preset_data};
              temp.courses[currentModule].name = e.target.value;
              setPresetData(temp)
            }}
            placeholder="Module Name"
          />
        </FormControl>
      </form>
    </>
  );
};

export default ModuleName;
