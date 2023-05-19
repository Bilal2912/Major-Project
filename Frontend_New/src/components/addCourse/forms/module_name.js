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
  const { module_names, setModuleNames, numberofModules, currentModule } =
    props;

  return (
    <>
      <form>
        <FormControl>
          <Input
            type="text"
            value={module_names[currentModule]}
            onChange={e => {
              let temp = [...module_names];
              temp[currentModule] = e.target.value;
              setModuleNames(temp);
            }}
            placeholder="Module Name"
          />
        </FormControl>
      </form>
    </>
  );
};

export default ModuleName;
