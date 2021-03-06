import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

import BooksIcon from "../Icons/BooksIcon.jsx";
import CupIcon from "../Icons/CupIcon.jsx";
import LampDeskIcon from "../Icons/LampDeskIcon.jsx";
import UnitCreator from "./UnitCreator.jsx";

import { changeTest } from "../../redux/actions";

import "animate.css";
import { AddIcon, ArrowDownIcon, ArrowUpIcon, DeleteIcon } from "@chakra-ui/icons";
import Trash from "../Trash/Trash.jsx";

/**
 * @param {String} section Section folder. If not use section => "."
 */
class Units extends Component {
  state = {
    units: new Array(),
    isCollapsed: true,
    isCreating: false,

    isDeleting: false,
    selectedUnits: new Array(),
  };

  selectTimer = null;

  componentDidMount() {
    this.getUnitData();
  }

  componentWillUnmount() {
    clearTimeout(this.selectTimer);
  }

  getUnitData = () => {
    const { level, section } = this.props;

    window.nativeAPI.readDir(level, section).then((units) => this.setState({ units }));
  };

  handleToggleView = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  handleBeginCreateUnit = () => {
    this.setState({ isCreating: true });
  };

  handleEndCreateUnit = () => {
    this.setState({ isCreating: false });
  };

  handleCreatedUnitSuccessful = () => {
    this.getUnitData();
  };

  handleUnitClicked = (unit) => {
    const { level, section, changeTest } = this.props;

    if (!this.state.isDeleting) changeTest(level, section, unit, null);
  };

  handleUnitMouseDown = (unit) => {
    const currentSelectedUnits = this.state.selectedUnits;
    const index = currentSelectedUnits.findIndex((item) => item == unit);

    if (this.state.isDeleting) {
      if (index > -1) {
        const selectedUnits = [...currentSelectedUnits.slice(0, index), ...currentSelectedUnits.slice(index + 1)];
        this.setState({ selectedUnits });
      } else {
        const selectedUnits = [...currentSelectedUnits, unit];
        this.setState({ selectedUnits });
      }
    } else
      this.selectTimer = setTimeout(() => {
        const selectedUnits = [...currentSelectedUnits, unit];
        this.setState({ isDeleting: true, selectedUnits });
      }, 1000);
  };

  handleUnitMouseUp = () => {
    clearTimeout(this.selectTimer);
  };

  handleUnitsDeleted = () => {
    this.setState({ isDeleting: false, selectedUnits: new Array() });
    this.getUnitData();
  };

  render() {
    const { colorScheme, level, section } = this.props;
    const { isCollapsed, units } = this.state;

    let units2Render = units;
    if (isCollapsed) units2Render = units2Render.slice(0, 4); // Minimum size is 4 if collapse

    return (
      <Box>
        <HStack paddingTop={16} justifyContent="space-between">
          <Heading as="h2" textColor={`${colorScheme}.700`} size="lg">
            {section}
          </Heading>

          <HStack>
            <Trash
              colorScheme={colorScheme}
              onDelete={this.handleUnitsDeleted}
              isActive={this.state.isDeleting}
              selectedItems={this.state.selectedUnits.map((unit) => [level, section, unit])}
            />

            <Button variant="ghost" colorScheme={colorScheme} onClick={this.handleToggleView}>
              {isCollapsed ? <ArrowDownIcon /> : <ArrowUpIcon />}
            </Button>
          </HStack>
        </HStack>

        <Divider marginTop={4} />

        <SimpleGrid columns={4} gap={4} paddingTop={8}>
          {units2Render.map((unit, index) => {
            const isSelected = this.state.selectedUnits.findIndex((item) => item == unit) > -1;
            const unitColorScheme = isSelected ? "red" : colorScheme;

            return (
              <Box
                key={unit}
                borderRadius="xl"
                role="group"
                backgroundColor={`${unitColorScheme}.50`}
                borderWidth={1}
                borderColor="transparent"
                _hover={{ borderColor: `${unitColorScheme}.500` }}
                transitionDuration="0.24s"
                className="animate__animated animate__bounceIn"
                cursor="pointer"
                overflow="hidden"
                onClick={() => this.handleUnitClicked(unit)}
                onMouseDown={() => this.handleUnitMouseDown(unit)}
                onMouseUp={() => this.handleUnitMouseUp(unit)}
              >
                <Tooltip label="Long press to select" openDelay={3000}>
                  <VStack alignItems="stretch" spacing={0} height="100%">
                    <Center paddingY={8} position="relative" overflow="hidden">
                      <Center>
                        <Heading as="h3" size="2xl" textColor={`${unitColorScheme}.600`} letterSpacing="tight">
                          {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </Heading>
                      </Center>

                      <BooksIcon
                        boxSize={12}
                        position="absolute"
                        bottom={0}
                        right={0}
                        opacity={0.15}
                        color={`${unitColorScheme}.500`}
                      />

                      <LampDeskIcon
                        boxSize={20}
                        position="absolute"
                        bottom={0}
                        left={-4}
                        opacity={0.1}
                        color={`${unitColorScheme}.500`}
                      />

                      <CupIcon
                        boxSize={6}
                        position="absolute"
                        bottom={0}
                        left={12}
                        opacity={0.2}
                        color={`${unitColorScheme}.500`}
                      />
                    </Center>

                    <Center flexGrow={1} backgroundColor={`${unitColorScheme}.500`} paddingY={2} paddingX={2}>
                      <Text fontWeight="bold" textColor="white" textAlign="center">
                        {unit}
                      </Text>
                    </Center>
                  </VStack>
                </Tooltip>
              </Box>
            );
          })}

          {!isCollapsed && (
            <Center
              borderRadius="xl"
              paddingY={8}
              _hover={{ backgroundColor: `gray.50` }}
              role="group"
              transitionDuration="0.24s"
              className="animate__animated animate__fadeIn"
              cursor="pointer"
              onClick={this.handleBeginCreateUnit}
            >
              <VStack>
                <AddIcon
                  width={8}
                  height={8}
                  color={`${colorScheme}.400`}
                  transform="translateY(50%)"
                  _groupHover={{
                    transform: "translateY(0%)",
                  }}
                  transitionDuration="0.24s"
                />
                <Heading
                  fontSize="medium"
                  textColor={`${colorScheme}.400`}
                  paddingTop={2}
                  visibility="hidden"
                  opacity={0}
                  _groupHover={{
                    visibility: "visible",
                    opacity: 1,
                  }}
                  transitionDuration="0.24s"
                >
                  Add Unit
                </Heading>
              </VStack>
            </Center>
          )}
        </SimpleGrid>

        <UnitCreator
          section={section}
          isOpen={this.state.isCreating}
          onClose={this.handleEndCreateUnit}
          onSuccess={this.handleCreatedUnitSuccessful}
          colorScheme={colorScheme}
        />
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  level: state.level,
});

const mapDispatchToProps = (dispatch) => ({
  changeTest: (level, section, unit, test) => dispatch(changeTest(level, section, unit, test)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Units);
