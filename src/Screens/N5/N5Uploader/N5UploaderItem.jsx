import React, { Component } from "react";
import { Box, Button, FormControl, Heading, HStack, Input, Select, Text } from "@chakra-ui/react";

/**
 * @param {String} name
 * @param {String} filePath
 */
class N5UploaderItem extends Component {
  state = {
    units: [
      ...Array(25)
        .fill()
        .map((item, index) => `Unit ${index + 1}`),
      "Extended Units",
    ],
    testTypes: ["Reading", "Listening", "Summary", "Other"],

    name: this.props.name,
    testType: null,
    unit: null,

    status: "addMetadata",
    isSaving: false,
  };

  handleSavedItem = async () => {
    if (this.checkValidMetadata() == false) {
      this.setState({ status: "fail" });
      return;
    }

    try {
      this.setState({ isSaving: true });
      const fileData = {
        TestType: this.state.testType,
        Data: (await window.nativeAPI.readData(this.props.filePath)).data,
      };
      console.log(fileData);

      const audioParts = fileData.filter((data) => data.Mp3Temp != null);
      console.log(audioParts);

      const imgParts = fileData.filter((data) => data.FileTemp != null);
      console.log(imgParts);

      const testFolder = await window.nativeAPI.saveJSON(
        "N5",
        this.state.unit,
        this.state.name.split(".")[0], // Save to <Test Name> Folder
        this.state.name,
        fileData
      );

      await this.saveAudioList(audioParts, testFolder);
      await this.saveImageList(imgParts, testFolder);

      this.setState({ isSaving: false, status: "done" });
    } catch (error) {
      console.error(error);
      this.setState({ isSaving: false, status: "fail" });
    }
  };

  handleUnitChanged = (event) => {
    this.setState({ unit: event.target.value });
  };

  handleTestTypeChanged = (event) => {
    this.setState({ testType: event.target.value });
  };

  handleNameChanged = (event) => {
    this.setState({ name: event.target.value });
  };

  checkValidMetadata = () => {
    if (this.state.unit == null) return false;
    if (this.state.testType == null) return false;
    if (this.state.name == null) return false;

    return true;
  };

  saveAudioList = (audioParts, testFolder) => {
    const works = audioParts.map((part) => window.nativeAPI.saveAudio(testFolder, part.ID, part.Mp3Temp));

    return Promise.all(works);
  };

  saveImageList = (imgParts, testFolder) => {
    const works = imgParts.map((part) => window.nativeAPI.saveImage(testFolder, part.ID, part.FileTemp));

    return Promise.all(works);
  };

  render() {
    return (
      <Box>
        <Heading as="h3" size="sm" textColor="teal.700" marginBottom={2}>
          {this.props.filePath}
        </Heading>
        <HStack spacing={4} alignItems="end">
          <FormControl isRequired>
            <Select
              placeholder="Choose Unit"
              onChange={this.handleUnitChanged}
              disabled={this.state.status == "done"}
            >
              {this.state.units.map((unit) => (
                <option key={unit}>{unit}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <Select
              placeholder="Test Type"
              onChange={this.handleTestTypeChanged}
              disabled={this.state.status == "done"}
            >
              {this.state.testTypes.map((testType) => (
                <option key={testType}>{testType}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <Input
              placeholder="Test Name"
              value={this.state.name}
              onChange={this.handleNameChanged}
              disabled={this.state.status == "done"}
            />
          </FormControl>

          <Box>
            <Button
              colorScheme={this.state.status == "fail" ? "red" : "teal"}
              onClick={this.handleSavedItem}
              isLoading={this.state.isSaving}
              loadingText="Saving..."
              disabled={this.state.status == "done" || this.state.isSaving}
            >
              {this.state.status == "addMetadata" && "Save"}
              {this.state.status == "done" && "Done"}
              {this.state.status == "fail" && "Try again!"}
            </Button>
          </Box>
        </HStack>

        {this.state.status == "fail" && (
          <Text as="small" textColor="red.500">
            May be you forgot to add information to the required fields.
          </Text>
        )}
      </Box>
    );
  }
}

export default N5UploaderItem;
