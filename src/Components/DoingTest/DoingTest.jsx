import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";

import MultipleChoiceQuestion from "../Question/MultipleChoiceQuestion.jsx";
import FillInQuestion from "../Question/FillInQuestion.jsx";
import QuestionInfo from "../Question/QuestionInfo.jsx";
import Result from "./Result.jsx";
import N5Clock from "./Clock.jsx";
import DoubleBackIcon from "../Icons/DoubleBackIcon.jsx";

import { changeTest } from "../../redux/actions.js";

const NORMAL = "NORMAL";
const NO_TIMING = "NO_TIMING";

function DoingTest({ level, section, unit, test, colorScheme, changeTest }) {
  const [checklist, setChecklist] = useState(new Array());
  const [timer, setTimer] = useState({
    isShown: false,
    timerClock: null,
    value: 0,
    isAllowAddMoreTime: false,
  });

  const [result, setResult] = useState({
    isShown: false,
    numTrueAnswers: 0,
    numQuestions: 0,
  });
  const [session, setSession] = useState({
    isTiming: false,
    isDone: false,
    doingTestType: null,
  });

  const [testData, setTestData] = useState(new Array());

  const handleGuessChangedAnswer = (guessAnswer, isCorrect, questionIndex) => {
    checklist[questionIndex] = {
      guessAnswer,
      isCorrect,
      isShowedAnswer: session.doingTestType == NO_TIMING,
    };
    setChecklist(Array.from(checklist));
  };

  const handleStartedTest = () => {
    setSession({
      isTiming: true,
      isDone: false,
      doingTestType: NORMAL,
    });

    setTimer({
      ...timer,
      isShown: true,
    });
  };

  const handleStartedNoTiming = () => {
    setSession({
      isTiming: false,
      isDone: true,
      doingTestType: NO_TIMING,
    });
  };

  const handleClosedResult = () => {
    setResult({
      ...result,
      isShown: false,
    });
  };

  const handleAddMoreTime = () => {
    const unDoneQuestions = checklist.filter((item) => item.guessAnswer == "");
    setTimer({
      // Add one minute per an undone question
      ...timer,
      value: timer.value + unDoneQuestions.length * 60,
    });
  };

  const cleanAndPrepareTest = () => {
    setTimer({
      timerClock: null,
      value: checklist.length * 60, // 1 question ~ 1 minute
      isShown: false,
      isAllowAddMoreTime: false,
    });

    setSession({
      isTiming: false,
      isDone: false,
      doingTestType: null,
    });

    setChecklist(checklist.map(() => ({ isCorrect: false, isShowedAnswer: false, guessAnswer: "" })));
  };

  const stopAndShowResult = () => {
    setTimer({
      ...timer,
      value: 0,
      isShown: false,
    });

    setSession({
      ...session,
      isDone: true,
      isTiming: false,
    });

    setResult({
      isShown: true,
      numTrueAnswers: checklist.filter((item) => item.isCorrect).length,
      numQuestions: checklist.length,
    });

    setChecklist(checklist.map((item) => ({ ...item, isShowedAnswer: true })));
  };

  useEffect(() => {
    // Running clock
    if (timer.isShown) {
      if (!timer.timerClock) {
        // Make a new Clock
        const newClock = setInterval(() => {
          const count = timer.value - 1;
          const isAllowAddMoreTime = count < 5 * 60; // Allow add more time when 5 minutes left

          setTimer(() => ({
            ...timer,
            value: count,
            isAllowAddMoreTime,
          }));

          if (count == 0) stopAndShowResult();
        }, 1000);

        return () => clearInterval(newClock); // Cleanup when unmount
      }
    } else if (timer.timerClock) {
      // Remove a clock
      clearInterval(timer.timerClock);
      setTimer({
        ...timer,
        timerClock: null,
      });
    }
  }, [timer]);

  useEffect(() => {
    async function getTestData() {
      const testData = await window.nativeAPI.readTest(level, section, unit, test);
      console.log(testData);

      const newChecklist = new Array();
      const parsedTestData = testData.map((item) => {
        const script = item.script == "null" ? null : item.script;

        // Test Info
        if (item.CountAnswerAccurate == 0)
          return {
            ID: item.ID,
            type: "Info",
            content: item.Name,
            isAdditionalInfo: item.Type == 1,
            audio: item.Audio,
            image: item.Image,
            script: script,
          };
        else {
          // Question
          const questionIndex = newChecklist.length; // checklist now has the number of questions is the same with the new question index
          newChecklist.push({
            isCorrect: false,
            isShowedAnswer: false,
            guessAnswer: "",
          }); // init with a failure answer

          const answers = item.answer
            .sort(() => Math.random() - 0.5)
            .map((answer) => ({
              ID: answer.ID,
              content: answer.Name,
              isCorrect: answer.Type == 1,
            }));

          return {
            ID: item.ID,
            type: answers.length == 1 ? "Fill In" : "Multiple Choice",
            question: item.Name,
            questionIndex,
            answers,
            audio: item.Audio,
            image: item.Image,
            script: script,
          };
        }
      });

      setChecklist(newChecklist);
      setTestData(parsedTestData);

      setTimer({
        ...timer,
        value: newChecklist.length * 60, // 1 question ~ 1 minute
        // value: 60, // Test
      });

      setSession({
        isTiming: false,
        doingTestType: null,
        isDone: false,
      });
    }

    getTestData();
  }, []);

  const content = testData.map((item) => {
    // Render Content
    if (item.type == "Info")
      // Header
      return (
        <QuestionInfo
          key={item.ID}
          colorScheme={colorScheme}
          content={item.content}
          audio={item.audio}
          image={item.image}
          script={item.script}
          isDoing={session.isTiming || session.doingTestType == NO_TIMING}
          isAdditionalInfo={item.isAdditionalInfo}
        />
      );
    else {
      switch (item.type) {
        case "Multiple Choice":
          return (
            <MultipleChoiceQuestion
              key={item.ID}
              colorScheme={colorScheme}
              question={item.question}
              answers={item.answers}
              audio={item.audio}
              image={item.image}
              script={item.script}
              isDoing={session.isTiming || session.doingTestType == NO_TIMING}
              info={checklist[item.questionIndex]}
              onChangeAnswer={(guessAnswer, isCorrect) =>
                handleGuessChangedAnswer(guessAnswer, isCorrect, item.questionIndex)
              }
            />
          );
        case "Fill In":
          return (
            <FillInQuestion
              key={item.ID}
              colorScheme={colorScheme}
              question={item.question}
              answer={item.answers[0]}
              audio={item.audio}
              image={item.image}
              script={item.script}
              isDoing={session.isTiming || session.doingTestType == NO_TIMING}
              isTiming={session.isTiming}
              info={checklist[item.questionIndex]}
              onChangeAnswer={(guessAnswer, isCorrect) =>
                handleGuessChangedAnswer(guessAnswer, isCorrect, item.questionIndex)
              }
            />
          );
      }
    }
  });

  // Control buttons
  let buttons = null;
  if (session.isTiming == false)
    if (session.isDone == false)
      buttons = (
        <HStack paddingTop={4}>
          <Button colorScheme={colorScheme} variant="solid" onClick={handleStartedTest}>
            Start now
          </Button>
          <Button colorScheme={colorScheme} variant="outline" onClick={handleStartedNoTiming}>
            Start no timing
          </Button>
        </HStack>
      );
    else
      buttons = (
        <HStack paddingTop={4}>
          <Button colorScheme={colorScheme} variant="outline" onClick={cleanAndPrepareTest}>
            Clean and Reset
          </Button>
        </HStack>
      );
  else
    buttons = (
      <HStack paddingTop={4}>
        <Button colorScheme="red" variant="solid" onClick={stopAndShowResult}>
          End Test and Submit
        </Button>
      </HStack>
    );

  // Parse timer
  const minutesLeft = Math.floor(timer.value / 60);
  const minutesDisplay = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
  const secondsLeft = timer.value % 60;
  const secondsDisplay = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

  const timeDisplay = `${minutesDisplay}:${secondsDisplay}`;

  return (
    <Fragment>
      <VStack spacing={8} alignItems="stretch">
        <VStack
          backgroundColor={`${colorScheme}.50`}
          borderRadius="lg"
          paddingY="8"
          spacing={4}
          position="relative"
        >
          <Heading as="h1" textColor={`${colorScheme}.700`} size="xl">
            {test}
          </Heading>
          <Heading as="h2" textColor={`${colorScheme}.500`} size="md">
            Time: {timeDisplay} | Questions: {checklist.length}
          </Heading>

          {buttons}

          <Box
            position="absolute"
            top="50%"
            left="0"
            alignSelf="start"
            marginTop="0 !important"
            transform="translateY(-50%)"
            paddingX={8}
            cursor="pointer"
            opacity={0.15}
            _hover={{
              opacity: 0.4,
            }}
            transition="0.24s"
            onClick={() => changeTest(level, section, unit, null)}
          >
            <DoubleBackIcon boxSize={24} color={`${colorScheme}.500`} />
          </Box>
        </VStack>

        <VStack alignItems="stretch">{content}</VStack>
      </VStack>

      <N5Clock
        timeDisplay={timeDisplay}
        isShown={timer.isShown}
        isEnabledAddMoreTime={timer.isAllowAddMoreTime}
        onEndTimeClick={stopAndShowResult}
        onMoreTimeClick={handleAddMoreTime}
      />

      <Result info={result} onClose={handleClosedResult} />
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  level: state.level,
  section: state.section,
  unit: state.unit,
  test: state.test,
});

const mapDispatchToProps = (dispatch) => ({
  changeTest: (level, section, unit, test) => dispatch(changeTest(level, section, unit, test)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoingTest);
