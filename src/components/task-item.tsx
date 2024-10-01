import { Feather } from '@expo/vector-icons';
import {
  Box,
  HStack,
  Icon,
  Input,
  themeTools,
  useColorModeValue,
  useTheme,
} from 'native-base';
import React, { useCallback } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  TextInputChangeEventData,
} from 'react-native';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';
import AnimatedTaskLabel from './animated-task-label';
import SwipableView from './swipable-view';

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  isDone: boolean;
  onToggleCheckbox?: () => void;
  onPressLabel?: () => void;
  onRemove?: () => void;
  subject: string;
  isEditing: boolean;
  onChangeSubject?: (subject: string) => void;
  onFinishEditing?: () => void;
}

function TaskItem(props: Props) {
  const {
    isDone,
    onToggleCheckbox,
    subject,
    onPressLabel,
    onRemove,
    simultaneousHandlers,
    isEditing,
    onChangeSubject,
    onFinishEditing,
  } = props;
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

  const handleChangeObject = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeSubject?.(e.nativeEvent.text);
    },
    [onChangeSubject],
  );

  return (
    <SwipableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={
        <Box
          w={'full'}
          h={'full'}
          bg={'red.500'}
          alignItems="flex-end"
          justifyContent={'center'}
          pr={4}
        >
          <Icon color={'white'} as={<Feather name="trash-2" />} size={'sm'} />
        </Box>
      }
    >
      <HStack
        alignItems={'center'}
        w="full"
        px={4}
        py={2}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
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
        {isEditing ? (
          <Input
            placeholder="Task"
            value={subject}
            variant={'unstyled'}
            fontSize={19}
            px={1}
            py={0}
            autoFocus
            blurOnSubmit
            onChange={handleChangeObject}
            onBlur={onFinishEditing}
          />
        ) : (
          <AnimatedTaskLabel
            textColor={activeTextColor}
            inactiveTextColor={doneTextColor}
            strikethrough={isDone}
            onPress={onPressLabel}
          >
            {subject}
          </AnimatedTaskLabel>
        )}
      </HStack>
    </SwipableView>
  );
}

export default TaskItem;
