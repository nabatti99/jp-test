import React, { Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Button, Heading, HStack, Slide, VStack } from "@chakra-ui/react";

import TestQuestion from "./TestQuestion.jsx";
import Result from "./Result.jsx";
import N5Clock from "./Clock.jsx";

function DoingTest(props) {
  const { level, unitTitle, testTitle } = props;

  const [checklist, setChecklist] = useState(new Array());
  const [timer, setTimer] = useState({
    isShowed: false,
    timerClock: null,
    value: 0,
  });

  const [result, setResult] = useState({
    isShowed: false,
    numTrueAnswers: 0,
    numQuestions: 0,
  });
  const [session, setSession] = useState({
    isDoing: false,
    isDone: false,
    doingTestType: null,
  });

  const [testData, setTestData] = useState(new Array());

  const handleGuessChangedAnswer = (guessAnswer, isCorrect, questionIndex) => {
    checklist[questionIndex] = {
      guessAnswer,
      isCorrect,
      isShowedAnswer: session.doingTestType == "Answer Directly",
    };
    setChecklist(Array.from(checklist));

    console.log(checklist);
  };

  const handleStartedTest = () => {
    setSession({
      isDoing: true,
      isDone: false,
      doingTestType: "Normally",
    });

    setTimer({
      ...timer,
      isShowed: true,
    });
  };

  const handleClosedResult = () => {
    setResult({
      ...result,
      isShowed: false,
    });
  };

  const cleanAndPrepareTest = () => {
    setTimer({
      timerClock: null,
      value: checklist.length * 60, // 1 question ~ 1 minute
      isShowed: false,
    });

    setSession({
      isDoing: false,
      isDone: false,
      doingTestType: null,
    });

    setChecklist(checklist.map(() => ({ isCorrect: false, isShowedAnswer: false, guessAnswer: "" })));
  };

  const stopAndShowResult = () => {
    console.log(timer);
    setTimer({
      ...timer,
      isShowed: false,
    });

    setSession({
      ...session,
      isDone: true,
      isDoing: false,
    });

    setResult({
      isShowed: true,
      numTrueAnswers: checklist.filter((item) => item.isCorrect).length,
      numQuestions: checklist.length,
    });

    setChecklist(checklist.map((item) => ({ ...item, isShowedAnswer: true })));
  };

  useEffect(() => {
    // Running clock
    if (timer.isShowed) {
      if (!timer.timerClock) {
        // Make a new Clock
        const newClock = setInterval(() => {
          const count = timer.value - 1;
          setTimer(() => ({
            ...timer,
            value: count,
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
      const testData = await window.nativeAPI.readTest(level, unitTitle, testTitle);
      console.log(testData);

      const newChecklist = new Array();
      const parsedTestData = testData.map((item) => {
        const name = item.Name.replace(/<p>/gm, "").replace(/<\/p>/gm, "");

        if (item.answer.length == 0)
          // Header
          return {
            ID: item.ID,
            type: "header",
            isAdditionHeader: item.Type == 2,
            content: name,
          };
        else {
          // Question
          const questionIndex = newChecklist.length; // checklist now has the number of questions is the same with the new question index
          newChecklist.push({
            isCorrect: false,
            isShowedAnswer: false,
            guessAnswer: "",
          }); // init with a failure answer

          const answers = item.answer.map((answer) => ({
            ID: answer.ID,
            content: answer.Name,
            isCorrect: answer.Type == 1,
          }));

          return {
            ID: item.ID,
            type: "question",
            question: name,
            questionIndex,
            answers,
            audio: item.Audio,
            image: item.Image,
          };
        }
      });

      setChecklist(newChecklist);
      setTestData(parsedTestData);

      setTimer({
        timerClock: null,
        value: newChecklist.length * 60, // 1 question ~ 1 minute
        isShowed: false,
      });

      setSession({
        isDoing: false,
        doingTestType: null,
        isDone: false,
      });
    }

    getTestData();
  }, []);

  const content = testData.map((item) => {
    // Render Content
    if (item.type == "header")
      // Header
      return (
        <Heading
          key={item.ID}
          size="lg"
          dangerouslySetInnerHTML={{ __html: item.content }}
          paddingTop={item.isAdditionHeader == 2 ? 8 : 0}
          paddingBottom={4}
        ></Heading>
      );
    else {
      return (
        <TestQuestion
          key={item.ID}
          question={item.question}
          answers={item.answers}
          audio={item.audio}
          image={item.image}
          isDoing={session.isDoing}
          info={checklist[item.questionIndex]}
          onChangeAnswer={(guessAnswer, isCorrect) =>
            handleGuessChangedAnswer(guessAnswer, isCorrect, item.questionIndex)
          }
        />
      );
    }
  });

  // Control buttons
  let buttons = null;
  if (session.isDoing == false)
    if (session.isDone == false)
      buttons = (
        <HStack paddingTop={4}>
          <Button colorScheme="teal" variant="solid" onClick={handleStartedTest}>
            Start now
          </Button>
          <Button colorScheme="teal" variant="outline">
            Start no timing
          </Button>
        </HStack>
      );
    else
      buttons = (
        <HStack paddingTop={4}>
          <Button colorScheme="teal" variant="outline" onClick={cleanAndPrepareTest}>
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
      <VStack spacing={4} alignItems="stretch">
        <VStack backgroundColor="teal.50" borderRadius="lg" paddingY="8" spacing={4}>
          <Heading as="h1" textColor="teal.700" size="xl">
            {testTitle}
          </Heading>
          <Heading as="h2" textColor="teal.500" size="md">
            Time: {timeDisplay} | Questions: {checklist.length}
          </Heading>

          {buttons}
        </VStack>

        <VStack alignItems="stretch">{content}</VStack>
      </VStack>

      <N5Clock timeDisplay={timeDisplay} isShowed={timer.isShowed} onEndTimeClick={stopAndShowResult} />

      <Result info={result} onClose={handleClosedResult} />
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  level: state.level,
  unitTitle: state.unit,
  testTitle: state.test,
});

export default connect(mapStateToProps)(DoingTest);
