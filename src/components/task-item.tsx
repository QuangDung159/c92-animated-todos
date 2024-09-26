import {
  Box,
  HStack,
  themeTools,
  useColorModeValue,
  useTheme,
} from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import AnimatedTaskLabel from './animated-task-label';

interface Props {
  isDone: boolean;
  onToggleCheckbox?: () => void;
}

function TaskItem(props: Props) {
  const { isDone, onToggleCheckbox } = props;
  const theme = useTheme();

  const hightlightColor = themeTools.getColor(
    theme,
    useColorModeValue('blue.500', 'blue.400'),
  );

  const boxStroke = themeTools.getColor(
    theme,
    useColorModeValue('muted.300', 'muted.500'),
  );

  const checkmarkColor = themeTools.getColor(
    theme,
    useColorModeValue('white', 'white'),
  );

  const activeTextColor = themeTools.getColor(
    theme,
    useColorModeValue('darkText', 'lightText'),
  );

  const doneTextColor = themeTools.getColor(
    theme,
    useColorModeValue('muted.400', 'muted.600'),
  );

  return (
    <HStack
      alignItems={'center'}
      w="full"
      px={4}
      py={2}
      bg={useColorModeValue('warm.50', 'prima')}
    >
      <Box width={30} height={30} mr={2}>
        <Pressable onPress={onToggleCheckbox}>
          <AnimatedCheckbox
            boxOutlineColor={boxStroke}
            highlightColor={hightlightColor}
            checkmarkColor={checkmarkColor}
            checked={isDone}
          />
        </Pressable>
      </Box>
      <AnimatedTaskLabel
        textColor={activeTextColor}
        inactiveTextColor={doneTextColor}
        strikethrough={isDone}
      >
        Task item
      </AnimatedTaskLabel>
    </HStack>
  );
}

export default TaskItem;
