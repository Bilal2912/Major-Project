import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";

const IconBox = (props) => {
  const { name, icon, height, ...rest } = props;
  return (
    // <Tooltip
    //   border={"1px solid #2d77f4"}
    //   label={name}
    //   bg="#F4F8FF"
    //   color="#444"
    //   placement="top"
    // >
    <Stack
      alignItems={"center"}
      spacing={0}
      cursor={"pointer"}
      {...rest}
      justifyContent="flex-start"
    >
      <Box
        // border={"1px solid #E5E5E5"}
        padding={"0.5rem 0.5rem"}
        borderRadius={"5px"}
        // color={"#CCCCCC"}
        display={"flex"}
        height={height || "30px"}
        width={height || "30px"}
        alignItems="center"
        justifyContent="center"
        _hover={{
          // borderColor: "brand.900",
          "& svg path": { fill: "brand.900" },
        }}
      >
        {icon}
      </Box>
      <Text
        fontSize={12}
        // color="#141414"
        wordBreak={"break-all"}
        textAlign="center"
      >
        {name.includes(" ")
          ? name.split(" ").map((item) => {
              return (
                <>
                  {item}
                  <br />
                </>
              );
            })
          : name}
      </Text>
    </Stack>
    // </Tooltip>
  );
};

export default IconBox;
