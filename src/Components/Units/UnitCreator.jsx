import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  HStack,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { connect } from "react-redux";

import "animate.css";

import CreateSvg from "../../global/svgs/Create.svg";

const NORMAL = "NORMAL";
const CREATING = "CREATING";
const FAIL = "FAIL";

function UnitCreator({ colorScheme, onClose, onSuccess, isOpen, level, section }) {
  const [unit, setUnit] = useState("");
  const [status, setStatus] = useState(NORMAL);

  const handleUnitChanged = (event) => {
    setUnit(event.target.value);
  };

  const validate = (unit) => {
    const regex = /[^\/\\\|*:?"<>]/gm;
    return regex.test(unit);
  };

  const handleUnitCreated = async () => {
    if (!validate(unit)) {
      setStatus(FAIL);
      return;
    }

    setStatus(CREATING);
    window.nativeAPI
      .prepareDir(level, section, unit)
      .then((destinationFolder) => {
        console.log(`Created: ${destinationFolder}`);

        setStatus(NORMAL);
        setUnit("");
        onSuccess();
        onClose();
      })
      .catch((error) => {
        console.error(error);
        setStatus(FAIL);
      });
  };

  return (
    <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Create a new Unit</DrawerHeader>
        <DrawerBody>
          <HStack spacing={4} alignItems="end">
            <FormControl isRequired>
              <Input placeholder="Unit name" value={unit} onChange={handleUnitChanged} />
            </FormControl>

            <Box>
              <Button
                colorScheme={status == FAIL ? "red" : colorScheme}
                onClick={handleUnitCreated}
                isLoading={status == CREATING}
                loadingText="Creating..."
                disabled={status == CREATING}
              >
                {status == NORMAL && "Save"}
                {status == FAIL && "Try again!"}
              </Button>
            </Box>
          </HStack>

          {status == FAIL && (
            <Text as="small" fontWeight="medium" textColor="red.500">
              May be your Unit name contain some restrict characters: /, \, |, *, :, ?, " ,&lt; ,&gt;
            </Text>
          )}
        </DrawerBody>

        <DrawerFooter justifyContent="center">
          <Center className="animate__animated animate__fadeIn">
            <Image src={CreateSvg} width={96} />
          </Center>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const mapStateToProps = (state) => ({
  level: state.level,
});

export default connect(mapStateToProps)(UnitCreator);
