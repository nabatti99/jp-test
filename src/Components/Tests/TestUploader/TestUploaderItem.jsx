import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Button, FormControl, Heading, HStack, Input, Select, Text } from "@chakra-ui/react";

import { uploadNewTest } from "../../../redux/actions";
import { CheckIcon } from "@chakra-ui/icons";

const ADD_METADATA = "ADD_METADATA";
const DONE = "DONE";
const FAIL = "FAIL";

const testTypes = ["Từ vựng", "Kanji", "Ngữ pháp", "Kaiwa", "Luyện tập", "Hong bik"];

/**
 * @param {String} name
 * @param {String} filePath
 */
class TestUploaderItem extends Component {
  state = {
    testName: this.props.name.split(".")[0],
    testType: null,

    status: ADD_METADATA,
    isSaving: false,
  };

  handleSavedItem = async () => {
    if (this.checkValidMetadata() == false) {
      this.setState({ status: FAIL });
      return;
    }

    try {
      this.setState({ isSaving: true });

      const { testName, testType } = this.state;
      const { level, section, unit, filePath, onSuccess } = this.props;

      const fileData = (await window.nativeAPI.readJSON(filePath)).data;
      console.log(fileData);

      const audioParts = fileData.filter((data) => data.Mp3Temp != null);

      const imgParts = fileData.filter((data) => data.FileTemp != null);

      // Save test data
      await window.nativeAPI.saveJSON(
        testName, // JSON file name is the same name with the test folder
        fileData,
        level,
        section,
        unit,
        testName // Save to <Test Name> Folder
      );

      // Save assets
      await this.saveAudioList(audioParts);
      await this.saveImageList(imgParts);

      // Save summary
      await window.nativeAPI.saveJSON(
        "summary",
        {
          title: testName,
          type: testType,
          history: null,
        },
        level,
        section,
        unit,
        testName
      );

      this.setState({ isSaving: false, status: DONE });
      onSuccess();
    } catch (error) {
      console.error(error);
      this.setState({ isSaving: false, status: FAIL });
    }
  };

  handleUnitChanged = (event) => {
    this.setState({ unit: event.target.value });
  };

  handleTestTypeChanged = (event) => {
    this.setState({ testType: event.target.value });
  };

  handleNameChanged = (event) => {
    this.setState({ testName: event.target.value });
  };

  checkValidMetadata = () => {
    if (this.state.testType == null) return false;
    if (this.state.testName == null) return false;

    const regexTestName = /[^\/\\\|*:?"<>]/gm;
    if (!regexTestName.test(this.state.testName)) return false;

    return true;
  };

  saveAudioList = (audioParts) => {
    const { testName } = this.state;
    const { level, section, unit } = this.props;
    const works = audioParts.map((part) =>
      window.nativeAPI.saveAudio(part.ID, part.Mp3Temp, level, section, unit, testName)
    );

    return Promise.all(works);
  };

  saveImageList = (imgParts) => {
    const { testName } = this.state;
    const { level, section, unit } = this.props;
    const works = imgParts.map((part) =>
      window.nativeAPI.saveImage(part.ID, part.FileTemp, level, section, unit, testName)
    );

    return Promise.all(works);
  };

  render() {
    const { filePath, colorScheme } = this.props;
    const { isSaving, testName, status } = this.state;

    return (
      <Box>
        <Heading as="h3" size="sm" textColor={`${colorScheme}.700`} marginBottom={2}>
          {filePath}
        </Heading>
        <HStack spacing={4} alignItems="end">
          <FormControl isRequired>
            <Input
              placeholder="Test name"
              value={testName}
              onChange={this.handleNameChanged}
              isDisabled={status == DONE}
            />
          </FormControl>

          <FormControl isRequired>
            <Select placeholder="Test type" onChange={this.handleTestTypeChanged} isDisabled={status == DONE}>
              {testTypes.map((testType) => (
                <option key={testType}>{testType}</option>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Button
              colorScheme={status == FAIL ? "red" : colorScheme}
              onClick={this.handleSavedItem}
              isLoading={isSaving}
              leftIcon={status == DONE && <CheckIcon />}
              loadingText="Saving..."
              isDisabled={status == DONE || isSaving}
            >
              {status == ADD_METADATA && "Save"}
              {status == DONE && "Done"}
              {status == FAIL && "Try again!"}
            </Button>
          </Box>
        </HStack>

        {status == FAIL && (
          <Text as="small" fontWeight="medium" textColor="red.500">
            May be you forgot to add information to the required fields.
          </Text>
        )}
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  level: state.level,
  section: state.section,
  unit: state.unit,
});

export default connect(mapStateToProps)(TestUploaderItem);
